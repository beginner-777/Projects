import { EXPERIENCE } from "@/data/experience";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-b border-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="mb-4 font-mono text-[12px] tracking-[0.1em] text-wine-ash-soft">
            EXPERIENCE
          </p>
          <h2 className="mb-3 text-[32px] font-extrabold tracking-tight sm:text-[38px]">
            Experience
          </h2>
          <p className="mb-12 max-w-xl text-[15px] text-muted">
            Where I put frontend engineering into practice.
          </p>
        </Reveal>

        <div className="relative">
          {/* timeline rail — a single real entry today, built to read as the
              start of a growing history rather than a lone bullet card */}
          <div
            className="absolute left-[7px] top-3 hidden h-[calc(100%-24px)] w-px bg-gradient-to-b from-wine-ash via-wine-ash/40 to-transparent sm:block"
            aria-hidden
          />

          {EXPERIENCE.map((entry) => (
            <Reveal key={entry.role} delay={0.08} direction="scale" className="relative">
              <div
                className="absolute left-0 top-3 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-cosmic bg-carbon sm:flex"
                aria-hidden
              >
                <span className="h-[5px] w-[5px] rounded-full bg-cosmic" />
              </div>

              <TiltCard max={3} className="rounded-2xl bg-onyx p-8 sm:ml-10 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cosmic/40 px-3 py-1 font-mono text-[10.5px] tracking-wide text-cosmic">
                      {entry.status.toUpperCase()}
                    </span>
                    <h3 className="text-[22px] font-bold">{entry.role}</h3>
                    <p className="mt-1 text-[15px] text-muted">
                      {entry.company} · {entry.dates}
                    </p>
                  </div>
                </div>

                {/* stat strip — the same bullet facts below, surfaced as
                    scannable numbers rather than buried in prose */}
                <div className="mt-7 grid grid-cols-3 gap-4 border-y border-ink/[0.07] py-6">
                  {entry.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[24px] font-extrabold leading-none text-ink sm:text-[28px]">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-[11.5px] leading-snug text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <StaggerGroup as="ul" className="mt-6 flex flex-col gap-3.5" gap={0.08}>
                  {entry.bullets.map((b) => (
                    <StaggerItem
                      as="li"
                      key={b}
                      direction="left"
                      className="flex gap-3 text-[13.5px] leading-relaxed text-ink/85"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-[3px] h-[14px] w-[14px] shrink-0 text-cosmic"
                        aria-hidden
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {b}
                    </StaggerItem>
                  ))}
                </StaggerGroup>

                <Magnetic strength={8} className="mt-7 inline-block">
                  <a
                    href={entry.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[9px] border border-ink/[0.18] px-5 py-2.5 font-mono text-[12px] font-semibold text-ink transition-colors hover:border-cosmic/50 hover:text-cosmic"
                  >
                    View Certificate of Completion
                    <span aria-hidden>→</span>
                  </a>
                </Magnetic>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
