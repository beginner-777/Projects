import { PROFILE } from "@/data/profile";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";
import AmbientGlow from "@/components/motion/AmbientGlow";

export default function About() {
  const { academics, careerGoal, interests } = PROFILE;

  const infoTiles = [
    {
      label: "EDUCATION",
      body: academics.educationSummary,
    },
    {
      label: "INTERESTS",
      body: interests,
    },
    {
      label: "CAREER GOAL",
      body: careerGoal,
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 relative overflow-hidden border-b border-ink/[0.07]"
    >
      {/* ambient wine-red bloom, same background language as the Hero, so
          About reads as part of one continuous world rather than a plain
          text block dropped in beneath it. */}
      <AmbientGlow
        className="pointer-events-none absolute left-[12%] top-0 mt-[-173px] h-[520px] w-[620px] opacity-60"
        gradient="radial-gradient(ellipse, rgba(160,30,45,0.4), rgba(120,20,35,0.12) 45%, transparent 72%)"
        speed={40}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="mb-4 font-mono text-[12px] tracking-[0.1em] text-wine-ash-soft">
            WHO I AM
          </p>
          <h2 className="mb-3 text-[32px] font-extrabold tracking-tight sm:text-[38px]">
            About Me
          </h2>
          <p className="mb-14 max-w-xl text-[15px] text-muted">
            My academic background, current standing, and the coursework shaping my
            engineering foundation.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* left: real academic standing as two glow tiles, not bare numbers */}
          <Reveal direction="left" className="flex flex-col gap-6">
            <TiltCard max={4} className="rounded-2xl bg-onyx-2 p-7">
              <div className="mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-full border border-dashed border-wine-ash/60">
                <div
                  className="flex h-[102px] w-[102px] flex-col items-center justify-center rounded-full border border-wine-ash-soft"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(194,59,75,0.18), transparent 70%)",
                  }}
                >
                  <div className="text-[26px] font-extrabold leading-none">
                    {academics.cgpa}
                  </div>
                  <div className="mt-1 font-mono text-[8.5px] text-muted">
                    / {academics.cgpaScale} CGPA
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard max={4} className="rounded-2xl bg-onyx p-7 text-center">
              <div className="text-[36px] font-extrabold leading-none">
                {academics.semestersCompleted}
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-wide text-muted">
                Semesters Completed
              </div>
            </TiltCard>
          </Reveal>

          {/* right: coursework + the three info tiles, each its own glow card */}
          <Reveal direction="right" delay={0.05}>
            <TiltCard max={3} className="mb-6 rounded-2xl bg-onyx p-7">
              <h3 className="mb-4 font-mono text-[11px] tracking-[0.1em] text-muted">
                RELEVANT COURSEWORK
              </h3>
              <StaggerGroup as="ul" className="flex flex-wrap gap-2" gap={0.04}>
                {academics.coursework.map((c) => (
                  <StaggerItem
                    as="li"
                    key={c}
                    className="beam-soft rounded-full bg-onyx-2 px-3.5 py-1.5 font-mono text-[11px] text-ink/90"
                  >
                    {c}
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </TiltCard>

            <StaggerGroup className="grid gap-5 sm:grid-cols-3" gap={0.08}>
              {infoTiles.map((tile) => (
                <StaggerItem key={tile.label} direction="scale">
                  <TiltCard max={3} className="h-full rounded-2xl bg-onyx-2 p-6">
                    <h3 className="mb-3 font-mono text-[11px] tracking-[0.1em] text-wine-ash-soft">
                      {tile.label}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-ink/85">
                      {tile.body}
                    </p>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
