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
  "Eligibility for prizes",
];

export const PASSES: Record<PassId, PassConfig> = {
  atrians: {
    id: "atrians",
    name: "ATRIANS",
    description: "Entry-level orbital access for Atria personnel.",
    perPerson: 250,
    featured: false,
    benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
    pricing: {
      2: 500,
      3: 750,
      4: 1000,
    },
  },
  "non-atrians": {
    id: "non-atrians",
    name: "NON-ATRIANS",
    description: "Interstellar access for all external technical entities.",
    perPerson: 290,
    featured: true,
    benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
    pricing: {
      2: 580,
      3: 870,
      4: 1160,
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
