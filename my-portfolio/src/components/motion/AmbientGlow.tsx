"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type AmbientGlowProps = {
  /** Position/size classes — everything except color, same as a plain div. */
  className: string;
  gradient: string;
  /** How far (px) the glow drifts across the full scroll range of its section. */
  speed?: number;
};

/**
 * A section's background bloom, drifting gently as the page scrolls past
 * it — continuous, scroll-linked motion rather than a one-shot,
 * threshold-triggered fade. This is what keeps the page feeling alive
 * throughout a scroll, not just at the instant each section arrives.
 */
export default function AmbientGlow({ className, gradient, speed = 70 }: AmbientGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ background: gradient, y: reduceMotion ? 0 : y }}
      aria-hidden
    />
  );
}
