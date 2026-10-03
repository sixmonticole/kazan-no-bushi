<script setup lang="ts">
import { PARTNERS } from "~/utils/content";

const CARD_BASE =
    "rounded-[14px] bg-plan-cream-100 shadow-card-sm flex items-center justify-center";

function sizeClass(partner: (typeof PARTNERS)[number]): string {
    const width = partner.wide ? "w-[220px]" : "w-[150px]";
    const padding = partner.keepSize ? "p-1.5" : "p-0";
    return `${width} h-[96px] ${padding}`;
}
</script>

<template>
    <div class="relative pt-20 pb-24 px-5 text-center">
        <SectionHeading
            title="Partenaires"
            subtitle="Merci pour leur soutien"
        />

        <ul
            class="flex flex-wrap justify-center gap-4 mt-11 max-w-[900px] mx-auto list-none p-0"
        >
            <li
                v-for="partner in PARTNERS"
                :key="partner.file"
                :class="[CARD_BASE, sizeClass(partner)]"
            >
                <img
                    :src="`/partenaires/${partner.file}`"
                    :alt="partner.name"
                    loading="lazy"
                    decoding="async"
                    class="max-w-full max-h-full object-contain"
                />
            </li>
        </ul>
    </div>
</template>
