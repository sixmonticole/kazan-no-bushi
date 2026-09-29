---
description: Ajoute une nouvelle section au site avec GSAP/ScrollSmoother
agent: build
---

Ajoute une nouvelle section au site Kazan No Bushi pour : $ARGUMENTS

Contraintes :

- Nouveau composant `PascalCase.vue` dans `components/`, en `<script setup lang="ts">`, indentation 4 espaces.
- Monte la section dans `#smooth-content` (via `InfoSection.vue` ou `app.vue`), sans casser le `ScrollTrigger` pinné sur `#hero`.
- Utilise les couleurs du thème (`plan-cream-100`, `plan-navy-900`, etc.) et du contenu en français cohérent avec le reste du site.
- Vérifie avec `bun run build`.
