<script setup lang="ts">
/**
 * En-tête commun des pages intérieures du livret : titre manuscrit à gauche,
 * logo du club à droite, séparé par un filet orange.
 */
defineProps<{
    title: string;
}>();
</script>

<template>
    <header class="sheet__header">
        <h2 class="sheet__title">{{ title }}</h2>
        <img
            src="/logo-asm.png"
            alt="ASM Kendo"
            class="sheet__logo"
            width="225"
            height="225"
        />
    </header>
</template>
