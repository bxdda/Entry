/**
 * Controls whether the app uses fake mock providers or real API providers.
 *
 * Current values:
 * - "mock" = use local hardcoded providers
 * - "real" = use live API providers later
 */
export type ProviderMode = "mock" | "real";

function getProviderMode(): ProviderMode {
  const mode = import.meta.env.VITE_PROVIDER_MODE;

  if (mode === "real") {
    return "real";
  }

  return "mock";
}

export const apiConfig = {
  providerMode: getProviderMode(),

  wordnikApiKey: import.meta.env.VITE_WORDNIK_API_KEY ?? "",

  merriamWebsterApiKey:
    import.meta.env.VITE_MERRIAM_WEBSTER_API_KEY ?? "",

  oxfordAppId: import.meta.env.VITE_OXFORD_APP_ID ?? "",
  oxfordAppKey: import.meta.env.VITE_OXFORD_APP_KEY ?? "",
};

export function hasApiKey(value: string): boolean {
  return value.trim().length > 0;
}