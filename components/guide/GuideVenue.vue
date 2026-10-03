<script setup lang="ts">
import type { GuideHotel } from "~/utils/content";
import { EVENT } from "~/utils/site";

defineProps<{
    hotels: GuideHotel[];
}>();

const displayUrl = useDisplayUrl();
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Le lieu" />
        <address class="venue">
            <strong>{{ EVENT.address.name }}</strong>
            {{ EVENT.address.street }}<br />
            {{ EVENT.address.postalCode }} {{ EVENT.address.city }}
        </address>
        <ul class="checks checks--tight">
            <li>Parking gratuit à l'entrée de l'Arténium.</li>
            <li>Gymnase adapté avec un accès handicapé.</li>
        </ul>

        <EventMap class="venue__map" height="230px" :zoom="15" />

        <h2 class="sheet__title sheet__title--spaced">Hébergement</h2>
        <p class="sheet__lead">
            Prix indicatifs, à confirmer auprès des établissements. L'hôtel de
            L'Artière est le plus proche du gymnase.
        </p>

        <ul class="hotels">
            <li v-for="hotel in hotels" :key="hotel.name">
                <p class="hotels__name">
                    {{ hotel.name }}
                    <span v-if="hotel.closest" class="badge badge--sm">
                        Le plus proche
                    </span>
                </p>
                <p class="hotels__price">{{ hotel.price }}</p>
                <p class="hotels__address">{{ hotel.address }}</p>
                <p class="hotels__contact">
                    {{ hotel.phone }} &middot;
                    <span class="hotels__url">
                        {{ displayUrl(hotel.url) }}
                    </span>
                </p>
            </li>
        </ul>
    </section>
</template>
