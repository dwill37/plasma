"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/lib/site";

/** Always visible on mobile; a small, quiet circle on desktop. Enters after the hero intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      initial={reduce ? false : { scale: 0, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-4 right-4 z-30 flex h-14 items-center gap-2 rounded-full bg-violet pl-4 pr-5 text-white shadow-[0_16px_40px_-12px_rgba(82,22,230,0.75)] sm:bottom-6 sm:right-6 lg:h-13 lg:w-13 lg:justify-center lg:p-0 lg:opacity-90 lg:hover:opacity-100"
    >
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-violet"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: 3, delay: 2.4, ease: "easeOut" }}
        />
      )}
      <WhatsAppIcon size={24} />
      <span className="font-semibold lg:sr-only">Book</span>
    </motion.a>
  );
}
