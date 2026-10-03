<script setup lang="ts">
import type { ContactChannel } from "~/utils/content";
import { CONTACT_CHANNELS, GUIDE_LINKS } from "~/utils/content";
import { CONTACT_EMAIL } from "~/utils/site";

const props = defineProps<{
    services: { title: string; description: string }[];
    shops: { name: string; description: string }[];
}>();

const displayUrl = useDisplayUrl();

/** Libellé lisible du réseau social à partir de son type. */
const CHANNEL_LABELS: Record<ContactChannel["type"], string> = {
    email: "Par e-mail",
    instagram: "Instagram",
    facebook: "Facebook",
};

const serviceItems = computed(() =>
    props.services.map((service) => ({
        term: service.title,
        description: service.description,
    })),
);

const shopItems = computed(() =>
    props.shops.map((shop) => ({
        term: shop.name,
        description: shop.description,
    })),
);
</script>

<template>
    <GuideSheet title="Sur place">
        <GuideDefinitionList :items="serviceItems" />

        <GuideSubtitle label="Artisans et boutiques" />
        <GuideDefinitionList :items="shopItems" />

        <GuideSubtitle label="Nous contacter" />
        <ul
            class="mt-3.5 grid list-none grid-cols-1 gap-x-6 gap-y-3.5 p-0 sm:grid-cols-2"
        >
            <GuideLinkLine
                label="Par e-mail"
                :href="`mailto:${CONTACT_EMAIL}`"
                :link="CONTACT_EMAIL"
            />
            <GuideLinkLine
                v-for="channel in CONTACT_CHANNELS.slice(1)"
                :key="channel.type"
                :label="CHANNEL_LABELS[channel.type]"
                :href="channel.href"
                :link="channel.label"
                :url="displayUrl(channel.href)"
            />
            <GuideLinkLine
                label="Inscriptions"
                :href="GUIDE_LINKS.registration.href"
                :link="GUIDE_LINKS.registration.label"
                :url="displayUrl(GUIDE_LINKS.registration.href)"
            />
        </ul>
    </GuideSheet>
</template>
