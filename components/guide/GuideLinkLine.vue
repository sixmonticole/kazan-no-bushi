<script setup lang="ts">
/**
 * Bloc contact du livret : un sur-titre, un lien encré souligné d'orange et,
 * éventuellement, l'URL affichée en clair sous le lien.
 */
defineProps<{
    label: string;
    /** Omis tant que le lien n'est pas connu : un texte d'attente s'affiche. */
    href?: string;
    /** Texte du lien ; repli sur l'URL si omis. */
    link?: string;
    /** URL lisible affichée sous le lien (ex. « facebook.com/… »). */
    url?: string;
    /** Message affiché à la place du lien quand `href` est absent. */
    pending?: string;
}>();
</script>

<template>
    <li class="flex flex-col gap-px">
        <GuideEyebrow :label="label" />
        <a
            v-if="href"
            :href="href"
            class="font-bold text-plan-navy-700 underline decoration-plan-orange-400 underline-offset-[3px]"
        >
            {{ link ?? url ?? href }}
        </a>
        <span v-else class="font-bold text-plan-navy-700/55">
            {{ pending ?? "Bientôt disponible" }}
        </span>
        <span v-if="url" class="text-xs text-plan-navy-700/55">{{ url }}</span>
    </li>
</template>
