<script setup lang="ts">
/**
 * Liste à puces orange du livret (points de 6 px), pour les rappels
 * « à prévoir » et « bon à savoir ». `tight` resserre l'espacement entre les
 * points quand plusieurs listes se suivent.
 */
withDefaults(defineProps<{ items: string[]; tight?: boolean }>(), {
    tight: false,
});
</script>

<template>
    <ul class="mt-3 list-none p-0">
        <li
            v-for="item in items"
            :key="item"
            class="relative pl-5.5 before:absolute before:top-2.5 before:left-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-plan-orange-400"
            :class="tight ? 'mb-2' : 'mb-2.75'"
        >
            {{ item }}
        </li>
    </ul>
</template>
