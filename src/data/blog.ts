export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readingTime: string;
  content: string;
};

export const articles: Article[] = [
  {
    slug: "beyond-the-void",
    title: "Beyond the Void: New Paradigms in Space Travel",
    excerpt: "Exploring the next generation of interstellar propulsion systems and what they mean for human expansion.",
    category: "Technology",
    image: "/event4.jpeg",
    author: "Dr. Aris Vance",
    date: "Oct 12, 2026",
    readingTime: "6 MIN READ",
    content: "Space travel is on the cusp of a revolutionary leap. For decades, we have relied on chemical rockets, but the limitations of this technology have always been a bottleneck for true deep-space exploration.\\n\\nWith the advent of void-fusion drives, the paradigm is shifting. These new systems harness the ambient energy of the void, translating theoretical physics into tangible thrust.\\n\\n### The Mechanics of Void Propulsion\\n\\nAt the core of a void-fusion drive is the singularity core, a contained anomaly that generates immense gravitational waves. By manipulating these waves, we can effectively 'surf' spacetime, reducing travel times to neighboring star systems from centuries to mere months.\\n\\nThe implications are staggering. No longer are we confined to our local system. The stars are finally within reach."
  },
  {
    slug: "designing-for-zero-g",
    title: "Designing for Zero-G Environments",
    excerpt: "How architecture must adapt when gravity is no longer a constant.",
    category: "Design",
    image: "/event2.jpeg",
    author: "Elena Rostova",
    date: "Sep 28, 2026",
    readingTime: "4 MIN READ",
    content: "When you remove gravity from the equation, everything changes. Up and down become subjective. Walls become floors, ceilings become workspaces.\\n\\nDesigning for zero-G requires a complete shift in perspective. It's not just about bolting things down; it's about understanding how the human body moves in a frictionless, weightless environment.\\n\\n### Flow and Function\\n\\nThe most successful zero-G designs prioritize flow. We use soft curves, modular handholds, and spatial cues to guide movement. The goal is to make moving through the environment feel intuitive and natural, like swimming."
  },
  {
    slug: "the-psychology-of-isolation",
    title: "The Psychology of Deep Space Isolation",
    excerpt: "Understanding the mental toll of long-duration space missions.",
    category: "Insights",
    image: "/event3.jpeg",
    author: "Dr. Silas Thorne",
    date: "Sep 15, 2026",
    readingTime: "8 MIN READ",
    content: "The greatest challenge of deep space exploration isn't technological; it's psychological. The sheer vastness of space, the profound isolation, and the knowledge that you are light-years away from everything you know takes a heavy toll on the human mind.\\n\\n### Coping Mechanisms\\n\\nWe are developing new protocols to support astronaut mental health. These include advanced virtual reality simulations, AI companions designed for empathetic interaction, and rigorous psychological screening.\\n\\nThe journey to the stars is as much an internal journey as it is an external one."
  },
  {
    slug: "alien-skies",
    title: "Alien Skies: Exoplanet Atmospheric Analysis",
    excerpt: "Decoding the composition of atmospheres on distant worlds.",
    category: "Science",
    image: "/event5.jpeg",
    author: "Nova Lin",
    date: "Aug 30, 2026",
    readingTime: "5 MIN READ",
    content: "Every exoplanet has a unique atmospheric signature. By analyzing the light that passes through these atmospheres, we can determine their composition, weather patterns, and potential for harboring life.\\n\\n### The Search for Biosignatures\\n\\nWe are looking for specific gases—oxygen, methane, ozone—that, when found together, strongly suggest the presence of biological processes. It's a meticulous search, a cosmic game of hide-and-seek, but the reward is the greatest discovery in human history."
  }
];
