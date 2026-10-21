<script setup lang="ts">
import { REGISTRATION_PENDING } from "~/utils/content";

const { hasRegistration, registrationUrl } = useRegistration();
</script>

<template>
    <section
        class="max-w-[760px] mx-auto text-center px-5 pt-24 pb-28"
        data-lag="0.1"
    >
        <h2
            class="font-brush text-[clamp(30px,4.6vw,46px)] tracking-[0.03em] text-plan-cream-200"
        >
            Inscriptions
        </h2>
        <p
            v-if="!hasRegistration"
            class="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-plan-orange-400/90"
        >
            Ouverture prochaine
        </p>
        <p
            class="mt-6 max-w-[560px] mx-auto text-base leading-[1.7] text-plan-ice-200/80"
        >
            Rejoignez des centaines de kenshi venus de toute la France pour ce
            week-end d'échange et de partage.
        </p>

        <!-- Le livret détaille le programme, les tarifs et l'hébergement. -->
        <NuxtLink
            to="/guide"
            class="group inline-flex items-center gap-2.5 mt-8 text-[13px] font-bold uppercase tracking-[0.22em] text-plan-ice-200/80 hover:text-plan-orange-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plan-orange-300"
        >
            Consulter le guide
            <span
                class="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4"
                >
                    <path d="M5 12h13" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </span>
        </NuxtLink>

        <div class="mt-7">
            <a
                v-if="hasRegistration"
                :href="registrationUrl ?? undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-3 px-[30px] py-4 rounded-full bg-plan-orange-400 text-[15px] font-bold tracking-[0.06em] text-plan-navy-900 shadow-[0_12px_30px_-8px_rgba(232,164,92,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plan-orange-300"
            >
                S'inscrire sur HelloAsso
                <span
                    class="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4"
                    >
                        <path d="M5 12h13" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </span>
            </a>

            <p
                v-else
                class="inline-flex items-center gap-3 px-[30px] py-4 rounded-full border border-plan-orange-400/55 bg-plan-orange-400/[0.08] text-[15px] font-bold tracking-[0.06em] text-plan-orange-300"
            >
                <span
                    class="w-2 h-2 rounded-full bg-plan-orange-400"
                    aria-hidden="true"
                />
                {{ REGISTRATION_PENDING }}
            </p>
        </div>
    </section>
</template>
