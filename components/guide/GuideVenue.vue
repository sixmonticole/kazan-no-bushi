<script setup lang="ts">
import type { GuideHotel } from "~/utils/content";
import { EVENT } from "~/utils/site";

defineProps<{
    hotels: GuideHotel[];
}>();

const displayUrl = useDisplayUrl();

const VENUE_NOTES = [
    "Parking gratuit à l'entrée de l'Arténium.",
    "Gymnase adapté avec un accès handicapé.",
];
</script>

<template>
    <GuideSheet title="Le lieu">
        <address class="mt-3.5 not-italic">
            <strong class="block text-[17px] font-black text-plan-navy-700">
                {{ EVENT.address.name }}
            </strong>
            {{ EVENT.address.street }}<br />
            {{ EVENT.address.postalCode }} {{ EVENT.address.city }}
        </address>
        <GuideChecks :items="VENUE_NOTES" tight />

        <EventMap class="mt-4" height="210px" :zoom="15" />

        <GuideSubtitle label="Hébergement" tight />
        <p class="mt-4 text-plan-navy-700/78">
            Deux hôtels nous accordent un tarif préférentiel pour la Kazan.
            Pensez à indiquer le code ou la mention du club au moment de
            réserver, sans quoi l'offre ne s'applique pas.
        </p>

        <ul class="mt-3 grid list-none grid-cols-1 gap-3 p-0">
            <li
                v-for="hotel in hotels"
                :key="hotel.name"
                class="rounded-[10px] border border-plan-navy-700/[0.12] bg-plan-cream-100 px-4 py-3.5 print:break-inside-avoid print:[print-color-adjust:exact]"
            >
                <p class="font-black text-plan-navy-700">
                    {{ hotel.name }}
                    <GuideBadge v-if="hotel.closest" size="sm" class="ml-2">
                        Le plus proche
                    </GuideBadge>
                </p>
                <p class="mt-1.5 text-[12.5px] text-plan-navy-700/72">
                    {{ hotel.address }}<br />
                    {{ hotel.phone }}
                    <template v-if="hotel.email">
                        &middot;
                        <span class="break-all">{{ hotel.email }}</span>
                    </template>
                    <template v-if="hotel.url">
                        &middot;
                        <span class="break-all">{{
                            displayUrl(hotel.url)
                        }}</span>
                    </template>
                </p>
                <dl
                    class="mt-2 grid list-none grid-cols-1 gap-x-4 gap-y-0.5 p-0"
                >
                    <div
                        v-for="rate in hotel.rates"
                        :key="rate.label"
                        class="flex items-baseline justify-between gap-3"
                    >
                        <dt class="text-[12.5px] text-plan-navy-700/72">
                            {{ rate.label }}
                        </dt>
                        <dd
                            class="shrink-0 text-[12.5px] font-bold text-plan-bronze-600"
                        >
                            {{ rate.price }}
                        </dd>
                    </div>
                </dl>
                <p
                    v-if="hotel.tax"
                    class="mt-1 text-[11.5px] text-plan-navy-700/60"
                >
                    {{ hotel.tax }}
                </p>
                <p class="mt-2 text-[12.5px] text-plan-navy-700">
                    <span class="font-bold">Réservation&nbsp;:</span>
                    {{ hotel.procedure }}
                </p>
                <p
                    v-if="hotel.note"
                    class="mt-1.5 text-[11.5px] text-plan-navy-700/60"
                >
                    {{ hotel.note }}
                </p>
            </li>
        </ul>
    </GuideSheet>
</template>
