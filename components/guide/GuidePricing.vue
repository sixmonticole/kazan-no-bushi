<script setup lang="ts">
import type { PriceRow } from "~/utils/content";
import {
    GUIDE_LINKS,
    HELLOASSO_NOTE,
    REGISTRATION_DEADLINE,
    REGISTRATION_REMINDER,
    REGISTRATION_REQUIREMENTS,
} from "~/utils/content";

const props = defineProps<{
    prices: PriceRow[];
}>();

const tableRows = computed(() =>
    props.prices.map((row) => [row.label, row.oneDay, row.twoDays]),
);
</script>

<template>
    <GuideSheet title="Tarifs et inscription">
        <p class="mt-4 text-plan-navy-700/78">
            Inscriptions en ligne, sur notre page HelloAsso, avant le
            <b> {{ REGISTRATION_DEADLINE }} </b>. Aucune inscription ne sera
            prise le jour même, sur place.
        </p>

        <GuideTable
            caption="Stage"
            :columns="['Catégorie', '1 jour', '2 jours']"
            :rows="tableRows"
        />

        <GuideBlockTitle label="À prévoir avant de vous inscrire" />
        <GuideChecks :items="REGISTRATION_REQUIREMENTS" />

        <GuideNote>
            <p>{{ REGISTRATION_REMINDER }}</p>
            <p class="mt-2">{{ HELLOASSO_NOTE }}</p>
        </GuideNote>

        <div class="mt-8 flex flex-col items-center text-center">
            <a
                :href="GUIDE_LINKS.registration.href"
                class="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-plan-orange-400 px-9 py-5 text-plan-navy-900 shadow-[0_10px_28px_-8px_rgba(232,164,92,0.75)] ring-1 ring-plan-orange-400/60 transition-transform hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(232,164,92,0.85)] print:shadow-none print:[print-color-adjust:exact]"
            >
                <span
                    class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
                    aria-hidden="true"
                />
                <span class="relative flex flex-col text-left leading-tight">
                    <span
                        class="text-[10px] font-bold tracking-[0.22em] uppercase opacity-70"
                    >
                        Je m'inscris sur
                    </span>
                    <span
                        class="font-title text-[22px] font-semibold tracking-[0.02em]"
                    >
                        {{ GUIDE_LINKS.registration.label }}
                    </span>
                </span>
                <span
                    class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-plan-navy-900 text-plan-orange-300 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-5 w-5"
                    >
                        <path d="M5 12h13" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </span>
            </a>
            <p class="mt-2.5 text-[12.5px] text-plan-navy-700/60">
                Paiement en ligne sécurisé, avant le
                {{ REGISTRATION_DEADLINE }}.
            </p>
        </div>
    </GuideSheet>
</template>
