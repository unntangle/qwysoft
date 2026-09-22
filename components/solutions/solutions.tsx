"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { SOLUTIONS, type Solution } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Solutions() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];

  return (
    <section id="solutions" className="relative py-24 sm:py-36" aria-labelledby="solutions-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="kicker mb-6">Odoo ERP services</p>
            <h2 id="solutions-title" className="display display-md max-w-[16ch]">
              Your whole business, running on <Grad>one system.</Grad>
            </h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9">
            From sales and finance to HR and inventory, we structure and customise Odoo to match how you work: better
            visibility, smoother coordination, and more control.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
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
                      "display flex-1 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] leading-tight transition-colors duration-300",
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
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white",
        large ? "p-8" : "p-5",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(220,212,248,0.9),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,217,194,0.8),transparent)]"
      />
      <div className="relative">
        <p className="text-[13px] text-mute">{solution.audience}</p>
        <p className={cn("mt-3 leading-relaxed text-ink", large ? "text-[1.125rem]" : "text-[1rem]")}>{solution.body}</p>

        <div className="mt-7 rounded-2xl border border-line bg-ivory/80 p-4">
          <p className="mb-3 flex items-center justify-between text-[12px] text-mute">
            <span>Modules configured</span>
            <span className="flex items-center gap-1.5 text-mint">
              <span className="size-1.5 rounded-full bg-mint" /> Live
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {solution.modules.map((m, i) => (
              <div key={m} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5">
                <span
                  className="grid size-7 place-items-center rounded-lg text-[11px] font-semibold text-white"
                  style={{ background: ["#5a2d8c", "#7357e8", "#ee7636", "#2f9e7a"][i % 4] }}
                  aria-hidden
                >
                  {m.slice(0, 2)}
                </span>
                <span className="flex-1 truncate text-[13px] font-medium">{m}</span>
                <Check className="size-3.5 text-mint" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-6">
          <div>
            <p className="display text-[2rem] leading-none">{solution.metric.value}</p>
            <p className="mt-2 text-[13px] text-ink-soft">{solution.metric.label}</p>
          </div>
          <a href="#contact" className="group flex items-center gap-1.5 text-[14px] font-medium text-plum">
            Talk to an Odoo consultant
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
