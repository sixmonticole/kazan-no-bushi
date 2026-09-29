<script setup lang="ts">
import type { CardPassThroughOptions } from "primevue/card";

const { days, hours, minutes, seconds, isOver, target } = useCountdown();

const cardPt: CardPassThroughOptions = {
    root: {
        class: "!bg-plan-cream-100 !border-0 rounded-[14px] shadow-[0_18px_40px_-22px_rgba(6,12,33,0.8)]",
    },
    body: { class: "!py-4 !px-2.5" },
};

const units = computed(() => [
    { value: days.value, label: "Jours" },
    { value: hours.value, label: "Heures" },
    { value: minutes.value, label: "Minutes" },
    { value: seconds.value, label: "Secondes" },
]);

const formattedDate = computed(() =>
    target.setLocale("fr").toFormat("d MMMM yyyy 'à' HH'h'mm"),
);
</script>

<template>
    <div class="mt-9 px-4">
        <p v-if="isOver" class="text-plan-ice-200 text-base font-medium">
            L'édition 2026 est terminée. Merci aux participants !
        </p>

        <div
            v-else
            class="flex flex-wrap justify-center gap-3.5"
            role="timer"
            aria-live="polite"
            :aria-label="`Début de l'événement dans ${days} jours`"
        >
            <Card
                v-for="unit in units"
                :key="unit.label"
                class="min-w-[104px]"
                :pt="cardPt"
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

        <p class="sr-only">
            L'événement commence le {{ formattedDate }} (heure de Paris).
        </p>
    </div>
</template>
