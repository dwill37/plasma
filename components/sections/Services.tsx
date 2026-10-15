"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { LineWipe } from "@/components/ui/motion";
import { SHOW_SMOKE_SHOP } from "@/lib/site";
import { Piercing } from "./Piercing";
import { Shop } from "./SmokeShop";
import { Tattoos } from "./Tattoos";

/** One service block. While it's the block in view, its frame glows with a slow pulse. */
function ServiceBlock({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const active = useInView(ref, { amount: 0.45 });

  return (
    <article ref={ref} id={id} aria-labelledby={`${id}-title`} className="relative">
      <div className="flex items-center gap-4">
        <span className="display text-sm tracking-[-0.02em] text-accent">{index}</span>
        <span className="relative h-px flex-1 bg-white/12">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-accent shadow-[0_0_10px_rgba(255,61,142,0.9)]"
            initial={false}
            animate={{ scaleX: active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">{label}</span>
      </div>

      <div className="relative mt-8 rounded-[32px] bg-surface ring-1 ring-inset ring-white/[0.08]">
        {/* Glow pulse on the active block (opacity only) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[33px] ring-1 ring-accent/70 shadow-[0_0_60px_-18px_rgba(255,61,142,0.65)]"
          initial={false}
          animate={
            active
              ? { opacity: reduce ? 1 : [0.35, 1, 0.35] }
              : { opacity: 0 }
          }
          transition={
            active && !reduce
              ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
        />
        <div className="relative overflow-clip rounded-[32px] p-6 sm:p-10 lg:p-14">{children}</div>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services-title" className="relative bg-night pb-24 pt-8 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">What we do</p>
        <h2
          id="services-title"
          className="display mt-4 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] text-ink text-balance"
        >
          <LineWipe>{SHOW_SMOKE_SHOP ? "Metal, ink & a little smoke." : "Metal & ink, done right."}</LineWipe>
        </h2>

        <div className="mt-16 space-y-20 md:space-y-28">
          <ServiceBlock id="piercing" index="01" label="Body piercing">
            <Piercing />
          </ServiceBlock>
          <ServiceBlock id="tattoo" index="02" label="Tattoos">
            <Tattoos />
          </ServiceBlock>
          {SHOW_SMOKE_SHOP && (
            <ServiceBlock id="shop" index="03" label="Smoke shop">
              <Shop />
            </ServiceBlock>
          )}
        </div>
      </div>
    </section>
  );
}
