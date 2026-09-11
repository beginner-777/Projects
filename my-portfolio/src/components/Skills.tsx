"use client";

import { useState } from "react";
import { SKILL_GROUPS } from "@/data/skills";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/**
 * One honest line of context per tab — what the tab actually proves, not
 * just what's in it. Facts only: "2 live AI capstones" is literally
 * TRACE AI + Musfirah AI from src/data/projects.ts, the university is
 * PROFILE.academics. This is what makes the tech list read as applied
 * skill rather than a checklist.
 */
const TAB_CONTEXT: Record<string, string> = {
  "ai-frontend": "The stack behind 2 live AI capstones — TRACE AI and Musfirah AI — shipped end to end, not just studied.",
  frontend: "Where it started, and still the foundation everything above sits on.",
  programming: "Coursework and the systems-thinking foundation from FUUAST.",
  tools: "How the work actually ships — version control, deployment, cross-device testing.",
};

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const [fading, setFading] = useState(false);
  const active = SKILL_GROUPS.find((g) => g.id === activeId) ?? SKILL_GROUPS[0];

  function selectTab(id: string) {
    if (id === activeId) return;
    // Plain CSS crossfade rather than Framer's AnimatePresence: fade the
    // current tab out, swap content, fade the new one in — see Reveal.tsx
    // for why this avoids Framer's animate() engine.
    setFading(true);
    window.setTimeout(() => {
      setActiveId(id);
      setFading(false);
    }, 160);
  }

  return (
    <section id="skills" className="scroll-mt-24 border-b border-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="mb-4 font-mono text-[12px] tracking-[0.1em] text-wine-ash-soft">
            TOOLKIT
          </p>
          <h2 className="mb-3 text-[32px] font-extrabold tracking-tight sm:text-[38px]">
            Skills &amp; Craft
          </h2>
          <p className="mb-10 max-w-xl text-[15px] text-muted">
            The languages, frameworks, and tools I use to bring ideas to life.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mb-5 flex flex-wrap gap-2">
          {SKILL_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => selectTab(group.id)}
              aria-pressed={group.id === activeId}
              className={`relative rounded-full border px-5 py-2.5 font-mono text-[12px] transition-colors ${
                group.id === activeId
                  ? "border-wine-ash bg-onyx text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {group.label}
            </button>
          ))}
        </Reveal>

        <p
          className="mb-8 max-w-xl text-[13px] italic text-muted transition-opacity duration-150"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {TAB_CONTEXT[activeId]}
        </p>

        <div
          className="relative min-h-[136px] transition-opacity duration-150 sm:min-h-[96px]"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <StaggerGroup as="ul" className="flex flex-wrap gap-3" gap={0.04}>
            {active.skills.map((skill) => (
              <StaggerItem
                as="li"
                key={skill}
                direction="scale"
                className="beam-soft group flex items-center gap-2.5 rounded-xl bg-onyx px-4 py-3 text-[14px] text-ink/90 transition-transform hover:-translate-y-1"
              >
                <span
                  className="h-[6px] w-[6px] shrink-0 rounded-full bg-wine-ash-soft transition-colors group-hover:bg-cosmic"
                  aria-hidden
                />
                {skill}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
