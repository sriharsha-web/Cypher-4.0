/**
 * Centralized pass & pricing configuration supporting pricing tiers/slabs.
 * Pricing is manually controlled via ACTIVE_SLAB.
 */

export type PassId = "atrians" | "non-atrians";
export type SlabId = "early-bird" | "slab-1" | "slab-2";

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
  "slab-2": {
    id: "slab-2",
    label: "Slab 2",
    badgeText: "SLAB 2 CLOSED • STAY TUNED FOR SLAB 3",
    passes: {
      atrians: {
        id: "atrians",
        name: "ATRIANS",
        description: "Entry-level orbital access for Atria personnel.",
        perPerson: 310,
        featured: false,
        benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
        pricing: {
          2: 620,
          3: 930,
          4: 1240,
        },
      },
      "non-atrians": {
        id: "non-atrians",
        name: "NON-ATRIANS",
        description: "Interstellar access for all external technical entities.",
        perPerson: 330,
        featured: true,
        benefits: ["Team of up to 4 members", ...SHARED_BENEFITS],
        pricing: {
          2: 660,
          3: 990,
          4: 1320,
        },
      },
    },
  },
};

/** Whether registrations are currently closed between slabs */
export const REGISTRATION_CLOSED = true;
export const REGISTRATION_CLOSED_MESSAGE = "Slab 2 closed for registrations, stay tuned for Slab 3.";

/** Active pricing slab - manually configurable */
export const ACTIVE_SLAB: SlabId = "slab-2";

/** Default passes based on active slab */
export const PASSES: Record<PassId, PassConfig> = SLABS[ACTIVE_SLAB].passes;

export function getPassesForSlab(slabId: SlabId = ACTIVE_SLAB): Record<PassId, PassConfig> {
  return SLABS[slabId]?.passes ?? SLABS[ACTIVE_SLAB].passes;
}

export function getPass(id: string, slabId: SlabId = ACTIVE_SLAB): PassConfig | undefined {
  const passes = getPassesForSlab(slabId);
  return passes[id as PassId];
}

export type MemberAffiliation = "atrian" | "non-atrian";

/**
 * Calculates total price for a team, supporting mixed Atrian/Non-Atrian affiliation
 * when registering under the Atrians pass.
 */
export function calculateTeamPrice(
  passId: string,
  memberAffiliations: MemberAffiliation[],
  slabId: SlabId = ACTIVE_SLAB
): number | undefined {
  const pass = getPass(passId, slabId);
  if (!pass) return undefined;
  const teamSize = memberAffiliations.length;
  if (teamSize < MIN_TEAM_SIZE || teamSize > MAX_TEAM_SIZE) return undefined;

  const passes = getPassesForSlab(slabId);
  const atrianPrice = passes.atrians.perPerson;
  const nonAtrianPrice = passes["non-atrians"].perPerson;

  if (passId === "non-atrians") {
    return teamSize * nonAtrianPrice;
  }

  // Atrians pass: Leader is always atrian, other members billed according to affiliation
  let total = 0;
  for (let i = 0; i < teamSize; i++) {
    const isAtrian = i === 0 ? true : memberAffiliations[i] === "atrian";
    total += isAtrian ? atrianPrice : nonAtrianPrice;
  }
  return total;
}

export function getPrice(passId: string, teamSize: number, slabId: SlabId = ACTIVE_SLAB): number | undefined {
  const pass = getPass(passId, slabId);
  if (!pass) return undefined;
  if (teamSize < 2 || teamSize > 4) return undefined;
  return pass.pricing[teamSize as 2 | 3 | 4];
}

export const MIN_TEAM_SIZE = 2;
export const MAX_TEAM_SIZE = 4;

