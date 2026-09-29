<template>
    <a
        href="#contenu"
        class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-plan-cream-100 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-plan-navy-900"
    >
        Aller au contenu
    </a>

    <div id="smooth-wrapper">
        <div id="smooth-content">
            <HeroSection />
            <InfoSection />
        </div>
    </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EVENT, SITE_NAME } from "~/utils/site";

useSiteSeo();

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsEvent",
                name: EVENT.name,
                description: EVENT.description,
                startDate: EVENT.startDate,
                endDate: EVENT.endDate,
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                url: EVENT.url,
                image: [EVENT.image],
                location: {
                    "@type": "Place",
                    name: EVENT.address.name,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: EVENT.address.street,
                        addressLocality: EVENT.address.city,
                        postalCode: EVENT.address.postalCode,
                        addressCountry: EVENT.address.country,
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: SITE_NAME,
                    url: EVENT.url,
                },
            }),
        },
    ],
});

let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

onMounted(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
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

    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        pin: true,
        pinSpacing: false,
    });
});

onBeforeUnmount(() => {
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
