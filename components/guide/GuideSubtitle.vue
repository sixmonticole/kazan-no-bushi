<script setup lang="ts">
/**
 * Titre manuscrit de second niveau, en cours de feuille : même graisse que
 * l'en-tête de page, avec une respiration avant. `tight` resserre cette
 * respiration quand la page est chargée.
 */
withDefaults(defineProps<{ label: string; tight?: boolean }>(), {
    tight: false,
});
</script>

<template>
    <h2
        class="font-brush text-[32px] leading-[1.2] font-normal text-plan-navy-700"
        :class="tight ? 'mt-7' : 'mt-11.5'"
    >
        {{ label }}
    </h2>
</template>
