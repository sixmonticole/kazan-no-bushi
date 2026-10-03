/**
 * Régénère les déclinaisons de marque.
 *
 * Deux sources :
 *  - `public/kamon.png`, le pochoir du Kamon (monochrome, canal alpha) : il
 *    donne les icônes carrées (favicon, PWA, apple-touch), recoloré en crème
 *    sur une plaque navy à coins arrondis ;
 *  - `public/logo-asm.png`, le logotype horizontal : il donne l'image de
 *    partage Open Graph, sur fond crème.
 *
 * La composition se fait dans un canvas Chromium (Puppeteer, déjà présent pour
 * la carte et le PDF) : pas d'outil binaire externe à installer. Le favicon
 * `.ico` emboîte simplement le PNG 64×64 dans son conteneur ICO.
 *
 * Sortie : `public/favicon.ico`, `public/icon-192.png`,
 * `public/icon-512.png`, `public/apple-touch-icon.png`, `public/og-image.jpg`.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { launch } from "puppeteer";

/** Couleurs de la marque, alignées sur le thème Tailwind (`main.css`). */
const NAVY = "#141f45";
const CREAM = "#f8f1e3";

const KAMON_PATH = resolve(process.cwd(), "public/kamon.png");
const LOGO_PATH = resolve(process.cwd(), "public/logo-asm.png");
const OUTPUT_DIR = resolve(process.cwd(), "public");
const FAVICON_SOURCE = resolve(OUTPUT_DIR, "favicon.ico");

/**
 * Boîte opaque du Kamon dans son fichier source, en pixels (détectée via le
 * canal alpha). Le fichier porte des marges transparentes : on rogne pour que
 * l'emblème occupe vraiment la place qu'on lui réserve.
 */
const KAMON_BOUNDS = { x: 64, y: 36, width: 396, height: 391 };

/**
 * Alpha du remplissage du Kamon dans le fichier source (0–255). Le pochoir est
 * un noir uni à cette opacité : on s'en sert pour le ramener à pleine opacité
 * avant de le recolorer.
 */
const KAMON_ALPHA = 43;

/**
 * Boîte opaque du logotype dans son fichier source, en pixels (détectée via
 * le canal alpha), pour le même rognage.
 */
const LOGO_BOUNDS = { x: 196, y: 200, width: 3231, height: 1183 };

/** Fraction du côté de l'icône occupée par la plaque (le reste est de l'air). */
const PLATE_RATIO = 0.86;

/** Fraction de la plaque occupée par l'emblème (le reste est de la marge). */
const KAMON_RATIO = 0.62;

/** Rayon des coins de la plaque, en fraction du côté de la plaque. */
const PLATE_RADIUS_RATIO = 0.24;

/** Fraction de la largeur occupée par le logotype dans l'image Open Graph. */
const OG_LOGO_WIDTH_RATIO = 0.72;

interface IconSpec {
    /** Nom du fichier PNG écrit dans `public/`. */
    file: string;
    /** Côté de l'icône, en pixels. */
    size: number;
}

/** Icônes carrées produites à partir du Kamon. */
const ICONS: IconSpec[] = [
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
    { file: "apple-touch-icon.png", size: 180 },
];

/** Côté du favicon, en pixels (source du conteneur ICO). */
const FAVICON_SIZE = 64;

/** Image Open Graph : ratio 1200×630, logotype centré sur fond crème. */
const OG = {
    file: "og-image.jpg",
    width: 1200,
    height: 630,
    background: CREAM,
};

interface ComposeOptions {
    width: number;
    height: number;
    /** Code à exécuter dans la page, une fois l'image source chargée. */
    draw: string;
    type: "png" | "jpeg";
    dataUrl: string;
}

async function readDataUrl(path: string): Promise<string> {
    const buffer = await readFile(path);
    return `data:image/png;base64,${buffer.toString("base64")}`;
}

/**
 * Construit la page de composition : un canvas de la taille voulue, dans
 * lequel `options.draw` dessine une fois l'image source décodée. Le script
 * `draw` reçoit `ctx`, `image` et `crop` (la boîte opaque à dessiner).
 */
function buildMarkup(
    options: ComposeOptions,
    bounds: { x: number; y: number; width: number; height: number },
): string {
    return `<!doctype html>
<html>
<head><meta charset="utf-8" /><style>
    html, body { margin: 0; padding: 0; }
    canvas { display: block; }
</style></head>
<body><canvas id="c" width="${options.width}" height="${options.height}"></canvas>
<script>
    window.__ready = (async () => {
        const canvas = document.getElementById("c");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = ${JSON.stringify(options.dataUrl)};
        await image.decode();
        const crop = ${JSON.stringify(bounds)};
        const draw = (ctx, image, crop) => {
            ${options.draw}
        };
        draw(ctx, image, crop);
        return true;
    })();
</script></body>
</html>`;
}

/** Capture le canvas de composition et renvoie son contenu binaire. */
async function captureCanvas(
    page: Awaited<ReturnType<Awaited<ReturnType<typeof launch>>["newPage"]>>,
    options: ComposeOptions,
    bounds: { x: number; y: number; width: number; height: number },
): Promise<Buffer> {
    await page.setContent(buildMarkup(options, bounds), { waitUntil: "load" });
    await page.waitForFunction("window.__ready", { timeout: 15_000 });

    const element = await page.$("#c");
    if (!element) {
        throw new Error("Canvas introuvable pour la composition de marque.");
    }

    const buffer = await element.screenshot(
        options.type === "jpeg"
            ? { type: "jpeg", quality: 90 }
            : { type: "png" },
    );

    return Buffer.from(buffer);
}

