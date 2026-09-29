import { SEO, SITE_NAME, SITE_URL } from "~/utils/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Icônes, manifest et préconnexions aux polices. */
const ICON_LINKS = [
    { rel: "canonical", href: SITE_URL },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/manifest.webmanifest" },
] as const;

const FONT_LINKS = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Protest+Revolution&family=Yomogi&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap",
    },
] as const;

interface SiteSeoOverride {
    title?: string;
    description?: string;
    /** URL canonique de la page, relative au site (`/guide`). */
    path?: string;
}

/**
 * Balises SEO et réseaux sociaux. Les pages secondaires passent un titre et
 * une description ; par défaut, on retombe sur la page unique de l'édition.
 * Source de vérité unique : `utils/site.ts`.
 */
export function useSiteSeo(override: SiteSeoOverride = {}): void {
    const title = override.title ?? SEO.title;
    const description = override.description ?? SEO.description;
    const ogImage = `${SITE_URL}/og-image.jpg`;
    const canonical = `${SITE_URL}${override.path ?? ""}`;

    useSeoMeta({
        title,
        description,
        ogType: "website",
        ogTitle: title,
        ogDescription: description,
        ogUrl: canonical,
        ogLocale: "fr_FR",
        ogSiteName: SITE_NAME,
        ogImage,
        ogImageWidth: OG_WIDTH,
        ogImageHeight: OG_HEIGHT,
        ogImageAlt: `${SITE_NAME}, stage de kendo à Ceyrat`,
        twitterCard: "summary_large_image",
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
    });

    useHead({
        htmlAttrs: { lang: "fr" },
        meta: [{ name: "theme-color", content: "#141f45" }],
        link: [
            { rel: "canonical", href: canonical },
            ...ICON_LINKS.slice(1),
            ...FONT_LINKS,
        ],
    });
}
