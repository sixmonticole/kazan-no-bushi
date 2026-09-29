<script setup lang="ts">
import {
    AGE_CATEGORIES,
    COMPETITION_NOTES,
    CONTACT_CHANNELS,
    GRADE_PRICES,
    GUIDE_CLOSING,
    GUIDE_INTRO,
    GUIDE_LINKS,
    HELLOASSO_NOTE,
    HOTELS,
    PARTNERS,
    REGISTRATION_DEADLINE,
    REGISTRATION_REMINDER,
    REGISTRATION_REQUIREMENTS,
    SCHEDULE,
    SERVICES,
    SHOPS,
    STAGE_PRICES,
    TEAM_CATEGORIES,
} from "~/utils/content";
import {
    CONTACT_EMAIL,
    EDITION,
    EDITION_YEAR,
    EVENT,
    SITE_NAME,
} from "~/utils/site";

useSiteSeo({
    title: `Livret d'information — ${SITE_NAME} ${EDITION_YEAR}`,
    description: GUIDE_INTRO,
    path: "/guide",
});

/** Affiche l'URL complète d'un lien externe (utile une fois le livret imprimé). */
const PROTOCOL_PATTERN = /^https?:\/\//u;
const TRAILING_SLASH_PATTERN = /\/$/u;

function displayUrl(href: string): string {
    return href
        .replace(PROTOCOL_PATTERN, "")
        .replace(TRAILING_SLASH_PATTERN, "");
}

/** Le programme du week-end est une liste à puces sur papier, pas une timeline. */
const programme = SCHEDULE.map((day) => ({
    label: day.label,
    badge: day.badge,
    callout: day.callout,
    events: day.events.map((event) => ({
        time: event.time,
        label: event.label,
        detail: event.detail,
    })),
}));

/** Date longue affichée en clair sur la couverture. */
const COVER_DATE = "28 & 29 novembre 2026";

/**
 * Lecteur de livret : une page A4 à la fois. La page affichée est mise à
 * l'échelle pour tenir dans la fenêtre, comme un lecteur PDF.
 */
const TOTAL_PAGES = 8;
const currentPage = ref(1);

/** Échelle appliquée aux pages à l'écran (l'impression garde le format 1:1). */
const pageScale = ref(1);

function goTo(page: number): void {
    currentPage.value = Math.min(Math.max(page, 1), TOTAL_PAGES);
}

function nextPage(): void {
    goTo(currentPage.value + 1);
}

function previousPage(): void {
    goTo(currentPage.value - 1);
}

/** A4 portrait en pixels CSS : 210mm × 297mm à 96 dpi. */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/** Vrai plein écran : masque la barre d'outils et fait respirer la page. */
const isFullscreen = ref(false);

/**
 * L'échelle est calculée sur l'espace réellement libre sous la barre d'outils,
 * pas sur une marge forfaitaire : sinon la page reste petite alors que la
 * fenêtre est grande.
 */
function fitToViewport(): void {
    const toolbar = document.querySelector(".guide-toolbar");
    const toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;
    const navWidth = isFullscreen.value ? 0 : 78;
    const verticalPadding = isFullscreen.value ? 24 : 80;

    const availableHeight =
        window.innerHeight - toolbarHeight - verticalPadding;
    const availableWidth = window.innerWidth - navWidth - 32;

    pageScale.value = Math.min(
        1,
        availableHeight / A4_HEIGHT_PX,
        availableWidth / A4_WIDTH_PX,
    );
}

function toggleFullscreen(): void {
    isFullscreen.value = !isFullscreen.value;

    if (document.fullscreenElement) {
        void document.exitFullscreen();
    } else {
        void document.documentElement.requestFullscreen?.();
    }

    nextTick(fitToViewport);
}

/** Le navigateur peut sortir du plein écran seul (Échap) : on se resynchronise. */
function onFullscreenChange(): void {
    isFullscreen.value = document.fullscreenElement !== null;
    nextTick(fitToViewport);
}

/** Le PDF est pré-généré dans `public/` par `scripts/build-pdf.ts`. */
const PDF_URL = "/kazan-no-bushi-2026.pdf";

function onKeydown(event: KeyboardEvent): void {
    if (event.key === "ArrowRight") {
        nextPage();
    } else if (event.key === "ArrowLeft") {
        previousPage();
    } else if (event.key === "Escape" && isFullscreen.value) {
        isFullscreen.value = false;
        nextTick(fitToViewport);
    } else if (event.key.toLowerCase() === "f") {
        toggleFullscreen();
    }
}

