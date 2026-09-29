import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "./site";

export interface Highlight {
    icon: "academic-cap" | "shield-check" | "trophy";
    title: string;
    description: string;
}

export const HIGHLIGHTS: Highlight[] = [
    {
        icon: "academic-cap",
        title: "Stage",
        description:
            "Le samedi, deux stages concomitants animés par Roger ARMAND (Juniors & Adultes) et Marc RAGONA (Jeunes).",
    },
    {
        icon: "shield-check",
        title: "Passage de grade",
        description:
            "Le samedi soir, du 1er au 3ème dan. Une opportunité pour valider sa progression technique dans le cadre d'un événement régional.",
    },
    {
        icon: "trophy",
        title: "Compétition",
        description:
            "Le dimanche, les compétiteurs s'affrontent en individuel et par équipes, toutes catégories confondues.",
    },
];

export interface Category {
    name: string;
    details: string[];
}

export const CATEGORIES: Category[] = [
    {
        name: "Jeunes",
        details: ["Individuels", "Catégories par âge"],
    },
    {
        name: "Femmes",
        details: ["Équipes de 3", "Tous niveaux"],
    },
    {
        name: "Open",
        details: ["Équipes de 3", "Tous niveaux et mixte"],
    },
];

export interface CalloutItem {
    label: string;
    name?: string;
}

export type Emphasis = "key" | "default" | "muted";

export interface ScheduleEvent {
    time: string;
    label: string;
    detail?: string;
    emphasis: Emphasis;
}

export interface ScheduleDay {
    label: string;
    badge: string;
    callout: { title: string; items: CalloutItem[]; note?: string } | null;
    events: ScheduleEvent[];
    incomplete?: boolean;
}

export const SCHEDULE: ScheduleDay[] = [
    {
        label: "Samedi",
        badge: "Stage",
        callout: {
            title: "2 stages concomitants",
            items: [
                { label: "Juniors & Adultes — ", name: "Roger ARMAND" },
                { label: "Jeunes — ", name: "Marc RAGONA" },
            ],
        },
        events: [
            {
                time: "9h30",
                label: "Accueil & vérification des inscriptions",
                emphasis: "key",
            },
            { time: "11h – 13h", label: "Kihon", emphasis: "default" },
            { time: "13h – 13h30", label: "Pause repas", emphasis: "muted" },
            { time: "13h30 – 15h", label: "Kihon", emphasis: "default" },
            { time: "15h – 16h", label: "Ji-geiko", emphasis: "default" },
            {
                time: "16h30",
                label: "Passage de grades",
                detail: "1er à 3ème dan",
                emphasis: "key",
            },
        ],
    },
    {
        label: "Dimanche",
        badge: "Compétition",
        callout: {
            title: "3 compétitions",
            items: [
                { label: "Jeunes" },
                { label: "Femmes" },
                { label: "Open" },
            ],
            note: "Contrôle des passeports et des shinaïs pour tous les compétiteurs.",
        },
        events: [
            { time: "9h30", label: "Début des compétitions", emphasis: "key" },
        ],
        incomplete: true,
    },
];

export interface Partner {
    file: string;
    name: string;
    wide?: boolean;
    keepSize?: boolean;
}

export const PARTNERS: Partner[] = [
    {
        file: "asm-omnisports.png",
        name: "ASM Omnisports",
        wide: true,
        keepSize: true,
    },
    { file: "francekendo.png", name: "France Kendo", keepSize: true },
    { file: "CRKaura.png", name: "CRK Aura" },
    { file: "Cam.png", name: "Clermont Auvergne Métropole" },
    { file: "volvic.png", name: "Volvic", keepSize: true },
    { file: "sooji.png", name: "Sooji" },
    { file: "maison_koji.png", name: "La Maison du Koji" },
    { file: "wagaya.png", name: "Wagaya" },
    { file: "painpaill.png", name: "Au Pain Paillasse" },
    { file: "chaton.png", name: "Les Heures Qui Filent" },
    { file: "tatsei.png", name: "Tatsei" },
    { file: "sunfuckingLove.png", name: "Sunflower Graphisme" },
];

