<script setup lang="ts">
const cardPt = {
    root: {
        class: "!bg-plan-cream-100 !border-0 rounded-[18px] shadow-[0_24px_54px_-26px_rgba(6,12,33,0.75)] !text-left",
    },
};

const highlights = [
    {
        icon: "academic-cap",
        title: "Stage",
        description:
            "Le samedi, deux stages concomitants animés par Roger ARMAND (Juniors & Adultes) et Marc RAGONA (Jeunes).",
    },
    {
        icon: "shield-check",
        title: "Passage de grade",
        description:
            "Le samedi soir, du 1er au 3ème dan. Une opportunité pour valider sa progression technique dans le cadre d'un événement régional.",
    },
    {
        icon: "trophy",
        title: "Compétition",
        description:
            "Le dimanche, les compétiteurs s'affrontent en individuel et par équipes, toutes catégories confondues.",
    },
];
</script>

<template>
    <div class="relative pt-[86px] pb-[90px] px-5 text-center overflow-hidden">
        <!-- Background image -->
        <img
            src="/stage.jpg"
            alt="Intérieur du dojo"
            class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Fade veil -->
        <div
            class="absolute inset-0"
            style="
                background: linear-gradient(
                    180deg,
                    #141f45 0%,
                    rgba(20, 31, 69, 0.72) 22%,
                    rgba(20, 31, 69, 0.72) 78%,
                    #141f45 100%
                );
            "
        />

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

            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-11 text-left"
            >
                <Card
                    v-for="item in highlights"
                    :key="item.title"
                    :pt="cardPt"
                    data-lag="0.2"
                >
                    <template #title>
                      <div class="flex items-center gap-3">
                        <div
                            class="w-[34px] h-[34px] rounded-[9px] bg-plan-navy-700 flex items-center justify-center shrink-0"
                        >
                            <svg
                                v-if="item.icon === 'academic-cap'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="w-[18px] h-[18px] text-plan-orange-400"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                />
                            </svg>
                            <svg
                                v-else-if="item.icon === 'shield-check'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="w-[18px] h-[18px] text-plan-orange-400"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286Z"
                                />
                            </svg>
                            <svg
                                v-else-if="item.icon === 'trophy'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="w-[18px] h-[18px] text-plan-orange-400"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-2.498 0"
                                />
                            </svg>
                        </div>
                        <div class="text-[19px] font-black text-plan-navy-700 leading-tight">
                            {{ item.title }}
                        </div>
                      </div>
                    </template>
                    <template #content>
                        <p class="mt-0.5 text-[15px] leading-[1.6] text-plan-navy-700/75">
                            {{ item.description }}
                        </p>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>
