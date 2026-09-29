export const SITE_URL = "https://kazan-no-bushi.fr";
export const SITE_NAME = "Kazan No Bushi";
export const EDITION = "XIVème édition";

/** Année de l'édition, fixée dans les données (jamais lue depuis l'horloge). */
export const EDITION_YEAR = 2026;

export const CONTACT_EMAIL = "kendo@asm-omnisports.com";

export const INSTAGRAM_URL = "https://www.instagram.com/asm_kendo/";
export const FACEBOOK_URL = "https://www.facebook.com/kazankendo";

/** Lieu de l'événement, réutilisé par le SEO et les données structurées. */
const VENUE_NAME = "Artenium";
const VENUE_CITY = "Ceyrat";

/**
 * Description destinée aux résultats de recherche. Elle vise les requêtes
 * utiles (« stage kendo », « compétition kendo Auvergne ») plutôt que de
 * répéter le titre.
 */
const DESCRIPTION =
    "Stage, passage de grade (1er au 3ème dan) et compétition de kendo les 28 et 29 novembre 2026 à l'Artenium, Ceyrat, près de Clermont-Ferrand. Tous niveaux.";

/** Nom officiel de l'événement, utilisé par les données structurées. */
const EVENT_NAME = `${SITE_NAME} — ${EDITION}`;

/** Fuseau de référence de l'événement : les horaires sont locaux à Ceyrat. */
export const EVENT_TIMEZONE = "Europe/Paris";

/** Début de l'événement, exprimé dans le fuseau de l'événement. */
export const EVENT_START_ISO = "2026-11-28T09:30:00";

/** Fin de l'événement, utilisée pour le JSON-LD. */
export const EVENT_END_ISO = "2026-11-29T18:00:00";

export const EVENT = {
    name: EVENT_NAME,
    description: DESCRIPTION,
    startDate: EVENT_START_ISO,
    endDate: EVENT_END_ISO,
    timezone: EVENT_TIMEZONE,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    address: {
        name: VENUE_NAME,
        street: "4 Parc de l'Artière",
        city: VENUE_CITY,
        postalCode: "63122",
        country: "FR",
    },
} as const;

/**
 * Titre et description affichés dans les résultats de recherche : ils
 * explicitent le sport et la ville, que le seul nom de l'édition ne dit pas.
 */
export const SEO = {
    title: `${SITE_NAME} ${EDITION_YEAR} — Stage et compétition de kendo à ${VENUE_CITY}`,
    description: DESCRIPTION,
} as const;
