---
description: Vérifie que le site compile (build Nuxt) avant de valider une tâche
agent: build
---

Vérifie que le projet compile, puis rapporte le résultat.

Étapes :

1. Lance `bun run lint` et corrige toute erreur oxlint (le lint doit passer sans erreur).
2. Lance `bun run build`.
3. Si le build échoue, identifie la cause exacte (fichier, composant, import, asset manquant) et propose un correctif ciblé.
4. Si tout passe, résume ce qui a été vérifié et signale les avertissements éventuels.

Ne modifie pas le contenu éditorial. Objectif : $ARGUMENTS
