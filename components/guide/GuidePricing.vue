<script setup lang="ts">
import type { PriceRow } from "~/utils/content";
import {
    HELLOASSO_NOTE,
    ONSITE_PAYMENT_NOTE,
    REGISTRATION_DEADLINE,
    REGISTRATION_LABEL,
    REGISTRATION_PENDING,
    REGISTRATION_REMINDER,
    REGISTRATION_REQUIREMENTS,
    WEEKEND_NOTES,
} from "~/utils/content";

const props = defineProps<{
    prices: PriceRow[];
}>();

const { hasRegistration, registrationUrl } = useRegistration();

const tableRows = computed(() =>
    props.prices.map((row) => [row.label, row.oneDay, row.twoDays]),
);
</script>

<style scoped>
/*
 * La page est chargée : deux listes, deux encarts et un gros bouton d'appel
 * sous une A4. On resserre localement les marges des blocs pour que tout
 * tienne, sans toucher aux composants partagés par les autres pages.
 */
:deep(table) {
    margin-top: 12px;
}

:deep(h3) {
    margin-top: 16px;
}

:deep(ul) {
    margin-top: 8px;
}

:deep(ul li) {
    margin-bottom: 6px;
}

/* L'encadré de notes suit la liste des prérequis : on resserre son écart. */
:deep(.pricing-note) {
    margin-top: 14px;
    padding-top: 11px;
    padding-bottom: 11px;
}
</style>

<template>
    <GuideSheet title="Tarifs et inscription">
        <p class="mt-2.5 text-plan-navy-700/78">
            Inscriptions en ligne, sur notre page HelloAsso, avant le
            <b> {{ REGISTRATION_DEADLINE }} </b>. Aucune inscription ne sera
            prise le jour même, sur place.
        </p>

        <GuideChecks :items="WEEKEND_NOTES" tight />

        <GuideTable
            caption="Stage"
            :columns="['Catégorie', '1 jour', '2 jours']"
            :rows="tableRows"
        />

        <div class="mt-3 flex flex-col items-center text-center">
            <a
                v-if="hasRegistration"
                :href="registrationUrl ?? undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-plan-orange-400 px-7 py-3 text-plan-navy-900 shadow-[0_10px_28px_-8px_rgba(232,164,92,0.75)] ring-1 ring-plan-orange-400/60 transition-transform hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(232,164,92,0.85)] print:shadow-none print:[print-color-adjust:exact]"
            >
                <span
                    class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
                    aria-hidden="true"
                />
                <span class="relative flex flex-col text-left leading-tight">
                    <span
                        class="text-[9.5px] font-bold tracking-[0.22em] uppercase opacity-70"
                    >
                        Je m'inscris sur
                    </span>
                    <span
                        class="font-title text-[19px] font-semibold tracking-[0.02em]"
                    >
                        {{ REGISTRATION_LABEL }}
                    </span>
                </span>
                <span
                    class="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-plan-navy-900 text-plan-orange-300 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4.5 w-4.5"
                    >
                        <path d="M5 12h13" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </span>
            </a>

            <p
                v-else
                class="inline-flex items-center gap-3 rounded-full border border-plan-orange-400/55 bg-plan-orange-400/[0.08] px-6 py-3 text-[14px] font-bold tracking-[0.06em] text-plan-navy-700"
            >
                <span
                    class="h-2 w-2 rounded-full bg-plan-orange-400"
                    aria-hidden="true"
                />
                {{ REGISTRATION_PENDING }}
            </p>

            <p
                v-if="hasRegistration"
                class="mt-2 text-[12px] text-plan-navy-700/60"
            >
                Paiement en ligne sécurisé, avant le
                {{ REGISTRATION_DEADLINE }} — ou en espèces sur place avec un
                code de paiement.
            </p>
        </div>

        <GuideBlockTitle label="À prévoir avant de vous inscrire" />
        <GuideChecks :items="REGISTRATION_REQUIREMENTS" />

        <GuideNote class="pricing-note">
            <p>{{ REGISTRATION_REMINDER }}</p>
            <p class="mt-2">{{ HELLOASSO_NOTE }}</p>
        </GuideNote>

        <div
            class="mt-3 border-l-[3px] border-plan-navy-700/25 bg-plan-navy-700/[0.05] px-4.5 py-3.5 text-[13.5px] print:break-inside-avoid print:[print-color-adjust:exact]"
        >
            <p
                class="mb-1 text-[10.5px] font-bold tracking-[0.2em] uppercase text-plan-navy-700/70"
            >
                Payer en espèces sur place
            </p>
            <p class="text-plan-navy-700/85">{{ ONSITE_PAYMENT_NOTE }}</p>
        </div>
    </GuideSheet>
</template>
