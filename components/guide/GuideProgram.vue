<script setup lang="ts">
import type { ScheduleDay } from "~/utils/content";

defineProps<{
    days: ScheduleDay[];
}>();
</script>

<template>
    <section class="sheet">
        <GuideSheetHeader title="Programme du week-end" />
        <p class="sheet__lead">
            L'Arténium ouvre ses portes dès 9h le samedi. Les horaires
            ci-dessous sont donnés à titre indicatif et peuvent évoluer jusqu'au
            jour J.
        </p>

        <div v-for="day in days" :key="day.label" class="day">
            <header class="day__header">
                <h3>{{ day.label }}</h3>
                <span class="badge">{{ day.badge }}</span>
            </header>

            <div v-if="day.callout" class="callout">
                <p class="callout__title">{{ day.callout.title }}</p>
                <ul>
                    <li v-for="item in day.callout.items" :key="item.label">
                        {{ item.label
                        }}<strong v-if="item.name">{{ item.name }}</strong>
                    </li>
                </ul>
                <p v-if="day.callout.note" class="callout__note">
                    {{ day.callout.note }}
                </p>
            </div>

            <ul class="schedule">
                <li v-for="event in day.events" :key="event.time">
                    <span class="schedule__time">{{ event.time }}</span>
                    <span class="schedule__label">
                        {{ event.label }}
                        <em v-if="event.detail">{{ event.detail }}</em>
                    </span>
                </li>
            </ul>
        </div>
    </section>
</template>
