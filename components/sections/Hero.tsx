"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChatIcon, HeartIcon, StarIcon } from "@/components/ui/Icons";
import { EASE_OUT, MaskWords, PlasmaBlob, SPRING } from "@/components/ui/motion";
import { HERO } from "@/lib/images";
import { BUSINESS, GOOGLE_REVIEWS_URL, waLink } from "@/lib/site";

/*
  Intro timeline (~1.8s, nothing blocks interaction):
  0.00  plasma blob pulses at the center of the photo panel
  0.45  blob bursts outward while a circular clip-path opens onto the photo
  0.55  P-L-A-S-M-A letters charge in with a flicker
  0.70  headline words rise through masks
  1.10  subline + CTAs settle, then rating badge and tags pop on a spring
*/
const T = { reveal: 0.45, letters: 0.55, headline: 0.7, body: 1.1, pops: 1.25 };

const LETTERS = "PLASMA".split("");

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : undefined;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-lilac lg:min-h-[100dvh]"
    >
      {/* Photo panel: full-bleed on mobile, bleeding off the right edge on desktop */}
      <div className="absolute inset-x-0 top-0 h-[54svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[56%]">
        <motion.div
          className="absolute inset-0 overflow-hidden lg:rounded-bl-[38%_22%]"
          initial={initial ?? { clipPath: "circle(7% at 50% 46%)" }}
          animate={{ clipPath: "circle(150% at 50% 46%)" }}
          transition={{ delay: T.reveal, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={initial ?? { scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ delay: T.reveal, duration: 1.6, ease: EASE_OUT }}
          >
            <Image
              src={HERO.src}
              alt={HERO.alt}
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-[50%_28%]"
            />
          </motion.div>
          {/* Light washes keep overlapping type readable, no dark scrims */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-lilac via-lilac/70 to-transparent lg:h-[34%]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-lilac/90 to-transparent lg:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[22%] bg-gradient-to-r from-lilac/80 to-transparent lg:block" />
        </motion.div>

        {/* Intro blob: pulses, then bursts as the photo opens */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[46%] h-40 w-40 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 1, 0.82, 1.05, 7], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 1.35, times: [0, 0.2, 0.32, 0.42, 1], ease: "easeInOut" }}
          >
            <PlasmaBlob seeds={[3, 11, 27]} duration={1.2} className="absolute inset-0 text-violet" />
            <PlasmaBlob seeds={[7, 19, 41]} duration={1} className="absolute inset-[22%] text-plasma" />
          </motion.div>
        )}
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col px-4 pb-14 sm:px-6 lg:min-h-[100dvh] lg:justify-center lg:px-10 lg:pb-0 lg:pt-24">
        {/* Spacer that lets the mobile photo breathe above the copy */}
        <div className="h-[40svh] lg:hidden" />

        {/* Decorative wordmark, letters charge in one by one */}
        <p
          aria-hidden="true"
          className="display pointer-events-none select-none whitespace-nowrap text-[17.5vw] leading-[0.8] text-violet lg:absolute lg:bottom-6 lg:left-8 lg:text-[clamp(7rem,13.5vw,15rem)]"
        >
          {LETTERS.map((l, i) => (
            <motion.span
              key={l + i}
              className="inline-block"
              initial={initial ?? { opacity: 0, scale: 1.5, y: "0.08em" }}
              animate={{
                opacity: [0, 1, 0.25, 1],
                scale: [1.5, 0.94, 1.04, 1],
                y: "0em",
                textShadow: [
                  "0 0 0 rgba(255,79,139,0)",
                  "0 0 28px rgba(255,79,139,0.9)",
                  "0 0 10px rgba(255,79,139,0.5)",
                  "0 0 0 rgba(255,79,139,0)",
                ],
              }}
              transition={{ delay: T.letters + i * 0.07, duration: 0.55, ease: "easeOut" }}
            >
              {l}
            </motion.span>
          ))}
        </p>

        <div className="relative z-10 mt-6 max-w-xl lg:mt-0 lg:max-w-[min(44%,40rem)] lg:pb-[clamp(9rem,15vw,15rem)]">
          <ul className="flex flex-wrap gap-2" aria-label="Studio highlights">
            {[
              { label: "LGBTQ+ friendly", icon: <HeartIcon size={16} />, lang: undefined },
              { label: "On parle français", icon: <ChatIcon size={16} />, lang: "fr" },
            ].map((tag, i) => (
              <motion.li
                key={tag.label}
                lang={tag.lang}
                initial={initial ?? { opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...SPRING, delay: T.pops + 0.12 + i * 0.08 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-ink/10"
              >
                <span className="text-plasma-ink">{tag.icon}</span>
                {tag.label}
              </motion.li>
            ))}
          </ul>

          <h1
            id="hero-title"
            className="display mt-5 text-[clamp(2.75rem,11vw,4.25rem)] text-ink text-balance lg:text-[clamp(3.5rem,5.4vw,5.5rem)]"
          >
            <MaskWords
              text="Say it in metal & ink."
              delay={T.headline}
              play
              accents={{ metal: "text-violet", "ink.": "text-plasma-ink" }}
            />
          </h1>

          {/* Slides but never fades: it's the LCP text, so it must paint on the first frame */}
          <motion.p
            initial={initial ?? { y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: T.body, duration: 0.7, ease: EASE_OUT }}
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Body piercing and tattoos in Playa del Carmen. Clean, sterilized and done with
            real care.
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
            <Button href="#work" size="lg" variant="ghost">
              See the work
            </Button>
          </motion.div>

          <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={initial ?? { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING, delay: T.pops }}
            className="mt-7 inline-flex origin-left items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-[0_8px_24px_-12px_rgba(106,43,255,0.45)] ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5"
            aria-label={`Rated ${BUSINESS.rating} out of 5 on Google from ${BUSINESS.reviewCount} reviews. Read them on Google Maps.`}
          >
            <span className="font-display text-base tracking-tight">{BUSINESS.rating}</span>
            <StarIcon size={16} className="text-plasma" />
            <span className="text-ink-soft">
              on Google · {BUSINESS.reviewCount} reviews
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
