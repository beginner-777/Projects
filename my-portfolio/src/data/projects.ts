export type ProjectCategory = "AI / ML" | "3D & Interaction" | "Client Work";

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Short category/kicker line, e.g. "First Capstone · AI / Frontend" */
  kicker: string;
  role: string;
  period: string;
  /** One-line summary used on cards. */
  description: string;
  /** Longer purpose paragraph used on the project detail page. */
  purpose: string;
  features: string[];
  tags: string[];
  categories: ProjectCategory[];
  liveUrl: string;
  githubUrl?: string;
  /** Shown as the "active" / demo card on Home and Work. */
  featured?: boolean;
  /** Real thumbnail artwork supplied for this project. */
  image: string;
}

/**
 * Single source of truth for the Work section, sourced from the previous
 * portfolio (https://musfirah.vercel.app/) and résumé. Add a project here and
 * it automatically appears in the grid, the filter bar, and gets its own
 * /work/[slug] detail page.
 */
export const PROJECTS: Project[] = [
  {
    id: "musfirah-ai",
    slug: "musfirah-ai",
    title: "Musfirah AI",
    kicker: "First Capstone · AI / Frontend",
    role: "Interactive AI Portfolio",
    period: "August 2026",
    description:
      "A responsive AI-focused portfolio combining polished interactions, clean visual design, and a production deployment.",
    purpose:
      "Centralizes three recruiter-facing content areas — skills, projects, and career information — in one responsive, interactive portfolio, so visitors can review the work from a single experience instead of scrolling a static résumé.",
    features: [
      "Responsive layout tuned for desktop, tablet and mobile",
      "Interactive UI details built for a polished first impression",
      "Deployed and iterated on in production, not left as a static mockup",
    ],
    tags: ["React", "JavaScript", "Responsive Design", "Interactive UI"],
    categories: ["AI / ML", "3D & Interaction"],
    liveUrl: "https://musfirahai.vercel.app/",
    featured: true,
    image: "/images/thumbs/musfirah-ai.jpg",
  },
  {
    id: "trace-ai",
    slug: "trace-ai",
    title: "TRACE AI",
    kicker: "Second Capstone · AI Incident Intelligence",
    role: "AI Incident Investigation Workspace",
    period: "August 2026",
    description:
      "An AI incident investigation workspace that converts logs and technical evidence into a timeline, affected-service map, ranked hypotheses, and recovery plan.",
    purpose:
      "Converts unstructured incident logs into four decision-ready outputs — a timeline, an affected-service map, ranked root-cause hypotheses, and a recovery plan — so responders can move from raw evidence to a structured investigation. The Gemini API integration runs server-side, keeping credentials out of client code.",
    features: [
      "Timeline, affected-service map, hypotheses and recovery plan generated from raw logs",
      "Server-side Gemini API integration — no credentials reach the client",
      "Built to WCAG AA accessibility standards",
    ],
    tags: ["Gemini AI", "Next.js", "Three.js", "WCAG AA", "TypeScript", "Tailwind CSS"],
    categories: ["AI / ML", "3D & Interaction"],
    liveUrl: "https://trace-ai-workspace.vercel.app/",
    githubUrl: "https://github.com/beginner-777/Internship",
    image: "/images/thumbs/trace-ai.jpg",
  },
  {
    id: "premium-sofa-curtains",
    slug: "premium-sofa-curtains",
    title: "Premium Sofa Curtains",
    kicker: "Client Work · Furnishing / E-commerce",
    role: "Paid Client Website",
    period: "July 2026",
    description:
      "A production-ready furnishing business website built for a real client, featuring a modern responsive interface and English/Arabic language support.",
    purpose:
      "A production website for a paying home-furnishing client with English/Arabic language switching, mobile navigation, and curtain-inspired motion details, so both customer groups can browse the same live site end to end.",
    features: [
      "English / Arabic language support",
      "Responsive mobile navigation",
      "Elegant curtain-inspired animations",
      "Optimized performance and Vercel deployment",
    ],
    tags: [
      "Responsive Design",
      "English / Arabic Support",
      "Mobile Navigation",
      "Curtain-Inspired Animations",
      "Vercel Deployment",
    ],
    categories: ["Client Work"],
    liveUrl: "https://premium-sofa-curtains.vercel.app/",
    githubUrl: "https://github.com/beginner-777/Internship",
    image: "/images/thumbs/premium-sofa-curtains.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
