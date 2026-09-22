import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indian-grouped number: 1248000 -> "12,48,000" */
export function formatIN(n: number, digits = 0) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

/** Compact rupee figure the way Indian finance teams read it. */
export function formatINR(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${formatIN(n)}`;
}

export type Point = { x: number; y: number };

/**
 * Smooth SVG path through points (Catmull–Rom → cubic Bézier).
 * Tension 0.5 keeps curves honest: no overshoot past real values.
 */
export function smoothPath(points: Point[], tension = 0.5) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const t = tension / 3;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

/** Map a series to chart-space points inside a padded box. */
export function scaleSeries(
  values: number[],
  { width, height, padX = 0, padY = 0, min, max }: { width: number; height: number; padX?: number; padY?: number; min?: number; max?: number },
): Point[] {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const stepX = (width - padX * 2) / Math.max(values.length - 1, 1);
  return values.map((v, i) => ({
    x: padX + i * stepX,
    y: padY + (1 - (v - lo) / span) * (height - padY * 2),
  }));
}
