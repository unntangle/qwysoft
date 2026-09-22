"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Streams text in word by word once visible, like a model response.
 * Full text is always in the DOM for screen readers and crawlers.
 */
export function StreamingText({
  text,
  speed = 28,
  className,
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(words.length);
      onDone?.();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= words.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  const done = count >= words.length;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.slice(0, count).join(" ")}
        {!done && <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-violet" />}
        <span className="invisible">{" " + words.slice(count).join(" ")}</span>
      </span>
    </p>
  );
}
