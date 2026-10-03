<script setup lang="ts">
/**
 * Intertitre de bloc du livret : petites capitales bronze, en tête des
 * sections « Tarifs », « Bon à savoir », « Individuels », etc.
 */
defineProps<{ label: string }>();
</script>

<template>
    <h3
        class="mt-6.5 text-[15px] font-black tracking-[0.12em] uppercase text-plan-bronze-600"
    >
        {{ label }}
    </h3>
</template>
