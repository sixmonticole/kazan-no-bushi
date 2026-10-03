<script setup lang="ts">
import { EVENT } from "~/utils/site";

const cardPt = usePlanCardPt();

const { address } = EVENT;
</script>

<template>
    <div class="relative pt-24 pb-24 px-5 overflow-hidden">
        <img
            src="/artenium.jpg"
            alt=""
            width="1120"
            height="698"
            class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
            class="section-veil absolute inset-0"
            style="--veil-opacity: 0.76"
        />

        <div class="relative z-10 max-w-[1000px] mx-auto">
            <SectionHeading title="Lieu" subtitle="Comment nous rejoindre" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                <Card data-lag="0.15" :pt="cardPt" class="h-full">
                    <template #title>
                        <span
                            class="text-xs font-bold uppercase tracking-[0.2em] text-plan-bronze-600"
                        >
                            Adresse
                        </span>
                        <span
                            class="mt-3.5 block text-xl font-black text-plan-navy-700"
                        >
                            {{ address.name }}
                        </span>
                    </template>
                    <template #content>
                        <address
                            class="mt-1.5 text-[15px] not-italic leading-[1.6] text-plan-navy-700/80"
                        >
                            {{ address.street }}<br />
                            {{ address.postalCode }} {{ address.city }}, France
                        </address>
                    </template>
                </Card>

                <Card data-lag="0.2" :pt="cardPt" class="h-full">
                    <template #title>
                        <span
                            class="text-xs font-bold uppercase tracking-[0.2em] text-plan-bronze-600"
                        >
                            Accès
                        </span>
                    </template>
                    <template #content>
                        <p
                            class="mt-3.5 text-[15px] leading-[1.6] text-plan-navy-700/80"
                        >
                            Parking gratuit sur place.
                        </p>
                    </template>
                </Card>
            </div>

            <div
                data-lag="0.25"
                class="mt-5 overflow-hidden rounded-[14px] shadow-[0_18px_40px_-22px_rgba(6,12,33,0.8)]"
            >
                <EventMap height="320px" :zoom="15" />
            </div>
        </div>
    </div>
</template>
