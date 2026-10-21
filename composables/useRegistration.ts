/**
 * URL de la page d'inscription HelloAsso, fournie par l'environnement.
 *
 * Tant que la variable est absente (ou vide), la résolution renvoie `null` :
 * les composants affichent alors un texte d'attente à la place du lien, plutôt
 * qu'un bouton qui ne mène nulle part. La valeur est figée au build/prerender
 * via `runtimeConfig.public`, où elle peut venir d'un fichier `.env`.
 */
export function useRegistration(): {
    registrationUrl: Ref<string | null>;
    hasRegistration: Ref<boolean>;
} {
    const config = useRuntimeConfig();

    const registrationUrl = computed(() => {
        const raw = config.public.helloassoUrl?.trim();

        return raw ? raw : null;
    });

    return {
        registrationUrl,
        hasRegistration: computed(() => registrationUrl.value !== null),
    };
}
