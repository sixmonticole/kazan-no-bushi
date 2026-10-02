<script setup lang="ts">
import type { ContactChannel } from "~/utils/content";
import { CONTACT_CHANNELS, GUIDE_LINKS } from "~/utils/content";
import { CONTACT_EMAIL } from "~/utils/site";

defineProps<{
    services: { title: string; description: string }[];
    shops: { name: string; description: string }[];
}>();

const displayUrl = useDisplayUrl();

/** Libellé lisible du réseau social à partir de son type. */
const CHANNEL_LABELS: Record<ContactChannel["type"], string> = {
    email: "Par e-mail",
    instagram: "Instagram",
    facebook: "Facebook",
};
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Sur place" />
        <dl class="services">
            <div v-for="service in services" :key="service.title">
                <dt>{{ service.title }}</dt>
                <dd>{{ service.description }}</dd>
            </div>
        </dl>

        <h2 class="sheet__title sheet__title--spaced">Artisans et boutiques</h2>
        <dl class="services">
            <div v-for="shop in shops" :key="shop.name">
                <dt>{{ shop.name }}</dt>
                <dd>{{ shop.description }}</dd>
            </div>
        </dl>

        <h2 class="sheet__title sheet__title--spaced">Nous contacter</h2>
        <ul class="contacts">
            <li>
                <span class="eyebrow">Par e-mail</span>
                <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
            </li>
            <li
                v-for="channel in CONTACT_CHANNELS.slice(1)"
                :key="channel.type"
            >
                <span class="eyebrow">{{ CHANNEL_LABELS[channel.type] }}</span>
                <a :href="channel.href">{{ channel.label }}</a>
                <span class="link-line__url">
                    {{ displayUrl(channel.href) }}
                </span>
            </li>
            <li>
                <span class="eyebrow">Inscriptions</span>
                <a :href="GUIDE_LINKS.registration.href">
                    {{ GUIDE_LINKS.registration.label }}
                </a>
                <span class="link-line__url">
                    {{ displayUrl(GUIDE_LINKS.registration.href) }}
                </span>
            </li>
        </ul>
    </section>
</template>