onMounted(() => {
    fitToViewport();
    window.addEventListener("resize", fitToViewport);
    window.addEventListener("keydown", onKeydown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", fitToViewport);
    window.removeEventListener("keydown", onKeydown);
    document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
    <div class="guide-page" :class="{ 'is-fullscreen': isFullscreen }">
        <!-- Barre d'actions, invisible à l'impression -->
        <div class="guide-toolbar">
            <div class="guide-toolbar__inner">
                <NuxtLink to="/" class="guide-toolbar__back">
                    &#8592; Retour au site
                </NuxtLink>
                <p class="guide-toolbar__counter" aria-live="polite">
                    Page {{ currentPage }} / {{ TOTAL_PAGES }}
                </p>
                <div class="guide-toolbar__actions">
                    <button
                        type="button"
                        class="guide-toolbar__button"
                        :aria-pressed="isFullscreen"
                        @click="toggleFullscreen"
                    >
                        {{ isFullscreen ? "Quitter" : "Plein écran" }}
                    </button>
                    <a
                        class="guide-toolbar__print"
                        :href="PDF_URL"
                        download="kazan-no-bushi-2026.pdf"
                    >
                        Télécharger le PDF
                    </a>
                </div>
            </div>
        </div>

        <!-- Croix de fermeture, visible uniquement en plein écran -->
        <button
            v-if="isFullscreen"
            type="button"
            class="guide-close"
            aria-label="Quitter le plein écran"
            @click="toggleFullscreen"
        >
            &#10005;
        </button>

        <div class="guide-viewer">
            <button
                type="button"
                class="guide-nav guide-nav--prev"
                :disabled="currentPage === 1"
                aria-label="Page précédente"
                @click="previousPage"
            >
                &#8592;
            </button>

            <div class="guide-stage" :style="{ '--page-scale': pageScale }">
                <div class="guide-book">
                    <!-- Page 1 — couverture illustrée -->
                    <section
                        v-show="currentPage === 1"
                        class="sheet sheet--cover"
                        :class="{ 'sheet--hidden-print': currentPage !== 1 }"
                    >
                        <img
                            src="/fond-mila.jpeg"
                            alt=""
                            class="cover__bg"
                            width="1960"
                            height="1310"
                        />
                        <div class="cover__veil" />

                        <div class="cover__content">
                            <p class="cover__kicker">ASM Kendo</p>
                            <h1 class="cover__title">Kazan No Bushi</h1>
                            <p class="cover__edition">
                                {{ EDITION }} — {{ EDITION_YEAR }}
                            </p>
                            <p class="cover__date">
                                {{ COVER_DATE }} &middot; Arténium, Ceyrat
                            </p>
                            <p class="cover__subtitle">Guide et informations</p>

                            <p class="cover__intro">{{ GUIDE_INTRO }}</p>
                        </div>
                    </section>

                    <!-- Page 2 — programme -->
                    <section v-show="currentPage === 2" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">Programme du week-end</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <p class="sheet__lead">
                            L'Arténium ouvre ses portes dès 9h30 le samedi. Les
                            horaires ci-dessous sont donnés à titre indicatif et
                            peuvent évoluer jusqu'au jour J.
                        </p>

                        <div
                            v-for="day in programme"
                            :key="day.label"
                            class="day"
                        >
                            <header class="day__header">
                                <h3>{{ day.label }}</h3>
                                <span class="badge">{{ day.badge }}</span>
                            </header>

                            <div v-if="day.callout" class="callout">
                                <p class="callout__title">
                                    {{ day.callout.title }}
                                </p>
                                <ul>
                                    <li
                                        v-for="item in day.callout.items"
                                        :key="item.label"
                                    >
                                        {{ item.label
                                        }}<strong v-if="item.name">{{
                                            item.name
                                        }}</strong>
                                    </li>
                                </ul>
                                <p
                                    v-if="day.callout.note"
                                    class="callout__note"
                                >
                                    {{ day.callout.note }}
                                </p>
                            </div>

                            <ul class="schedule">
                                <li
                                    v-for="event in day.events"
                                    :key="event.time"
                                >
                                    <span class="schedule__time">{{
                                        event.time
                                    }}</span>
                                    <span class="schedule__label">
                                        {{ event.label }}
                                        <em v-if="event.detail">{{
                                            event.detail
                                        }}</em>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- Page 3 — tarifs et inscription -->
                    <section v-show="currentPage === 3" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">Tarifs et inscription</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <p class="sheet__lead">
                            Inscriptions en ligne, sur notre page HelloAsso,
                            avant le
                            {{ REGISTRATION_DEADLINE }}. Aucune inscription ne
                            sera prise le jour même, sur place.
                        </p>

                        <table class="table">
                            <caption>
                                Stage
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Catégorie</th>
                                    <th scope="col">1 jour</th>
                                    <th scope="col">2 jours</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in STAGE_PRICES"
                                    :key="row.label"
                                >
                                    <th scope="row">{{ row.label }}</th>
                                    <td>{{ row.oneDay }}</td>
                                    <td>{{ row.twoDays }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 class="block__title">
                            À prévoir avant de vous inscrire
                        </h3>
                        <ul class="checks">
                            <li
                                v-for="item in REGISTRATION_REQUIREMENTS"
                                :key="item"
                            >
                                {{ item }}
                            </li>
                        </ul>

                        <div class="note">
                            <p>{{ REGISTRATION_REMINDER }}</p>
                            <p>{{ HELLOASSO_NOTE }}</p>
                        </div>

                        <p class="link-line">
                            <span class="eyebrow">Inscription en ligne</span>
                            <a :href="GUIDE_LINKS.registration.href">
                                {{ GUIDE_LINKS.registration.label }}
                            </a>
                            <span class="link-line__url">
                                {{ displayUrl(GUIDE_LINKS.registration.href) }}
                            </span>
                        </p>
                    </section>

                    <!-- Page 4 — passage de grade -->
                    <section
                        v-show="currentPage === 4"
                        class="sheet sheet--spacious"
                    >
                        <header class="sheet__header">
                            <h2 class="sheet__title">Passage de grade</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <p class="sheet__lead">
                            Le samedi soir, du 1ᵉʳ au 3ᵉ dan. Frais
                            d'inscription à régler en ligne, frais de validation
                            en espèces sur place en cas de réussite.
                        </p>

                        <table class="table">
                            <caption>
                                Frais de passage de grade
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Grade</th>
                                    <th scope="col">Inscription</th>
                                    <th scope="col">Validation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in GRADE_PRICES"
                                    :key="row.grade"
                                >
                                    <th scope="row">{{ row.grade }}</th>
                                    <td>{{ row.registration }}</td>
                                    <td>{{ row.validation }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 class="block__title">Bon à savoir</h3>
                        <ul class="checks">
                            <li>
                                Le passage de grade se déroule le samedi soir,
                                après la fin du stage.
                            </li>
                            <li>
                                Les résultats sont annoncés sur place, puis
                                publiés par le club dans les jours qui suivent.
                            </li>
                            <li>
                                Prévoyez votre licence et votre passeport
                                sportif le jour de l'examen.
                            </li>
                        </ul>
                    </section>

                    <!-- Page 5 — catégories -->
                    <section v-show="currentPage === 5" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">
                                Catégories de la compétition
                            </h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <p class="sheet__lead">
                            Les catégories individuelles sont déterminées par
                            l'année de naissance. Un certificat de surclassement
                            de moins de 3 mois est exigé pour les juniors
                            engagés en catégorie adulte.
                        </p>

                        <h3 class="block__title">Individuels</h3>
                        <ul class="age-list">
                            <li
                                v-for="category in AGE_CATEGORIES"
                                :key="category.name"
                            >
                                <span>{{ category.name }}</span>
                                <span class="age-list__years">{{
                                    category.years
                                }}</span>
                            </li>
                        </ul>

                        <h3 class="block__title">Équipes</h3>
                        <ul class="age-list">
                            <li
                                v-for="category in TEAM_CATEGORIES"
                                :key="category.name"
                            >
                                <span>{{ category.name }}</span>
                                <span class="age-list__years">{{
                                    category.details
                                }}</span>
                            </li>
                        </ul>

                        <ul class="checks checks--tight">
                            <li v-for="item in COMPETITION_NOTES" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </section>

                    <!-- Page 6 — lieu et hébergement -->
                    <section v-show="currentPage === 6" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">Le lieu</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <address class="venue">
                            <strong>{{ EVENT.address.name }}</strong>
                            {{ EVENT.address.street }}<br />
                            {{ EVENT.address.postalCode }}
                            {{ EVENT.address.city }}
                        </address>
                        <ul class="checks checks--tight">
                            <li>Parking gratuit à l'entrée de l'Arténium.</li>
                            <li>Gymnase adapté avec un accès handicapé.</li>
                        </ul>

                        <h2 class="sheet__title sheet__title--spaced">
                            Hébergement
                        </h2>
                        <p class="sheet__lead">
                            Prix indicatifs, à confirmer auprès des
                            établissements. L'hôtel de L'Artière est le plus
                            proche du gymnase.
                        </p>

                        <ul class="hotels">
                            <li v-for="hotel in HOTELS" :key="hotel.name">
                                <p class="hotels__name">
                                    {{ hotel.name }}
                                    <span
                                        v-if="hotel.closest"
                                        class="badge badge--sm"
                                    >
                                        Le plus proche
                                    </span>
                                </p>
                                <p class="hotels__price">{{ hotel.price }}</p>
                                <p class="hotels__address">
                                    {{ hotel.address }}
                                </p>
                                <p class="hotels__contact">
                                    {{ hotel.phone }} &middot;
                                    <span class="hotels__url">
                                        {{ displayUrl(hotel.url) }}
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </section>

                    <!-- Page 7 — services, artisans, contacts -->
                    <section v-show="currentPage === 7" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">Sur place</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <dl class="services">
                            <div
                                v-for="service in SERVICES"
                                :key="service.title"
                            >
                                <dt>{{ service.title }}</dt>
                                <dd>{{ service.description }}</dd>
                            </div>
                        </dl>

                        <h2 class="sheet__title sheet__title--spaced">
                            Artisans et boutiques
                        </h2>
                        <dl class="services">
                            <div v-for="shop in SHOPS" :key="shop.name">
                                <dt>{{ shop.name }}</dt>
                                <dd>{{ shop.description }}</dd>
                            </div>
                        </dl>

                        <h2 class="sheet__title sheet__title--spaced">
                            Nous contacter
                        </h2>
                        <p class="sheet__lead">{{ GUIDE_CLOSING }}</p>
                        <ul class="contacts">
                            <li>
                                <span class="eyebrow">Par e-mail</span>
                                <a :href="`mailto:${CONTACT_EMAIL}`">{{
                                    CONTACT_EMAIL
                                }}</a>
                            </li>
                            <li
                                v-for="channel in CONTACT_CHANNELS.slice(1)"
                                :key="channel.type"
                            >
                                <span class="eyebrow">
                                    {{
                                        channel.type === "instagram"
                                            ? "Instagram"
                                            : "Facebook"
                                    }}
                                </span>
                                <a :href="channel.href">{{ channel.label }}</a>
                                <span class="link-line__url">
                                    {{ displayUrl(channel.href) }}
                                </span>
                            </li>
                            <li>
                                <span class="eyebrow">Inscriptions</span>
                                <a :href="GUIDE_LINKS.registration.href">
                                    {{ GUIDE_LINKS.registration.label }}
                                </a>
                                <span class="link-line__url">
                                    {{
                                        displayUrl(
                                            GUIDE_LINKS.registration.href,
                                        )
                                    }}
                                </span>
                            </li>
                        </ul>
                    </section>

                    <!-- Page 8 — partenaires -->
                    <section v-show="currentPage === 8" class="sheet">
                        <header class="sheet__header">
                            <h2 class="sheet__title">Nos partenaires</h2>
                            <img
                                src="/logo-asm.png"
                                alt="ASM Kendo"
                                class="sheet__logo"
                                width="225"
                                height="225"
                            />
                        </header>
                        <p class="sheet__lead">Merci pour leur soutien.</p>

                        <ul class="partners">
                            <li v-for="partner in PARTNERS" :key="partner.file">
                                <img
                                    :src="`/partenaires/${partner.file}`"
                                    :alt="partner.name"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span class="partners__name">
                                    {{ partner.name }}
                                </span>
                            </li>
                        </ul>

                        <p class="closing-banner">{{ GUIDE_CLOSING }}</p>

                        <footer class="colophon">
                            {{ SITE_NAME }} — {{ EDITION }} — 28 &amp; 29
                            novembre 2026
                        </footer>
                    </section>
                </div>
            </div>

            <button
                type="button"
                class="guide-nav guide-nav--next"
                :disabled="currentPage === TOTAL_PAGES"
                aria-label="Page suivante"
                @click="nextPage"
            >
                &#8594;
            </button>
        </div>
    </div>
</template>

<style>
/* ---------------------------------------------------------------------------
 * Le livret reprend la charte du site mais s'affiche sur fond crème plein
 * écran : il ne dépend ni de ScrollSmoother ni du fond navy de la page unique.
 * ------------------------------------------------------------------------ */
.guide-page {
    --guide-ink: #1b2a5b;
    --guide-cream: #f8f1e3;
    --guide-navy: #141f45;
    --guide-orange: #e8a45c;
    --guide-bronze: #a8702c;
    --guide-paper: #fffdf8;
    font-family: var(--font-zen, system-ui, sans-serif);
    color: var(--guide-ink);
    background: var(--guide-cream);
    min-height: 100vh;
}

/* Barre d'outils */
.guide-toolbar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--guide-navy);
    border-bottom: 1px solid rgba(221, 229, 240, 0.14);
}

.guide-toolbar__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.guide-toolbar__back {
    color: rgba(221, 229, 240, 0.75);
    font-size: 13px;
    text-decoration: none;
}

.guide-toolbar__back:hover {
    color: #fff;
}

.guide-toolbar__counter {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(221, 229, 240, 0.7);
    font-variant-numeric: tabular-nums;
}

.guide-toolbar__print {
    border: 0;
    border-radius: 999px;
    background: var(--guide-orange);
    color: var(--guide-navy);
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    cursor: pointer;
}

.guide-toolbar__print:hover {
    background: #f3c089;
}

.guide-toolbar__actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.guide-toolbar__button {
    border: 1px solid rgba(221, 229, 240, 0.3);
    border-radius: 999px;
    background: transparent;
    color: rgba(221, 229, 240, 0.85);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    padding: 9px 18px;
    cursor: pointer;
}

.guide-toolbar__button:hover {
    border-color: var(--guide-orange);
    color: #fff;
}

/* Plein écran : plus de barre d'outils, la page occupe tout l'espace. */
.is-fullscreen .guide-toolbar {
    display: none;
}

.is-fullscreen .guide-viewer {
    padding: 12px 16px;
}

.is-fullscreen .guide-toolbar__counter {
    display: none;
}

/* Croix de fermeture du plein écran, posée en haut à droite. */
.guide-close {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 40;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(221, 229, 240, 0.35);
    background: rgba(20, 31, 69, 0.72);
    color: #fff;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    transition: background 0.2s ease;
}

.guide-close:hover {
    background: var(--guide-orange);
    color: var(--guide-navy);
}

/* Lecteur de livret */
.guide-viewer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 24px 16px 32px;
}

.guide-nav {
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(27, 42, 91, 0.2);
    background: var(--guide-paper);
    color: var(--guide-ink);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    transition:
        background 0.2s ease,
        transform 0.2s ease;
}

.guide-nav:hover:not(:disabled) {
    background: var(--guide-orange);
    transform: translateY(-1px);
}

.guide-nav:disabled {
    opacity: 0.32;
    cursor: default;
}

/* La scène réserve la place de la page mise à l'échelle. */
.guide-stage {
    --page-scale: 1;
    width: calc(794px * var(--page-scale));
    height: calc(1123px * var(--page-scale));
}

.guide-book {
    width: 794px;
    height: 1123px;
    transform: scale(var(--page-scale));
    transform-origin: top left;
}

/* Feuilles A4 : ratio strict 1:1,414 (210 × 297 mm). */
.sheet {
    position: relative;
    width: 794px;
    height: 1123px;
    padding: 44px 52px;
    background: var(--guide-paper);
    border-radius: 14px;
    box-shadow: 0 24px 50px -30px rgba(6, 12, 33, 0.5);
    font-size: 15px;
    line-height: 1.62;
    overflow: hidden;
}

.sheet__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--guide-orange);
}

