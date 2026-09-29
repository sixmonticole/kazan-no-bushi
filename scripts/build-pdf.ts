/**
 * Génère le livret PDF à partir de la page `/guide`.
 *
 * Le PDF est un vrai fichier, déposé dans `public/` : le bouton
 * « Télécharger le PDF » du site pointe dessus. Le contenu reste du HTML
 * (texte sélectionnable, indexable), et le PDF en est un rendu A4.
 *
 * Usage : `bun run pdf` (serveur de dev ou build de prévisualisation requis).
 * L'URL est lue dans `PDF_SOURCE_URL`, par défaut http://localhost:3000/guide.
 */
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { launch } from "puppeteer";

const SOURCE_URL = process.env.PDF_SOURCE_URL ?? "http://localhost:3000/guide";
const OUTPUT_PATH = resolve(process.cwd(), "public/kazan-no-bushi-2026.pdf");

/**
 * Laisse aux polices web (Yomogi, Protest Revolution) et aux images le temps
 * d'arriver : le PDF est généré juste après le rendu initial.
 */
async function waitForAssets(): Promise<void> {
    await new Promise((resolveWait) => {
        setTimeout(resolveWait, 3000);
    });
}

async function main(): Promise<void> {
    await mkdir(dirname(OUTPUT_PATH), { recursive: true });

    const browser = await launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    try {
        const page = await browser.newPage();
        await page.goto(SOURCE_URL, {
            waitUntil: "domcontentloaded",
            timeout: 60_000,
        });

        // Le serveur de dev garde une connexion HMR ouverte : on attend
        // explicitement le rendu plutôt que de guetter le réseau.
        await page.waitForSelector(".sheet", { timeout: 30_000 });
        await new Promise((resolveWait) => {
            setTimeout(resolveWait, 1500);
        });

        // Le lecteur n'affiche qu'une page à la fois : pour le PDF, on rend
        // toutes les feuilles à leur taille A4, sans mise à l'échelle écran.
        await page.emulateMediaType("print");
        await waitForAssets();

        await page.pdf({
            path: OUTPUT_PATH,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: "0", right: "0", bottom: "0", left: "0" },
        });

        console.log(`PDF généré : ${OUTPUT_PATH}`);
    } finally {
        await browser.close();
    }
}

await main();
