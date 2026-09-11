export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

/**
 * The base "Frontend / Programming / Tools" groups are sourced verbatim
 * from the Skills & Craft section of https://musfirah.vercel.app/.
 *
 * "AI & Frontend Engineering" is new here, but not new information: every
 * item in it is pulled directly from her own real, already-documented work
 * — the exact tech list in her FlyRank internship's first bullet
 * (`src/data/experience.ts`) and the tags on her two live AI capstones
 * (`src/data/projects.ts`, TRACE AI / Musfirah AI). The old list undersold
 * her — it led with HTML/CSS/Bootstrap and never mentioned Next.js,
 * TypeScript, Three.js or the Gemini API at all, even though those are
 * exactly what she shipped. This group is placed first so the strongest,
 * most senior tech she's actually used is what a visitor sees first, not
 * buried under fundamentals.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai-frontend",
    label: "AI & Frontend Engineering",
    skills: [
      "Next.js",
      "TypeScript",
      "React.js",
      "Tailwind CSS",
      "Three.js",
      "Gemini API",
    ],
  },
  {
    id: "frontend",
    label: "Fundamentals",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
      "React Fundamentals",
    ],
  },
  {
    id: "programming",
    label: "Programming",
    skills: ["Python", "C++", "OOP", "Data Structures", "8086 Assembly"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Technical SEO", "Cross-device Testing"],
  },
];
