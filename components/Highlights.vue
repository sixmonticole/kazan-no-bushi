<script setup lang="ts">
import { HIGHLIGHTS } from "~/utils/content";

const cardPt = usePlanCardPt();

const iconComponents = {
    "academic-cap": resolveComponent("IconAcademicCap"),
    "shield-check": resolveComponent("IconShieldCheck"),
    trophy: resolveComponent("IconTrophy"),
} as const;
</script>

<template>
    <div class="relative pt-[86px] pb-[90px] px-5 text-center overflow-hidden">
        <img
            src="/stage.jpg"
            alt=""
            width="1500"
            height="857"
            class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="section-veil absolute inset-0" />

        <div class="relative z-10 max-w-[1000px] mx-auto">
            <h2
                class="font-brush text-[clamp(30px,4.4vw,44px)] leading-tight tracking-[0.03em] text-plan-cream-200"
                data-lag="0.1"
            >
                Stage, Passage de grade<br />et Compétition
            </h2>
            <p
                class="mt-3.5 text-xs font-bold uppercase tracking-[0.3em] text-plan-orange-400/90"
                data-lag="0.15"
            >
                Kazan No Bushi 2026
            </p>

            <ul
                class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-11 text-left list-none p-0"
            >
                <li v-for="item in HIGHLIGHTS" :key="item.title">
                    <Card :pt="cardPt" class="h-full" data-lag="0.2">
                        <template #title>
                            <div class="flex items-center gap-3">
                                <span
                                    class="w-[34px] h-[34px] rounded-[9px] bg-plan-navy-700 flex items-center justify-center shrink-0"
                                >
                                    <component
                                        :is="iconComponents[item.icon]"
                                    />
                                </span>
                                <span
                                    class="text-[19px] font-black text-plan-navy-700 leading-tight"
                                >
                                    {{ item.title }}
                                </span>
                            </div>
                        </template>
                        <template #content>
                            <p
                                class="mt-0.5 text-[15px] leading-[1.6] text-plan-navy-700/75"
                            >
                                {{ item.description }}
                            </p>
                        </template>
                    </Card>
                </li>
            </ul>
        </div>
    </div>
</template>
