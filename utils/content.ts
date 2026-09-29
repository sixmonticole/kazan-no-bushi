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
