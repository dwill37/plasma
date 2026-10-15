"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_OUT, MaskWords } from "@/components/ui/motion";
import { STOREFRONT } from "@/lib/images";
import { ADDRESS_LINE, BUSINESS, DIRECTIONS_URL, MAP_EMBED_URL, MESSAGES, waLink } from "@/lib/site";

export function Location() {
  const reduce = useReducedMotion();

  return (
    <section id="location" aria-labelledby="location-title" className="relative bg-lilac py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <h2 id="location-title" className="display text-[clamp(2.5rem,6.5vw,5rem)] text-ink">
            <MaskWords text="Find us in Ejidal." accents={{ "Ejidal.": "text-violet" }} />
          </h2>

          <div className="mt-10 space-y-7">
            <div className="flex gap-4">
              <h3 className="sr-only">Address</h3>
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-violet text-white">
                <PinIcon size={20} />
              </span>
              <div>
                <address className="not-italic text-lg leading-snug text-ink">
                  {BUSINESS.street}, {BUSINESS.neighborhood}
                  <br />
                  {BUSINESS.postalCode} {BUSINESS.city}, {BUSINESS.regionShort}, {BUSINESS.country}
                </address>
                <p className="mt-1.5 text-[15px] text-ink-soft">
                  Plus code: <span className="font-semibold text-ink">{BUSINESS.plusCodeShort}</span>{" "}
                  {BUSINESS.city}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <h3 className="sr-only">Availability</h3>
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plasma text-ink">
                <WhatsAppIcon size={20} />
              </span>
              <div className="text-lg leading-snug text-ink">
                <a
                  href={waLink(MESSAGES.availability)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-plasma decoration-2 underline-offset-4 transition-colors hover:text-violet"
                >
                  Message us on WhatsApp to check availability
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <h3 className="sr-only">Phone</h3>
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink ring-1 ring-ink/10">
                <PhoneIcon size={20} />
              </span>
              <div className="self-center text-lg text-ink">
                <a href={BUSINESS.phoneHref} className="font-semibold transition-colors hover:text-violet">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={DIRECTIONS_URL} size="lg">
              Get directions
            </Button>
            <Button href={waLink()} variant="ghost" size="lg" whatsapp>
              Book on WhatsApp
            </Button>
          </div>

          <figure className="mt-12 flex items-center gap-5">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-[18px]">
              <Image src={STOREFRONT.src} alt={STOREFRONT.alt} fill placeholder="blur" sizes="8rem" className="object-cover" />
            </div>
            <figcaption className="text-[15px] leading-snug text-ink-soft">
              Look for the big hand-lettered PLASMA sign.
            </figcaption>
          </figure>
        </div>

        <motion.div
          className="relative min-h-[22rem] overflow-hidden rounded-[28px] bg-lilac-deep shadow-[0_30px_60px_-30px_rgba(106,43,255,0.5)] ring-1 ring-ink/10 lg:col-span-7 lg:min-h-[36rem]"
          initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 120px)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <iframe
            title={`Map showing PLASMA at ${ADDRESS_LINE}`}
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
