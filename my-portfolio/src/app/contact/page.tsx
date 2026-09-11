import type { Metadata } from "next";
import Image from "next/image";
import { PROFILE } from "@/data/profile";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "Contact — Musfirah Shakeel",
  description: "Get in touch with Musfirah Shakeel.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <Reveal>
          <p className="mb-5 font-mono text-[12px] tracking-[0.1em] text-wine-ash-soft">
            GET IN TOUCH
          </p>
          <h1 className="mb-4 max-w-lg text-[38px] font-extrabold leading-[1.15] tracking-tight sm:text-[46px]">
            Have a project worth building?
          </h1>
          <p className="mb-10 max-w-md text-[15px] text-muted">
            Open to internships, collaborations, and conversations about frontend
            engineering and AI. Reach out — I&rsquo;d love to hear what you&rsquo;re
            working on.
          </p>

          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-8">
          <div className="idle-sway relative mx-auto h-[300px] w-[190px] lg:mx-0">
            <Image
              src="/images/musfirah-side.png"
              alt="Musfirah Shakeel, illustrated"
              fill
              sizes="190px"
              className="object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          <TiltCard max={4} className="rounded-2xl bg-onyx-2 p-7">
            <div className="mb-1 text-[20px] font-extrabold tracking-tight">
              {PROFILE.name}
            </div>
            <div className="mb-6 font-mono text-[12px] text-muted">
              Former Frontend AI Engineering Intern @ FlyRank
            </div>
            <dl className="flex flex-col gap-3 font-mono text-[12.5px]">
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Email</dt>
                <dd>
                  <a href={`mailto:${PROFILE.contact.email}`} className="text-cosmic">
                    {PROFILE.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">GitHub</dt>
                <dd>
                  <a
                    href={PROFILE.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-cosmic"
                  >
                    See my repositories
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">LinkedIn</dt>
                <dd>
                  <a
                    href={PROFILE.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-cosmic"
                  >
                    Let&rsquo;s connect
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Resume</dt>
                <dd>
                  <a
                    href={PROFILE.contact.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-cosmic"
                  >
                    Download my CV
                  </a>
                </dd>
              </div>
            </dl>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
