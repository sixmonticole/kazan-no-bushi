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
            src="/fond-guide-couverture.jpeg"
            alt=""
            class="absolute inset-0 h-full w-full object-cover object-center print:[print-color-adjust:exact]"
            width="1448"
            height="2048"
        />
        <div
            class="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,31,69,0.5)_0%,rgba(20,31,69,0.14)_22%,rgba(20,31,69,0.3)_42%,rgba(20,31,69,0.26)_58%,rgba(20,31,69,0.34)_78%,rgba(20,31,69,0.8)_100%)] print:[print-color-adjust:exact]"
        />

        <div
            class="relative z-1 flex h-full flex-col items-center px-14 pt-16 pb-14 text-center text-plan-cream-100 print:px-16 print:py-20"
        >
            <!-- Zone haute : la signature ASM, soulignée par un filet. -->
            <p
                class="text-[19px] font-bold tracking-[0.4em] uppercase text-plan-orange-400"
            >
                ASM Kendo
            </p>
            <span class="mt-4 h-[3px] w-[90px] bg-plan-orange-400" />

            <!-- Zone centrale : le titre seul, lisible sur le soleil. -->
            <div class="flex flex-1 flex-col items-center justify-center">
                <h1
                    class="font-title text-[clamp(84px,15vw,136px)] leading-[0.92] tracking-[0.02em] text-white text-shadow-[0_4px_18px_rgba(20,31,69,0.85),0_2px_3px_rgba(20,31,69,0.9)]"
                >
                    Kazan<br />No Bushi
                </h1>
            </div>

            <!-- Zone basse : l'édition, la date et l'accueil, sur l'encart sombre. -->
            <p
                class="font-brush text-[42px] leading-none text-plan-orange-400 text-shadow-[0_3px_14px_rgba(20,31,69,0.95)]"
            >
                {{ EDITION }} &middot;
                {{ EDITION_YEAR }}
            </p>
            <p
                class="mt-3 text-[21px] font-bold tracking-[0.16em] uppercase text-plan-cream-100 text-shadow-[0_2px_10px_rgba(20,31,69,0.95)]"
            >
                {{ COVER_DATE }} &middot; Arténium, Ceyrat
            </p>
            <p
                class="mt-7 text-[17px] font-bold tracking-[0.3em] uppercase text-plan-cream-100/65"
            >
                Guide et informations
            </p>
            <p
                class="mt-5.5 max-w-[46ch] text-[22px] leading-relaxed text-plan-cream-100/85"
            >
                {{ GUIDE_INTRO }}
            </p>
        </div>
    </section>
</template>
