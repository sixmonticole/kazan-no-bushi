<script setup lang="ts">
import { SITE_NAME } from "~/utils/site";

const year = new Date().getFullYear();
</script>

<template>
    <div class="relative pt-20 pb-24 px-5 text-center">
        <SectionHeading title="Contact" subtitle="Restons en contact" />

        <ul
            class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-11 max-w-[760px] mx-auto list-none p-0"
        >
            <li v-for="channel in CONTACT_CHANNELS" :key="channel.type">
                <a
                    :href="channel.href"
                    :target="channel.external ? '_blank' : undefined"
                    :rel="channel.external ? 'noopener noreferrer' : undefined"
                    class="h-full rounded-[18px] bg-plan-cream-100 shadow-[0_24px_54px_-26px_rgba(6,12,33,0.75)] px-6 py-7 flex flex-col items-center gap-3 hover:-translate-y-0.5 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plan-orange-300"
                    data-lag="0.15"
                >
                    <span
                        class="w-10 h-10 rounded-full bg-plan-navy-700 flex items-center justify-center shrink-0"
                    >
                        <IconEmail v-if="channel.type === 'email'" />
                        <IconInstagram
                            v-else-if="channel.type === 'instagram'"
                        />
                        <IconFacebook v-else />
                    </span>
                    <span
                        class="text-sm font-bold text-plan-navy-700 break-all"
                    >
                        {{ channel.label }}
                    </span>
                </a>
            </li>
        </ul>

        <p class="mt-14 text-xs text-plan-ice-200/60">
            {{ SITE_NAME }} — {{ year }}
        </p>
    </div>
</template>
