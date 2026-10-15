"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ChatIcon, HeartIcon, StarIcon } from "@/components/ui/Icons";
import { EASE_OUT, MaskWords, SPRING } from "@/components/ui/motion";
import { HERO } from "@/lib/images";
import { BUSINESS, GOOGLE_REVIEWS_URL, waLink } from "@/lib/site";

/*
  Intro timeline (~2.1s, nothing blocks interaction, all copy is in the DOM from the first frame):
  0.10  P-L-A-S-M-A charge up one by one with an electric flicker
  0.35  a needle-thin line cuts across the photo panel
  0.85  the photo opens out from that line
  0.70  headline words rise through masks
  1.10  subline + CTAs settle, then rating badge and tags pop on a spring
*/
const T = { letters: 0.1, cut: 0.35, open: 0.85, headline: 0.7, body: 1.1, pops: 1.3 };
const CUT_EASE = [0.65, 0, 0.35, 1] as const;

const LETTERS = "PLASMA".split("");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const initial = reduce ? false : undefined;

  // Gentle parallax: the photo drifts slower than the page
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-night lg:min-h-[100dvh]"
    >
      {/* Photo panel: full-bleed on mobile, right two-thirds on desktop */}
      <div className="absolute inset-x-0 top-0 h-[56svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[60%]">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          // A sliver is painted from the first frame, so the photo never becomes a late LCP candidate
          initial={initial ?? { clipPath: "inset(49.6% 0% 49.6% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ delay: T.open, duration: 1.05, ease: CUT_EASE }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: photoY }}
            initial={initial ?? { scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ delay: T.open, duration: 1.6, ease: EASE_OUT }}
          >
            <Image
              src={HERO.src}
              alt={HERO.alt}
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-[50%_28%]"
            />
          </motion.div>
          {/* Fades into the dark base so the copy can overlap the photo */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night via-night/70 to-transparent lg:h-[30%]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-night/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 hidden w-[45%] bg-gradient-to-r from-night via-night/60 to-transparent lg:block" />
        </motion.div>

        {/* The cut: a needle-thin electric line slices across, then the photo opens from it */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[2px] origin-left bg-accent shadow-[0_0_18px_3px_rgba(255,61,142,0.85)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ delay: T.cut, duration: 1.2, times: [0, 0.45, 1], ease: CUT_EASE }}
          />
        )}
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col px-4 pb-16 sm:px-6 lg:min-h-[100dvh] lg:justify-center lg:px-10 lg:pb-0 lg:pt-24">
        {/* Lets the mobile photo breathe above the copy */}
        <div className="h-[38svh] lg:hidden" />

        {/* Decorative wordmark: letters charge up one by one */}
        <p
          aria-hidden="true"
          className="display pointer-events-none select-none whitespace-nowrap text-[17.5vw] leading-[0.8] text-ink lg:absolute lg:bottom-8 lg:left-8 lg:text-[clamp(7rem,13.5vw,15rem)]"
        >
          {LETTERS.map((l, i) => (
            <motion.span
              key={l + i}
              className="inline-block"
              initial={initial ?? { opacity: 0, scale: 1.4 }}
              animate={{
                opacity: [0, 1, 0.3, 1],
                scale: [1.4, 0.96, 1.03, 1],
                textShadow: [
                  "0 0 0px rgba(255,61,142,0)",
                  "0 0 34px rgba(255,61,142,0.95)",
                  "0 0 12px rgba(255,61,142,0.55)",
                  "0 0 0px rgba(255,61,142,0)",
                ],
              }}
              transition={{ delay: T.letters + i * 0.08, duration: 0.6, ease: "easeOut" }}
            >
              {l}
            </motion.span>
          ))}
        </p>

        <div className="relative z-10 mt-6 max-w-xl lg:mt-0 lg:max-w-[min(48%,44rem)] lg:pb-[clamp(10rem,16vw,16rem)]">
          <ul className="flex flex-wrap gap-2" aria-label="Studio highlights">
            {[
              { label: "LGBTQ+ friendly", icon: <HeartIcon size={15} />, lang: undefined },
              { label: "On parle français", icon: <ChatIcon size={15} />, lang: "fr" },
            ].map((tag, i) => (
              <motion.li
                key={tag.label}
                lang={tag.lang}
                initial={initial ?? { opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...SPRING, delay: T.pops + 0.12 + i * 0.08 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-night/70 px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-white/15 backdrop-blur-md"
              >
                <span className="text-accent">{tag.icon}</span>
                {tag.label}
              </motion.li>
            ))}
          </ul>

          <h1
            id="hero-title"
            className="display mt-5 text-[clamp(2.6rem,10.5vw,4.25rem)] text-ink text-balance lg:text-[clamp(3rem,4vw,4.75rem)]"
          >
            <MaskWords
              text="Spotless studio. Skilled hands. Warm welcome."
              delay={T.headline}
              play
              accents={{ "Spotless": "text-accent" }}
            />
          </h1>

          {/* Slides but never fades: it's the LCP text, so it must paint on the first frame */}
          <motion.p
            initial={initial ?? { y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: T.body, duration: 0.7, ease: EASE_OUT }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Body piercing, tattoos &amp; smoke shop in Ejidal, Playa del Carmen.
          </motion.p>

          <motion.div
            initial={initial ?? { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T.body + 0.08, duration: 0.7, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href={waLink()} size="lg" whatsapp>
              Book on WhatsApp
            </Button>
            <Button href="#visit" size="lg" variant="ghost">
              Find the shop
            </Button>
          </motion.div>

          <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={initial ?? { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING, delay: T.pops }}
            className="mt-7 inline-flex origin-left items-center gap-2 rounded-full bg-raised/80 px-4 py-2 text-sm font-semibold text-ink ring-1 ring-white/10 backdrop-blur-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_rgba(255,61,142,0.6)]"
          >
            <span className="font-display text-base tracking-tight">{BUSINESS.rating}</span>
            <StarIcon size={16} className="text-accent" />
            <span className="sr-only">out of 5</span>
            <span className="text-ink-soft">from {BUSINESS.reviewCount} Google reviews</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
