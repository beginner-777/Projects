import { SKILL_GROUPS } from "@/data/skills";

// The real, shipped stack — same list that backs TRACE AI and Musfirah AI
// (see src/data/skills.ts for the sourcing note). Duplicated once below so
// the CSS loop (translateX 0 -> -50%) reads as seamless.
const TECH = SKILL_GROUPS[0].skills;

export default function TechTicker() {
  const loopItems = [...TECH, ...TECH];

  return (
    <div
      className="relative overflow-hidden border-b border-ink/[0.07] bg-onyx py-3"
      aria-hidden
    >
      <div className="tech-ticker-track flex w-max items-center gap-10">
        {loopItems.map((tech, i) => (
          <span key={`${tech}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-[11px] tracking-[0.16em] text-ink/70">
              {tech.toUpperCase()}
            </span>
            <span className="text-[10px] text-wine-ash-soft">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