.sheet__logo {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    flex-shrink: 0;
}

.sheet__title {
    font-family: var(--font-brush, cursive);
    font-size: 32px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--guide-navy);
    padding-top: 6px;
}

.sheet__title--spaced {
    margin-top: 46px;
}

.sheet__lead {
    margin-top: 16px;
    color: rgba(27, 42, 91, 0.78);
}

.eyebrow {
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--guide-bronze);
}

.block__title {
    margin-top: 26px;
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--guide-bronze);
}

/* Couverture illustrée : elle remplit toute la page A4. */
.sheet--cover {
    padding: 0;
    background: var(--guide-navy);
}

/* Pages peu remplies : on étire les blocs pour occuper la page. */
.sheet--spacious {
    display: flex;
    flex-direction: column;
}

.sheet--spacious .table {
    margin-top: 26px;
}

.sheet--spacious .table th,
.sheet--spacious .table td {
    padding: 20px 14px;
}

.sheet--spacious .sheet__lead {
    margin-top: 20px;
}

.cover__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.cover__veil {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(20, 31, 69, 0.72) 0%,
        rgba(20, 31, 69, 0.45) 38%,
        rgba(20, 31, 69, 0.85) 100%
    );
}

.cover__content {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 56px 56px 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: var(--guide-cream);
}

