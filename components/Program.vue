<script setup lang="ts">
import type { Emphasis } from "~/utils/content";

/** Fond crème derrière les pastilles de la timeline. */
const RAIL_BG = "#f8f1e3";

function dotClass(emphasis: Emphasis): string {
    if (emphasis === "key") {
        return `w-[13px] h-[13px] bg-plan-orange-400 shadow-[0_0_0_4px_${RAIL_BG},0_0_0_5px_rgba(232,164,92,0.45)]`;
    }
    if (emphasis === "muted") {
        return `w-[7px] h-[7px] bg-plan-navy-700/35 shadow-[0_0_0_4px_${RAIL_BG}]`;
    }
    return `w-[11px] h-[11px] bg-plan-cream-100 border-2 border-plan-navy-700 shadow-[0_0_0_4px_${RAIL_BG}]`;
}

function dotMarginClass(emphasis: Emphasis): string {
    if (emphasis === "key") {
        return "mt-[19px]";
    }
    if (emphasis === "muted") {
        return "mt-[22px]";
    }
    return "mt-[20px]";
}

function titleClass(emphasis: Emphasis): string {
    if (emphasis === "muted") {
        return "text-[19px] font-medium italic text-plan-navy-700/60";
    }
    return "text-[21px] font-bold text-plan-navy-700";
}
</script>

<template>
    <div
        id="programme"
        class="relative font-zen pt-24 pb-16 overflow-hidden"
        data-lag="0.05"
    >
        <div class="absolute inset-0 bg-plan-navy-900" />
        <div
            class="section-halo absolute inset-0"
            style="--halo-size: 120% 70%; --halo-opacity: 0.28"
        />

        <div class="relative z-10 max-w-3xl mx-auto px-4">
            <SectionHeading
                title="Programme"
                subtitle="Déroulement du week-end"
            />

            <div
                v-for="(day, dayIndex) in SCHEDULE"
                :key="day.label"
                :class="dayIndex > 0 ? 'mt-14' : ''"
                data-lag="0.1"
            >
                <div class="flex items-center gap-5 mb-6">
                    <h3
                        class="font-brush text-3xl sm:text-4xl text-plan-cream-200 tracking-wide"
                    >
                        {{ day.label }}
                    </h3>
                    <span
                        class="flex-1 h-px bg-plan-ice-200/20"
                        aria-hidden="true"
                    />
                    <span
                        class="text-xs font-semibold uppercase tracking-[0.2em] text-plan-ice-200/60"
                    >
                        {{ day.badge }}
                    </span>
                </div>

                <div
                    class="relative rounded-[22px] bg-plan-cream-100 px-6 py-9 sm:px-10 sm:py-10 shadow-card overflow-hidden"
                    data-lag="0.12"
                >
                    <div
                        v-if="day.callout"
                        class="relative rounded-2xl bg-plan-navy-700 px-6 py-[22px] mb-9"
                    >
                        <p
                            class="text-xs font-bold uppercase tracking-[0.2em] text-plan-orange-400 mb-3.5"
                        >
                            {{ day.callout.title }}
                        </p>
                        <ul class="flex flex-col gap-2.5 list-none p-0">
                            <li
                                v-for="item in day.callout.items"
                                :key="item.label + (item.name ?? '')"
                                class="flex items-baseline gap-3 text-plan-cream-300 text-lg font-medium"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-plan-orange-400 shrink-0 -translate-y-0.5"
                                    aria-hidden="true"
                                />
                                <span>
                                    {{ item.label
                                    }}<strong
                                        v-if="item.name"
                                        class="font-black text-white"
                                        >{{ item.name }}</strong
                                    >
                                </span>
                            </li>
                        </ul>
                        <p
                            v-if="day.callout.note"
                            class="mt-4 pt-3.5 border-t border-plan-orange-400/[0.28] text-sm leading-[1.5] text-plan-cream-300/80"
                        >
                            {{ day.callout.note }}
                        </p>
                    </div>

                    <ol
                        class="relative grid grid-cols-[76px_22px_1fr] sm:grid-cols-[120px_26px_1fr] list-none p-0 m-0"
                    >
                        <li
                            v-for="(event, index) in day.events"
                            :key="event.time"
                            class="contents"
                        >
                            <template
                                v-if="
                                    index === day.events.length - 1 &&
                                    event.detail
                                "
                            >
                                <div
                                    class="col-span-3 border-t border-plan-navy-700/[0.14] mt-2 pt-4"
                                />
                                <div
                                    class="text-right text-sm sm:text-[17px] font-black tabular-nums text-plan-navy-700 flex items-center justify-end"
                                >
                                    {{ event.time }}
                                </div>
                                <div
                                    class="relative flex items-center justify-center"
                                >
                                    <span
                                        class="absolute top-[-20px] bottom-1/2 w-px bg-plan-navy-700/[0.18]"
                                        aria-hidden="true"
                                    />
                                    <span
                                        class="rounded-full shrink-0"
                                        :class="dotClass(event.emphasis)"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    class="pl-4 text-[23px] font-black leading-tight text-plan-navy-700 flex items-center"
                                >
                                    {{ event.label }}
                                </div>
                                <div />
                                <div />
                                <div
                                    class="pl-4 pb-3.5 text-sm font-bold tracking-wide text-plan-bronze-600"
                                >
                                    {{ event.detail }}
                                </div>
                            </template>

                            <template v-else>
                                <div
                                    class="text-right text-sm sm:text-[17px] font-black tabular-nums py-3.5"
                                    :class="
                                        event.emphasis === 'muted'
                                            ? 'text-plan-navy-700/50'
                                            : 'text-plan-navy-700'
                                    "
                                >
                                    {{ event.time }}
                                </div>

                                <div class="relative flex justify-center">
                                    <span
                                        class="absolute w-px bg-plan-navy-700/[0.18]"
                                        :class="
                                            index < day.events.length - 1
                                                ? 'top-0 bottom-0'
                                                : 'top-0 h-[26px]'
                                        "
                                        aria-hidden="true"
                                    />
                                    <span
                                        class="relative rounded-full self-start"
                                        :class="[
                                            dotClass(event.emphasis),
                                            dotMarginClass(event.emphasis),
                                        ]"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div class="pl-4 pt-3 pb-3.5">
                                    <span
                                        class="block leading-tight"
                                        :class="titleClass(event.emphasis)"
                                    >
                                        {{ event.label }}
                                    </span>
                                </div>
                            </template>
                        </li>
                    </ol>

                    <p
                        v-if="day.incomplete"
                        class="mt-4 rounded-lg border border-dashed border-plan-navy-700/25 px-3 py-2.5 text-[11px] tracking-[0.06em] text-plan-navy-700/60"
                    >
                        suite du déroulé — à compléter
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
