"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlowWords, MaskWords, PlasmaBlob } from "@/components/ui/motion";
import { MESSAGES, waLink } from "@/lib/site";

const ARTISTS = [
  {
    name: "Shauna",
    role: "Tattoo artist",
    quote: "A perfect welcome, perfect mastery.",
    praise: ["Perfect welcome", "Perfect mastery", "Incredible results"],
    cta: "Book with Shauna",
    message: MESSAGES.shauna,
    surface: "bg-plasma text-ink",
    chip: "bg-ink/10 text-ink",
    nameClass: "text-ink",
    blob: "text-plasma-soft/70",
    button: "light" as const,
    lang: undefined,
    offset: "",
  },
  {
    name: "Nigelle Noir",
    role: "Artist · Speaks French",
    quote: "An artist who deserves to be known and recognized.",
    praise: ["Cleanliness", "Listening", "Parle français"],
    cta: "Book with Nigelle Noir",
    message: MESSAGES.nigelle,
    surface: "bg-violet text-white",
    chip: "bg-white/15 text-white",
    nameClass: "text-white",
    blob: "text-violet-soft/25",
    button: "light" as const,
    lang: "fr",
    offset: "md:mt-28",
  },
];

export function Artists() {
  const reduce = useReducedMotion();

  return (
    <section id="artists" aria-labelledby="artists-title" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 id="artists-title" className="display text-[clamp(2.5rem,7vw,5.5rem)] text-ink">
          <MaskWords text="Meet the artists." />
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          Two names you&apos;ll find all over our Google reviews.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-10">
          {ARTISTS.map((a, i) => (
            <motion.article
              key={a.name}
              aria-labelledby={`artist-${i}`}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: i * 0.1 }}
              className={`relative isolate flex min-h-[30rem] flex-col overflow-hidden rounded-[28px] p-7 sm:p-10 ${a.surface} ${a.offset}`}
            >
              <PlasmaBlob
                seeds={i === 0 ? [31, 6, 18] : [12, 29, 3]}
                duration={18}
                className={`absolute -right-24 -top-24 -z-10 w-[26rem] ${a.blob}`}
              />
              <p className="text-sm font-semibold opacity-85">{a.role}</p>

              <h3
                id={`artist-${i}`}
                className={`display mt-4 text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88] tracking-[-0.06em] ${a.nameClass}`}
              >
                <MaskWords text={a.name} stagger={0.12} delay={0.15} />
              </h3>

              <blockquote className="mt-auto pt-14">
                <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.02em]">
                  <span aria-hidden="true">&ldquo;</span>
                  <GlowWords text={a.quote} />
                  <span aria-hidden="true">&rdquo;</span>
                </p>
                <footer className="mt-2 text-sm opacity-85">From a Google review, translated from French</footer>
              </blockquote>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`What reviewers praise about ${a.name}`}>
                {a.praise.map((p) => (
                  <li
                    key={p}
                    lang={p === "Parle français" ? a.lang : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${a.chip}`}
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={waLink(a.message)} whatsapp variant={a.button} size="lg">
                  {a.cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
