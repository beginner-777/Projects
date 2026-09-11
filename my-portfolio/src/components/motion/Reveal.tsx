"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance (px) the content travels in from. Set 0 for a pure fade. */
  y?: number;
  /** Element tag to render the wrapper as. */
  as?: "div" | "section";
  /** Which way the block travels in from — gives sections distinct entrances
   *  instead of every one repeating the same fade-up. */
  direction?: Direction;
};

/**
 * Fades + slides a block into place the first time it scrolls into view —
 * what gives each section on the page its own entrance, so scrolling down
 * never feels like a static document.
 *
 * Driven by a plain CSS transition rather than Framer Motion's own
 * `animate` engine. In this exact stack (Next.js 16 Turbopack + React 19 +
 * framer-motion 13.2.0), Framer's own animation playback resolves to the
 * final value within the first frame regardless of the configured
 * duration — confirmed with a minimal, unconditional `initial`/`animate`
 * repro (a 3s fade that was already at opacity:1 on the very next sample)
 * — while a plain CSS transition animates correctly in the same
 * environment. `useInView`'s intersection detection itself is accurate,
 * so this keeps that and drives the actual visual change with CSS.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  as = "div",
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const Tag = as;

  let hiddenTransform = "none";
  if (!reduceMotion) {
    if (direction === "up") hiddenTransform = `translateY(${y}px)`;
    if (direction === "left") hiddenTransform = "translateX(-40px)";
    if (direction === "right") hiddenTransform = "translateX(40px)";
    if (direction === "scale") hiddenTransform = `translateY(${y * 0.6}px) scale(0.9)`;
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : hiddenTransform,
    transition: reduceMotion
      ? `opacity 0.6s ease-in-out ${delay}s`
      : `opacity 0.8s ease-in-out ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    willChange: "opacity, transform",
  };

  return (
    // `Tag` is polymorphic ("div" | "section"), which TS can't resolve to a
    // single concrete ref type — the underlying element is always an
    // HTMLElement, which is all useInView needs.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
