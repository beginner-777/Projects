export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

/** Sourced verbatim from the Skills & Craft section of https://musfirah.vercel.app/ */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
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
