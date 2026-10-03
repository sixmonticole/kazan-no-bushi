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
    <div class="guide-page" :class="{ 'is-fullscreen': isFullscreen }">
        <!--
            Contrôles flottants et transparents, posés au-dessus du livret :
            retour à gauche, PDF et plein écran à droite, en icônes seules.
            Invisibles à l'impression.
        -->
        <div class="guide-controls guide-controls--left">
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

        <div class="guide-controls guide-controls--right">
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

<style src="../app/assets/css/guide.css"></style>