.cover__kicker {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--guide-orange);
}

.cover__title {
    margin-top: 10px;
    font-family: var(--font-title, "Protest Revolution"), sans-serif;
    font-size: clamp(44px, 8vw, 76px);
    line-height: 0.98;
    letter-spacing: 0.02em;
    color: #fff;
    text-shadow: 0 2px 0 rgba(20, 31, 69, 0.5);
}

.cover__edition {
    margin-top: 16px;
    font-family: var(--font-brush, cursive);
    font-size: 24px;
    color: var(--guide-orange);
}

.cover__date {
    margin-top: 6px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--guide-ice, #dde5f0);
}

.cover__subtitle {
    margin-top: 14px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(248, 241, 227, 0.65);
}

.cover__intro {
    margin-top: 18px;
    max-width: 58ch;
    font-size: 14px;
    color: rgba(248, 241, 227, 0.85);
}

/* Programme */
.day + .day {
    margin-top: 44px;
}

.day__header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-top: 36px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(27, 42, 91, 0.14);
}

.day__header h3 {
    font-family: var(--font-brush, cursive);
    font-size: 29px;
    color: var(--guide-ink);
}

.badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--guide-navy);
    background: var(--guide-orange);
    border-radius: 999px;
    padding: 4px 12px;
}

.badge--sm {
    font-size: 9px;
    padding: 2px 8px;
    margin-left: 8px;
    vertical-align: middle;
}