export interface ContactChannel {
    type: "email" | "instagram" | "facebook";
    label: string;
    href: string;
    external: boolean;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
    {
        type: "email",
        label: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        external: false,
    },
    {
        type: "instagram",
        label: "@asm_kendo",
        href: INSTAGRAM_URL,
        external: true,
    },
    {
        type: "facebook",
        label: "ASM Kendo",
        href: FACEBOOK_URL,
        external: true,
    },
];

/* -------------------------------------------------------------------------
 * Livret d'information (page /guide + export PDF via l'impression navigateur)
 * ---------------------------------------------------------------------- */

/** Phrase d'accueil, reprise telle quelle dans l'en-tête du livret. */
export const GUIDE_INTRO =
    "Vous trouverez dans ce livret tout ce qu'il faut savoir pour préparer votre week-end : programme détaillé, tarifs, passage de grade, catégories de la compétition, hébergement et contacts.";

export interface GuideLink {
    label: string;
    href: string;
    external: boolean;
}

/**
 * Les liens du livret ne peuvent pas être cliqués sur papier : l'URL complète
 * est affichée à côté du libellé par le composant.
 */
export const REGISTRATION_URL = "https://www.helloasso.com";
export const EVENT_FACEBOOK_URL = "https://www.facebook.com/events/kazankendo";

export const GUIDE_LINKS: Record<
    "registration" | "facebook" | "instagram",
    GuideLink
> = {
    registration: {
        label: "HelloAsso",
        href: REGISTRATION_URL,
        external: true,
    },
    facebook: {
        label: "Page Facebook de l'événement",
        href: EVENT_FACEBOOK_URL,
        external: true,
    },
    instagram: {
        label: "Instagram — @asm_kendo",
        href: INSTAGRAM_URL,
        external: true,
    },
};

/** Date limite des inscriptions, avant le passage de grade et la compétition. */
export const REGISTRATION_DEADLINE = "13 novembre 2026";

/** Rappel tarifaire au-dessus des tableaux. */
export const REGISTRATION_REMINDER =
    "Nous vous demandons de remplir un formulaire et de faire un paiement pour chaque participant individuellement.";

export const HELLOASSO_NOTE =
    "La plateforme HelloAsso vous suggère un don additionnel, entièrement facultatif. Vous n'êtes pas obligé de le faire lors de votre inscription.";

export interface PriceRow {
    label: string;
    oneDay: string;
    twoDays: string;
}

export const STAGE_PRICES: PriceRow[] = [
    { label: "Jeunes (poussins à juniors)", oneDay: "10 €", twoDays: "15 €" },
    { label: "Juniors et adultes", oneDay: "15 €", twoDays: "20 €" },
];

export interface GradePrice {
    grade: string;
    registration: string;
    validation: string;
}

export const GRADE_PRICES: GradePrice[] = [
    { grade: "1ᵉʳ dan", registration: "15 €", validation: "15 €" },
    { grade: "2ᵉ dan", registration: "25 €", validation: "25 €" },
    { grade: "3ᵉ dan", registration: "35 €", validation: "35 €" },
];

/** Pièces et démarches exigées avant l'inscription. */
export const REGISTRATION_REQUIREMENTS = [
    "Licence en cours de validité et certificat médical portant la mention « compétition » pour participer aux compétitions.",
    "Autorisation parentale pour les mineurs.",
    "Certificat de surclassement de moins de 3 mois pour les juniors engagés en catégorie adulte (équipe femme ou équipe mixte).",
    "Frais d'inscription au passage de grade à régler en ligne sur HelloAsso. Aucune inscription ne sera prise le jour même, sur place.",
    "Frais de validation du grade, dus en cas de réussite, à régler en espèces sur place.",
];

export interface AgeCategory {
    name: string;
    years: string;
}

/** Catégories individuelles, classées par année de naissance (saison 2026). */
export const AGE_CATEGORIES: AgeCategory[] = [
    { name: "Poussin (mixte)", years: "2019" },
    { name: "Samouraï (mixte)", years: "2017 / 2018" },
    { name: "Benjamin (mixte)", years: "2015 / 2016" },
    { name: "Minime (mixte)", years: "2013 / 2014" },
    { name: "Minime (fille)", years: "2013 / 2014" },
    { name: "Cadet (garçon)", years: "2010 / 2011 / 2012" },
    { name: "Cadette (fille)", years: "2010 / 2011 / 2012" },
    { name: "Junior (garçon)", years: "2007 / 2008 / 2009" },
    { name: "Junior (fille)", years: "2007 / 2008 / 2009" },
];

