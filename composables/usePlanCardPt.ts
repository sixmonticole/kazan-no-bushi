import type { CardPassThroughOptions } from "primevue/card";

/**
 * Style partagé des cartes en crème posées sur les fonds navy.
 * Passé au composant PrimeVue `Card` via sa prop `pt`.
 */
export function usePlanCardPt(radius = 18): CardPassThroughOptions {
    return {
        root: {
            class: `!bg-plan-cream-100 !border-0 rounded-[${radius}px] shadow-[0_24px_54px_-26px_rgba(6,12,33,0.75)] !text-left`,
        },
    };
}
