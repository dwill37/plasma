"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_OUT, MaskWords } from "@/components/ui/motion";
import { FINAL_CTA_PHOTO } from "@/lib/images";
import { waLink } from "@/lib/site";

/** CTA that leans toward the pointer, like charge pulled across a plasma ball. */
function MagneticButton() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className="group inline-flex h-16 items-center gap-3 whitespace-nowrap rounded-full bg-accent px-8 text-lg font-semibold text-night shadow-[0_0_50px_-10px_rgba(255,61,142,0.8)] transition-colors hover:bg-accent-hover md:h-20 md:px-12 md:text-xl"
    >
      <WhatsAppIcon size={26} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      Book on WhatsApp
    </motion.a>
  );
}

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="cta-title" className="grid-lines relative isolate overflow-clip border-t border-white/[0.06] bg-night">
      {/* A charged line runs across the band once it's in view */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 h-px origin-left bg-accent/70 shadow-[0_0_16px_2px_rgba(255,61,142,0.6)]"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <h2 id="cta-title" className="display text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] text-ink">
            <MaskWords text="Let's make it yours." stagger={0.1} accents={{ "yours.": "text-accent" }} />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl">
            A piercing, a tattoo, an idea you can&apos;t shake. Send it our way.
          </p>
          <div className="mt-10">
            <MagneticButton />
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:col-span-5"
          initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -6 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-accent/50 shadow-[0_0_80px_-20px_rgba(255,61,142,0.55)]"
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE_OUT }}
            >
              <Image
                src={FINAL_CTA_PHOTO.src}
                alt={FINAL_CTA_PHOTO.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
