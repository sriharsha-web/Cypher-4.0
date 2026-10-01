/**
 * Centralized pass & pricing configuration.
 * Change the six price values below without touching any UI or API logic.
 */

export type PassId = "atrians" | "non-atrians";

export interface PassConfig {
  id: PassId;
  name: string;
  description: string;
  perPerson: number;
  featured: boolean;
  benefits: string[];
  pricing: Record<2 | 3 | 4, number>;
}

const SHARED_BENEFITS = [
  "Access to mentors & workshops",
  "Swag kit included",
  "Meals & refreshments provided",
  "Certificate of participation",
  "Priority seating during talks",
  "Awards, bounties & recognition",
];

export const PASSES: Record<PassId, PassConfig> = {
  atrians: {
    id: "atrians",
    name: "ATRIANS",
    description: "Entry-level orbital access for Atria personnel.",
    perPerson: 260,
    featured: false,
    benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
    pricing: {
      2: 520,
      3: 780,
      4: 1040,
    },
  },
  "non-atrians": {
    id: "non-atrians",
    name: "NON-ATRIANS",
    description: "Interstellar access for all external technical entities.",
    perPerson: 280,
    featured: true,
    benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
    pricing: {
      2: 560,
      3: 840,
      4: 1120,
    },
  },
};

export function getPass(id: string): PassConfig | undefined {
  return PASSES[id as PassId];
}

export function getPrice(passId: string, teamSize: number): number | undefined {
  const pass = getPass(passId);
  if (!pass) return undefined;
  if (teamSize < 2 || teamSize > 4) return undefined;
  return pass.pricing[teamSize as 2 | 3 | 4];
}

export const MIN_TEAM_SIZE = 2;
export const MAX_TEAM_SIZE = 4;
export const EARLY_BIRD_LIMIT = 5;
