import type { ReactNode } from "react";
import { WhatsAppIcon } from "./Icons";

type Variant = "primary" | "plasma" | "ghost" | "light";
type Size = "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  // White on violet: 6.2:1
  primary:
    "bg-violet text-white shadow-[0_10px_30px_-10px_rgba(106,43,255,0.7)] hover:bg-violet-deep",
  // Ink on plasma pink: 5.7:1
  plasma:
    "bg-plasma text-ink shadow-[0_10px_30px_-12px_rgba(255,79,139,0.8)] hover:bg-[#ff6a9d]",
  ghost:
    "bg-white/70 text-ink ring-1 ring-inset ring-ink/15 backdrop-blur-sm hover:bg-white hover:ring-ink/30",
  light: "bg-paper text-ink hover:bg-white shadow-[0_10px_30px_-14px_rgba(30,20,56,0.35)]",
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
