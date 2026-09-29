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

/**
 * Balises SEO et réseaux sociaux de la page unique.
 * Source de vérité unique : `utils/site.ts`.
 */
export function useSiteSeo(): void {
    const ogImage = `${SITE_URL}/og-image.jpg`;

    useSeoMeta({
        title: SEO.title,
        description: SEO.description,
        ogType: "website",
        ogTitle: SEO.title,
        ogDescription: SEO.description,
        ogUrl: SITE_URL,
        ogLocale: "fr_FR",
        ogSiteName: SITE_NAME,
        ogImage,
        ogImageWidth: OG_WIDTH,
        ogImageHeight: OG_HEIGHT,
        ogImageAlt: `${SITE_NAME}, stage de kendo à Ceyrat`,
        twitterCard: "summary_large_image",
        twitterTitle: SEO.title,
        twitterDescription: SEO.description,
        twitterImage: ogImage,
    });

    useHead({
        htmlAttrs: { lang: "fr" },
        meta: [{ name: "theme-color", content: "#141f45" }],
        link: [...ICON_LINKS, ...FONT_LINKS],
    });
}
