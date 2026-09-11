"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./SiteLoader.module.css";

/**
 * Real first-load screen: an "Advanced Loader" style morph icon (laptop ->
 * watch -> phone), each drawn in as a single continuous stroke via
 * getTotalLength()/stroke-dashoffset, cycling every 2s while the page
 * settles. Dismissal is tied to actual load state — window "load" plus a
 * short minimum hold so it never flashes — with a hard fallback so a slow
 * asset can never strand the overlay on screen.
 */

const MIN_VISIBLE_MS = 1400;
const MAX_WAIT_MS = 4500;

function prepShape(el: SVGGeometryElement) {
  const len = el.getTotalLength();
  el.style.strokeDasharray = `${len}`;
  el.style.strokeDashoffset = `${len}`;
  el.style.transition = "none";
}

function shapesOf(g: SVGGElement) {
  return Array.from(g.querySelectorAll<SVGGeometryElement>("rect,circle,line"));
}

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Dismiss on real load state, not a bare timer.
  useEffect(() => {
    const start = Date.now();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const fallback = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  // Lock background scroll while the overlay is up.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  // Icon morph-and-draw cycle.
  useEffect(() => {
    if (!visible) return;
    const stage = stageRef.current;
    if (!stage) return;
    const groups = Array.from(stage.querySelectorAll<SVGGElement>("[data-icon]"));
    if (groups.length === 0) return;

    if (reduced) {
      // No continuous motion: show the first icon fully drawn, no cycling.
      groups.forEach((g) => shapesOf(g).forEach((el) => {
        el.style.transition = "none";
        el.style.strokeDasharray = "none";
        el.style.strokeDashoffset = "0";
      }));
      groups[0].classList.add(styles.active);
      return;
    }

    groups.forEach((g) => shapesOf(g).forEach((el) => prepShape(el)));

    function draw(g: SVGGElement) {
      shapesOf(g).forEach((el, j) => {
        el.style.transition = "none";
        el.style.strokeDashoffset = el.style.strokeDasharray;
        void el.getBoundingClientRect();
        el.style.transition = `stroke-dashoffset .6s cubic-bezier(.16,1,.3,1) ${j * 0.09}s`;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.strokeDashoffset = "0";
          })
        );
      });
    }

    let idx = 0;
    function showNext() {
      const prev = groups[idx];
      idx = (idx + 1) % groups.length;
      const next = groups[idx];
      prev.style.transition = "opacity .35s ease";
      prev.classList.remove(styles.active);
      window.setTimeout(() => {
        shapesOf(next).forEach((el) => prepShape(el));
        next.classList.add(styles.active);
        draw(next);
      }, 250);
    }

    groups[0].classList.add(styles.active);
    draw(groups[0]);
    const interval = window.setInterval(showNext, 2000);
    return () => window.clearInterval(interval);
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading Musfirah Shakeel's portfolio"
        >
          <div className={styles.stage} ref={stageRef}>
            <div className={styles.glow} aria-hidden />
            <svg className={styles.iconSvg} viewBox="0 0 64 64" aria-hidden>
              <g className={styles.icon} data-icon="laptop">
                <rect x="16" y="14" width="32" height="22" rx="3" />
                <rect x="22" y="41" width="20" height="3" rx="1.5" />
              </g>
              <g className={styles.icon} data-icon="watch">
                <rect x="20" y="16" width="24" height="32" rx="8" />
                <rect x="26" y="9" width="12" height="6" rx="2" />
                <rect x="26" y="49" width="12" height="6" rx="2" />
              </g>
              <g className={styles.icon} data-icon="phone">
                <rect x="20" y="8" width="24" height="48" rx="5" />
                <circle cx="32" cy="51" r="1.6" />
              </g>
            </svg>
            <div className={`${styles.name} font-display`}>
              Musfirah<span className={styles.nameAccent}>.dev</span>
            </div>
            <div className={`${styles.status} font-mono`}>assembling interface</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
