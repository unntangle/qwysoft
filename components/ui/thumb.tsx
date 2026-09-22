import type { Hue } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FIELDS: Record<Hue, { bg: string; line: string }> = {
  peach: { bg: "radial-gradient(90% 90% at 20% 100%, #ffb98f 0%, #ffd9c2 40%, #f6ecf8 100%)", line: "rgba(160,70,30,0.22)" },
  lavender: { bg: "radial-gradient(90% 90% at 80% 0%, #b7a8f5 0%, #dcd4f8 45%, #f7f4fd 100%)", line: "rgba(80,50,160,0.22)" },
  rose: { bg: "radial-gradient(90% 90% at 0% 0%, #f19ab0 0%, #f9d2dc 45%, #fbf2ef 100%)", line: "rgba(150,30,70,0.2)" },
  blue: { bg: "radial-gradient(90% 90% at 100% 100%, #8fa4ff 0%, #cfd7ff 45%, #f3f1fb 100%)", line: "rgba(30,50,160,0.2)" },
  zari: { bg: "radial-gradient(90% 90% at 50% 110%, #e2bd75 0%, #f3e2bf 45%, #fbf8f1 100%)", line: "rgba(120,80,20,0.25)" },
};

/**
 * Generated editorial thumbnail: a soft colour field crossed by
 * contour lines, like a topographic reading of data. No photos.
 */
export function Thumb({ hue, seed = 0, className, children }: { hue: Hue; seed?: number; className?: string; children?: React.ReactNode }) {
  const f = FIELDS[hue];
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 20 + i * 18;
    const a = 10 + ((seed * 7 + i * 5) % 18);
    const b = 14 + ((seed * 3 + i * 11) % 22);
    return `M -10 ${y} C 60 ${y - a}, 120 ${y + b}, 200 ${y - a / 2} S 330 ${y + a}, 410 ${y}`;
  });
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: f.bg }}>
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {lines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={f.line} strokeWidth={i % 3 === 0 ? 1.1 : 0.6} />
        ))}
      </svg>
      {children && <div className="relative h-full">{children}</div>}
    </div>
  );
}
