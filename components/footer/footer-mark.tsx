"use client";

import { useRef } from "react";

/* ------------------------------------------------------------------
   Closing brand mark, masked in the manner of Sarvam's footer.

   footer-logo-mask.webp is an opaque sheet with the QWY mark cut out.
   We invert it (exclude against a solid layer) so the fill shows only
   through the mark. The fill is a drifting gradient (.mark-mono in
   globals.css).

   Pointer interaction:
   - a soft light follows the cursor inside the mark
   - the mark leans a few pixels toward the cursor
   Both are driven by CSS variables written directly on pointer move
   (no React re-renders), and are skipped for touch and reduced motion.

   FILL IMAGE: set FOOTER_FILL_IMAGE to show a photo through the mark
   instead of the gradient.
------------------------------------------------------------------- */

const FOOTER_FILL_IMAGE: string | null = null; // e.g. "/brand/footer-fill.webp"

const STENCIL = "/brand/footer-logo-mask.webp";

// The stencil canvas is 3:1. Measured bounds of the mark inside it:
// top ≈ 22%, bottom ≈ 86%. Everything outside that band is trimmed.
const TOP = 0.215;
const BOTTOM = 0.86;

const MAX_SHIFT = 10; // px the mark leans toward the cursor

// The stencil's outermost pixel columns are semi-transparent, which shows up as
// thin vertical lines once inverted. Overscan the stencil horizontally so those
// edges sit outside the clipping window.
const OVERSCAN = 1.04;

export function FooterMark({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const visible = BOTTOM - TOP;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
      el.style.setProperty("--tx", `${((x - 0.5) * 2 * MAX_SHIFT).toFixed(2)}px`);
      el.style.setProperty("--ty", `${((y - 0.5) * 2 * MAX_SHIFT * 0.6).toFixed(2)}px`);
      el.style.setProperty("--glow", "1");
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
    el.style.setProperty("--glow", "0");
  };

  return (
    <div aria-hidden className={className}>
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative select-none"
        style={
          {
            aspectRatio: `3 / ${(visible * OVERSCAN).toFixed(4)}`,
            "--mx": "50%",
            "--my": "50%",
            "--tx": "0px",
            "--ty": "0px",
            "--glow": "0",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0 overflow-hidden transition-transform duration-500 ease-out"
          style={{ transform: "translate3d(var(--tx), var(--ty), 0)" }}
        >
          <div
            className={FOOTER_FILL_IMAGE ? "relative bg-cover bg-center" : "mark-mono relative"}
            style={{
              width: `${OVERSCAN * 100}%`,
              marginLeft: `${((1 - OVERSCAN) / 2) * 100}%`,
              aspectRatio: "3 / 1",
              marginTop: `${(-TOP / 3) * OVERSCAN * 100}%`,
              ...(FOOTER_FILL_IMAGE ? { backgroundImage: `url(${FOOTER_FILL_IMAGE})` } : {}),
              WebkitMaskImage: `linear-gradient(#000, #000), url(${STENCIL})`,
              maskImage: `linear-gradient(#000, #000), url(${STENCIL})`,
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            {/* Cursor light, clipped to the mark by the parent mask */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: "var(--glow)",
                background:
                  "radial-gradient(22% 60% at var(--mx) calc(var(--my) * 0.645 + 21.5%), rgba(255,255,255,0.75), rgba(255,255,255,0.18) 45%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
