# TODO — Kazan No Bushi 2026

État des tâches en cours pour l'édition 2026. Cocher au fur et à mesure.

## Livret et données à compléter

Ces informations sont affichées sur le site et dans le livret PDF. Elles sont
aujourd'hui des valeurs provisoires, à remplacer par les vraies.

- [ ] **URL HelloAsso 2026** — remplace `REGISTRATION_URL` dans `utils/content.ts`.
      Sert au bouton d'inscription et au QR code du livret.
- [ ] **Page Facebook de l'événement 2026** — remplace `EVENT_FACEBOOK_URL`
      dans `utils/content.ts`.
- [ ] **Date limite d'inscription** — `REGISTRATION_DEADLINE` dans
      `utils/content.ts` est fixée au 13 novembre 2026, à confirmer.
- [ ] **Revalider les hôtels** — noms, adresses, téléphones et tarifs repris
      du livret 2025, dans `HOTELS` (`utils/content.ts`).
- [ ] **Photos des artisans** — le livret 2025 montrait leurs produits. Pour
      l'instant, seuls le nom et la description figurent (`SHOPS`).
- [ ] **Année de naissance des catégories** — `AGE_CATEGORIES` a été décalée
      d'un an par rapport à 2025. À confirmer avec le règlement FFKDA.

## Contenu du site

- [ ] **Compléter le dimanche** — le déroulé des compétitions est marqué
      `incomplete: true` dans `SCHEDULE` (`utils/content.ts`).
- [ ] **Ouvrir les inscriptions** — `Registration.vue` affiche encore
      « Ouverture prochaine ».

## Avant le week-end

- [ ] Relancer `bun run build` après toute modification du contenu, pour
      regénérer `public/kazan-no-bushi-2026.pdf`.
- [ ] Vérifier le livret imprimé (marges, coupures, lisibilité).
- [ ] Relire les textes français (accents, typographie).

## Améliorations techniques optionnelles

- [ ] Enchaîner `bun run pdf` au `preview`, pour tester le PDF sur le build.
- [ ] Ajouter les tests d'impression automatisés (nombre de pages, format A4).
- [ ] Vérifier le rendu du livret sur mobile et tablette.
- [ ] Envisager `prefers-reduced-motion` sur les transitions du livret.

## Notes

- Le PDF est généré par `scripts/build-pdf.ts` via Puppeteer (Chrome headless).
  `bun run build` le régénère automatiquement avant le build.
- `bun run pdf` fonctionne seul : le script démarre un serveur Nuxt temporaire
  s'il n'y en a pas.
- Le livret ne passe pas par ScrollSmoother : son wrapper `position: fixed`
  tronquait l'impression (voir `app.vue`).
