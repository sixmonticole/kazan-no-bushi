<template>
    <!--
        Coquille de l'application : elle contient le wrapper de ScrollSmoother
        et rend la page courante à l'intérieur. Le contenu de l'édition vit
        dans `pages/index.vue`, le livret dans `pages/guide.vue`.

        Le livret est un document imprimable : il ne doit pas être enfermé
        dans le wrapper `position: fixed / overflow: hidden` de ScrollSmoother,
        sinon l'impression est tronquée. Les wrappers ne sont donc montés que
        hors de `/guide` (voir `smoothScroll`).
    -->
    <a
        v-if="smoothScroll"
        href="#contenu"
        class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-plan-cream-100 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-plan-navy-900"
    >
        Aller au contenu
    </a>

    <div v-if="smoothScroll" id="smooth-wrapper">
        <div id="smooth-content">
            <NuxtPage />
        </div>
    </div>

    <NuxtPage v-else />
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Le livret est un document imprimable : il ne doit pas être enfermé dans le
 * wrapper `position: fixed / overflow: hidden` de ScrollSmoother, sinon
 * l'impression est tronquée. On le réserve donc aux pages de contenu.
 */
const route = useRoute();

const smoothScroll = computed(() => route.path !== "/guide");

let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

/**
 * Les liens d'ancre (`#contenu`, lien d'évitement) doivent passer par
 * ScrollSmoother : sinon le navigateur décale le wrapper fixe et atterrit
 * au mauvais endroit.
 */
function onAnchorClick(event: MouseEvent): void {
    const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
    const hash = link?.getAttribute("href");

    if (!hash || hash === "#") {
        return;
    }

    const target = document.querySelector(hash);

    if (!target) {
        return;
    }

    event.preventDefault();
    smoother?.scrollTo(target, true, "top top");
}

onMounted(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    document.addEventListener("click", onAnchorClick);

    if (!smoothScroll.value || reduceMotion) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        normalizeScroll: false,
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("click", onAnchorClick);
    smoother?.kill();
    smoother = null;
    ScrollTrigger.killAll();
});
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

#smooth-wrapper {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#smooth-content {
    overflow: visible;
    width: 100%;
}

@media (prefers-reduced-motion: reduce) {
    #smooth-wrapper {
        position: static;
        height: auto;
    }
}
</style>
