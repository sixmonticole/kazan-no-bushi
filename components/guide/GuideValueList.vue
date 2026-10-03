<script setup lang="ts">
/**
 * Liste de couples « libellé → valeur » du livret (catégories d'âge, équipes).
 * Le libellé est à gauche, la valeur alignée à droite en bronze.
 */
defineProps<{
    items: { label: string; value: string }[];
}>();
</script>

<template>
    <ul class="mt-3 list-none p-0">
        <li
            v-for="item in items"
            :key="item.label"
            class="flex justify-between gap-4 border-b border-plan-navy-700/10 py-2.5 first:border-t"
        >
            <span>{{ item.label }}</span>
            <span class="font-bold tabular-nums text-plan-bronze-600">
                {{ item.value }}
            </span>
        </li>
    </ul>
</template>
