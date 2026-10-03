<script setup lang="ts">
/**
 * Encadré de note du livret : filet orange à gauche sur fond orangé très clair,
 * pour les rappels et mentions secondaires.
 */
</script>

<template>
    <div
        class="mt-5.5 border-l-[3px] border-plan-orange-400 bg-plan-orange-400/10 px-4.5 py-3.5 text-[13.5px] print:break-inside-avoid print:[print-color-adjust:exact]"
    >
        <slot />
    </div>
</template>
