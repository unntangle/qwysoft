"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   Drifting dot field for the hero card.
   - Dots of different sizes in brand pink, lilac and white are spread
     across the top of the hero. Each drifts slowly in its own direction
     (wrapping at the edges) and softly twinkles.
   - Dots that drift close together are joined by faint lines, like a
     constellation.
   - Cursor: nearby dots gently scatter away from the pointer, brighten,
     and link to it with fine lines; they settle back as it moves on.
   - Click: a soft burst pushes nearby dots outward.
   Performance: one canvas, capped pixel ratio and dot count, runs only
   while the hero is on screen. Reduced motion: a still field.
------------------------------------------------------------------- */

type P = { x: number; y: number; vx: number; vy: number; ox: number; oy: number; r: number; c: string; tw: number };

const COLORS = ["255,179,209", "201,179,255", "255,255,255", "255,143,196", "220,200,255"];
const LINK = 110; // max distance for dot ↔ dot lines
const CURSOR = 150; // cursor influence radius

export function HeroField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let ps: P[] = [];
    const mouse = { x: -9999, y: -9999, on: false };

    const seed = () => {
      const count = Math.min(170, Math.round((w * h) / 8500));
      ps = Array.from({ length: count }, () => {
        const speed = 0.04 + Math.random() * 0.12; // px per ms * 1000 = very slow drift
        const a = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          ox: 0,
          oy: 0,
          r: 0.8 + Math.random() * 1.8,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const first = !w;
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first || !ps.length) seed();
      if (reduce) draw(performance.now(), 0);
    };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = local(e);
      mouse.x = p.x;
      mouse.y = p.y;
      mouse.on = p.y >= 0 && p.y <= h;
    };
    const onLeave = () => {
      mouse.on = false;
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      if (p.y < 0 || p.y > h) return;
      // Soft burst: push nearby dots outward
      for (const d of ps) {
        const dx = d.x + d.ox - p.x;
        const dy = d.y + d.oy - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          const k = (1 - dist / 220) * 46;
          d.ox += (dx / dist) * k;
          d.oy += (dy / dist) * k;
        }
      }
    };

    // Fade the field out towards the product shot
    const fadeAt = (y: number) => 1 - Math.min(1, Math.max(0, (y / h - 0.55) / 0.4));

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      // Move: slow drift, wrap at the edges; cursor pushes dots aside (an offset that eases back)
      for (const d of ps) {
        d.x += d.vx * dt * 0.06;
        d.y += d.vy * dt * 0.06;
        if (d.x < -10) d.x = w + 10;
        else if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        else if (d.y > h + 10) d.y = -10;

        if (mouse.on && !reduce) {
          const dx = d.x + d.ox - mouse.x;
          const dy = d.y + d.oy - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < CURSOR) {
            const k = (1 - dist / CURSOR) * 1.6;
            d.ox += (dx / dist) * k;
            d.oy += (dy / dist) * k;
          }
        }
        d.ox *= 0.94;
        d.oy *= 0.94;
      }

      // Constellation lines between nearby dots
      ctx.lineWidth = 1;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        const fa = fadeAt(ay);
        if (fa <= 0) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          const dx = ax - bx;
          const dy = ay - by;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(210,190,255,${(1 - dist / LINK) * 0.16 * fa})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Dots, brighter near the cursor, with a soft twinkle; lines from the cursor to near dots
      for (const d of ps) {
        const x = d.x + d.ox;
        const y = d.y + d.oy;
        const fa = fadeAt(y);
        if (fa <= 0) continue;
        let near = 0;
        if (mouse.on && !reduce) {
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          near = Math.max(0, 1 - dist / CURSOR);
          if (near > 0) {
            ctx.strokeStyle = `rgba(255,160,210,${near * 0.35 * fa})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        const twinkle = reduce ? 0.75 : 0.55 + 0.45 * Math.sin(now / 900 + d.tw);
        const alpha = Math.min(1, (0.25 + twinkle * 0.45 + near * 0.6) * fa);
        ctx.fillStyle = `rgba(${d.c},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, d.r + near * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Run only while visible
    let raf = 0;
    let running = false;
    let last = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown, { passive: true });
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
