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

        <GuideEyebrow label="Inscription en ligne" />
        <a
            :href="GUIDE_LINKS.registration.href"
            class="mt-8 inline-flex rounded-full border border-plan-orange-400/55 bg-plan-orange-400/[0.08] px-[30px] py-4 text-[15px] font-bold tracking-[0.06em] text-plan-orange-300"
        >
            {{ GUIDE_LINKS.registration.label }}
        </a>
    </GuideSheet>
</template>
