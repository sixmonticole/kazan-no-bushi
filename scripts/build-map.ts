/**
 * Génère l'image statique de la carte du lieu, déposée dans `public/`.
 *
 * Le livret est exporté en PDF par Puppeteer : une carte interactive Leaflet
 * ne s'y imprime pas de façon fiable (tuiles chargées en JS, page masquée au
 * moment de l'init). Cette image sert donc de repli garanti pour le PDF, tout
 * en restant le visuel par défaut à l'écran.
 *
 * Le script assemble les tuiles OpenStreetMap dans une page sans réseau
 * (les tuiles sont injectées en `data:`), dessine le pin aux couleurs de la
 * marque, puis capture la page. Il démarre son propre serveur Nuxt s'il n'y
 * en a pas déjà un, comme `build-pdf.ts`.
 *
 * `MAP_SOURCE_URL` permet de viser un serveur existant (dev ou preview).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { launch } from "puppeteer";

/** Taille d'une tuile OSM, en pixels (standard slippy map). */
const TILE_SIZE = 256;

/** User-Agent explicite exigé par la politique d'usage des tuiles OSM. */
const USER_AGENT =
    "KazanNoBushi-static-map/1.0 (+https://www.kazan-no-bushi.fr; kendo@asm-omnisports.com)";

const OUTPUT_PATH = resolve(process.cwd(), "public/plan-artenium.png");

/** Centre de la carte : Arténium, Parc de l'Artière, Ceyrat. */
const CENTER = { lat: 45.735_187_9, lng: 3.068_851_7 };

/** Zoom retenu : le gymnase et ses abords immédiats. */
const ZOOM = 15;

/** Dimensions de l'image finale, en pixels CSS. */
const WIDTH = 900;
const HEIGHT = 520;

/** Nombre de sous-domaines de tuiles OSM à répartir pour lisser la charge. */
const SUBDOMAINS = ["a", "b", "c"];

interface Tile {
    /** Indices de tuile, déjà ramenés dans les bornes du monde. */
    x: number;
    y: number;
    zoom: number;
    /** Position du coin haut-gauche dans la fenêtre, en pixels CSS. */
    left: number;
    top: number;
}