.callout {
    margin-top: 16px;
    padding: 16px 18px;
    border-radius: 10px;
    background: var(--guide-navy);
    color: #f1e9da;
}

.callout__title {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--guide-orange);
    margin-bottom: 8px;
}

.callout ul {
    margin: 0;
    padding-left: 18px;
}

.callout li {
    margin-bottom: 3px;
}

.callout__note {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(232, 164, 92, 0.3);
    font-size: 13px;
    color: rgba(241, 233, 218, 0.8);
}

.schedule {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
}

.schedule li {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 16px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(27, 42, 91, 0.08);
}

.schedule__time {
    font-weight: 900;
    font-variant-numeric: tabular-nums;
    color: var(--guide-ink);
}

.schedule__label em {
    display: block;
    font-size: 12.5px;
    font-style: normal;
    font-weight: 700;
    color: var(--guide-bronze);
}

/* Tableaux */
.table {
    width: 100%;
    margin-top: 18px;
    border-collapse: collapse;
}

.table caption {
    text-align: left;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--guide-bronze);
    padding-bottom: 8px;
}

.table th,
.table td {
    text-align: left;
    padding: 13px 14px;
    border-bottom: 1px solid rgba(27, 42, 91, 0.12);
}

.table thead th {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(27, 42, 91, 0.6);
    border-bottom: 2px solid rgba(27, 42, 91, 0.16);
}

