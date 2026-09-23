"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { SOLUTIONS, type Solution } from "@/lib/constants";
import { SOLUTION_TONE, SolutionGraphic } from "@/components/solutions/solution-graphics";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Solutions() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];

  return (
    <section id="solutions" className="relative pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="solutions-title">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker mb-6">Odoo ERP services</p>
          <h2 id="solutions-title" className="display display-sm max-w-[18ch]">
            Your Whole Business, Running on <Grad>One System.</Grad>
          </h2>
          <p className="lede mt-6 max-w-[56ch]">
            From sales and finance to HR and inventory, we structure and customise Odoo to match how you work: better
            visibility, smoother coordination, and more control.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-6" role="tablist" aria-label="ERP solutions">
            {SOLUTIONS.map((s, i) => (
              <li key={s.key} className="border-t border-line last:border-b">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="solution-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 py-4 text-left sm:py-5"
                >
                  <span
                    className={cn(
                      "display flex-1 text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-tight transition-colors duration-300",
                      i === active ? "text-ink" : "text-ink/35 group-hover:text-ink/70",
                    )}
                  >
                    {s.name}
                  </span>
                  <span className={cn("hidden text-[13px] text-mute sm:block", i === active ? "opacity-100" : "opacity-0")}>
                    {s.audience}
                  </span>
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      i === active ? "border-ink bg-ink text-white" : "border-line-strong text-mute",
                    )}
                  >
                    {i === active ? <ArrowRight className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                {/* Inline detail on small screens */}
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden lg:hidden"
                    >
                      <div className="pb-6">
                        <SolutionDetail solution={s} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-28" id="solution-panel" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <SolutionDetail solution={current} large />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SolutionDetail({ solution, large }: { solution: Solution; large?: boolean }) {
  const tone = SOLUTION_TONE[solution.key];
  return (
    <div className="rounded-2xl border border-line bg-white p-2">
      {/* Text */}
      <div className={cn("px-4", large ? "pb-5 pt-5 sm:px-5" : "pb-4 pt-4")}>
        <p className="text-[13px] text-mute">{solution.audience}</p>
        <p className={cn("mt-2 leading-relaxed text-ink", large ? "text-[1.0625rem]" : "text-[1rem]")}>{solution.body}</p>
      </div>

      {/* Soft inset panel with this solution's own graphic */}
      <div className="relative overflow-hidden rounded-xl bg-[#f5f5f8]">
        <div
          aria-hidden
          className="absolute inset-y-0 left-[10%] right-[10%]"
          style={{ background: `linear-gradient(180deg, ${tone.wash}99, #fafafc 70%)` }}
        />
        <div className={cn("relative mx-auto w-full max-w-[340px]", large ? "px-4 py-8" : "px-3 py-6")}>
          <SolutionGraphic k={solution.key} />
        </div>
        <p className="relative pb-3 text-center text-[11.5px] text-mute">{solution.modules.join("  ·  ")}</p>
      </div>

      {/* Metric and link */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-3 pt-5 sm:px-5">
        <div>
          <p className="text-[2.25rem] font-light leading-none tracking-[-0.03em]" style={{ color: tone.ink }}>
            {solution.metric.value}
          </p>
          <p className="mt-2 text-[13px] text-ink-soft">{solution.metric.label}</p>
        </div>
        <a href="#contact" className="group flex items-center gap-1.5 text-[14px] font-medium text-ink">
          Talk to us
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </div>
    </div>
  );
}
