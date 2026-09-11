"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SKILL_GROUPS } from "@/data/skills";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const active = SKILL_GROUPS.find((g) => g.id === activeId) ?? SKILL_GROUPS[0];

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

        <Reveal delay={0.1} className="mb-8 flex flex-wrap gap-2">
          {SKILL_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveId(group.id)}
              aria-pressed={group.id === activeId}
              className={`relative rounded-full px-5 py-2.5 font-mono text-[12px] transition-colors ${
                group.id === activeId ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {group.id === activeId && (
                <motion.span
                  layoutId="skills-tab-highlight"
                  className="absolute inset-0 rounded-full border border-wine-ash bg-onyx"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{group.label}</span>
            </button>
          ))}
        </Reveal>

        <div className="relative min-h-[136px] sm:min-h-[96px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
