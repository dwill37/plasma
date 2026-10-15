/**
 * Organic blob paths for SVG morphing.
 * Every path has the same command structure (M + N cubic curves + Z), so
 * Framer Motion can interpolate `d` between any two of them smoothly.
 */

const POINTS = 8;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Closed Catmull-Rom spline through jittered points on a circle, as cubic Béziers. */
export function blobPath(seed: number, wobble = 0.22, size = 200): string {
  const rand = mulberry32(seed);
  const c = size / 2;
  const pts = Array.from({ length: POINTS }, (_, i) => {
    const a = (i / POINTS) * Math.PI * 2;
    const r = c * (1 - wobble + rand() * wobble * 1.6) * 0.92;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r] as const;
  });
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < POINTS; i++) {
    const p0 = pts[(i - 1 + POINTS) % POINTS];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % POINTS];
    const p3 = pts[(i + 2) % POINTS];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + "Z";
}

/** A looping set of shapes: first and last are identical so the loop is seamless. */
export function blobLoop(seeds: number[], wobble?: number): string[] {
  const paths = seeds.map((s) => blobPath(s, wobble));
  return [...paths, paths[0]];
}

/** Organic border-radius keyframes for HTML elements (cheaper than SVG masks). */
export const ORGANIC_RADII = [
  "46% 54% 58% 42% / 44% 46% 54% 56%",
  "58% 42% 44% 56% / 52% 58% 42% 48%",
  "42% 58% 52% 48% / 58% 42% 58% 42%",
  "46% 54% 58% 42% / 44% 46% 54% 56%",
];