export interface TeamCategory {
    name: string;
    details: string;
}

export const TEAM_CATEGORIES: TeamCategory[] = [
    {
        name: "Junior et adulte (femme)",
        details: "Équipes de 3 — naissance en 2009 et avant",
    },
    {
        name: "Junior et adulte (mixte)",
        details: "Équipes de 3 — naissance en 2009 et avant",
    },
];

/** Consignes matériel et accueil, valables pour les compétiteurs. */
export const COMPETITION_NOTES = [
    "Contrôle des passeports et des shinaïs pour tous les compétiteurs.",
    "Une équipe de trois combattants peut être complétée par un remplaçant.",
];

export interface GuideHotel {
    name: string;
    price: string;
    address: string;
    phone: string;
    url: string;
    closest?: boolean;
}

export const HOTELS: GuideHotel[] = [
    {
        name: "Hôtel de L'Artière",
        price: "à partir de 59 €",
        address: "75 avenue de la Libération, 63122 Ceyrat",
        phone: "+33 4 73 61 43 02",
        url: "https://www.hotel-artiere.com",
        closest: true,
    },
    {
        name: "The Originals Boutique — Hôtel Le Marmotel",
        price: "à partir de 69 €",
        address: "18 avenue Winston Churchill, 63000 Clermont-Ferrand",
        phone: "+33 4 73 26 24 55",
        url: "https://www.hotel-marmotel.com",
    },
    {
        name: "Kyriad ECO — Clermont-Ferrand Estaing",
        price: "à partir de 53 €",
        address: "16 place Lucie et Raymond Aubrac, 63100 Clermont-Ferrand",
        phone: "+33 4 15 40 08 68",
        url: "https://www.kyriad.com",
    },
    {
        name: "Campanile Clermont-Ferrand Centre",
        price: "à partir de 55 €",
        address: "120 avenue de la République, 63100 Clermont-Ferrand",
        phone: "+33 4 15 40 05 76",
        url: "https://www.campanile.com",
    },
    {
        name: "Kyriad Clermont-Ferrand Sud — La Pardieu",
        price: "à partir de 71 €",
        address: "9 rue de l'Éminée, 63000 Clermont-Ferrand",
        phone: "+33 4 73 28 24 24",
        url: "https://www.kyriad.com",
    },
    {
        name: "Hôtel Mercure Clermont-Ferrand Jaude",
        price: "à partir de 115 €",
        address: "1 avenue Julien, 63000 Clermont-Ferrand",
        phone: "+33 4 63 66 21 00",
        url: "https://all.accor.com",
    },
];

/** Ce qui attend les visiteurs en dehors des shiaijos. */
export const SERVICES = [
    {
        title: "La buvette",
        description:
            "Sandwichs et boissons tout au long du week-end. Paiements en espèces ou par carte bancaire.",
    },
    {
        title: "Le repas des arbitres",
        description:
            "Un bento préparé par notre partenaire Sooji est offert le midi aux arbitres.",
    },
    {
        title: "Parking et accessibilité",
        description:
            "Parking gratuit à l'entrée de l'Artenium. Le gymnase dispose d'un accès handicapé.",
    },
];

/** Artisans et boutiques présents pendant le week-end. */
export const SHOPS = [
    {
        name: "Les Heures Qui Filent",
        description: "Tsuba, chichikawa, accessoires en cuir",
    },
    {
        name: "La Maison du Koji",
        description: "Spécialités japonaises",
    },
    {
        name: "Tatsei",
        description: "Entreprise française de matériel de kendo",
    },
];

export const GUIDE_CLOSING =
    "Au plaisir de vous accueillir cette année sur les shiaijos.";

export const HERO_PHRASES = [
    "Affûtage des shinai en cours...",
    "Les arbitres révisent les règlements...",
    "Les shiaijos sont en cours d'installation...",
    "Saint-Nectaire en cours d'affinage...",
    "Les inscriptions sont en cours de traitement...",
    "Les plannings de poules sont en préparation...",
    "Les sensei préparent les derniers entraînements...",
    "Les trophées attendent leurs futurs champions...",
];
