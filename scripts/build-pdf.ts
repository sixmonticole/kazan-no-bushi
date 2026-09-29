/**
 * Génère le livret PDF à partir de la page `/guide`.
 *
 * Le PDF est un vrai fichier, déposé dans `public/` : le bouton
 * « Télécharger le PDF » du site pointe dessus. Le contenu reste du HTML
 * (texte sélectionnable, indexable), et le PDF en est un rendu A4.
 *
 * Le script démarre son propre serveur Nuxt s'il n'y en a pas déjà un :
 * `bun run pdf` fonctionne donc seul, et `bun run build` l'enchaîne avant
 * le build pour que le fichier soit embarqué dans `.output/public/`.
 *
 * `PDF_SOURCE_URL` permet de viser un serveur existant (dev ou preview).
 */
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import { launch } from "puppeteer";

const HOST = process.env.PDF_HOST ?? "http://localhost:3000";
const GUIDE_PATH = "/guide";
const OUTPUT_PATH = resolve(process.cwd(), "public/kazan-no-bushi-2026.pdf");

/** Le temps que Nuxt compile et réponde avant d'abandonner. */
const SERVER_TIMEOUT_MS = 90_000;

async function isServerUp(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
}

/** Attend qu'une condition soit vraie, en sondant à intervalle régulier. */
async function waitUntil(
    check: () => Promise<boolean>,
    timeoutMs: number,
): Promise<boolean> {
    const attempts = Math.ceil(timeoutMs / 1000);

    const results = await Promise.all(
        Array.from({ length: attempts }, async (_unused, index) => {
            await new Promise((resolveWait) => {
                setTimeout(resolveWait, index * 1000);
            });
            return check();
        }),
    );

    return results.some(Boolean);
}

/**
 * Démarre un serveur Nuxt temporaire et attend qu'il réponde.
 * Renvoie de quoi l'arrêter, ou `null` si un serveur tournait déjà.
 */
async function ensureServer(): Promise<{ stop: () => void } | null> {
    if (await isServerUp(`${HOST}${GUIDE_PATH}`)) {
        return null;
    }

    const server = spawn("bun", ["run", "dev"], {
        stdio: "ignore",
        detached: false,
    });

    const ready = await waitUntil(
        () => isServerUp(`${HOST}${GUIDE_PATH}`),
        SERVER_TIMEOUT_MS,
    );

    if (!ready) {
        server.kill();
        throw new Error(
            `Le serveur n'a pas répondu sur ${HOST}${GUIDE_PATH} après ${SERVER_TIMEOUT_MS} ms.`,
        );
    }

    return { stop: () => server.kill() };
}

/**
 * Laisse aux polices web (Yomogi, Protest Revolution) et aux images le temps
 * d'arriver : le PDF est généré juste après le rendu initial.
 */
async function waitForAssets(): Promise<void> {
    await new Promise((resolveWait) => {
        setTimeout(resolveWait, 3000);
    });
}

async function renderPdf(): Promise<void> {
    await mkdir(dirname(OUTPUT_PATH), { recursive: true });

    const browser = await launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    try {
        const page = await browser.newPage();
        await page.goto(`${HOST}${GUIDE_PATH}`, {
            waitUntil: "domcontentloaded",
            timeout: 60_000,
        });

        // Le serveur de dev garde une connexion HMR ouverte : on attend
        // explicitement le rendu plutôt que de guetter le réseau.
        await page.waitForSelector(".sheet", { timeout: 30_000 });
        await waitForAssets();

        // Le lecteur n'affiche qu'une page à la fois : pour le PDF, on rend
        // toutes les feuilles à leur taille A4, sans mise à l'échelle écran.
        await page.emulateMediaType("print");

        await page.pdf({
            path: OUTPUT_PATH,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: "0", right: "0", bottom: "0", left: "0" },
        });
    } finally {
        await browser.close();
    }
}

async function main(): Promise<void> {
    const server = await ensureServer();

    try {
        await renderPdf();
        console.log(`PDF généré : ${OUTPUT_PATH}`);
    } finally {
        server?.stop();
    }
}

await main();
