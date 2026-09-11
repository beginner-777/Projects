"use client";

import { useInView, useReducedMotion } from "framer-motion";
import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Parent/child pair for scroll-triggered staggered lists — skill pills,
 * coursework tags, project cards. Each StaggerItem detects its own
 * in-view state (via Framer's `useInView`, which is reliable here — see
 * Reveal.tsx) and animates in with a plain CSS transition, delayed by its
 * index in the group, so the list cascades in rather than popping in all
 * at once.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  gap = 0.06,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
  gap?: number;
}) {
  const Tag = as === "ul" ? "ul" : "div";
  const items = Children.toArray(children);

  return (
    <Tag className={className}>
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;
        return cloneElement(
          child as ReactElement<{ __staggerIndex?: number; __staggerGap?: number }>,
          { __staggerIndex: index, __staggerGap: gap },
        );
      })}
    </Tag>
  );
}

type ItemDirection = "up" | "scale" | "left" | "right";

export function StaggerItem({
  children,
  className,
  as = "div",
  direction = "up",
  __staggerIndex = 0,
  __staggerGap = 0.06,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Per-item entrance style — vary this across sections so a stagger
   *  reads distinctly from its neighbors instead of every list using the
   *  same plain fade-up. */
  direction?: ItemDirection;
  /** Injected by the parent StaggerGroup — not meant to be set by hand. */
  __staggerIndex?: number;
  __staggerGap?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const delay = __staggerIndex * __staggerGap;

  let hiddenTransform = "none";
  if (!reduceMotion) {
    if (direction === "up") hiddenTransform = "translateY(16px)";
    if (direction === "left") hiddenTransform = "translateX(-22px)";
    if (direction === "right") hiddenTransform = "translateX(22px)";
    if (direction === "scale") hiddenTransform = "translateY(8px) scale(0.82)";
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : hiddenTransform,
    transition: reduceMotion
      ? `opacity 0.4s ease-in-out ${delay}s`
      : `opacity 0.5s ease-in-out ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    willChange: "opacity, transform",
  };

  return (
    // `Tag` is polymorphic ("div" | "li") — see the matching note in Reveal.tsx.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
