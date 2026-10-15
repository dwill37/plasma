"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";
import { BUSINESS, GOOGLE_REVIEWS_URL } from "@/lib/site";

const REVIEWS = [
  {
    author: "Irwin S.",
    meta: "Google Local Guide",
    text: "We're thrilled with Nigelle Noir's work and highly recommend her. Cleanliness, listening — everything was there. A big plus for French speakers: she speaks French! An artist who deserves to be known and recognized.",
  },
  {
    author: "Sandrine J.",
    meta: "Google review",
    text: "A perfect tattoo artist, I recommend her 100%. A perfect welcome, perfect mastery. A big thank you, Shauna, for this beautiful tribute.",
  },
  {
    author: "Shanna L.",
    meta: "Google review",
    text: "Shauna tattooed me — absolutely wonderful, an incredible result. Thank you so much for this beautiful souvenir of Mexico.",
  },
];

function Stars({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={size} />
      ))}
    </span>
  );
}

function RatingBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? BUSINESS.rating : 0);
  const label = useTransform(value, (v) => v.toFixed(1));
  const fill = useTransform(value, (v) => `inset(0 ${100 - (v / 5) * 100}% 0 0)`);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(value, BUSINESS.rating, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="lg:sticky lg:top-28">
      <p className="sr-only">
        Rated {BUSINESS.rating} out of 5 on Google, based on {BUSINESS.reviewCount} reviews.
      </p>
      <div aria-hidden="true">
        <motion.span className="display block text-[clamp(7rem,20vw,13rem)] leading-[0.8] tracking-[-0.07em] text-violet tabular-nums">
          {label}
        </motion.span>
        <div className="relative mt-6 inline-block">
          <Stars size={40} className="text-lilac-deep" />
          <motion.span className="absolute inset-0" style={{ clipPath: fill }}>
            <Stars size={40} className="text-plasma" />
          </motion.span>
        </div>
        <p className="mt-4 text-lg font-medium text-ink">
          Based on {BUSINESS.reviewCount} Google reviews
        </p>
      </div>
      <Button href={GOOGLE_REVIEWS_URL} variant="ghost" size="lg" className="mt-8">
        Read all {BUSINESS.reviewCount} reviews on Google
      </Button>
    </div>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-clip bg-lilac py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-plasma-ink">Reviews</p>
        <h2 id="reviews-title" className="display mt-4 max-w-3xl text-[clamp(2.25rem,5.5vw,4.25rem)] text-ink text-balance">
          In their own words.
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <RatingBlock />
          </div>

          <ul className="flex flex-col gap-5 lg:col-span-7">
            {REVIEWS.map((r, i) => (
              <motion.li
                key={r.author}
                initial={reduce ? false : { opacity: 0, x: 60, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 110, damping: 18, delay: i * 0.08 }}
                className={`rounded-[28px] bg-paper p-7 shadow-[0_24px_50px_-30px_rgba(106,43,255,0.45)] sm:p-9 ${
                  i === 1 ? "lg:ml-12" : ""
                }`}
              >
                <figure>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Stars className="text-plasma" />
                    <span className="rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-ink-soft">
                      Translated from French
                    </span>
                  </div>
                  <span className="sr-only">5 out of 5 stars.</span>
                  <blockquote className="mt-5 text-lg leading-relaxed text-ink md:text-xl">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center rounded-full bg-violet font-display text-sm font-bold text-white"
                    >
                      {r.author.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{r.author}</span>
                      <span className="block text-sm text-ink-soft">{r.meta}</span>
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
