import { HeartIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { BUSINESS, MESSAGES, NAV_LINKS, waLink } from "@/lib/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-white/[0.06] bg-surface pt-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl tracking-[-0.06em] text-ink">
              PLASMA<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">
              {BUSINESS.fullName}, Playa del Carmen.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-inset ring-white/15">
              <HeartIcon size={16} className="text-accent" />
              LGBTQ+ friendly
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-ink">Visit</h2>
            <address className="mt-3 not-italic text-[15px] leading-relaxed text-ink-soft">
              {BUSINESS.street}, {BUSINESS.neighborhood}
              <br />
              {BUSINESS.postalCode} {BUSINESS.city}, {BUSINESS.regionShort}, {BUSINESS.country}
              <br />
              Plus code: {BUSINESS.plusCodeShort} {BUSINESS.city}
            </address>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Opening hours:{" "}
              <a
                href={waLink(MESSAGES.availability)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                ask us on WhatsApp
              </a>
            </p>
            <ul className="mt-5 space-y-2 text-[15px]">
              <li>
                <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">
                  <PhoneIcon size={17} />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent"
                >
                  <WhatsAppIcon size={17} />
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-[15px] md:grid-cols-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-soft hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-16 border-t border-white/10 py-6 text-sm text-ink-soft">
          © <Year /> {BUSINESS.fullName}
        </p>
      </div>

      <p
        aria-hidden="true"
        className="display pointer-events-none -mb-[0.18em] select-none text-center text-[20vw] leading-none tracking-[-0.07em] text-white/[0.04]"
      >
        PLASMA
      </p>
    </footer>
  );
}
