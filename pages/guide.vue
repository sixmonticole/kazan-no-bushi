<script setup lang="ts">
import type { ScheduleDay } from "~/utils/content";
import {
    AGE_CATEGORIES,
    GRADE_PRICES,
    GUIDE_INTRO,
    HOTELS,
    PARTNERS,
    SCHEDULE,
    SERVICES,
    SHOPS,
    STAGE_PRICES,
    TEAM_CATEGORIES,
} from "~/utils/content";
import { EDITION_YEAR, SITE_NAME } from "~/utils/site";

useSiteSeo({
    title: `Livret d'information — ${SITE_NAME} ${EDITION_YEAR}`,
    description: GUIDE_INTRO,
    path: "/guide",
});

/** Le programme du week-end est une liste à puces sur papier, pas une timeline. */
const programme: ScheduleDay[] = SCHEDULE.map((day) => ({
    label: day.label,
    badge: day.badge,
    callout: day.callout,
    events: day.events.map((event) => ({
        time: event.time,
        label: event.label,
        detail: event.detail,
        emphasis: event.emphasis,
    })),
}));

/**
 * Lecteur de livret : une page A4 à la fois. La page affichée est mise à
 * l'échelle pour tenir dans la fenêtre, comme un lecteur PDF.
 */
const TOTAL_PAGES = 8;
const currentPage = ref(1);

/** Échelle appliquée aux pages à l'écran (l'impression garde le format 1:1). */
const pageScale = ref(1);

/** A4 portrait en pixels CSS : 210mm × 297mm à 96 dpi. */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/** Vrai plein écran : masque les contrôles et fait respirer la page. */
const isFullscreen = ref(false);

/** Le PDF est pré-généré dans `public/` par `scripts/build-pdf.ts`. */
const PDF_URL = "/kazan-no-bushi-2026.pdf";

function goTo(page: number): void {
    currentPage.value = Math.min(Math.max(page, 1), TOTAL_PAGES);
}

function nextPage(): void {
    goTo(currentPage.value + 1);
}

function previousPage(): void {
    goTo(currentPage.value - 1);
}

/** Convertit une valeur CSS de longueur (`50px`) en nombre. */
function toPx(value: string): number {
    return Number(value.replace("px", "")) || 0;
}

/**
 * L'échelle est calculée sur l'espace réellement libre dans la fenêtre. Le
 * lecteur réserve en padding la place des contrôles flottants (haut) et du
 * compteur (bas) : on lit ces paddings pour ne jamais avoir de chevauchement.
 */
function fitToViewport(): void {
    const viewer = document.querySelector(".guide-viewer");
    const navWidth = 80;

    let verticalPadding = 32;
    let availableWidth = window.innerWidth - navWidth - 24;

    if (viewer) {
        const styles = window.getComputedStyle(viewer);
        const padTop = toPx(styles.paddingTop);
        const padBottom = toPx(styles.paddingBottom);
        const padLeft = toPx(styles.paddingLeft);
        const padRight = toPx(styles.paddingRight);
        verticalPadding = padTop + padBottom;
        availableWidth = window.innerWidth - navWidth - (padLeft + padRight);
    }

    const availableHeight = window.innerHeight - verticalPadding;

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
    // La mesure dépend de la mise en page : on la refait une fois le DOM peint.
    fitToViewport();
    window.requestAnimationFrame(fitToViewport);
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
    <div
        class="guide-page h-screen overflow-hidden bg-plan-cream-100 font-zen text-plan-navy-700"
        :class="{ 'is-fullscreen': isFullscreen }"
    >
        <!--
            Contrôles flottants et transparents, posés au-dessus du livret :
            retour à gauche, PDF et plein écran à droite, en icônes seules.
            Invisibles à l'impression.
        -->
        <div class="guide-controls left-4">
            <NuxtLink
                to="/"
                class="guide-control"
                aria-label="Retour au site"
                title="Retour au site"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    aria-hidden="true"
                >
                    <path
                        d="M15 5l-7 7 7 7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </NuxtLink>
        </div>

        <div class="guide-controls right-4">
            <a
                class="guide-control"
                :href="PDF_URL"
                download="kazan-no-bushi-2026.pdf"
                aria-label="Télécharger le PDF"
                title="Télécharger le PDF"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    aria-hidden="true"
                >
                    <path
                        d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </a>
            <button
                type="button"
                class="guide-control"
                :aria-pressed="isFullscreen"
                aria-label="Basculer le plein écran"
                title="Plein écran"
                @click="toggleFullscreen"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    aria-hidden="true"
                >
                    <path
                        d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>

        <p class="guide-counter" aria-live="polite">
            Page {{ currentPage }} / {{ TOTAL_PAGES }}
        </p>

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

        <div
            class="guide-viewer flex h-full items-center justify-center gap-4 p-4 max-sm:gap-2 max-sm:px-2 max-sm:pt-5 max-sm:pb-8"
        >
            <button
                type="button"
                class="guide-nav"
                :disabled="currentPage === 1"
                aria-label="Page précédente"
                @click="previousPage"
            >
                &#8592;
            </button>

            <div class="guide-stage" :style="{ '--page-scale': pageScale }">
                <div class="guide-book">
                    <GuideCover v-show="currentPage === 1" />
                    <GuideProgram
                        v-show="currentPage === 2"
                        :days="programme"
                    />
                    <GuidePricing
                        v-show="currentPage === 3"
                        :prices="STAGE_PRICES"
                    />
                    <GuideGrading
                        v-show="currentPage === 4"
                        :prices="GRADE_PRICES"
                    />
                    <GuideCategories
                        v-show="currentPage === 5"
                        :ages="AGE_CATEGORIES"
                        :teams="TEAM_CATEGORIES"
                    />
                    <GuideVenue v-show="currentPage === 6" :hotels="HOTELS" />
                    <GuideOnsite
                        v-show="currentPage === 7"
                        :services="SERVICES"
                        :shops="SHOPS"
                    />
                    <GuidePartners
                        v-show="currentPage === 8"
                        :partners="PARTNERS"
                    />
                </div>
            </div>

            <button
                type="button"
                class="guide-nav"
                :disabled="currentPage === TOTAL_PAGES"
                aria-label="Page suivante"
                @click="nextPage"
            >
                &#8594;
            </button>
        </div>
    </div>
</template>

<style scoped>
/*
 * Le lecteur du livret reste du CSS local : ses boutons circulaires, leurs
 * halos (drop-shadow crème) et la mise à l'échelle A4 n'ont pas d'équivalent
 * utilitaire raisonnable. Tout ce qui peut l'être passe par Tailwind dans le
 * template.
 */

/* Contrôles flottants : icônes transparentes posées au-dessus du livret. */
.guide-controls {
    position: fixed;
    top: 16px;
    z-index: 30;
    display: flex;
    align-items: center;
    gap: 8px;
}

.guide-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    /* Icône indigo : lisible sur le fond crème du lecteur, et sur un fond
     * sombre grâce au halo crème qui la détache. */
    color: var(--color-plan-navy-700);
    cursor: pointer;
    text-decoration: none;
    filter: drop-shadow(0 0 2px var(--color-plan-cream-100))
        drop-shadow(0 0 4px var(--color-plan-cream-100))
        drop-shadow(0 1px 6px rgba(6, 12, 33, 0.35));
    opacity: 0.9;
    transition:
        opacity 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;
}

