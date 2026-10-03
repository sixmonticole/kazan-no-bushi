<script setup lang="ts">
import type { GradePrice } from "~/utils/content";
import { ONSITE_PAYMENT_NOTE } from "~/utils/content";

const props = defineProps<{
    prices: GradePrice[];
}>();

const tableRows = computed(() =>
    props.prices.map((row) => [row.grade, row.registration, row.validation]),
);

const NOTES = [
    "Le passage de grade se déroule le samedi soir, après la fin du stage (environ 16h30)",
    "Les résultats sont annoncés sur place, puis publiés par le club dans les jours qui suivent.",
    "Prévoyez vos licences et votre passeport sportif le jour de l'examen.",
];
</script>

<template>
    <GuideSheet title="Passage de grade" spacious>
        <p class="mt-5 text-plan-navy-700/78">
            Le samedi soir, du 1ᵉʳ au 3ᵉ dan. Les frais d'inscription se règlent
            sur HelloAsso — en ligne, ou en espèces sur place avec un code de
            paiement (voir ci-dessous). Les frais de validation, eux, se règlent
            en espèces sur place en cas de réussite.
        </p>

        <GuideTable
            caption="Frais de passage de grade"
            :columns="['Grade', 'Inscription', 'Validation']"
            :rows="tableRows"
            spacious
        />

        <GuideNote>
            <p
                class="text-[10.5px] font-bold tracking-[0.2em] uppercase text-plan-navy-700/70"
            >
                Payer en espèces sur place
            </p>
            <p class="mt-1.5 text-plan-navy-700/85">
                {{ ONSITE_PAYMENT_NOTE }}
            </p>
        </GuideNote>

        <GuideBlockTitle label="Bon à savoir" />
        <GuideChecks :items="NOTES" />
    </GuideSheet>
</template>
