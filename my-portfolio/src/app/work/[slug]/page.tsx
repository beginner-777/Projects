import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Musfirah Shakeel`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl px-6 pt-10 sm:px-10">
        <Link href="/work" className="font-mono text-[12px] text-muted hover:text-ink">
          ← All work
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_420px] lg:items-start">
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.1em] text-wine-ash-soft">
              {project.kicker.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-cosmic/40 px-2.5 py-1 font-mono text-[10.5px] text-cosmic">
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic" aria-hidden />
              LIVE PROJECT
            </span>
          </div>
          <h1 className="mb-8 text-[40px] font-extrabold tracking-tight sm:text-[48px]">
            {project.title}
          </h1>

          {/* abstract preview panel — a browser-chrome mockup, never a
              fabricated screenshot */}
          <div className="beam-soft overflow-hidden rounded-2xl bg-onyx-2">
            <div className="flex h-9 items-center gap-2 border-b border-ink/[0.08] px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A2024]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A2024]" />
              <span className="h-2.5 w-2.5 rounded-full bg-cosmic" />
              <span className="ml-2.5 font-mono text-[10.5px] text-faint">
                {new URL(project.liveUrl).host}
              </span>
            </div>
            <div
              className="relative flex h-[360px] items-end justify-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse 420px 340px at 50% 55%, rgba(194,59,75,0.12), transparent 65%)",
              }}
            >
              <svg
                viewBox="0 0 320 320"
                className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 opacity-70"
                aria-hidden
              >
                <circle cx="160" cy="160" r="140" fill="none" stroke="#C23B4B" strokeWidth="1" opacity="0.4" />
                <circle cx="160" cy="160" r="95" fill="none" stroke="#7A2532" strokeWidth="1" opacity="0.5" />
                <circle cx="160" cy="20" r="4" fill="#C23B4B" />
                <circle cx="300" cy="160" r="3" fill="#F2EFEE" opacity="0.6" />
                <circle cx="160" cy="255" r="3" fill="#D98A96" />
              </svg>
              {project.id === "musfirah-ai" && (
                <div className="relative h-[290px] w-[170px]">
                  <Image
                    src="/images/musfirah-front.png"
                    alt=""
                    fill
                    sizes="170px"
                    className="object-contain object-bottom"
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mb-3 font-mono text-[11px] tracking-[0.1em] text-muted">
            PURPOSE
          </h2>
          <p className="mb-8 text-[14.5px] leading-relaxed text-ink/85">
            {project.purpose}
          </p>

          <h2 className="mb-3 font-mono text-[11px] tracking-[0.1em] text-muted">
            KEY FEATURES
          </h2>
          <ul className="mb-8 flex flex-col gap-2.5">
            {project.features.map((f) => (
              <li key={f} className="relative pl-4 text-[13.5px] text-ink/85">
                <span className="absolute left-0 text-cosmic">—</span>
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mb-3.5 font-mono text-[11px] tracking-[0.1em] text-muted">
            STACK
          </h2>
          <div className="mb-9 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/[0.14] px-3 py-1.5 font-mono text-[11px] text-ink/85"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="beam rounded-[10px] bg-onyx px-6 py-3.5 text-[13.5px] font-bold text-ink"
            >
              View live →
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-[10px] border border-wine-ash px-6 py-3 text-[13.5px] font-semibold text-ink"
              >
                GitHub
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
