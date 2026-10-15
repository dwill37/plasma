import { SHOW_SMOKE_SHOP } from "@/lib/site";

/** One discreet line. Toggle with SHOW_SMOKE_SHOP in lib/site.ts. */
export function SmokeShop() {
  if (!SHOW_SMOKE_SHOP) return null;
  return (
    <aside aria-label="Smoke shop" className="border-y border-ink/8 bg-paper">
      <p className="mx-auto max-w-[1400px] px-4 py-5 text-center text-[15px] text-ink-soft sm:px-6 lg:px-10">
        Also at PLASMA: <span className="font-semibold text-ink">smoke shop</span>.
      </p>
    </aside>
  );
}
