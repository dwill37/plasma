"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, PlusIcon } from "@/components/ui/Icons";
import { LineWipe } from "@/components/ui/motion";
import { WORK, type Category, type WorkPhoto } from "@/lib/images";

type Filter = "all" | Category;

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  piercing: "Piercing",
  tattoo: "Tattoos",
  studio: "Studio",
};

const INITIAL_COUNT = 16;

export function Work() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Only offer filters that actually have photos
  const filters = useMemo<Filter[]>(() => {
    const present = new Set(WORK.map((w) => w.category));
    return (["all", "piercing", "tattoo", "studio"] as Filter[]).filter(
      (f) => f === "all" || present.has(f as Category),
    );
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? WORK : WORK.filter((w) => w.category === filter)),
    [filter],
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;
  const activeIndex = visible.findIndex((w) => w.id === activeId);
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative border-y border-white/[0.06] bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2
            id="work-title"
            className="display text-[clamp(2.5rem,7vw,5.5rem)] text-ink"
          >
            <LineWipe>
              Fresh from the <span className="text-accent">studio.</span>
            </LineWipe>
          </h2>

          <div role="group" aria-label="Filter the work" className="flex shrink-0 flex-wrap gap-2 md:flex-nowrap">
            {filters.map((f) => {
              const selected = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setFilter(f);
                    setExpanded(false);
                  }}
                  className={`relative h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${
                    selected ? "text-night" : "bg-white/[0.05] text-ink ring-1 ring-inset ring-white/10 hover:bg-white/10"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{FILTER_LABELS[f]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <LayoutGroup>
          {/* Column masonry: every photo keeps its own proportions, no holes */}
          <ul className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((photo, i) => (
                <motion.li
                  key={photo.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: reduce ? 0 : (i % 8) * 0.04,
                  }}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(photo.id)}
                    className="group relative block w-full overflow-hidden rounded-[18px] bg-raised transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,61,142,0.6),0_0_32px_-8px_rgba(255,61,142,0.55)]"
                    style={{ aspectRatio: `${photo.src.width} / ${Math.min(photo.src.height, photo.src.width * 1.5)}` }}
                    aria-label={`Open photo: ${photo.alt}`}
                  >
                    <motion.div layoutId={`work-${photo.id}`} className="absolute inset-0">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                    </motion.div>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 grid h-10 w-10 scale-75 place-items-center rounded-full bg-accent text-night opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                    >
                      <PlusIcon size={18} />
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {hiddenCount > 0 && (
            <motion.div layout className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex h-13 items-center gap-2 rounded-full bg-white/[0.04] px-7 font-semibold text-ink ring-1 ring-inset ring-white/20 transition hover:-translate-y-0.5 hover:ring-accent/70"
              >
                <PlusIcon size={18} />
                Show {hiddenCount} more
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {active && (
              <Lightbox
                photo={active}
                onClose={() => setActiveId(null)}
                onPrev={() => setActiveId(visible[(activeIndex - 1 + visible.length) % visible.length].id)}
                onNext={() => setActiveId(visible[(activeIndex + 1) % visible.length].id)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: WorkPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const ratio = photo.src.width / photo.src.height;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close photo viewer"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-night/92 backdrop-blur-xl"
      />

      <figure className="relative flex max-h-full w-full flex-col items-center">
        <motion.div
          layoutId={`work-${photo.id}`}
          className="relative w-full overflow-hidden rounded-[18px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
          style={{
            aspectRatio: ratio,
            maxWidth: `min(100%, calc((100dvh - 9rem) * ${ratio}))`,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <figcaption className="mt-4 max-w-2xl text-center text-[15px] leading-snug text-ink">
          {photo.alt}
        </figcaption>
      </figure>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-raised text-ink shadow-md ring-1 ring-white/15 transition hover:scale-105"
      >
        <CloseIcon size={22} />
      </button>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-raised text-ink shadow-md ring-1 ring-white/15 transition hover:scale-105 sm:left-6"
      >
        <ChevronIcon size={22} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-raised text-ink shadow-md ring-1 ring-white/15 transition hover:scale-105 sm:right-6"
      >
        <ChevronIcon size={22} />
      </button>
    </motion.div>
  );
}
