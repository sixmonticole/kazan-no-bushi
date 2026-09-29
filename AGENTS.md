# Kazan No Bushi

Site vitrine du stage de kendo **Kazan No Bushi — XIVème édition** (28–29 novembre 2026, Artenium, Ceyrat). Application Nuxt 3 mono-page, en français, rendue en statique/prérendu.

## Stack

- Nuxt 3 (SSR/prerender) + Vue 3 `<script setup lang="ts">`
- PrimeVue 4 avec preset Aura personnalisé (`nuxt.config.ts`)
- Tailwind CSS 4 via `@tailwindcss/vite`
- GSAP (`ScrollTrigger`, `ScrollSmoother`) pour les animations de scroll
- Luxon pour les dates (compte à rebours)
- Gestionnaire de paquets : **bun** (`bun.lock`)

## Commandes

```bash
bun install          # dépendances + nuxt prepare (postinstall)
bun run dev          # serveur de dev sur http://localhost:3000
bun run build        # build de production
bun run generate     # génération statique
bun run preview      # prévisualisation du build
bun run lint         # oxlint strict (correctness + suspicious + pedantic + perf)
bun run lint:fix     # oxlint avec correction automatique
```

Il n'y a pas de tests automatisés ni de script `typecheck`. Vérifier une modification = `bun run lint` + `bun run build` + contrôle visuel sur `bun run dev`.

## Structure

```text
app.vue                 # layout racine : wrappers GSAP + <HeroSection /> + <InfoSection />
nuxt.config.ts          # config Nuxt, preset PrimeVue, couleurs primaires, SEO/head
components/             # composants auto-importés, PascalCase
  HeroSection.vue       # hero plein écran, pinné par ScrollTrigger (#hero)
  InfoSection.vue       # regroupe les sections de contenu
  Highlights.vue        # mise en avant
  Program.vue           # programme du week-end
  Categories.vue        # catégories / niveaux
  Registration.vue      # inscription
  Venue.vue             # lieu
  CountDown.vue         # compte à rebours (Luxon)
  Partners.vue          # partenaires (logos dans public/)
  Contact.vue           # contacts
  InfoSection.vue
app/assets/css/main.css # styles globaux + thème Tailwind
public/                 # images, logos, favicon, fond-mila.jpeg
```

## Conventions

- Composants en `PascalCase`, un composant par fichier dans `components/` (auto-importés par Nuxt), avec `lang="ts"`.
- **Linter : oxlint**, config `.oxlintrc.jsonc`. Il tourne en mode strict (catégories `correctness`, `suspicious`, `pedantic`, `perf` en erreur). Le code doit passer `bun run lint` sans erreur.
  - Imports triés (externes puis internes), imports de types via `import type`.
  - Pas de `any`, pas d'assertion non-nulle (`!`), pas de variables globales non déclarées.
  - GSAP s'importe en **named exports** (`import { gsap } from "gsap"`) — les imports par défaut déclenchent `import/no-named-as-default`.
  - `nuxt.config.ts` et `app.vue` sont exemptés de `sort-keys` / `import/no-default-export` / `new-cap` (`overrides` du config).
- Indentation : 4 espaces dans les fichiers `.vue` et `.ts`.
- Pas de `src/` : Nuxt 3 utilise la structure à la racine (`app.vue`, `components/`, `app/`).
- Les couleurs de marque passent par le vocabulaire Tailwind du thème (`plan-cream-100`, `plan-navy-900`, etc.) et le preset PrimeVue. Éviter les couleurs codées en dur.
- Les styles PrimeVue se personnalisent via l'objet `pt` (pass-through) défini dans le `<script setup>` du composant.
- Le contenu visible est en français : garder les accents et la typographie française.
- `routeRules`/`prerender` sont définis dans `nuxt.config.ts` ; le SEO (title, OG, Twitter, JSON-LD) vit dans `nuxt.config.ts` et `app.vue`.

## Pièges

- `Highlights.vue` est utilisé dans `InfoSection.vue` — renommer le fichier impose de mettre à jour les usages.
- GSAP `ScrollSmoother` verrouille le scroll avec `#smooth-wrapper` en `position: fixed`. Les nouvelles sections doivent rester dans `#smooth-content`.
- `ScrollTrigger` pinné sur `#hero` : modifier la structure du hero peut casser le pinning.
- Le build échoue si une image référencée dans `public/` est absente.

## Vérification

Avant de considérer une tâche terminée :

1. `bun run build` passe sans erreur.
2. Les changements visuels sont vérifiés dans le navigateur (`bun run dev`).
3. Les textes français restent corrects (accents, cohérence).
