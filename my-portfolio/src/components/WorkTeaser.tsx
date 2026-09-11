import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";

export default function WorkTeaser() {
  return (
    <section className="border-b border-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal className="mb-6 flex items-baseline justify-between">
          <p className="font-mono text-[12px] tracking-[0.1em] text-muted">
            SELECTED WORK
          </p>
          <Link href="/work" className="font-mono text-[11px] text-faint hover:text-ink">
            {PROJECTS.length} projects →
          </Link>
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-3" gap={0.1}>
          {PROJECTS.map((project, i) => (
            <StaggerItem key={project.id} as="div" direction="scale" className="h-full">
              <Link href={`/work/${project.slug}`} className="group block h-full">
                <TiltCard
                  max={5}
                  className={`flex h-full flex-col overflow-hidden rounded-xl transition-transform ${
                    project.featured ? "bg-onyx-2" : "bg-onyx"
                  }`}
                >
                  <div className="relative h-[110px] overflow-hidden bg-onyx-2">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,10,12,0.1) 0%, rgba(11,10,12,0.5) 70%, rgba(11,10,12,0.92) 100%)",
                      }}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-overlay"
                      style={{ background: "rgba(122,37,50,0.35)" }}
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div
                      className={`mb-2 font-mono text-[11px] ${
                        project.featured ? "text-cosmic" : "text-wine-ash-soft"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                      {project.featured ? " — active" : ""}
                    </div>
                    <div className="text-[16px] font-bold">{project.title}</div>
                    <div
                      className={`mt-3 font-mono text-[11px] ${
                        project.featured ? "text-cosmic" : "text-faint"
                      }`}
                    >
                      View live →
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
