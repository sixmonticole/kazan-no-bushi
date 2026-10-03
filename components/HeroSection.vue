<script setup lang="ts">
import { HERO_PHRASES } from "~/utils/content";

const PHRASE_INTERVAL_MS = 4000;

const currentPhraseIndex = ref(0);
const currentPhrase = ref(HERO_PHRASES[0]);

let phrasesInterval: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
    phrasesInterval = setInterval(() => {
        currentPhraseIndex.value =
            (currentPhraseIndex.value + 1) % HERO_PHRASES.length;
        currentPhrase.value = HERO_PHRASES[currentPhraseIndex.value];
    }, PHRASE_INTERVAL_MS);
});

onBeforeUnmount(() => {
    if (phrasesInterval !== undefined) {
        clearInterval(phrasesInterval);
        phrasesInterval = undefined;
    }
});
</script>

<template>
    <section
        id="hero"
        class="relative flex flex-col items-center justify-center min-h-screen font-zen overflow-hidden text-center"
    >
        <img
            src="/fond-mila.jpeg"
            alt=""
            width="1960"
            height="1310"
            fetchpriority="high"
            class="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div class="absolute inset-0 bg-plan-navy-900/[0.72]" />

        <div
            class="section-halo absolute inset-0"
            style="--halo-opacity: 0.34"
        />

        <div class="relative z-10 flex flex-col items-center px-5">
            <img
                src="/logo-asm.png"
                alt="ASM Kendo"
                width="3231"
                height="1183"
                class="h-12 sm:h-16 w-auto mb-6 drop-shadow-[0_0_3px_rgba(248,241,227,0.85)]"
            />
            <h1
                class="font-title text-[clamp(54px,10vw,120px)] leading-none tracking-wide text-plan-cream-200 drop-shadow-[0_2px_0_rgba(20,31,69,0.6)]"
            >
                KAZAN NO BUSHI
            </h1>
            <p
                class="mt-4 text-[clamp(20px,4vw,32px)] font-medium tracking-[0.14em] text-plan-ice-200"
            >
                les 28 et 29 novembre 2026
            </p>

            <CountDown />

            <Transition name="fade" mode="out-in">
                <p
                    :key="currentPhrase"
                    class="mt-8 text-sm sm:text-base italic text-center px-6 max-w-md text-plan-ice-200"
                    aria-hidden="true"
                >
                    {{ currentPhrase }}
                </p>
            </Transition>

            <a
                href="#contenu"
                class="mt-8 inline-flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-plan-orange-400/90 hover:text-plan-orange-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plan-orange-300"
            >
                Découvrir
                <span
                    class="hero-scroll-line w-px h-[34px]"
                    aria-hidden="true"
                />
            </a>
        </div>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .fade-enter-active,
    .fade-leave-active {
        transition: none;
    }
}
</style>
