<script setup lang="ts">
import type { GradePrice } from "~/utils/content";

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
            Le samedi soir, du 1ᵉʳ au 3ᵉ dan. Frais d'inscription à régler en
            ligne de préférence sur le HelloAsso, possibilité en espèce sur
            place. Frais de validation en espèces sur place en cas de réussite.
        </p>

        <GuideTable
            caption="Frais de passage de grade"
            :columns="['Grade', 'Inscription', 'Validation']"
            :rows="tableRows"
            spacious
        />

        <GuideBlockTitle label="Bon à savoir" />
        <GuideChecks :items="NOTES" />
    </GuideSheet>
</template>
