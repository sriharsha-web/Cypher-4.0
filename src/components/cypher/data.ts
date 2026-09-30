export type Track = { number: string; title: string; time: string; copy: string; accent: string };

export const tracks: Track[] = [
  {
    number: "01",
    title: "Check-in & Registrations",
    time: "12:00 PM – 02:00 PM",
    copy: "Participants arrive at the venue or log in online. Check-in, registrations and team verification are completed.",
    accent: "purple",
  },
  {
    number: "02",
    title: "Orientation & Introduction",
    time: "02:00 PM – 04:00 PM",
    copy: "Welcome address, event briefing, and orientation. Problem statements and rules are revealed. Teams can start brainstorming.",
    accent: "acid",
  },
  {
    number: "03",
    title: "Hacking Session",
    time: "04:00 PM – tentative (Next Day)",
    copy: "Teams begin working on their projects. Mentors are available for guidance throughout the event. Dinner and breakfast will be provided.",
    accent: "cyan",
  },
  {
    number: "04",
    title: "Evaluation and Presentation",
    time: "10:30 AM – 01:30 PM",
    copy: "Teams submit and present their projects to the judges.",
    accent: "white",
  },
  {
    number: "05",
    title: "Prize Distribution",
    time: "01:30 PM – 04:00 PM",
    copy: "Winners are announced, and prizes are distributed.",
    accent: "red",
  },
];

export const journey = [
  ["01", "Launchpad", "Collect your mission kit and squad ID at the orbital terminal."],
  ["02", "Comm-Link", "Briefing from Galactic Command on primary mission goals."],
  ["03", "Hyperdrive", "while(alive) { build(); ship(); }"],
  ["04", "Planetary Entry", "Final code commit. Judging by the architecture board begins."],
  ["05", "Supernova", "Top squads present to technical architects and mentors."],
] as const;