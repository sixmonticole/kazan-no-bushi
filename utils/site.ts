export const SITE_URL = "https://kazan-no-bushi.fr";
export const SITE_NAME = "Kazan No Bushi";
export const EDITION = "XIVème édition";

/** Année de l'édition, fixée dans les données (jamais lue depuis l'horloge). */
export const EDITION_YEAR = 2026;

export const CONTACT_EMAIL = "kendo@asm-omnisports.com";

export const INSTAGRAM_URL = "https://www.instagram.com/asm_kendo/";
export const FACEBOOK_URL = "https://www.facebook.com/kazankendo";

const DESCRIPTION =
    "Stage, passage de grade et compétition de kendo — les 28 et 29 novembre 2026 à l'Artenium, Ceyrat.";

/** Fuseau de référence de l'événement : les horaires sont locaux à Ceyrat. */
export const EVENT_TIMEZONE = "Europe/Paris";

/** Début de l'événement, exprimé dans le fuseau de l'événement. */
export const EVENT_START_ISO = "2026-11-28T09:30:00";

/** Fin de l'événement, utilisée pour le JSON-LD. */
export const EVENT_END_ISO = "2026-11-29T18:00:00";

export const EVENT = {
    name: `${SITE_NAME} — ${EDITION}`,
    description: DESCRIPTION,
    startDate: EVENT_START_ISO,
    endDate: EVENT_END_ISO,
    timezone: EVENT_TIMEZONE,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    address: {
        name: "Artenium",
        street: "4 Parc de l'Artière",
        city: "Ceyrat",
        postalCode: "63122",
        country: "FR",
    },
} as const;

export const SEO = {
    title: `${SITE_NAME} — ${EDITION}`,
    description: DESCRIPTION,
} as const;
