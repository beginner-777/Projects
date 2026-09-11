"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the content can be pulled toward the cursor, in px. */
  strength?: number;
};

/**
 * Wraps a button/link so it pulls slightly toward the cursor on hover and
 * springs back on leave — driven by `useMotionValue` + `useSpring`
 * (Framer's live, reactive motion-value system), the same mechanism
 * TiltCard already uses successfully. Deliberately not Framer's
 * `whileHover`/`animate` props: those go through Framer's declarative
 * tween engine, which — see Reveal.tsx — resolves instantly in this stack
 * rather than actually animating.
 */
export default function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const reduceMotion = useReducedMotion();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
