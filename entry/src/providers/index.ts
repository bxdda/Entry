import type { DailyWordProvider } from "./types";
import { mockWordnikProvider } from "./mockWordnikProvider";
import { mockMerriamWebsterProvider } from "./mockMerriamWebsterProvider";
import { mockOxfordProvider } from "./mockOxfordProvider";

/**
 * All active providers for the app.
 *
 * Right now these are mock providers.
 * Later, we can replace these one-by-one with real API providers.
 */
export const dailyWordProviders: DailyWordProvider[] = [
  mockWordnikProvider,
  mockMerriamWebsterProvider,
  mockOxfordProvider,
];