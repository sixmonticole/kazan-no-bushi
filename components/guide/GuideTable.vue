<script setup lang="ts">
/**
 * Tableau du livret : en-têtes en petites capitales, lignes séparées par un
 * filet clair. Chaque ligne est un tableau de cellules dont la première est un
 * en-tête de ligne (`th scope="row"`).
 */
defineProps<{
    /** Libellé de colonne, dans l'ordre d'affichage. */
    columns: string[];
    /** Lignes du corps : première cellule = intitulé, suivantes = valeurs. */
    rows: string[][];
    /** Légende affichée au-dessus du tableau. */
    caption?: string;
    /** Étire les cellules quand la page est peu remplie. */
    spacious?: boolean;
}>();
</script>

<template>
    <table class="mt-4.5 w-full border-collapse">
        <caption
            v-if="caption"
            class="pb-2 text-left text-[10.5px] font-bold tracking-[0.16em] uppercase text-plan-bronze-600"
        >
            {{
                caption
            }}
        </caption>
        <thead>
            <tr>
                <th
                    v-for="column in columns"
                    :key="column"
                    scope="col"
                    class="border-b-2 border-plan-navy-700/[0.16] text-left text-[10.5px] font-bold tracking-[0.14em] uppercase text-plan-navy-700/60"
                    :class="spacious ? 'px-3.5 py-5' : 'px-3.5 py-3.25'"
                >
                    {{ column }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, rowIndex) in rows"
                :key="rowIndex"
                class="border-b border-plan-navy-700/[0.12]"
            >
                <th
                    scope="row"
                    class="px-3.5 text-left font-bold text-plan-navy-700"
                    :class="spacious ? 'py-5' : 'py-3.25'"
                >
                    {{ row[0] }}
                </th>
                <td
                    v-for="(cell, cellIndex) in row.slice(1)"
                    :key="cellIndex"
                    class="px-3.5 text-left tabular-nums text-plan-navy-700"
                    :class="spacious ? 'py-5' : 'py-3.25'"
                >
                    {{ cell }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
