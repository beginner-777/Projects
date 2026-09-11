// Sourced verbatim from https://musfirah.vercel.app/ (Experience section).

export interface ExperienceEntry {
  status: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
  certificateUrl: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    status: "Internship completed",
    role: "Frontend AI Engineering Intern",
    company: "FlyRank",
    dates: "July 2026 – August 2026",
    bullets: [
      "Delivered 2 live AI capstones — TRACE AI and Musfirah AI — using React.js, Next.js, TypeScript, Tailwind CSS, Three.js, and the Gemini API",
      "Converted design and content requirements into responsive React.js & Bootstrap components, tested across mobile and desktop",
      "Built a server-side Gemini API integration for TRACE AI, keeping credentials out of client code",
      "Closed navigation and responsiveness defects via cross-device testing, documented in Git/GitHub and Vercel release notes",
    ],
    certificateUrl: "https://musfirah.vercel.app/certificate-of-completion.pdf",
  },
];
