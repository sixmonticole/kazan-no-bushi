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
            Prix indicatifs, à confirmer auprès des établissements. L'hôtel de
            L'Artière est le plus proche du gymnase.
        </p>

        <ul class="mt-3 grid list-none grid-cols-2 gap-3 p-0">
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
                <p class="mt-0.5 text-[12.5px] font-bold text-plan-bronze-600">
                    {{ hotel.price }}
                </p>
                <p class="mt-1.5 text-[12.5px] text-plan-navy-700/72">
                    {{ hotel.address }}
                </p>
                <p class="mt-1.5 text-[12.5px] text-plan-navy-700/72">
                    {{ hotel.phone }} &middot;
                    <span class="break-all">{{ displayUrl(hotel.url) }}</span>
                </p>
            </li>
        </ul>
    </GuideSheet>
</template>