.table tbody th {
    font-weight: 700;
}

.table tbody td {
    font-variant-numeric: tabular-nums;
}

/* Listes */
.checks,
.age-list,
.hotels,
.contacts,
.partners {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
}

.checks li {
    position: relative;
    padding-left: 22px;
    margin-bottom: 11px;
}

.checks li::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--guide-orange);
}

.checks--tight li {
    margin-bottom: 8px;
}

.age-list li {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(27, 42, 91, 0.1);
}

.age-list li:first-child {
    border-top: 1px solid rgba(27, 42, 91, 0.1);
}

.age-list__years {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--guide-bronze);
}

.note {
    margin-top: 22px;
    padding: 14px 18px;
    border-left: 3px solid var(--guide-orange);
    background: rgba(232, 164, 92, 0.1);
    font-size: 13.5px;
}

.note p + p {
    margin-top: 8px;
}

.link-line {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.link-line__url {
    font-size: 12px;
    color: rgba(27, 42, 91, 0.55);
}

/* Lieu et hôtels */
.venue {
    margin-top: 14px;
    font-style: normal;
}

.venue strong {
    display: block;
    font-size: 17px;
    font-weight: 900;
    color: var(--guide-ink);
}

.hotels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.hotels li {
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid rgba(27, 42, 91, 0.12);
    background: var(--guide-cream);
}

.hotels__name {
    font-weight: 900;
    color: var(--guide-ink);
}

.hotels__price {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--guide-bronze);
    margin-top: 2px;
}

