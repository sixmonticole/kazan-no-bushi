<script setup lang="ts">
import type { CardPassThroughOptions } from "primevue/card";

defineProps<{
    units: readonly { value: string | number; label: string }[];
    pt: CardPassThroughOptions;
}>();
</script>

<template>
    <div class="flex flex-wrap justify-center gap-3.5">
        <Card
            v-for="unit in units"
            :key="unit.label"
            class="min-w-[104px]"
            :pt="pt"
        >
            <template #title>
                <span
                    class="block text-[34px] font-black leading-none tabular-nums text-plan-bronze-600"
                >
                    {{ unit.value }}
                </span>
            </template>
            <template #content>
                <p
                    class="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-plan-navy-700/60"
                >
                    {{ unit.label }}
                </p>
            </template>
        </Card>
    </div>
</template>
