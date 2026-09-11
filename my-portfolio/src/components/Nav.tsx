"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data/profile";
import Magnetic from "@/components/motion/Magnetic";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.07] bg-carbon/85 backdrop-saturate-150">
      <div className="mx-auto flex min-h-[84px] max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-wine-ash/50 bg-onyx-2 font-display text-[13px] font-extrabold tracking-tight text-cosmic"
          >
            MS
          </span>
          <span className="text-[18px] font-extrabold tracking-tight">{PROFILE.name}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-5 font-mono text-[12px] tracking-wide text-muted sm:gap-8">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "border-b-2 border-wine-ash pb-2 text-ink"
                    : "transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Magnetic strength={8}>
            <Link
              href="/contact"
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 transition-colors ${
                pathname.startsWith("/contact")
                  ? "border-ink/40 text-ink"
                  : "border-ink/20 text-ink hover:border-ink/40"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-wine-ash" aria-hidden />
              Contact
            </Link>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
