"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Scroll choreography for the hero, in the manner of Mixpanel's enterprise page.
 * - HeroFade: the headline block eases up and fades as you begin to scroll.
 * - HeroRise: the product shot starts tilted back on the glowing horizon and
 *   stands up flat, facing you, as it scrolls into the middle of the screen.
 * - HeroGlow: the horizon glow lifts and brightens along with it.
 * All three are skipped for reduced motion.
 */

export function HeroFade({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const opacity = useTransform(p, [0, 0.8], [1, 0]);
  const y = useTransform(p, [0, 1], [0, -70]);
  const scale = useTransform(p, [0, 1], [1, 0.96]);
  return (
    <motion.div ref={ref} className={`will-change-transform ${className ?? ""}`} style={reduce ? undefined : { opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

export function HeroRise({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.5 });
  const rotateX = useTransform(p, [0, 1], [32, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const y = useTransform(p, [0, 1], [90, 0]);
  return (
    <div ref={ref} className={className} style={{ perspective: 1600 }}>
      <motion.div className="will-change-transform" style={reduce ? undefined : { rotateX, scale, y, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  );
}

export function HeroGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 40%"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const opacity = useTransform(p, [0, 1], [0.55, 1]);
  const y = useTransform(p, [0, 1], [80, 0]);
  const scaleX = useTransform(p, [0, 1], [0.85, 1.1]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`will-change-transform ${className ?? ""}`}
      style={reduce ? undefined : { opacity, y, scaleX }}
    />
  );
}
