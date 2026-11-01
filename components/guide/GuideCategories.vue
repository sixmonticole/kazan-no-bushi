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
            naissance.
        </p>

        <GuideBlockTitle label="Individuels" />
        <GuideValueList :items="ageRows" />

        <GuideBlockTitle label="Équipes" />
        <GuideValueList :items="teamRows" />

        <GuideNote>
            <p>
                Les Juniors de <b>+18 ans</b> peuvent participer aux
                compétitions adultes Féminine ou Mixte sur présentation d'un
                certificat de surclassement de <b>moins de 3 mois</b>.
            </p>
        </GuideNote>

        <GuideChecks :items="COMPETITION_NOTES" tight />
    </GuideSheet>
</template>
