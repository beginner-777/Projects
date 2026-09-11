import type { Metadata } from "next";
import Work from "@/components/Work";
import { PROJECTS } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Work — Musfirah Shakeel",
  description: "Three shipped projects, not staged — by Musfirah Shakeel.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-ink/[0.07]">
        <Reveal className="mx-auto max-w-6xl px-6 pt-16 pb-4 sm:px-10">
          <p className="mb-4 font-mono text-[12px] tracking-[0.1em] text-wine-ash-soft">
            SELECTED WORK — {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <h1 className="mb-3 text-[38px] font-extrabold tracking-tight sm:text-[46px]">
            Three shipped, not staged.
          </h1>
          <p className="max-w-lg text-[15.5px] text-muted">
            Every project below is live or delivered — no concept-only work.
          </p>
        </Reveal>
      </header>
      <Work />
    </div>
  );
}
