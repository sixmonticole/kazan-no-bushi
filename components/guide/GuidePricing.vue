<script setup lang="ts">
import type { PriceRow } from "~/utils/content";
import {
    GUIDE_LINKS,
    HELLOASSO_NOTE,
    REGISTRATION_DEADLINE,
    REGISTRATION_REMINDER,
    REGISTRATION_REQUIREMENTS,
} from "~/utils/content";

defineProps<{
    prices: PriceRow[];
}>();

const displayUrl = useDisplayUrl();
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Tarifs et inscription" />
        <p class="sheet__lead">
            Inscriptions en ligne, sur notre page HelloAsso, avant le
            <b> {{ REGISTRATION_DEADLINE }} </b>. Aucune inscription ne sera
            prise le jour même, sur place.
        </p>

        <table class="table">
            <caption>
                Stage
            </caption>
            <thead>
                <tr>
                    <th scope="col">Catégorie</th>
                    <th scope="col">1 jour</th>
                    <th scope="col">2 jours</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in prices" :key="row.label">
                    <th scope="row">{{ row.label }}</th>
                    <td>{{ row.oneDay }}</td>
                    <td>{{ row.twoDays }}</td>
                </tr>
            </tbody>
        </table>

        <h3 class="block__title">À prévoir avant de vous inscrire</h3>
        <ul class="checks">
            <li v-for="item in REGISTRATION_REQUIREMENTS" :key="item">
                {{ item }}
            </li>
        </ul>

        <div class="note">
            <p>{{ REGISTRATION_REMINDER }}</p>
            <p>{{ HELLOASSO_NOTE }}</p>
        </div>

        <p class="link-line">
            <span class="eyebrow">Inscription en ligne</span>
            <a
                :href="GUIDE_LINKS.registration.href"
                class="mt-8 px-[30px] py-4 rounded-full border border-plan-orange-400/55 bg-plan-orange-400/[0.08] text-[15px] font-bold tracking-[0.06em] text-plan-orange-300"
            >
                {{ GUIDE_LINKS.registration.label }}
            </a>
        </p>
    </section>
</template>
