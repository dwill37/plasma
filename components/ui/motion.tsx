"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

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

/**
 * A needle-sharp line sweeps left to right and unmasks the text behind it.
 * Text stays in the DOM (and readable by assistive tech) the whole time.
 */
export function LineWipe({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    // overflow-x: clip keeps the travelling line from widening the page; vertical stays visible
    <motion.span
      className="relative inline-block overflow-x-clip"
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
    >
      <motion.span
        className="inline-block"
        variants={{
          hide: { clipPath: "inset(-10% 100% -20% 0)" },
          show: { clipPath: "inset(-10% 0% -20% 0)" },
        }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.span>
      {/* Full-width track moved with transform, so the line travels the text's width */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.1em] -top-[0.05em] left-0 w-full"
        variants={{ hide: { x: "0%", opacity: 0 }, show: { x: "100%", opacity: [1, 1, 0] } }}
        transition={{
          x: { duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 1.1, delay, times: [0, 0.8, 1] },
        }}
      >
        <span className="absolute inset-y-0 left-0 w-[2px] bg-accent shadow-[0_0_14px_2px_rgba(255,61,142,0.8)]" />
      </motion.span>
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
