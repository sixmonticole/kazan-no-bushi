<script setup lang="ts">
/**
 * Feuille A4 du livret : cadre blanc de ratio 210 × 297 mm, avec l'en-tête
 * manuscrit et le logo du club.
 *
 * La classe `sheet` est conservée : c'est le crochet des règles d'impression
 * de `pages/guide.vue` (saut de page, format A4 physique).
 */
withDefaults(
    defineProps<{
        /** Titre de l'en-tête. Omis pour une feuille sans en-tête (couverture). */
        title?: string;
        /** Étire les blocs pour occuper la page quand elle est peu remplie. */
        spacious?: boolean;
    }>(),
    { title: undefined, spacious: false },
);
</script>

<template>
    <section
        class="sheet relative h-[1123px] w-[794px] overflow-hidden rounded-[14px] bg-plan-paper px-[52px] py-[44px] text-[15px] leading-[1.62] shadow-sheet"
        :class="spacious ? 'flex flex-col' : ''"
    >
        <slot name="header">
            <header
                v-if="title"
                class="flex items-start justify-between gap-5 border-b-2 border-plan-orange-400 pb-2.5"
            >
                <h2
                    class="pt-1.5 font-brush text-[32px] leading-[1.2] font-normal text-plan-navy-700 print:text-[22pt]"
                >
                    {{ title }}
                </h2>
                <img
                    src="/logo-asm.png"
                    alt="ASM Kendo"
                    class="h-[54px] w-[54px] shrink-0 rounded-full print:h-11 print:w-11"
                    width="225"
                    height="225"
                />
            </header>
        </slot>

        <slot />
    </section>
</template>
