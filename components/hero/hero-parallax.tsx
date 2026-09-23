"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-driven depth for the hero card.
 * Tracks the pointer over the card and writes two smoothed CSS variables on
 * it: --mx and --my, each from -1 to 1 (0 = centre). Layers inside use them
 * through the .hx-* classes in globals.css, so nothing re-renders while the
 * mouse moves. Eases back to centre when the mouse leaves.
 * Mouse only; off for touch devices and reduced motion.
 */
export function HeroParallax() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      host.style.setProperty("--mx", x.toFixed(4));
      host.style.setProperty("--my", y.toFixed(4));
      if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      // Vertical is measured against the visible part of the card
      ty = Math.max(-1, Math.min(1, ((e.clientY - Math.max(r.top, 0)) / window.innerHeight) * 2 - 1));
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={ref} hidden />;
}
