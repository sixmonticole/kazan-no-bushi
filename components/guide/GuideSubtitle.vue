<script setup lang="ts">
/**
 * Titre manuscrit de second niveau, en cours de feuille : même graisse que
 * l'en-tête de page, avec une respiration avant.
 */
defineProps<{ label: string }>();
</script>

<template>
    <h2
        class="mt-11.5 font-brush text-[32px] leading-[1.2] font-normal text-plan-navy-700"
    >
        {{ label }}
    </h2>
</template>
