"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/Icons";
import { GlowWords, LineWipe, MaskWords } from "@/components/ui/motion";
import { MESSAGES, waLink } from "@/lib/site";

/*
  Both names come from Google reviews. They may turn out to be one person:
  to merge, delete one entry below. No photo clearly identifies either artist,
  so the cards are typographic.
*/
const TEAM = [
  {
    name: "Shauna",
    role: "Tattoo artist",
    quote: "It was just perfect, wonderful, an incredible result.",
    source: "Shanna L., Google review, translated from French",
    praise: ["Praised by name in Google reviews", "Souvenirs of Mexico"],
    cta: "Book with Shauna",
    message: MESSAGES.shauna,
    french: false,
    offset: "",
  },
  {
    name: "Nigelle Noir",
    role: "Artist",
    quote: "An artist who deserves to be known and recognized.",
    source: "Irwin S., Google review, translated from French",
    praise: ["Cleanliness", "Attentive listening"],
    cta: "Book with Nigelle Noir",
    message: MESSAGES.nigelle,
    french: true,
    offset: "md:mt-24",
  },
];

export function Artists() {
  const reduce = useReducedMotion();

  return (
    <section id="team" aria-labelledby="team-title" className="relative bg-night py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Team</p>
        <h2 id="team-title" className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-ink">
          <LineWipe>Meet the team.</LineWipe>
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          Two names that keep coming up in our Google reviews.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-10">
          {TEAM.map((a, i) => (
            <motion.article
              key={a.name}
              aria-labelledby={`artist-${i}`}
              initial={reduce ? false : { opacity: 0, x: i === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`group relative isolate flex min-h-[30rem] flex-col overflow-hidden rounded-[28px] bg-surface p-7 ring-1 ring-inset ring-white/[0.08] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(255,61,142,0.5),0_0_50px_-14px_rgba(255,61,142,0.5)] sm:p-10 ${a.offset}`}
            >
              {/* Oversized initial as a stencil watermark */}
              <span
                aria-hidden="true"
                className="display pointer-events-none absolute -right-6 -top-10 -z-10 select-none text-[16rem] leading-none text-white/[0.035]"
              >
                {a.name.charAt(0)}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink-soft">{a.role}</p>
                {a.french && (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-night">
                    <ChatIcon size={14} />
                    <span lang="fr">Parle français</span>
                    <span aria-hidden="true">/</span>
                    <span>speaks French</span>
                  </p>
                )}
              </div>

              <h3
                id={`artist-${i}`}
                className="display mt-5 text-[clamp(3rem,7.5vw,6.25rem)] leading-[0.88] tracking-[-0.06em] text-ink"
              >
                <MaskWords text={a.name} stagger={0.12} delay={0.15} />
              </h3>

              <blockquote className="mt-auto pt-14">
                <p className="text-[clamp(1.3rem,2.1vw,1.75rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                  <span aria-hidden="true" className="text-accent">&ldquo;</span>
                  <GlowWords text={a.quote} />
                  <span aria-hidden="true" className="text-accent">&rdquo;</span>
                </p>
                <footer className="mt-2 text-sm text-ink-soft">{a.source}</footer>
              </blockquote>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`What reviewers praise about ${a.name}`}>
                {a.praise.map((p) => (
                  <li key={p} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-inset ring-white/15">
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={waLink(a.message)} whatsapp variant={i === 1 ? "primary" : "ghost"} size="lg">
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
