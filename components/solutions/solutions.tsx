"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Factory,
  FolderKanban,
  Handshake,
  Plus,
  Receipt,
  ShoppingCart,
  Sparkles,
  Store,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { SOLUTIONS, type SolutionKey } from "@/lib/constants";
import { SolutionGraphic } from "@/components/solutions/solution-graphics";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Odoo ERP services, laid out like Mixpanel's AI section:
   - left: a vertical rail of solutions (icon + label)
   - middle: gradient pill, heading, description, pill button and a
     gradient-bordered callout with the outcome and modules
   - right: a vivid violet → pink panel holding a white card with the
     solution's animated graphic and an "ask" bar
   Switching tabs cross-fades the middle and right columns.
------------------------------------------------------------------- */

const ICONS: Record<SolutionKey, LucideIcon> = {
  trading: Store,
  manufacturing: Factory,
  projects: FolderKanban,
  restaurant: UtensilsCrossed,
  hr: Users,
  crm: Handshake,
  ecommerce: ShoppingCart,
  pos: Receipt,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Solutions() {
  const [active, setActive] = useState(0);
  const s = SOLUTIONS[active];
  const Icon = ICONS[s.key];

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

        <div className="mt-12 grid gap-6 lg:grid-cols-[148px_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* Rail: one frosted panel; a white card slides to the active solution */}
          <div
            role="tablist"
            aria-label="Odoo solutions"
            aria-orientation="vertical"
            className="flex gap-1 overflow-x-auto rounded-[22px] border border-line bg-ivory p-1.5 [scrollbar-width:none] lg:flex-col lg:self-start lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {SOLUTIONS.map((sol, i) => {
              const I = ICONS[sol.key];
              const on = i === active;
              return (
                <button
                  key={sol.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group/tab relative flex min-w-[118px] shrink-0 cursor-pointer flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center transition-colors duration-300 lg:min-w-0",
                    on ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="solution-active"
                      aria-hidden
                      className="absolute inset-0 rounded-2xl ring-1 ring-line-strong"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <I
                    className={cn("relative size-4 transition-colors duration-300", on ? "text-[#c3158a]" : "text-ink-soft group-hover/tab:text-ink")}
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <span className="relative text-[12.5px] leading-tight">{sol.name}</span>
                </button>
              );
            })}
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease }}
              >
                {/* Audience, styled like the site's section labels */}
                <p className="kicker flex items-center gap-2">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {s.audience}
                </p>

                <h3 className="display mt-4 text-[clamp(1.6rem,1.2rem+1.3vw,2.4rem)] leading-[1.1]">{s.name}</h3>
                <p className="mt-3 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft">{s.body}</p>

                <a
                  href="#contact"
                  className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#ebe9ee] px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-[#e2dfe6]"
                >
                  Talk to us
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>

                {/* Key result: big light metric in the brand gradient, then its label and the modules */}
                <div className="mt-8 border-t border-line pt-6">
                  <p className="display text-[clamp(2rem,1.6rem+1.2vw,2.6rem)] font-light leading-none">
                    <Grad>{s.metric.value}</Grad>
                  </p>
                  <p className="mt-2 text-[15px] text-ink-soft">{s.metric.label}</p>
                  <p className="mt-4 text-[13px] text-mute">{s.modules.join("  ·  ")}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual: vivid gradient panel with a white card */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[4px] bg-[linear-gradient(115deg,#33055f_0%,#5a0aa6_30%,#8f14a0_52%,#c3158a_74%,#ff1f6b_100%)] lg:min-h-[520px]">
            {/* soft vertical light streaks */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.18)_18%,transparent_30%,transparent_52%,rgba(255,255,255,0.2)_64%,transparent_76%)] opacity-80"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(34,3,61,0.4),transparent)]" />

            <div className="absolute inset-x-6 inset-y-8 sm:inset-x-10 sm:inset-y-12">
              <div className="flex h-full flex-col rounded-[22px] bg-white/95 p-3 shadow-[0_30px_60px_-24px_rgba(34,3,61,0.6)] ring-4 ring-white/30">
                {/* Header strip */}
                <div className="rounded-2xl bg-[linear-gradient(95deg,#f7f1ff,#fdf1f6,#fff4ee)] px-4 py-3 ring-1 ring-[#f0dcef]">
                  <p className="flex items-center gap-2 text-[13px] text-[#c3158a]">
                    <Sparkles className="size-4" strokeWidth={1.75} aria-hidden />
                    QWY · Odoo
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={s.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 text-[14px] leading-snug text-ink"
                    >
                      {s.metric.value} {s.metric.label}, now running in Odoo for {s.audience.toLowerCase()}.
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Graphic */}
                <div className="grid flex-1 place-items-center px-3 py-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.45, ease }}
                      className="w-full max-w-[360px]"
                    >
                      <SolutionGraphic k={s.key} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Ask bar */}
                <div className="rounded-2xl bg-[#f4f3f6] px-4 py-3">
                  <p className="text-[13px] text-mute">Ask about {s.name.toLowerCase()}…</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Plus className="size-4 text-ink-soft" aria-hidden />
                    <span className="grid size-7 place-items-center rounded-full border border-ink-soft/60">
                      <span className="size-2.5 rounded-[2px] bg-ink-soft/70" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