.hotels__address,
.hotels__contact {
    font-size: 12.5px;
    margin-top: 6px;
    color: rgba(27, 42, 91, 0.72);
}

.hotels__url {
    word-break: break-all;
}

/* Services et artisans */
.services {
    margin: 16px 0 0;
}

.services > div {
    padding: 12px 0;
    border-bottom: 1px solid rgba(27, 42, 91, 0.1);
}

.services dt {
    font-weight: 900;
    color: var(--guide-ink);
}

.services dd {
    margin: 2px 0 0;
    color: rgba(27, 42, 91, 0.78);
}

/* Contacts */
.contacts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 24px;
}

.contacts li {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.contacts a {
    color: var(--guide-ink);
    font-weight: 700;
    text-decoration-color: var(--guide-orange);
    text-underline-offset: 3px;
}

/* Partenaires */
.partners {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

.partners li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 96px;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid rgba(27, 42, 91, 0.1);
    background: #fff;
}

.partners img {
    max-width: 100%;
    max-height: 54px;
    object-fit: contain;
}

.partners__name {
    font-size: 10px;
    text-align: center;
    color: rgba(27, 42, 91, 0.6);
}

.colophon {
    margin-top: 32px;
    padding-top: 14px;
    border-top: 2px solid var(--guide-orange);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(27, 42, 91, 0.6);
}

/* Bandeau de clôture, comme le livret papier. */
.closing-banner {
    margin-top: 30px;
    padding: 16px 22px;
    border-radius: 14px;
    background: var(--guide-orange);
    color: var(--guide-navy);
    font-size: 16px;
    font-weight: 900;
    text-align: center;
}

@media (max-width: 700px) {
    .guide-viewer {
        gap: 8px;
        padding: 20px 8px 32px;
    }

    .guide-nav {
        width: 38px;
        height: 38px;
        font-size: 15px;
    }

    .schedule li {
        grid-template-columns: 1fr;
        gap: 2px;
    }

    .hotels,
    .contacts,
    .partners {
        grid-template-columns: 1fr;
    }
}

/* ---------------------------------------------------------------------------
 * Impression : toutes les pages A4 à la suite, sans le lecteur ni la barre
 * d'outils. On neutralise la mise à l'échelle de l'écran et le `v-show`.
 * ------------------------------------------------------------------------ */
@page {
    size: A4 portrait;
    margin: 0;
}

@media print {
    .guide-toolbar,
    .guide-nav {
        display: none;
    }

    .guide-page {
        background: #fff;
        min-height: 0;
    }

    .guide-viewer {
        display: block;
        padding: 0;
    }

    .guide-stage {
        width: auto;
        height: auto;
    }

    .guide-book {
        width: auto;
        height: auto;
        transform: none;
    }

    .sheet {
        display: block !important;
        width: 210mm;
        height: 296mm;
        padding: 14mm 12mm;
        border-radius: 0;
        box-shadow: none;
        background: #fff;
        font-size: 11pt;
        break-after: page;
        page-break-after: always;
        overflow: hidden;
    }

    .sheet--cover {
        padding: 0;
        color: #fff;
    }

    .cover__content {
        padding: 20mm 16mm;
    }

    .sheet:last-child {
        break-after: auto;
        page-break-after: auto;
    }

    .sheet__title {
        font-size: 22pt;
    }

    .sheet__logo {
        width: 44px;
        height: 44px;
    }

    .closing-banner,
    .cover__veil,
    .cover__bg,
    .hotels li,
    .partners li,
    .note,
    .callout {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }

    .closing-banner,
    .hotels li,
    .partners li,
    .note,
    .callout {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    a {
        color: var(--guide-ink);
        text-decoration: none;
    }
}
</style>
