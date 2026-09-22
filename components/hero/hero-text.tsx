"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
 * Hero statements with a typewriter reveal.
 * - Types the gradient line, then the dark line, with a blinking caret;
 *   holds, backspaces, then types the next headline.
 * - Types the first headline on page load, then cycles through the rest.
 * - Screen readers get the full sentence once per slide (sr-only), not each keystroke.
 * - Pauses on hover/focus; reduced-motion users get instant, static headlines.
 */
export function HeroSlides({
  slides,
  actions,
}: {
  eyebrow?: string;
  slides: HeroSlide[];
  actions: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Start empty and type the first headline on load. The full sentence is always
  // in the sr-only span inside the <h1>, so search engines and screen readers get it.
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

  const accentTyped = slide.accent.slice(0, Math.min(count, slide.accent.length));
  const titleTyped = slide.title.slice(0, Math.max(0, count - slide.accent.length));
  const onAccent = count <= slide.accent.length;
  const blinking = phase === "hold";

  const caret = (
    <span
      aria-hidden
      className={cn(
        "ml-[0.05em] inline-block h-[0.8em] w-[2px] translate-y-[0.08em] align-baseline",
        onAccent ? "bg-[#e0379f]" : "bg-ink",
        blinking && "caret",
      )}
    />
  );

  return (
    <div
      className="relative grid items-end gap-10 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="lg:col-span-8">
        {/* Height reserved for the longest headline (3 lines) so nothing below moves while typing */}
        <h1 id="hero-title" className="display display-lg relative min-h-[3.1em] text-ink">
          <span className="sr-only" aria-live="polite">
            {`${slide.accent} ${slide.title}`.replace(/\n/g, " ")}
          </span>
          <span aria-hidden className="block whitespace-pre-line">
            {/* Descender room: bg-clip-text only paints inside the line box */}
            <span className="-mb-[0.16em] block bg-[linear-gradient(95deg,#ff1f6b_0%,#e0379f_45%,#8f5cff_100%)] bg-clip-text pb-[0.16em] text-transparent">
              {accentTyped}
              {onAccent && caret}
              {/* keep the line's height while it is empty */}
              {accentTyped.length === 0 && "\u200b"}
            </span>
            <span className="block">
              {titleTyped}
              {!onAccent && caret}
              {titleTyped.length === 0 && "\u200b"}
            </span>
          </span>
        </h1>

        {/* Slide indicators with prev / next arrows on the same line */}
        <div className="mt-8 flex items-center gap-5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero messages">
          {slides.map((s, i) => (
            <button
              key={s.accent}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${s.accent} ${s.title}`.replace(/\n/g, " ")}
              onClick={() => jumpTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === index ? "w-9 bg-[linear-gradient(90deg,#ff1f6b,#8f5cff)]" : "w-2 bg-ink/20 hover:bg-ink/40",
              )}
            />
          ))}
        </div>
          {/* Arrows: beside the dots on mobile, pinned to the right edge of the hero on desktop */}
          <div className="flex items-center gap-2 lg:absolute lg:bottom-0 lg:right-0">
            <button
              type="button"
              aria-label="Previous message"
              onClick={() => jumpTo((index - 1 + slides.length) % slides.length)}
              className="grid size-8 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink shadow-[0_6px_16px_-10px_rgba(45,22,90,0.35)] transition-colors hover:bg-[#ebe9ee]"
            >
              <ChevronLeft className="size-4" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next message"
              onClick={() => jumpTo((index + 1) % slides.length)}
              className="grid size-8 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink shadow-[0_6px_16px_-10px_rgba(45,22,90,0.35)] transition-colors hover:bg-[#ebe9ee]"
            >
              <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 lg:pb-3">
        <div className="lede relative min-h-[9.5em]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              className="max-w-[42ch]"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease }}
            >
              {slide.body}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
      </div>
    </div>
  );
}
