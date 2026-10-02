<script setup lang="ts">
import type { GradePrice } from "~/utils/content";

defineProps<{
    prices: GradePrice[];
}>();
</script>

<template>
    <section class="sheet sheet--spacious">
        <GuideSheetHeader title="Passage de grade" />
        <p class="sheet__lead">
            Le samedi soir, du 1ᵉʳ au 3ᵉ dan. Frais d'inscription à régler en
            ligne, frais de validation en espèces sur place en cas de réussite.
        </p>

        <table class="table">
            <caption>
                Frais de passage de grade
            </caption>
            <thead>
                <tr>
                    <th scope="col">Grade</th>
                    <th scope="col">Inscription</th>
                    <th scope="col">Validation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in prices" :key="row.grade">
                    <th scope="row">{{ row.grade }}</th>
                    <td>{{ row.registration }}</td>
                    <td>{{ row.validation }}</td>
                </tr>
            </tbody>
        </table>

        <h3 class="block__title">Bon à savoir</h3>
        <ul class="checks">
            <li>
                Le passage de grade se déroule le samedi soir, après la fin du
                stage.
            </li>
            <li>
                Les résultats sont annoncés sur place, puis publiés par le club
                dans les jours qui suivent.
            </li>
            <li>
                Prévoyez votre licence et votre passeport sportif le jour de
                l'examen.
            </li>
        </ul>
    </section>
</template>
