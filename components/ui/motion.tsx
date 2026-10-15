"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useMemo } from "react";
import { blobLoop } from "./blob";

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];
export const SPRING = { type: "spring", stiffness: 260, damping: 22 } as const;
export const SOFT_SPRING = { type: "spring", stiffness: 120, damping: 20 } as const;

/**
 * Words slide up through a mask, one after another.
 * `play` lets the hero drive it on load; otherwise it plays when scrolled into view.
 */
export function MaskWords({
  text,
  delay = 0,
  stagger = 0.08,
  className = "",
  wordClassName = "",
  accents = {},
  play,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
  /** Extra classes for specific words, keyed by the word as written. */
  accents?: Record<string, string>;
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
      : { animate: play ? "show" : "hide" };

  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hide"}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-clip pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName} ${accents[w] ?? ""}`}
            variants={{
              hide: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: EASE_OUT } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/** Words fade in from a soft blur, for pull-quotes. */
export function GlowWords({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hide"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
    >
      {text.split(" ").map((w, i, all) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          variants={{
            hide: { opacity: 0, y: 8, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
          }}
        >
          {w}
          {i < all.length - 1 && " "}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** A soft, endlessly morphing plasma blob (decorative). */
export function PlasmaBlob({
  seeds,
  className = "",
  fill = "currentColor",
  duration = 14,
  wobble,
}: {
  seeds: number[];
  className?: string;
  fill?: string;
  duration?: number;
  wobble?: number;
}) {
  const reduce = useReducedMotion();
  const paths = useMemo(() => blobLoop(seeds, wobble), [seeds, wobble]);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <motion.path
        fill={fill}
        initial={{ d: paths[0] }}
        animate={reduce ? undefined : { d: paths }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
