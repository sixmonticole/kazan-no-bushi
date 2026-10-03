<script setup lang="ts">
import type { Partner } from "~/utils/content";
import { GUIDE_CLOSING } from "~/utils/content";
import { EDITION, SITE_NAME } from "~/utils/site";

defineProps<{
    partners: Partner[];
}>();
</script>

<template>
    <GuideSheet title="Nos partenaires">
        <p class="mt-4 text-plan-navy-700/78">Merci pour leur soutien.</p>

        <ul class="mt-3 grid list-none grid-cols-4 gap-3.5 p-0">
            <li
                v-for="partner in partners"
                :key="partner.file"
                class="flex h-24 flex-col items-center justify-center gap-1.5 rounded-[10px] border border-plan-navy-700/10 bg-white p-2 print:break-inside-avoid print:[print-color-adjust:exact]"
            >
                <img
                    :src="`/partenaires/${partner.file}`"
                    :alt="partner.name"
                    loading="lazy"
                    decoding="async"
                    class="max-h-[54px] max-w-full object-contain"
                />
                <span class="text-center text-[10px] text-plan-navy-700/60">
                    {{ partner.name }}
                </span>
            </li>
        </ul>

        <p
            class="mt-7.5 rounded-[14px] bg-plan-orange-400 px-5.5 py-4 text-center text-base font-black text-plan-navy-900 print:break-inside-avoid print:[print-color-adjust:exact]"
        >
            {{ GUIDE_CLOSING }}
        </p>

        <footer
            class="mt-8 border-t-2 border-plan-orange-400 pt-3.5 text-[11px] tracking-[0.14em] uppercase text-plan-navy-700/60"
        >
            {{ SITE_NAME }} — {{ EDITION }} — 28 &amp; 29 novembre 2026
        </footer>
    </GuideSheet>
</template>
