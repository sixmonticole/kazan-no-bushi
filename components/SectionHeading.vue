<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
}>();
</script>

<template>
    <div class="text-center">
        <h2
            class="font-brush text-[clamp(28px,4.2vw,42px)] tracking-[0.03em] text-plan-cream-200"
            data-lag="0.1"
        >
            {{ title }}
        </h2>
        <p
            class="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-plan-ice-200/55"
            data-lag="0.15"
        >
            {{ subtitle }}
        </p>
    </div>
</template>
