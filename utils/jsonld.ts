import { EVENT, SITE_NAME, SITE_URL } from "./site";

/**
 * Décalage de l'heure d'hiver (UTC+1) : un événement local doit exposer une
 * date avec fuseau explicite pour que Google la situe sans ambiguïté.
 */
const OFFSET = "+01:00";

/** Complète une date locale « 2026-11-28T09:30:00 » avec le décalage. */
function withOffset(localIso: string): string {
    return `${localIso}${OFFSET}`;
}

/** Fin du stage : le ji-geiko se termine à 16h, le passage de grades suit. */
const STAGE_END = "2026-11-28T16:30:00";
const GRADING_START = "2026-11-28T16:30:00";
const GRADING_END = "2026-11-28T18:30:00";
const COMPETITION_START = "2026-11-29T09:30:00";
const COMPETITION_END = "2026-11-29T18:00:00";

/** Enseignants qui encadrent le stage du samedi. */
const INSTRUCTORS = [
    { name: "Roger ARMAND", role: "Juniors & Adultes" },
    { name: "Marc RAGONA", role: "Jeunes" },
];

const ORGANIZER = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "kendo@asm-omnisports.com",
} as const;

const LOCATION = {
    "@type": "Place",
    name: EVENT.address.name,
    address: {
        "@type": "PostalAddress",
        streetAddress: EVENT.address.street,
        addressLocality: EVENT.address.city,
        postalCode: EVENT.address.postalCode,
        addressCountry: EVENT.address.country,
    },
} as const;

/**
 * Programme détaillé exposé à Google : les trois temps forts du week-end en
 * sous-événements, pour viser un encadré enrichi dans les résultats.
 */
const SUB_EVENTS = [
    {
        "@type": "Event",
        name: "Stage de kendo Kazan No Bushi",
        description:
            "Stage encadré par Roger ARMAND (Juniors & Adultes) et Marc RAGONA (Jeunes) : kihon et ji-geiko.",
        startDate: withOffset(EVENT.startDate),
        endDate: withOffset(STAGE_END),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: LOCATION,
        isAccessibleForFree: true,
        performer: INSTRUCTORS.map((person) => ({
            "@type": "Person",
            name: person.name,
        })),
    },
    {
        "@type": "Event",
        name: "Passage de grades — 1er au 3ème dan",
        description:
            "Passage de grade du 1er au 3ème dan, ouvert aux pratiquants inscrits au stage.",
        startDate: withOffset(GRADING_START),
        endDate: withOffset(GRADING_END),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: LOCATION,
        isAccessibleForFree: true,
    },
    {
        "@type": "Event",
        name: "Compétition de kendo — Jeunes, Femmes et Open",
        description:
            "Compétition individuelle et par équipes, toutes catégories confondues : Jeunes, Femmes et Open.",
        startDate: withOffset(COMPETITION_START),
        endDate: withOffset(COMPETITION_END),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: LOCATION,
        isAccessibleForFree: true,
    },
] as const;

/** Données structurées schema.org décrivant l'événement principal. */
export const EVENT_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: EVENT.name,
    description: EVENT.description,
    startDate: withOffset(EVENT.startDate),
    endDate: withOffset(EVENT.endDate),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    url: EVENT.url,
    image: [`${SITE_URL}/og-image.jpg`],
    inLanguage: "fr-FR",
    location: LOCATION,
    organizer: ORGANIZER,
    performer: INSTRUCTORS.map((person) => ({
        "@type": "Person",
        name: person.name,
        description: person.role,
    })),
    subEvent: SUB_EVENTS,
} as const;
