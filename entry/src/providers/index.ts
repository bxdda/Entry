import type { DailyWordProvider } from "./types";
import { apiConfig } from "../services/apiConfig";

import { mockWordnikProvider } from "./mockWordnikProvider";
import { mockMerriamWebsterProvider } from "./mockMerriamWebsterProvider";
import { mockOxfordProvider } from "./mockOxfordProvider";

import { realWordnikProvider } from "./realWordnikProvider";

/**
 * Mock providers used for development.
 */
const mockProviders: DailyWordProvider[] = [
  mockWordnikProvider,
  mockMerriamWebsterProvider,
  mockOxfordProvider,
];

/**
 * Real provider set.
 *
 * Wordnik is real now.
 * Merriam-Webster and Oxford still use mocks until we build them.
 */
const realProviders: DailyWordProvider[] = [
  realWordnikProvider,
  mockMerriamWebsterProvider,
  mockOxfordProvider,
];

/**
 * Active providers used by the app.
 */
export const dailyWordProviders: DailyWordProvider[] =
  apiConfig.providerMode === "real" ? realProviders : mockProviders;