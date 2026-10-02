<script setup lang="ts">
import type { AgeCategory, TeamCategory } from "~/utils/content";
import { COMPETITION_NOTES } from "~/utils/content";

defineProps<{
    ages: AgeCategory[];
    teams: TeamCategory[];
}>();
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Catégories de la compétition" />
        <p class="sheet__lead">
            Les catégories individuelles sont déterminées par l'année de
            naissance. Un certificat de surclassement de moins de 3 mois est
            exigé pour les juniors engagés en catégorie adulte.
        </p>

        <h3 class="block__title">Individuels</h3>
        <ul class="age-list">
            <li v-for="category in ages" :key="category.name">
                <span>{{ category.name }}</span>
                <span class="age-list__years">{{ category.years }}</span>
            </li>
        </ul>

        <h3 class="block__title">Équipes</h3>
        <ul class="age-list">
            <li v-for="category in teams" :key="category.name">
                <span>{{ category.name }}</span>
                <span class="age-list__years">{{ category.details }}</span>
            </li>
        </ul>

        <ul class="checks checks--tight">
            <li v-for="item in COMPETITION_NOTES" :key="item">
                {{ item }}
            </li>
        </ul>
    </section>
</template>