/** Compose une image de marque dans un canvas Chromium. */
async function compose(
    options: ComposeOptions,
    bounds: { x: number; y: number; width: number; height: number },
): Promise<Buffer> {
    const browser = await launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: options.width,
            height: options.height,
            deviceScaleFactor: 1,
        });
        return await captureCanvas(page, options, bounds);
    } finally {
        await browser.close();
    }
}

/**
 * Emballe un PNG dans un conteneur ICO. Le format ICO accepte un PNG embarqué
 * tel quel. On écrit l'en-tête (réservé = 0, type = 1 icône, une seule image),
 * puis l'entrée de répertoire : dimensions, plans = 1, 32 bits par pixel,
 * taille et décalage des données. Le côté est codé sur un octet, `0` valant
 * 256.
 */
function pngToIco(png: Buffer, size: number): Buffer {
    const dimension = size >= 256 ? 0 : size;

    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(1, 4);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(dimension, 0);
    entry.writeUInt8(dimension, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(header.length + entry.length, 12);

    return Buffer.concat([header, entry, png]);
}

/**
 * Construit le fragment de dessin du Kamon : pochoir normalisé à pleine
 * opacité puis recoloré en crème sur une couche dédiée. Le recolorage passe
 * par `source-in`, qui ne garde que les pixels couverts par le pochoir. Sans
 * cette couche, le remplissage mangerait aussi la plaque navy.
 */
function kamonDrawSnippet(size: number, inner: number): string {
    return `
        const box = ${inner};
        const scale = Math.min(box / crop.width, box / crop.height);
        const w = crop.width * scale;
        const h = crop.height * scale;

        const kamon = document.createElement("canvas");
        kamon.width = size;
        kamon.height = size;
        const kctx = kamon.getContext("2d");
        kctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            (size - w) / 2,
            (size - h) / 2,
            w,
            h,
        );

        // Le pochoir source est un noir très transparent (~43/255) : on
        // normalise son alpha à pleine opacité pour qu'il soit franchement
        // crème une fois recolorié.
        const pixels = kctx.getImageData(0, 0, size, size);
        const data = pixels.data;
        for (let i = 3; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.round((data[i] / ${KAMON_ALPHA}) * 255));
        }
        kctx.putImageData(pixels, 0, 0);

        kctx.globalCompositeOperation = "source-in";
        kctx.fillStyle = ${JSON.stringify(CREAM)};
        kctx.fillRect(0, 0, size, size);

        ctx.drawImage(kamon, 0, 0);
    `;
}

/**
 * Compose une icône : plaque navy à coins arrondis, puis le Kamon recoloré en
 * crème, centré et ajusté.
 */
function composeIcon(icon: IconSpec, dataUrl: string): Promise<Buffer> {
    const plate = icon.size * PLATE_RATIO;
    const radius = plate * PLATE_RADIUS_RATIO;
    const inner = plate * KAMON_RATIO;

    const draw = `
        const size = ${icon.size};
        const plate = ${plate};
        const radius = ${radius};
        const inset = (size - plate) / 2;

        // Plaque navy à coins arrondis.
        ctx.fillStyle = ${JSON.stringify(NAVY)};
        ctx.beginPath();
        ctx.roundRect(inset, inset, plate, plate, radius);
        ctx.fill();

        ${kamonDrawSnippet(icon.size, inner)}
    `;

    return compose(
        {
            width: icon.size,
            height: icon.size,
            draw,
            type: "png",
            dataUrl,
        },
        KAMON_BOUNDS,
    );
}

/** Compose l'image Open Graph : fond crème, logotype ASM centré. */
function composeOg(dataUrl: string): Promise<Buffer> {
    const boxWidth = OG.width * OG_LOGO_WIDTH_RATIO;
    const boxHeight = OG.height * 0.8;

    const draw = `
        const width = ${OG.width};
        const height = ${OG.height};
        ctx.fillStyle = ${JSON.stringify(CREAM)};
        ctx.fillRect(0, 0, width, height);

        const boxW = ${boxWidth};
        const boxH = ${boxHeight};
        const scale = Math.min(boxW / crop.width, boxH / crop.height);
        const w = crop.width * scale;
        const h = crop.height * scale;
        ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            (width - w) / 2,
            (height - h) / 2,
            w,
            h,
        );
    `;

    return compose(
        {
            width: OG.width,
            height: OG.height,
            draw,
            type: "jpeg",
            dataUrl,
        },
        LOGO_BOUNDS,
    );
}

async function main(): Promise<void> {
    const kamonDataUrl = await readDataUrl(KAMON_PATH);
    const logoDataUrl = await readDataUrl(LOGO_PATH);

    const icons = await Promise.all(
        ICONS.map(async (icon) => ({
            icon,
            png: await composeIcon(icon, kamonDataUrl),
        })),
    );

    const favicon = await composeIcon(
        { file: "favicon.ico", size: FAVICON_SIZE },
        kamonDataUrl,
    );

    const og = await composeOg(logoDataUrl);

    await Promise.all([
        ...icons.map(({ icon, png }) =>
            writeFile(resolve(OUTPUT_DIR, icon.file), png),
        ),
        writeFile(FAVICON_SOURCE, pngToIco(favicon, FAVICON_SIZE)),
        writeFile(resolve(OUTPUT_DIR, OG.file), og),
    ]);

    console.log("Marque régénérée : icônes (Kamon), favicon et og-image.");
}

await main();
