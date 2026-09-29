<script setup lang="ts">
import { CATEGORIES } from "~/utils/content";

const cardPt = usePlanCardPt();
</script>

<template>
    <div class="relative pt-24 pb-24 px-5 text-center overflow-hidden">
        <img
            src="/competition.jpg"
            alt=""
            width="1500"
            height="1019"
            class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
            class="section-veil absolute inset-0"
            style="--veil-opacity: 0.72"
        />

        <div class="relative z-10 max-w-[1000px] mx-auto">
            <SectionHeading
                title="Catégories de la compétition"
                subtitle="Ouvertes à tous les niveaux"
            />

            <ul
                class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-11 text-left list-none p-0"
            >
                <li
                    v-for="(cat, index) in CATEGORIES"
                    :key="cat.name"
                    :data-lag="0.1 + index * 0.05"
                >
                    <Card :pt="cardPt" class="h-full">
                        <template #title>
                            <span
                                class="text-[19px] font-black text-plan-navy-700"
                            >
                                {{ cat.name }}
                            </span>
                            <div class="w-8 h-0.5 bg-plan-orange-400 my-3" />
                        </template>
                        <template #content>
                            <ul
                                class="flex flex-col gap-2.5 text-[15px] text-plan-navy-700/78 list-none p-0"
                            >
                                <li
                                    v-for="detail in cat.details"
                                    :key="detail"
                                    class="flex items-baseline gap-2.5"
                                >
                                    <span
                                        class="w-[5px] h-[5px] rounded-full bg-plan-navy-700/40 shrink-0 -translate-y-[3px]"
                                        aria-hidden="true"
                                    />
                                    {{ detail }}
                                </li>
                            </ul>
                        </template>
                    </Card>
                </li>
            </ul>
        </div>
    </div>
</template>
