<script setup lang="ts">
/**
 * Page « Plan de la salle » du livret.
 *
 * L'image est déposée dans `public/` : voir `PLAN_IMAGE` ci-dessous. Tant
 * qu'elle est absente, le livret affiche un cadre d'attente à la place.
 */
const PLAN_IMAGE = "/plan-salle.png";

const planImage = ref<HTMLImageElement | null>(null);

/**
 * Une image chargée sans largeur est une image cassée. Ce contrôle tourne
 * après le montage : l'événement `error` seul se déclenche parfois avant
 * l'hydratation, et la page resterait alors avec une icône cassée.
 */
const hasPlan = ref(false);

onMounted(() => {
    if (planImage.value?.complete) {
        hasPlan.value = planImage.value.naturalWidth > 0;
    }
});

const PLAN_NOTES = [
    "Compétitions et passage de grade se déroulent sur les shiaijos.",
    "La buvette se tient à l'entrée du gymnase.",
];
</script>

<template>
    <GuideSheet title="Plan de la salle" spacious>
        <p class="mt-4 text-plan-navy-700/78">
            Repères pour vous situer dans l'Arténium : shiaijos de compétition,
            zone d'échauffement et buvette.
        </p>

        <figure class="mt-5 flex min-h-0 flex-1 flex-col">
            <img
                ref="planImage"
                :src="PLAN_IMAGE"
                alt="Plan de la salle de l'Arténium"
                class="mx-auto max-h-[760px] w-auto max-w-full rounded-[10px] border border-plan-navy-700/[0.12] object-contain print:[print-color-adjust:exact]"
                :class="hasPlan ? '' : 'hidden'"
                @load="hasPlan = true"
                @error="hasPlan = false"
            />
            <div
                v-if="!hasPlan"
                class="flex min-h-[420px] flex-1 items-center justify-center rounded-[12px] border border-dashed border-plan-navy-700/25 px-6 text-center text-[13.5px] text-plan-navy-700/55"
            >
                Plan de la salle à venir
            </div>
            <figcaption
                class="mt-4 text-center text-[12.5px] text-plan-navy-700/60"
            >
                Plan fourni par l'organisation, susceptible d'évoluer d'ici le
                week-end.
            </figcaption>
        </figure>

        <GuideChecks :items="PLAN_NOTES" tight />
    </GuideSheet>
</template>
