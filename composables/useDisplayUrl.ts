const PROTOCOL_PATTERN = /^https?:\/\//u;
const TRAILING_SLASH_PATTERN = /\/$/u;

/**
 * Affiche l'URL complète d'un lien externe, sans le protocole ni le slash
 * final : utile une fois le livret imprimé, le lien reste lisible en clair.
 */
export function useDisplayUrl(): (href: string) => string {
    return (href: string): string =>
        href.replace(PROTOCOL_PATTERN, "").replace(TRAILING_SLASH_PATTERN, "");
}
