<script setup lang="ts">
/**
 * Liste définitionnelle du livret (services, artisans et boutiques) : chaque
 * entrée est un terme en gras suivi de sa description, séparés par un filet.
 */
defineProps<{
    items: { term: string; description: string }[];
}>();
</script>

<template>
    <dl class="mt-4">
        <div
            v-for="item in items"
            :key="item.term"
            class="border-b border-plan-navy-700/10 py-3"
        >
            <dt class="font-black text-plan-navy-700">{{ item.term }}</dt>
            <dd class="mt-0.5 text-plan-navy-700/78">
                {{ item.description }}
            </dd>
        </div>
    </dl>
</template>
