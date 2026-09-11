"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";

const ALL = "All" as const;
type Filter = ProjectCategory | typeof ALL;

/** Real project artwork, toned with a wine-red duotone wash so three
 * differently-colored source images still read as one consistent gallery. */
function ProjectThumb({ project }: { project: Project }) {
  return (
    <>
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,10,12,0.15) 0%, rgba(11,10,12,0.35) 55%, rgba(11,10,12,0.85) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ background: "rgba(122,37,50,0.35)" }}
        aria-hidden
      />
    </>
  );
}

export default function Work() {
  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>();
    PROJECTS.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return [ALL, ...Array.from(set)] as Filter[];
  }, []);

  const [filter, setFilter] = useState<Filter>(ALL);

  const visible = useMemo(
    () =>
      filter === ALL ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <section className="border-b border-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === filter}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 font-mono text-[12px] transition-colors ${
                  c === filter
                    ? "border border-wine-ash bg-onyx text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <StaggerGroup
          key={filter}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {visible.map((project) => (
            <StaggerItem key={project.id} as="div" className="h-full">
              <Link href={`/work/${project.slug}`} className="block h-full">
                <TiltCard
                  max={5}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl transition-transform ${
                    project.featured ? "bg-onyx-2" : "bg-onyx"
                  }`}
                >
                  <div className="relative h-[180px] overflow-hidden bg-onyx-2">
                    <ProjectThumb project={project} />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div
                      className={`mb-2.5 font-mono text-[11px] ${
                        project.featured ? "text-cosmic" : "text-wine-ash-soft"
                      }`}
                    >
                      {project.kicker}
                    </div>
                    <h3 className="text-[19px] font-bold">{project.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div
                      className={`mt-4 font-mono text-[11px] ${
                        project.featured ? "text-cosmic" : "text-faint"
                      }`}
                    >
                      View project →
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
