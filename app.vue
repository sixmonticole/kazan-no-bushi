<template>
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <HeroSection />
            <InfoSection />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useHead({
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsEvent",
                name: "Kazan No Bushi — XIVème édition",
                description:
                    "Stage, passage de grade et compétition de kendo.",
                startDate: "2026-11-28T09:30:00+01:00",
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: {
                    "@type": "Place",
                    name: "Artenium",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "4 Parc de l'Artière",
                        addressLocality: "Ceyrat",
                        postalCode: "63122",
                        addressCountry: "FR",
                    },
                },
                image: ["https://kazan-no-bushi.fr/fond-mila.jpeg"],
                organizer: {
                    "@type": "Organization",
                    name: "ASM Kendo",
                    url: "https://kazan-no-bushi.fr",
                    email: "kendo@asm-omnisports.com",
                    sameAs: [
                        "https://www.instagram.com/asm_kendo/",
                        "https://www.facebook.com/kazankendo",
                    ],
                },
            }),
        },
    ],
});

let smoother: InstanceType<typeof ScrollSmoother> | null = null;

onMounted(() => {
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
</style>
