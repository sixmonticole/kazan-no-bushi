import type { CardPassThroughOptions } from "primevue/card";

/**
 * Style partagé des cartes en crème posées sur les fonds navy.
 * Passé au composant PrimeVue `Card` via sa prop `pt`.
 *
 * PrimeVue n'expose ses sous-parties (`root`, `body`) que par `pt` : les
 * quelques surcharges `!important` restent nécessaires pour écraser le thème
 * Aura. Tout le reste passe par les utilitaires Tailwind habituels, appliqués
 * à l'attribut `class` du composant.
 */
export function usePlanCardPt(): CardPassThroughOptions {
    return {
        root: {
            class: "!bg-plan-cream-100 !border-0 !text-left !rounded-[18px] !shadow-card",
        },
    };
}
