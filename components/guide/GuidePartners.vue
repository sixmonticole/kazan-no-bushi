<script setup lang="ts">
import type { Partner } from "~/utils/content";
import { GUIDE_CLOSING } from "~/utils/content";
import { EDITION, SITE_NAME } from "~/utils/site";

defineProps<{
    partners: Partner[];
}>();
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Nos partenaires" />
        <p class="sheet__lead">Merci pour leur soutien.</p>

        <ul class="partners">
            <li v-for="partner in partners" :key="partner.file">
                <img
                    :src="`/partenaires/${partner.file}`"
                    :alt="partner.name"
                    loading="lazy"
                    decoding="async"
                />
                <span class="partners__name">{{ partner.name }}</span>
            </li>
        </ul>

        <p class="closing-banner">{{ GUIDE_CLOSING }}</p>

        <footer class="colophon">
            {{ SITE_NAME }} — {{ EDITION }} — 28 &amp; 29 novembre 2026
        </footer>
    </section>
</template>
