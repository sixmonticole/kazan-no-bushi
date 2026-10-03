<script setup lang="ts">
import type { Map as LeafletMap } from "leaflet";
import { VENUE_COORDS } from "~/utils/site";
import "leaflet/dist/leaflet.css";

/**
 * Carte du lieu de l'événement.
 *
 * L'image statique `plan-artenium.png` (générée par `bun run map`) est
 * toujours rendue : c'est elle qui part dans le PDF imprimé, une carte
 * interactive au chargement JS n'étant pas fiable à l'export. À l'écran,
 * Leaflet vient se superposer par-dessus une fois initialisé ; en impression,
 * le CSS masque Leaflet et réaffiche l'image.
 */
const props = withDefaults(
    defineProps<{
        /** Hauteur de la carte, en unités CSS (utile pour le livret A4). */
        height?: string;
        /** Rayon de la vue Leaflet. */
        zoom?: number;
    }>(),
    { height: "360px", zoom: 15 },
);

const ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/** Pin de marque partagé avec l'image statique : indigo, cœur orange. */
const PIN_SVG = `
<svg width="46" height="60" viewBox="0 0 46 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 59C23 59 44 35.6 44 22A21 21 0 1 0 2 22C2 35.6 23 59 23 59Z"
        fill="#141f45" stroke="#f8f1e3" stroke-width="3" />
    <circle cx="23" cy="22" r="8" fill="#e8a45c" />
</svg>`;

let map: LeafletMap | null = null;
let resizeObserver: ResizeObserver | null = null;
const leafletContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
    const container = leafletContainer.value;

    // Déjà en impression (aperçu, PDF) : on garde l'image statique.
    if (window.matchMedia("print").matches || !container) {
        return;
    }

    const {
        divIcon,
        map: createMap,
        marker,
        tileLayer,
    } = await import("leaflet");

    map = createMap(container, {
        center: [VENUE_COORDS.lat, VENUE_COORDS.lng],
        zoom: props.zoom,
        scrollWheelZoom: false,
    });

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: ATTRIBUTION,
    }).addTo(map);

    marker([VENUE_COORDS.lat, VENUE_COORDS.lng], {
        icon: divIcon({
            html: PIN_SVG,
            className: "event-map__pin",
            iconSize: [46, 60],
            iconAnchor: [23, 59],
        }),
    }).addTo(map);

    // Dans le livret, la page est masquée (`v-show`) au montage : Leaflet
    // s'initialise dans un conteneur de taille nulle et rend une carte
    // écrasée. On recalcule la taille dès que le conteneur devient visible.
    resizeObserver = new ResizeObserver(() => {
        if (
            !map ||
            container.offsetWidth === 0 ||
            container.offsetHeight === 0
        ) {
            return;
        }
        map.invalidateSize();
    });
    resizeObserver.observe(container);
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    map?.remove();
    map = null;
});
</script>

<template>
    <div
        class="event-map print:break-inside-avoid print:[print-color-adjust:exact]"
        :style="{ height }"
    >
        <!-- Repli statique : visible à l'écran avant Leaflet, et toujours en print. -->
        <img
            src="/plan-artenium.png"
            alt="Plan du quartier de l'Arténium, à Ceyrat"
            class="event-map__static"
            width="900"
            height="520"
        />
        <div ref="leafletContainer" class="event-map__leaflet" />

        <!--
            Attribution OSM unique, posée au-dessus de la carte : elle reste
            lisible écran et impression, indépendamment du cadrage de l'image.
        -->
        <a
            class="event-map__attribution"
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener"
        >
            © OpenStreetMap contributors
        </a>
    </div>
</template>

<style scoped>
.event-map {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: #e8e3d8;
}

.event-map__static,
.event-map__leaflet {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.event-map__static {
    object-fit: cover;
}

/* Leaflet remplit le cadre, sans ses marges internes par défaut. */
.event-map__leaflet {
    z-index: 1;
    background: transparent;
}

/* L'attribution Leaflet est masquée au profit de celle du composant. */
.event-map__leaflet :deep(.leaflet-control-attribution) {
    display: none;
}

.event-map__attribution {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 0;
    padding: 2px 7px;
    background: rgba(255, 253, 248, 0.82);
    color: #1b2a5b;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
    text-decoration: none;
}

:deep(.event-map__pin) {
    filter: drop-shadow(0 6px 8px rgba(6, 12, 33, 0.45));
    background: transparent;
    border: 0;
}

/*
 * Impression : on masque la couche interactive (tuiles non garanties) et on
 * réaffiche l'image statique, déjà rendue.
 */
@media print {
    .event-map__leaflet {
        display: none !important;
    }

    .event-map__attribution {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
}
</style>
