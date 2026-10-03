<script setup lang="ts">
import { GUIDE_INTRO } from "~/utils/content";
import { EDITION, EDITION_YEAR } from "~/utils/site";

/** Date longue affichée en clair sur la couverture. */
const COVER_DATE = "28 & 29 novembre 2026";
</script>

<template>
    <section
        class="sheet sheet--cover relative h-[1123px] w-[794px] overflow-hidden bg-plan-navy-900"
    >
        <img
            src="/fond-mila.jpeg"
            alt=""
            class="absolute inset-0 h-full w-full object-cover object-center print:[print-color-adjust:exact]"
            width="1960"
            height="1310"
        />
        <div
            class="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,31,69,0.72)_0%,rgba(20,31,69,0.45)_38%,rgba(20,31,69,0.85)_100%)] print:[print-color-adjust:exact]"
        />

        <div
            class="relative z-1 flex h-full flex-col justify-end px-14 pt-14 pb-12 text-plan-cream-100 print:px-16 print:py-20"
        >
            <p
                class="text-[11px] font-bold tracking-[0.3em] uppercase text-plan-orange-400"
            >
                ASM Kendo
            </p>
            <h1
                class="mt-2.5 font-title text-[clamp(44px,8vw,76px)] leading-[0.98] tracking-[0.02em] text-white text-shadow-[0_2px_0_rgba(20,31,69,0.5)]"
            >
                Kazan No Bushi
            </h1>
            <p class="mt-4 font-brush text-2xl text-plan-orange-400">
                {{ EDITION }} — {{ EDITION_YEAR }}
            </p>
            <p
                class="mt-1.5 text-[13px] font-bold tracking-[0.14em] uppercase text-plan-ice-200"
            >
                {{ COVER_DATE }} &middot; Arténium, Ceyrat
            </p>
            <p
                class="mt-3.5 text-xs font-bold tracking-[0.28em] uppercase text-plan-cream-100/65"
            >
                Guide et informations
            </p>

            <p class="mt-4.5 max-w-[58ch] text-sm text-plan-cream-100/85">
                {{ GUIDE_INTRO }}
            </p>
        </div>
    </section>
</template>
