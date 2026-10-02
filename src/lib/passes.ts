/**
 * Centralized pass & pricing configuration supporting pricing tiers/slabs.
 * Pricing is manually controlled via ACTIVE_SLAB.
 */

export type PassId = "atrians" | "non-atrians";
export type SlabId = "early-bird" | "slab-1";

export interface PassConfig {
  id: PassId;
  name: string;
  description: string;
  perPerson: number;
  featured: boolean;
  benefits: string[];
  pricing: Record<2 | 3 | 4, number>;
}

export interface SlabConfig {
  id: SlabId;
  label: string;
  badgeText: string;
  passes: Record<PassId, PassConfig>;
}

const SHARED_BENEFITS = [
  "Access to mentors & workshops",
  "Swag kit included",
  "Meals & refreshments provided",
  "Certificate of participation",
  "Priority seating during talks",
  "Awards, bounties & recognition",
];

export const SLABS: Record<SlabId, SlabConfig> = {
  "early-bird": {
    id: "early-bird",
    label: "Early Bird",
    badgeText: "EARLY BIRD PRICES",
    passes: {
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
    },
  },
  "slab-1": {
    id: "slab-1",
    label: "Slab 1",
    badgeText: "SLAB 1 PRICES",
    passes: {
      atrians: {
        id: "atrians",
        name: "ATRIANS",
        description: "Entry-level orbital access for Atria personnel.",
        perPerson: 280,
        featured: false,
        benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
        pricing: {
          2: 560,
          3: 840,
          4: 1120,
        },
      },
      "non-atrians": {
        id: "non-atrians",
        name: "NON-ATRIANS",
        description: "Interstellar access for all external technical entities.",
        perPerson: 300,
        featured: true,
        benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
        pricing: {
          2: 600,
          3: 900,
          4: 1200,
        },
      },
    },
  },
};

/** Active pricing slab - manually configurable */
export const ACTIVE_SLAB: SlabId = "early-bird";

/** Default passes based on active slab */
export const PASSES: Record<PassId, PassConfig> = SLABS[ACTIVE_SLAB].passes;

export function getPassesForSlab(slabId: SlabId = ACTIVE_SLAB): Record<PassId, PassConfig> {
  return SLABS[slabId]?.passes ?? SLABS[ACTIVE_SLAB].passes;
}

export function getPass(id: string, slabId: SlabId = ACTIVE_SLAB): PassConfig | undefined {
  const passes = getPassesForSlab(slabId);
  return passes[id as PassId];
}

export function getPrice(passId: string, teamSize: number, slabId: SlabId = ACTIVE_SLAB): number | undefined {
  const pass = getPass(passId, slabId);
  if (!pass) return undefined;
  if (teamSize < 2 || teamSize > 4) return undefined;
  return pass.pricing[teamSize as 2 | 3 | 4];
}

export const MIN_TEAM_SIZE = 2;
export const MAX_TEAM_SIZE = 4;
