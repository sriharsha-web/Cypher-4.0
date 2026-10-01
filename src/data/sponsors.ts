export type SponsorConfig = {
  name: string;
  href: string;
  logo: string;
  color: string;
};

export const SPONSORSHIP_BROCHURE_PATH = "/Cypher-4.0-Sponsorship-Brochurepdf.pdf";

export const sponsors: SponsorConfig[] = [
  {
    name: "Walrus",
    href: "https://example.com/walrus",
    logo: "Walrus",
    color: "var(--c-walrus)",
  },
  {
    name: "DeepBook",
    href: "https://example.com/deepbook",
    logo: "DeepBook",
    color: "var(--c-deepbook)",
  },
  {
    name: "OpenZeppelin",
    href: "https://example.com/openzeppelin",
    logo: "OpenZeppelin",
    color: "var(--c-openzeppelin)",
  },
  {
    name: "OtterSec",
    href: "https://example.com/ottersec",
    logo: "OtterSec",
    color: "var(--c-ottersec)",
  },
  {
    name: "Scallop",
    href: "https://example.com/scallop",
    logo: "Scallop",
    color: "var(--c-scallop)",
  },
];
