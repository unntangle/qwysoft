"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const HOLD = 4200; // ms a finished headline stays on screen
const TYPE_MS = 48; // per character while typing
const DELETE_MS = 18; // per character while backspacing
const TYPE_START_DELAY = 250; // pause before typing a new headline

type Phase = "type" | "hold" | "delete";

/**
 * Centred hero headline for the dark hero card, with the same typewriter
 * behaviour as before: types the accent line then the white line, holds,
 * backspaces, moves on. Screen readers get the full sentence once per slide.
 * Pauses on hover/focus; reduced-motion users get static headlines.
 */
export function HeroCentered({ slides, actions }: { slides: HeroSlide[]; actions: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("type");
  const [paused, setPaused] = useState(false);
  const slide = slides[index];
  const full = slide.accent.length + slide.title.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(full);
      return;
    }
    let id: ReturnType<typeof setTimeout>;
    if (phase === "hold") {
      if (paused) return;
      id = setTimeout(() => setPhase("delete"), HOLD);
    } else if (phase === "delete") {
      if (count > 0) id = setTimeout(() => setCount((c) => c - 1), DELETE_MS);
      else {
        setIndex((i) => (i + 1) % slides.length);
        setPhase("type");
      }
    } else {
      if (count < full) id = setTimeout(() => setCount((c) => c + 1), count === 0 ? TYPE_START_DELAY : TYPE_MS);
      else setPhase("hold");
    }
    return () => clearTimeout(id);
  }, [phase, count, full, paused, reduce, slides.length]);

  const jumpTo = (i: number) => {
    setIndex(i);
    if (reduce) {
      setCount(slides[i].accent.length + slides[i].title.length);
      setPhase("hold");
    } else {
      setCount(0);
      setPhase("type");
    }
  };

  // One line each: the accent, then the title (line breaks inside them become spaces)
  const accent = slide.accent.replace(/\n/g, " ");
  const title = slide.title.replace(/\n/g, " ");
  const accentTyped = accent.slice(0, Math.min(count, accent.length));
  const titleTyped = title.slice(0, Math.max(0, count - accent.length));
  const onAccent = count <= accent.length;

  const caret = (
    <span
      aria-hidden
      className={cn(
        "ml-[0.05em] inline-block h-[0.8em] w-[2px] translate-y-[0.08em] align-baseline",
        onAccent ? "bg-[#ff9ec4]" : "bg-white",
        phase === "hold" && "caret",
      )}
    />
  );

  return (
    <div
      className="mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Height reserved for two lines so nothing below moves while typing */}
      <h1 id="hero-title" className="hx-head display display-lg relative min-h-[2.1em] text-white">
        <span className="sr-only" aria-live="polite">
          {`${accent} ${title}`}
        </span>
        <span aria-hidden className="block">
          <span className="-mb-[0.16em] block bg-[linear-gradient(95deg,#ffb3d1_0%,#ff8fc4_45%,#c9b3ff_100%)] bg-clip-text pb-[0.16em] text-transparent">
            {accentTyped}
            {onAccent && caret}
            {accentTyped.length === 0 && "\u200b"}
          </span>
          <span className="block">
            {titleTyped}
            {!onAccent && caret}
            {titleTyped.length === 0 && "\u200b"}
          </span>
        </span>
      </h1>

      <div className="hx-3 relative mx-auto mt-6 min-h-[5.2em] max-w-[60ch] text-[1.0625rem] leading-relaxed text-white/70">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease }}
          >
            {slide.body}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="hx-1 mt-6 flex flex-wrap justify-center gap-3">{actions}</div>

      {/* Slide indicators */}
      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Hero messages">
        {slides.map((s, i) => (
          <button
            key={s.accent}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${s.accent} ${s.title}`.replace(/\n/g, " ")}
            onClick={() => jumpTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