/** Convertit longitude/latitude en coordonnées pixel mondiales (projection Web Mercator). */
function project(
    lat: number,
    lng: number,
    zoom: number,
): { x: number; y: number } {
    const scale = TILE_SIZE * 2 ** zoom;
    const sinLat = Math.sin((lat * Math.PI) / 180);
    const x = (0.5 + lng / 360) * scale;
    const y =
        (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
    return { x, y };
}

/** Détermine les tuiles couvrant la fenêtre autour du centre. */
function tilesForViewport(
    center: { lat: number; lng: number },
    zoom: number,
    width: number,
    height: number,
): Tile[] {
    const centerPx = project(center.lat, center.lng, zoom);
    const topLeft = {
        x: centerPx.x - width / 2,
        y: centerPx.y - height / 2,
    };

    const firstTile = {
        x: Math.floor(topLeft.x / TILE_SIZE),
        y: Math.floor(topLeft.y / TILE_SIZE),
    };
    const lastTile = {
        x: Math.floor((topLeft.x + width) / TILE_SIZE),
        y: Math.floor((topLeft.y + height) / TILE_SIZE),
    };

    const worldSize = 2 ** zoom;
    const tiles: Tile[] = [];

    for (let y = firstTile.y; y <= lastTile.y; y += 1) {
        for (let x = firstTile.x; x <= lastTile.x; x += 1) {
            // Les tuiles hors monde n'existent pas : on les laisse de côté,
            // le fond HTML prend le relais sur les bords.
            if (y < 0 || y >= worldSize) {
                continue;
            }

            tiles.push({
                x: ((x % worldSize) + worldSize) % worldSize,
                y,
                zoom,
                // Position relative au coin de la fenêtre (pixels mondiaux
                // ramenés à l'écran), et non au monde entier.
                left: x * TILE_SIZE - topLeft.x,
                top: y * TILE_SIZE - topLeft.y,
            });
        }
    }

    return tiles;
}

async function fetchTileDataUrl(tile: Tile): Promise<string> {
    const subdomain = SUBDOMAINS[(tile.x + tile.y) % SUBDOMAINS.length];
    const response = await fetch(
        `https://${subdomain}.tile.openstreetmap.org/${tile.zoom}/${tile.x}/${tile.y}.png`,
        { headers: { "User-Agent": USER_AGENT } },
    );

    if (!response.ok) {
        throw new Error(
            `Tuile OSM ${tile.zoom}/${tile.x}/${tile.y} en échec : ${response.status}`,
        );
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:image/png;base64,${buffer.toString("base64")}`;
}

/** Feuille de style de la page de composition. */
const MAP_STYLES = `
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    #map {
        position: relative;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: hidden;
        background: #e8e3d8;
    }
    .tile { position: absolute; width: ${TILE_SIZE}px; height: ${TILE_SIZE}px; }
    .pin {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%);
        filter: drop-shadow(0 6px 8px rgba(6, 12, 33, 0.45));
    }
`;

/** Marqueur SVG posé au centre de la carte. */
const PIN_MARKUP = `
        <svg class="pin" width="46" height="60" viewBox="0 0 46 60" aria-hidden="true">
            <path
                d="M23 59C23 59 44 35.6 44 22A21 21 0 1 0 2 22C2 35.6 23 59 23 59Z"
                fill="#141f45"
                stroke="#f8f1e3"
                stroke-width="3"
            />
            <circle cx="23" cy="22" r="8" fill="#e8a45c" />
        </svg>`;

/** Construit les balises `<img>` des tuiles, positionnées dans la fenêtre. */
function buildTileMarkup(tiles: { tile: Tile; dataUrl: string }[]): string {
    return tiles
        .map(({ tile, dataUrl }) => {
            return `<img class="tile" src="${dataUrl}" style="left:${tile.left}px;top:${tile.top}px" width="${TILE_SIZE}" height="${TILE_SIZE}" alt="" />`;
        })
        .join("");
}

/** Construit le HTML de la carte : tuiles, pin de marque et attribution. */
function buildHtml(tiles: { tile: Tile; dataUrl: string }[]): string {
    return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<style>${MAP_STYLES}</style>
</head>
<body>
    <div id="map">
        ${buildTileMarkup(tiles)}
        ${PIN_MARKUP}
    </div>
</body>
</html>`;
}

async function renderMap(): Promise<void> {
    const tiles = tilesForViewport(CENTER, ZOOM, WIDTH, HEIGHT);
    const withData = await Promise.all(
        tiles.map(async (tile) => ({
            tile,
            dataUrl: await fetchTileDataUrl(tile),
        })),
    );

    const browser = await launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: WIDTH,
            height: HEIGHT,
            deviceScaleFactor: 2,
        });
        await page.setContent(buildHtml(withData), {
            waitUntil: "load",
        });

        // `setContent` résout avant que les images `data:` soient décodées :
        // on attend que chaque tuile ait une largeur naturelle non nulle.
        await page.waitForFunction(
            () =>
                [...document.querySelectorAll("img.tile")].every((img) => {
                    const image = img as HTMLImageElement;
                    return image.complete && image.naturalWidth > 0;
                }),
            { timeout: 15_000 },
        );

        const image = await page.screenshot({
            type: "png",
            clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
        });

        await mkdir(dirname(OUTPUT_PATH), { recursive: true });
        await writeFile(OUTPUT_PATH, image);
    } finally {
        await browser.close();
    }
}

async function main(): Promise<void> {
    await renderMap();
    console.log(`Carte générée : ${OUTPUT_PATH}`);
}

await main();
