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
    warning?: string;
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
        warning:
            "La pause repas du samedi est courte : 30 minutes seulement. La buvette ouvre dès le matin, pour que chacun puisse prendre à manger avant midi et éviter l'attente à l'heure du repas.",
        events: [
            {
                time: "9h00",
                label: "Accueil & vérification des inscriptions",
                emphasis: "key",
            },
            { time: "10h – 12h", label: "Kihon", emphasis: "default" },
            { time: "12h – 12h30", label: "Pause repas", emphasis: "muted" },
            { time: "12h30 – 14h", label: "Kihon", emphasis: "default" },
            { time: "14h – 15h", label: "Ji-geiko", emphasis: "default" },
            {
                time: "16h",
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
            { time: "8h00", label: "Ouverture des portes", emphasis: "key" },
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
    { file: "painpaill.png", name: "Au Pain Paillasse" },
    { file: "Cam.png", name: "Clermont Auvergne Métropole" },
    { file: "CRKaura.png", name: "CRK Aura" },
    { file: "francekendo.png", name: "France Kendo", keepSize: true },
    { file: "maison_koji.png", name: "La Maison du Koji" },
    { file: "chaton.png", name: "Les Heures Qui Filent" },
    { file: "sooji.png", name: "Sooji" },
    { file: "sunfuckingLove.png", name: "SunfLover Graphisme" },
    { file: "tatsei.png", name: "Tatsei" },
    { file: "volvic.png", name: "Volvic", keepSize: true },
    { file: "wagaya.png", name: "Wagaya" },
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
 *
 * L'inscription n'a pas d'URL en dur : elle vient de la variable
 * d'environnement (voir `useRegistration`), et son libellé d'attente est
 * défini ci-dessous.
 */
export const REGISTRATION_LABEL = "HelloAsso";

/**
 * Texte affiché à la place du lien tant que l'URL d'inscription n'est pas
 * renseignée dans l'environnement.
 */
export const REGISTRATION_PENDING = "Ouverture des inscriptions — Bientôt";
export const EVENT_FACEBOOK_URL = "https://www.facebook.com/events/kazankendo";

export const GUIDE_LINKS: Record<"facebook" | "instagram", GuideLink> = {
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
export const REGISTRATION_DEADLINE = "25 novembre 2026";

/**
 * Démarche pour payer en espèces sur place : la demande se fait par e-mail
 * avant de remplir le formulaire HelloAsso. Le club garde ainsi la trace des
 * paiements à encaisser sur place.
 */
export const ONSITE_PAYMENT_NOTE = `Vous préférez payer en espèces sur place ? Écrivez-nous d'abord à ${CONTACT_EMAIL} avant le ${REGISTRATION_DEADLINE} : nous vous renvoyons un code de paiement sur place. Vous remplissez alors le formulaire HelloAsso avec ce code, puis vous réglez en espèces à votre arrivée. Le club dispose ainsi de la liste des personnes à encaisser sur place.`;

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
    "Frais d'inscription à régler en ligne sur HelloAsso, ou en espèces sur place avec un code de paiement (voir ci-dessous). Aucune inscription ne sera prise le jour même sans être passée par HelloAsso.",
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
    address: string;
    phone: string;
    url?: string;
    email?: string;
    /** Tarifs négociés pour la Kazan, libellé puis montant. */
    rates: Array<{ label: string; price: string }>;
    /** Taxe de séjour, rappelée quand elle n'est pas incluse dans les tarifs. */
    tax?: string;
    /** Comment obtenir le tarif négocié (code promo ou mention du club). */
    procedure: string;
    /** Complément tarifaire hors forfait (cas particuliers). */
    note?: string;
    closest?: boolean;
}

/**
 * Hôtels à tarif négocié pour l'édition 2026. La mention ou le code doit être
 * impérativement cité à la réservation pour que le tarif s'applique.
 */
export const HOTELS: GuideHotel[] = [
    {
        name: "Hôtel & Restaurant Le Gergovie",
        address: "25 allée du Petit Puy, 63170 Pérignat-lès-Sarliève",
        phone: "04 73 79 09 95",
        email: "commercial@hotel-legergovie.com",
        rates: [
            {
                label: "Nuitée single, petit déjeuner inclus",
                price: "120,00 €",
            },
            {
                label: "Nuitée double, petit déjeuner inclus",
                price: "130,00 €",
            },
        ],
        tax: "Taxe de séjour 2026 : 2,20 € par nuit et par personne.",
        procedure:
            "Pas de code promo : signalez « ASM KENDO » lors de la réservation.",
        note: "Le vendredi soir, chambre à 130,00 € hors petit déjeuner (16,90 € par personne) : soit 146,90 € pour une personne et 163,80 € pour deux.",
    },
    {
        name: "Holiday Inn Clermont-Ferrand Centre",
        address: "59 boulevard François Mitterrand, 63000 Clermont-Ferrand",
        phone: "04 73 17 48 48",
        email: "clermont@hiclermont.com",
        rates: [
            {
                label: "Chambre individuelle, petit déjeuner inclus",
                price: "75 €",
            },
            {
                label: "Chambre double ou twin, petits déjeuners inclus",
                price: "90 €",
            },
        ],
        tax: "Taxe de séjour : 2,20 € par personne et par nuit.",
        procedure:
            "Réservez auprès de la réception en mentionnant le code promotionnel BWKENDO2026.",
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

export interface Shop {
    name: string;
    /** Liste des activités, affichée ligne par ligne. */
    description: string[];
    file: string;
    url: string;
}

/** Artisans et boutiques présents pendant le week-end, par ordre alphabétique. */
export const SHOPS: Shop[] = [
    {
        name: "La Maison du Koji",
        description: ["Spécialités japonaises"],
        file: "maison_koji.png",
        url: "https://lamaisondukoji.com",
    },
    {
        name: "Les Heures Qui Filent",
        description: [
            "Créations en cuir faites main avec passion et amour",
            "Maroquinerie",
            "Commandes personnalisées",
            "Objets pour le Kendo",
            "Médailles sportives",
        ],
        file: "chaton.png",
        url: "https://lesheuresquifilent.com",
    },
    {
        name: "Tatsei",
        description: ["Entreprise française de matériel de kendo"],
        file: "tatsei.png",
        url: "https://store.tatsei.com",
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
