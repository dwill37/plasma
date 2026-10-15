import type { ReactNode } from "react";
import { WhatsAppIcon } from "./Icons";

type Variant = "primary" | "ghost";
type Size = "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  // Dark base on plasma pink: 5.9:1. Hover adds a short electric glow.
  primary:
    "bg-accent text-night hover:bg-accent-hover hover:shadow-[0_0_32px_-4px_rgba(255,61,142,0.75)]",
  ghost:
    "bg-white/[0.04] text-ink ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/[0.08] hover:ring-accent/70 hover:shadow-[0_0_28px_-8px_rgba(255,61,142,0.55)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
  xl: "h-16 px-9 text-lg gap-3 md:h-20 md:px-12 md:text-xl",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  whatsapp?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Pill link-button. Every booking action on the site is a link to WhatsApp. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  whatsapp = false,
  external,
  className = "",
  ariaLabel,
}: Props) {
  const isExternal = external ?? /^https?:/.test(href);
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/btn relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {whatsapp && (
        <WhatsAppIcon
          size={size === "xl" ? 24 : 18}
          className="transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110"
        />
      )}
      <span>{children}</span>
    </a>
  );
}
