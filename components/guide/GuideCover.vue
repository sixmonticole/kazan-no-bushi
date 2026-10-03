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
            class="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,31,69,0.55)_0%,rgba(20,31,69,0.7)_50%,rgba(20,31,69,0.92)_100%)] print:[print-color-adjust:exact]"
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

            <!-- Zone centrale : le bloc principal, centré verticalement. -->
            <div class="flex flex-1 flex-col items-center justify-center">
                <h1
                    class="font-title text-[clamp(84px,15vw,136px)] leading-[0.92] tracking-[0.02em] text-white text-shadow-[0_2px_0_rgba(20,31,69,0.5)]"
                >
                    Kazan<br />No Bushi
                </h1>
                <p class="mt-6.5 font-brush text-[52px] text-plan-orange-400">
                    {{ EDITION }} &middot;
                    {{ EDITION_YEAR }}
                </p>
                <p
                    class="mt-4 text-[22px] font-bold tracking-[0.16em] uppercase text-plan-ice-200"
                >
                    {{ COVER_DATE }} &middot; Arténium, Ceyrat
                </p>
            </div>

            <!-- Zone basse : le libellé et le paragraphe d'accueil, au ras du bas. -->
            <p
                class="text-[17px] font-bold tracking-[0.3em] uppercase text-plan-cream-100/65"
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
