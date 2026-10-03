<script setup lang="ts">
import type { CardPassThroughOptions } from "primevue/card";

const { days, hours, minutes, seconds, isOver, target } = useCountdown();

const cardPt: CardPassThroughOptions = {
    root: {
        class: "!bg-plan-cream-100 !border-0 !rounded-[14px] !shadow-card-sm",
    },
    body: { class: "!py-4 !px-2.5" },
};

const units = computed(() => [
    { value: days.value, label: "Jours" },
    { value: hours.value, label: "Heures" },
    { value: minutes.value, label: "Minutes" },
    { value: seconds.value, label: "Secondes" },
]);

/** Gabarit rendu côté serveur, avant que le décompte ne soit calculé. */
const PLACEHOLDER_UNITS = [
    { value: "--", label: "Jours" },
    { value: "--", label: "Heures" },
    { value: "--", label: "Minutes" },
    { value: "--", label: "Secondes" },
] as const;

const formattedDate = computed(() =>
    target.setLocale("fr").toFormat("d MMMM yyyy 'à' HH'h'mm"),
);
</script>

<template>
    <div class="mt-9 px-4">
        <!--
            Le décompte dépend de l'heure courante : il n'est rendu que côté
            client pour que l'hydratation ne compare pas deux valeurs
            décalées d'une seconde. Le gabarit de repli garde la mise en page
            dans le HTML prérendu.
        -->
        <ClientOnly>
            <p v-if="isOver" class="text-plan-ice-200 text-base font-medium">
                L'édition 2026 est terminée. Merci aux participants !
            </p>

            <div
                v-else
                role="timer"
                aria-live="polite"
                :aria-label="`Début de l'événement dans ${days} jours`"
            >
                <CountDownCards :units="units" :pt="cardPt" />
            </div>

            <template #fallback>
                <CountDownCards :units="PLACEHOLDER_UNITS" :pt="cardPt" />
            </template>
        </ClientOnly>

        <p class="sr-only">
            L'événement commence le {{ formattedDate }} (heure de Paris).
        </p>
    </div>
</template>
