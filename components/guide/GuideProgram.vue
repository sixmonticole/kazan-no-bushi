<script setup lang="ts">
import type { ScheduleDay } from "~/utils/content";

defineProps<{
    days: ScheduleDay[];
}>();
</script>

<template>
    <GuideSheet title="Programme du week-end">
        <p class="mt-4 text-plan-navy-700/78">
            L'Arténium ouvre ses portes dès 9h le samedi et dès 8h le dimanche.
            Les horaires ci-dessous sont donnés à titre indicatif et peuvent
            évoluer jusqu'au jour J.
        </p>

        <div
            v-for="(day, index) in days"
            :key="day.label"
            :class="index > 0 ? 'mt-7' : ''"
        >
            <header
                class="mt-6 flex items-baseline gap-3 border-b border-plan-navy-700/[0.14] pb-2"
            >
                <h3 class="font-brush text-[29px] text-plan-navy-700">
                    {{ day.label }}
                </h3>
                <GuideBadge>{{ day.badge }}</GuideBadge>
            </header>

            <div
                v-if="day.callout"
                class="mt-3 rounded-[10px] bg-plan-navy-900 px-4.5 py-3 text-plan-cream-300 print:break-inside-avoid print:[print-color-adjust:exact]"
            >
                <p
                    class="mb-1.5 text-[10.5px] font-bold tracking-[0.2em] uppercase text-plan-orange-400"
                >
                    {{ day.callout.title }}
                </p>
                <ul class="m-0 list-disc pl-4.5">
                    <li
                        v-for="item in day.callout.items"
                        :key="item.label"
                        class="mb-0.5"
                    >
                        {{ item.label
                        }}<strong v-if="item.name">{{ item.name }}</strong>
                    </li>
                </ul>
                <p
                    v-if="day.callout.note"
                    class="mt-2 border-t border-plan-orange-400/30 pt-2 text-[13px] text-plan-cream-300/80"
                >
                    {{ day.callout.note }}
                </p>
            </div>

            <div
                v-if="day.warning"
                class="mt-2.5 flex items-start gap-2.5 rounded-[10px] border border-plan-orange-400/50 bg-plan-orange-400/[0.12] px-4 py-2.5 print:break-inside-avoid print:[print-color-adjust:exact]"
                role="note"
            >
                <span
                    class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plan-orange-400 text-[12px] font-black text-plan-navy-900"
                    aria-hidden="true"
                >
                    !
                </span>
                <p
                    class="text-[13px] leading-[1.5] font-medium text-plan-navy-900"
                >
                    {{ day.warning }}
                </p>
            </div>

            <ul class="mt-2.5 list-none p-0">
                <li
                    v-for="event in day.events"
                    :key="event.time"
                    class="grid grid-cols-[110px_1fr] gap-4 border-b border-plan-navy-700/[0.08] py-2 max-sm:grid-cols-1 max-sm:gap-0.5"
                >
                    <span class="font-black tabular-nums text-plan-navy-700">
                        {{ event.time }}
                    </span>
                    <span>
                        {{ event.label }}
                        <em
                            v-if="event.detail"
                            class="block text-[12.5px] font-bold not-italic text-plan-bronze-600"
                        >
                            {{ event.detail }}
                        </em>
                    </span>
                </li>
            </ul>
        </div>
    </GuideSheet>
</template>
