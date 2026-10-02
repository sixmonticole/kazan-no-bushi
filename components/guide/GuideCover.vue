<script setup lang="ts">
import { GUIDE_INTRO } from "~/utils/content";
import { EDITION, EDITION_YEAR } from "~/utils/site";

/** Date longue affichée en clair sur la couverture. */
const COVER_DATE = "28 & 29 novembre 2026";
</script>

<template>
    <section class="sheet sheet--cover">
        <img
            src="/fond-mila.jpeg"
            alt=""
            class="cover__bg"
            width="1960"
            height="1310"
        />
        <div class="cover__veil" />

        <div class="cover__content">
            <p class="cover__kicker">ASM Kendo</p>
            <h1 class="cover__title">Kazan No Bushi</h1>
            <p class="cover__edition">{{ EDITION }} — {{ EDITION_YEAR }}</p>
            <p class="cover__date">
                {{ COVER_DATE }} &middot; Arténium, Ceyrat
            </p>
            <p class="cover__subtitle">Guide et informations</p>

            <p class="cover__intro">{{ GUIDE_INTRO }}</p>
        </div>
    </section>
</template>
