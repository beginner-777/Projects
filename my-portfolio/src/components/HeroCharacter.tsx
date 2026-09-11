"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * The "living avatar" — a light cursor-reactive tilt on the whole figure, so
 * the "gaze tracks the cursor" caption is an honest description rather than
 * a mockup promise. Now sits directly inside the hero card (no separate
 * bordered portal box) so she reads as part of one scene, not a pasted-on
 * cutout — the card itself carries the glow.
 */
export default function HeroCharacter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const rotate = useTransform(springX, [-1, 1], [-4, 4]);
  const translateY = useTransform(springY, [-1, 1], [-4, 4]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x * 2);
    rawY.set(y * 2);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto h-[220px] w-[150px] shrink-0 sm:h-[260px] sm:w-[180px]"
    >
      <div
        className="pointer-events-none absolute -right-4 -top-2 h-[140px] w-[140px] rounded-full opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(194,59,75,0.16), transparent 70%)",
        }}
        aria-hidden
      />
      {/* outer node carries idle-float (CSS), inner motion node carries the
          cursor-tilt (Framer Motion) — two separate transforms on two
          separate elements so they don't clobber each other. */}
      <div className="idle-float relative h-full w-full">
        <motion.div className="relative h-full w-full" style={{ rotate, y: translateY }}>
          <Image
            src="/images/musfirah-front.png"
            alt="Musfirah Shakeel, illustrated"
            fill
            sizes="(max-width: 640px) 150px, 180px"
            className="object-contain object-bottom drop-shadow-[0_18px_16px_rgba(0,0,0,0.55)]"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
