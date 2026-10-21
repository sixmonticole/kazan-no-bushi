<script setup lang="ts">
import type { ContactChannel, Shop } from "~/utils/content";
import {
    CONTACT_CHANNELS,
    REGISTRATION_LABEL,
    REGISTRATION_PENDING,
} from "~/utils/content";
import { CONTACT_EMAIL } from "~/utils/site";

const props = defineProps<{
    services: { title: string; description: string }[];
    shops: Shop[];
}>();

const displayUrl = useDisplayUrl();
const { registrationUrl } = useRegistration();

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
</script>

<template>
    <GuideSheet title="Sur place">
        <GuideDefinitionList :items="serviceItems" />

        <GuideSubtitle label="Artisans et boutiques" />
        <ul class="mt-3.5 grid list-none grid-cols-1 gap-3 p-0">
            <li
                v-for="shop in shops"
                :key="shop.name"
                class="flex items-center gap-4 rounded-[10px] border border-plan-navy-700/[0.12] bg-plan-cream-100 px-4 py-3.5 print:break-inside-avoid print:[print-color-adjust:exact]"
            >
                <img
                    :src="`/partenaires/${shop.file}`"
                    :alt="shop.name"
                    loading="lazy"
                    decoding="async"
                    class="h-14 w-14 shrink-0 rounded-[8px] bg-white object-contain p-1"
                />
                <div class="min-w-0 flex-1">
                    <div
                        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                    >
                        <p class="font-black text-plan-navy-700">
                            {{ shop.name }}
                        </p>
                        <a
                            :href="shop.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="break-all text-[12px] font-bold text-plan-bronze-600 underline decoration-plan-bronze-600/40 underline-offset-2"
                        >
                            {{ displayUrl(shop.url) }}
                        </a>
                    </div>
                    <ul
                        class="mt-1 grid list-none grid-cols-2 gap-x-4 p-0 text-[12.5px] text-plan-navy-700/72"
                    >
                        <li v-for="line in shop.description" :key="line">
                            {{ line }}
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <GuideSubtitle label="Nous contacter" />
        <ul class="mt-3.5 grid list-none grid-cols-2 gap-x-6 gap-y-3.5 p-0">
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
                :href="registrationUrl ?? undefined"
                :link="REGISTRATION_LABEL"
                :url="registrationUrl ? displayUrl(registrationUrl) : undefined"
                :pending="REGISTRATION_PENDING"
            />
        </ul>
    </GuideSheet>
</template>
