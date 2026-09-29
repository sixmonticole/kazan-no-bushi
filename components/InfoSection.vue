<script setup lang="ts">
import { CONTACT_EMAIL, EDITION, SITE_NAME } from "~/utils/site";
</script>

<template>
    <section id="contenu" class="relative z-10 bg-plan-navy-900 font-zen">
        <Highlights />
        <Categories />
        <Program />
        <Venue />
        <Partners />
        <Registration />
        <Contact />

        <footer
            class="border-t border-plan-ice-200/[0.12] py-[30px] px-5 text-center text-xs uppercase tracking-[0.14em] text-plan-ice-200/60"
        >
            <p>{{ SITE_NAME }} — {{ EDITION }} — 28 &amp; 29 novembre 2026</p>
            <p class="mt-2 normal-case tracking-normal">
                <a
                    :href="`mailto:${CONTACT_EMAIL}`"
                    class="underline underline-offset-2 hover:text-plan-ice-200"
                >
                    {{ CONTACT_EMAIL }}
                </a>
            </p>
        </footer>
    </section>
</template>
