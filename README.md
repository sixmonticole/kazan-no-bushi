# Kazan No Bushi — XIVème édition

Site vitrine du stage de kendo **Kazan No Bushi**, les **28 et 29 novembre 2026** à l'**Artenium, Ceyrat** (63122).

Stage, passage de grade et compétition — **[kazan-no-bushi.fr](https://kazan-no-bushi.fr)**.

Site mono-page en français, généré en statique avec Nuxt 3.

## Stack

| Outil | Usage |
| --- | --- |
| [Nuxt 3](https://nuxt.com) + Vue 3 | Framework, SSR / prérendu |
| [PrimeVue 4](https://primevue.org) | Composants (preset Aura personnalisé) |
| [Tailwind CSS 4](https://tailwindcss.com) | Styles utilitaires et thème |
| [GSAP](https://gsap.com) | Animations de scroll (`ScrollTrigger`, `ScrollSmoother`) |
| [Luxon](https://moment.github.io/luxon/) | Compte à rebours jusqu'à l'événement |
| [oxlint](https://oxc.rs) | Linter strict |

Gestionnaire de paquets : **bun**.

## Démarrage

Installation des dépendances (déclenche aussi `nuxt prepare`) :

```bash
bun install
```

Serveur de développement sur <http://localhost:3000> :

```bash
bun run dev
```

## Scripts

```bash
bun run dev          # serveur de développement
bun run build        # build de production
bun run generate     # génération statique
bun run preview      # prévisualisation du build
bun run lint         # linter oxlint (strict)
bun run lint:fix     # linter + corrections automatiques
```

Il n'y a pas de tests automatisés ni de script `typecheck`. Une modification est considérée valide quand `bun run lint` et `bun run build` passent, et que le rendu a été vérifié dans le navigateur.

## Structure

```text
app.vue                  # layout racine : wrappers GSAP + HeroSection + InfoSection
nuxt.config.ts           # config Nuxt, preset PrimeVue, couleurs, SEO / Open Graph
components/              # composants auto-importés (PascalCase)
  HeroSection.vue        # hero plein écran, épinglé par ScrollTrigger (#hero)
  InfoSection.vue        # regroupe les sections de contenu + footer
  Highlights.vue         # mise en avant
  Program.vue            # programme du week-end
  Categories.vue         # catégories et niveaux
  Venue.vue              # lieu et accès
  Registration.vue       # inscriptions
  CountDown.vue          # compte à rebours (Luxon)
  Partners.vue           # partenaires
  Contact.vue            # moyens de contact
app/assets/css/main.css  # styles globaux + thème Tailwind
public/                  # images, logos, favicon, partenaires/
.opencode/               # configuration OpenCode (agents, commandes, permissions)
.oxlintrc.jsonc          # configuration du linter
```

## Conventions

- Composants en `PascalCase`, auto-importés par Nuxt, un par fichier, en `<script setup lang="ts">`.
- Indentation à **4 espaces** dans les fichiers `.vue` et `.ts`.
- Les couleurs de marque utilisent le vocabulaire du thème (`plan-navy-900`, `plan-cream-100`, `plan-orange-400`, etc.). Éviter les couleurs codées en dur.
- Les composants PrimeVue se personnalisent via l'objet `pt` (pass-through) dans le `<script setup>`.
- Le contenu visible est en français : accents et typographie corrects.
- Le SEO (title, Open Graph, Twitter, JSON-LD) est réparti entre `nuxt.config.ts` et `app.vue`.

### Linter

`oxlint` tourne en mode strict (catégories `correctness`, `suspicious`, `pedantic`, `perf` en erreur). Le style existant imposerait beaucoup de corrections purement cosmétiques, donc quelques règles trop opinionnées sont désactivées, notamment :

- `unicorn/filename-case` : Nuxt impose des composants en PascalCase ;
- `sort-keys` : le SEO et les presets PrimeVue de `nuxt.config.ts` sont exemptés ;
- `no-magic-numbers` : les valeurs du thème et du compte à rebours restent lisibles.

GSAP s'importe en **exports nommés**, car les modules exposent à la fois un export par défaut et un export nommé du même objet :

```ts
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

## Déploiement

Le projet est prérendu (`routeRules` dans `nuxt.config.ts`) et peut être déployé sur n'importe quel hébergeur statique. Voir la [documentation de déploiement Nuxt](https://nuxt.com/docs/getting-started/deployment).

## Organisation

- **ASM Kendo** — <kendo@asm-omnisports.com>
- [Instagram](https://www.instagram.com/asm_kendo/) · [Facebook](https://www.facebook.com/kazankendo)
