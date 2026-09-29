<script setup lang="ts">
import { EVENT_JSON_LD } from "~/utils/jsonld";

useSiteSeo();

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify(EVENT_JSON_LD),
        },
    ],
});
</script>

<template>
    <div>
        <HeroSection />
        <InfoSection />
    </div>
</template>
