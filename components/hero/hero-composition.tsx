"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Console } from "@/components/dashboard/console";
import { AutomationCard, FleetCard, InsightCard, SyncCard } from "@/components/dashboard/floating-cards";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The hero's product advertisement: one console, four satellites.
 * On load: console rises, satellites arrive in sequence.
 * On scroll: each layer travels at its own speed for depth.
 * Below lg the satellites drop into normal flow as a tidy stack.
 */
export function HeroComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Parallax only where the satellites float (lg+); stacked cards stay still.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const reduce = reduceMotion || !desktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yConsole = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const yFast = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -110]);
  const ySlow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  const arrive = (delay: number, x = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28, x },
    animate: { opacity: 1, y: 0, x: 0 },
    transition: { duration: 1, ease, delay },
  });

  return (
    <div ref={ref} className="relative mx-auto mt-16 w-full max-w-[1180px] lg:mt-20">
      <motion.div style={{ y: yConsole }} {...arrive(0.35)} className="relative z-10 lg:mx-[4%]">
        <Console />
      </motion.div>

      {/* Satellites — absolute on desktop, stacked on smaller screens */}
      <div className="relative z-20 mt-5 grid gap-4 sm:grid-cols-2 lg:contents">
        <motion.div
          style={{ y: yFast }}
          {...arrive(0.9, 24)}
          className="relative z-20 lg:absolute lg:-right-6 lg:top-[-7%] xl:-right-10"
        >
          <InsightCard />
        </motion.div>
        <motion.div style={{ y: ySlow }} {...arrive(1.1, -24)} className="relative z-20 lg:absolute lg:-left-8 lg:top-[38%] xl:-left-14">
          <AutomationCard />
        </motion.div>
        <motion.div style={{ y: yFast }} {...arrive(1.3)} className="relative z-20 hidden sm:block lg:absolute lg:-bottom-16 lg:left-[14%]">
          <SyncCard />
        </motion.div>
        <motion.div style={{ y: ySlow }} {...arrive(1.45)} className="relative z-20 hidden sm:block lg:absolute lg:-bottom-10 lg:right-[6%]">
          <FleetCard />
        </motion.div>
      </div>
    </div>
  );
}
