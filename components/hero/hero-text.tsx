"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Headline set word by word — the page's one orchestrated entrance.
 * Words start faint (never invisible) so the h1 still counts for LCP.
 */
export function HeroText({ eyebrow, title }: { eyebrow: string; title: string }) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  return (
    <>
      <motion.p
        className="mb-7 inline-flex items-center gap-2.5 text-[0.9375rem] text-ink-soft"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="kasavu w-8" aria-hidden />
        {eyebrow}
      </motion.p>
      <h1 id="hero-title" className="display display-lg max-w-[14ch] text-ink">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block pr-[0.22em]"
            initial={reduce ? false : { opacity: 0.18, y: "0.3em", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease, delay: 0.08 + i * 0.06 }}
          >
            {w}
          </motion.span>
        ))}
      </h1>
    </>
  );
}
