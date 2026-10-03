<script setup lang="ts">
import type { AgeCategory, TeamCategory } from "~/utils/content";
import { COMPETITION_NOTES } from "~/utils/content";

const props = defineProps<{
    ages: AgeCategory[];
    teams: TeamCategory[];
}>();

const ageRows = computed(() =>
    props.ages.map((category) => ({
        label: category.name,
        value: category.years,
    })),
);

const teamRows = computed(() =>
    props.teams.map((category) => ({
        label: category.name,
        value: category.details,
    })),
);
</script>

<template>
    <GuideSheet title="Catégories de la compétition">
        <p class="mt-4 text-plan-navy-700/78">
            Les catégories individuelles sont déterminées par l'année de
            naissance. Un certificat de surclassement de moins de 3 mois est
            exigé pour les juniors engagés en catégorie adulte.
        </p>

        <GuideBlockTitle label="Individuels" />
        <GuideValueList :items="ageRows" />

        <GuideBlockTitle label="Équipes" />
        <GuideValueList :items="teamRows" />

        <GuideChecks :items="COMPETITION_NOTES" tight />
    </GuideSheet>
</template>
