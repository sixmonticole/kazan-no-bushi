<script setup lang="ts">
/**
 * Sur-titre du livret : petites capitales bronze qui introduisent une valeur
 * (e-mail, réseau social, inscription en ligne).
 */
defineProps<{ label: string }>();
</script>

<template>
    <span
        class="block text-[10.5px] font-bold tracking-[0.2em] uppercase text-plan-bronze-600"
    >
        {{ label }}
    </span>
</template>