.guide-control:hover {
    opacity: 1;
    color: var(--color-plan-orange-400);
    transform: translateY(-1px);
}

.guide-control:focus-visible {
    outline: 2px solid var(--color-plan-orange-400);
    outline-offset: 2px;
}

.guide-control svg {
    display: block;
}

/* Compteur de pages, discret, posé en bas à gauche. */
.guide-counter {
    position: fixed;
    bottom: 10px;
    left: 16px;
    z-index: 30;
    margin: 0;
    padding: 5px 12px;
    border-radius: 999px;
    background: rgba(20, 31, 69, 0.72);
    backdrop-filter: blur(8px);
    color: rgba(221, 229, 240, 0.85);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
}

/* Plein écran natif : plus rien à masquer, on met juste de côté le compteur. */
.is-fullscreen .guide-counter,
.is-fullscreen .guide-controls {
    display: none;
}

/* En plein écran les contrôles disparaissent : le lecteur reprend l'espace. */
.is-fullscreen .guide-viewer {
    padding: 20px 16px;
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
    border: 0;
    background: transparent;
    color: var(--color-plan-navy-700);
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 2px var(--color-plan-cream-100))
        drop-shadow(0 0 4px var(--color-plan-cream-100))
        drop-shadow(0 1px 6px rgba(6, 12, 33, 0.35));
    transition:
        color 0.2s ease,
        transform 0.2s ease;
}

.guide-close:hover {
    color: var(--color-plan-orange-400);
    transform: translateY(-1px);
}

/* Boutons de pagination, de part et d'autre de la page. */
.guide-nav {
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--color-plan-navy-700);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    opacity: 0.75;
    filter: drop-shadow(0 0 2px var(--color-plan-cream-100))
        drop-shadow(0 0 4px var(--color-plan-cream-100))
        drop-shadow(0 1px 5px rgba(6, 12, 33, 0.3));
    transition:
        opacity 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;
}

.guide-nav:hover:not(:disabled) {
    opacity: 1;
    color: var(--color-plan-orange-400);
    transform: translateY(-1px);
}

.guide-nav:disabled {
    opacity: 0.22;
    cursor: default;
}

@media (max-width: 700px) {
    .guide-nav {
        width: 38px;
        height: 38px;
        font-size: 15px;
    }
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

/* ---------------------------------------------------------------------------
 * Impression : toutes les pages A4 à la suite, sans le lecteur ni les
 * contrôles. On neutralise la mise à l'échelle de l'écran et le `v-show`.
 * ------------------------------------------------------------------------ */
@page {
    size: A4 portrait;
    margin: 0;
}

@media print {
    .guide-controls,
    .guide-counter,
    .guide-nav,
    .guide-close {
        display: none;
    }

    .guide-page {
        background: #fff;
        height: auto;
        overflow: visible;
    }

    .guide-viewer {
        display: block;
        height: auto;
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

    .guide-stage :deep(.sheet) {
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

    .guide-stage :deep(.sheet--cover) {
        padding: 0;
        color: #fff;
    }

    .guide-stage :deep(.sheet:last-child) {
        break-after: auto;
        page-break-after: auto;
    }

    /* Les liens deviennent de simple texte encré sur le papier. */
    .guide-stage :deep(a) {
        color: var(--color-plan-navy-700);
        text-decoration: none;
    }
}
</style>
