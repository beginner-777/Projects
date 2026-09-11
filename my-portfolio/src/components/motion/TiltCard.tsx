"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Kept small so grids of these stay calm, not chaotic. */
  max?: number;
  /** A slight resting lean, like the cards in the reference stack — 0 keeps it flat until hovered. */
  restRotate?: number;
};

/**
 * The same cursor-reactive tilt the Hero character already used, generalized
 * into a reusable card wrapper: a small 3D lean toward the pointer plus the
 * wine-red glow shadow, so the "glass card stack" language reads consistently
 * across project cards, the experience card, and the contact card — not just
 * the Hero. Content inside stays perfectly sharp; only the tilt + shadow move.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
  restRotate = 0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(springY, [-1, 1], [max, -max]);
  const rotateY = useTransform(springX, [-1, 1], [-max, max]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`glow-card tilt-card ${className ?? ""}`}
      style={{
        rotateX,
        rotateY,
        rotateZ: restRotate,
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}
