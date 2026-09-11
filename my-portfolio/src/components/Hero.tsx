import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import HeroCharacter from "@/components/HeroCharacter";
import AmbientGlow from "@/components/motion/AmbientGlow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/[0.07] py-20 sm:py-28">
      {/* ambient wine-red bloom behind the stack — background only, the
          cards and everything inside them stay perfectly sharp */}
      {/* centered via fixed negative margins rather than a translate
          utility — Framer Motion owns the `transform` property for the
          scroll-linked drift below, so centering can't also live there */}
      <AmbientGlow
        className="pointer-events-none absolute left-1/2 top-[38%] ml-[-450px] mt-[-320px] h-[640px] w-[900px] opacity-70"
        gradient="radial-gradient(ellipse, rgba(160,30,45,0.5), rgba(120,20,35,0.18) 45%, transparent 72%)"
        speed={50}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,239,238,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,238,0.02) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        {/* Mobile: both cards in normal document flow, stacked with a gap —
            nothing overlaps or hides. From sm: up, the back card is pulled
            into the overlapping "peeking behind" stack from the reference. */}
        <div className="relative mx-auto flex w-full max-w-[600px] flex-col gap-6 sm:block sm:gap-0 sm:pb-[260px]">
          {/* front card — the hero itself */}
          <div className="stack-front glow-card relative z-[1] overflow-hidden rounded-[22px] bg-onyx-2">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(194,59,75,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(194,59,75,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />
            <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-10">
              <div className="max-w-[300px]">
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-wine-ash-soft">
                  <span className="h-[6px] w-[6px] rounded-full bg-cosmic" aria-hidden />
                  {PROFILE.roles[0].toUpperCase()}
                </p>
                <h1 className="text-[32px] font-extrabold leading-[1.12] tracking-tight sm:text-[38px]">
                  Hi, I&rsquo;m
                  <br />
                  Musfirah.
                </h1>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                  {PROFILE.bio}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/work"
                    className="shimmer-btn rounded-[9px] bg-cosmic px-6 py-3 text-[12.5px] font-extrabold text-carbon"
                  >
                    See the work
                  </Link>
                  <a
                    href={PROFILE.contact.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[9px] border border-ink/[0.18] px-5 py-[10px] text-[12.5px] font-semibold text-ink transition-colors hover:border-ink/40"
                  >
                    Résumé
                  </a>
                </div>
              </div>

              <HeroCharacter />
            </div>
          </div>

          {/* back card — real stats. Normal-flow block on mobile (just sits
              below the hero card); absolute + tilted, peeking out behind the
              hero card, from sm: up. */}
          <div className="stack-back glow-card relative w-full rounded-2xl bg-onyx p-7 sm:absolute sm:left-4 sm:top-[360px] sm:w-[calc(100%-2rem)] sm:p-8">
            <div className="font-mono text-[10.5px] tracking-[0.1em] text-wine-ash-soft">
              SELECTED WORK
            </div>
            <div className="mt-2 max-w-[220px] text-[17px] font-bold leading-snug sm:text-[19px]">
              Three shipped, not staged.
            </div>

            <div className="absolute right-6 top-6 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-dashed border-wine-ash/60 sm:h-[130px] sm:w-[130px]">
              <div
                className="flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full border border-wine-ash-soft sm:h-[98px] sm:w-[98px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(194,59,75,0.18), transparent 70%)",
                }}
              >
                <div className="text-[18px] font-extrabold sm:text-[26px]">
                  {PROJECTS.length}
                </div>
                <div className="font-mono text-[7px] text-muted sm:text-[8px]">
                  LIVE PROJECTS
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-6 font-mono text-[11px] text-muted sm:mt-8">
              <div>
                <span className="text-[13px] font-bold text-ink">
                  {EXPERIENCE.length}
                </span>{" "}
                internship
              </div>
              <div>
                <span className="text-[13px] font-bold text-ink">
                  {PROFILE.academics.cgpa}
                </span>{" "}
                CGPA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
