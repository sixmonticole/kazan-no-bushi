<script setup lang="ts">
/**
 * Badge rond orange du livret (ex. « Samedi », « Le plus proche »).
 * `size="sm"` donne la variante compacte posée en incise dans un texte.
 */
withDefaults(defineProps<{ size?: "md" | "sm" }>(), { size: "md" });
</script>

<template>
    <span
        class="inline-block rounded-full bg-plan-orange-400 font-bold tracking-[0.18em] uppercase text-plan-navy-900"
        :class="
            size === 'sm'
                ? 'px-2 py-0.5 text-[9px] align-middle'
                : 'px-3 py-1 text-[10px]'
        "
    >
        <slot />
    </span>
</template>
