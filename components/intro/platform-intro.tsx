"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Bot, Smartphone, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { Reveal } from "@/components/ui/reveal";

const LAYERS = [
  {
    name: "Think",
    caption: "Applied AI on your Odoo data",
    tint: "from-[#2a1f5c] to-[#4a2b86]",
    dark: true,
  },
  {
    name: "Extend",
    caption: "Custom portals and mobile apps on Odoo",
    tint: "from-white to-[#f7f3ff]",
  },
  {
    name: "Run",
    caption: "Odoo apps, configured to your workflows",
    tint: "from-white to-[#fff6f0]",
  },
];

export function PlatformIntro() {
  // Scroll-linked "fall", in sequence: nothing moves until the Think card has
  // scrolled right up under the site header, then Extend drops out from behind
  // it, and only after Extend has landed does Run drop. The spring adds a small
  // settle bounce.
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start 60%", "start 0%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 18, mass: 0.7 });
  // Extend: first half of the scroll
  const yExtend = useTransform(progress, [0, 0.45], [-190, 0]);
  const rotExtend = useTransform(progress, [0, 0.45], [-2.5, 0]);
  const fadeExtend = useTransform(progress, [0, 0.12], [0, 1]);
  // Run: second half, starts once Extend has landed
  const yRun = useTransform(progress, [0.5, 0.95], [-210, 0]);
  const rotRun = useTransform(progress, [0.5, 0.95], [3, 0]);
  const fadeRun = useTransform(progress, [0.5, 0.62], [0, 1]);
  const motionFor = (i: number) =>
    reduce || i === 0
      ? {}
      : i === 1
        ? { y: yExtend, rotate: rotExtend, opacity: fadeExtend }
        : { y: yRun, rotate: rotRun, opacity: fadeRun };

  return (
    <section id="platform" className="relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="platform-title">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-x-20">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="kicker mb-6">How it fits together</p>
            <h2 id="platform-title" className="display display-sm">
              One System for How Your Business <Grad>Actually Works.</Grad>
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              <p>
                Odoo runs the core: sales, purchase, inventory, accounting and people. Custom web and mobile software extends
                it to the way your teams, dealers and customers actually work.
              </p>
              <p>
                Applied AI sits on top, turning the data from both into forecasts, alerts and answers you can act on.
              </p>
            </div>
          </div>

          <Reveal className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <div
              aria-hidden
              className="absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(50%_50%_at_30%_70%,rgba(255,200,165,0.55),transparent_100%),radial-gradient(45%_45%_at_75%_30%,rgba(190,176,245,0.55),transparent_100%)]"
            />
            <div ref={stackRef} className="relative mx-auto max-w-[640px] pb-6 pt-2 [perspective:1600px]">
              {LAYERS.map((l, i) => (
                <motion.div
                  key={l.name}
                  className={`relative rounded-[22px] border bg-gradient-to-br p-5 will-change-transform sm:p-6 ${["sm:mr-[12%]", "sm:mx-[6%]", "sm:ml-[12%]"][i]} ${l.tint} ${
                    l.dark ? "border-white/10 text-white" : "border-line text-ink"
                  } shadow-[var(--shadow-panel)]`}
                  style={{
                    marginTop: i === 0 ? 0 : -14,
                    zIndex: 3 - i,
                    ...motionFor(i),
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="display text-[1.9rem] leading-none">{l.name}</p>
                    <p className={`text-right text-[13px] ${l.dark ? "text-white/60" : "text-mute"}`}>{l.caption}</p>
                  </div>
                  <div className="mt-5">
                    {i === 0 && <ThinkLayer />}
                    {i === 1 && <ExtendLayer />}
                    {i === 2 && <RunLayer />}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ThinkLayer() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
      <div className="rounded-xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[12px] text-white/60">
          <Bot className="size-3.5" aria-hidden /> Asked by Finance
        </p>
        <p className="mt-1.5 text-[14px] leading-snug">Which customers are likely to pay late this quarter?</p>
        <p className="mt-3 text-[12.5px] leading-relaxed text-white/70">
          14 customers, <span className="text-white">₹22.4 L</span> in open invoices. Payment delays grew after their credit
          limits were raised in July.
        </p>
        <p className="mt-3 text-[11px] text-white/45">Accounting › Aged Receivable · Customer payment history</p>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[12px] text-white/60">
          <Sparkles className="size-3.5 text-saffron" aria-hidden /> Demand forecast
        </p>
        <svg viewBox="0 0 120 44" className="mt-2 h-auto w-full" aria-hidden>
          <path d="M0 34 C 18 30, 26 36, 42 26 S 70 20, 80 18" fill="none" stroke="#a898f2" strokeWidth="2" />
          <path d="M80 18 C 92 14, 104 6, 120 8" fill="none" stroke="#ee7636" strokeWidth="2" strokeDasharray="3 4" />
        </svg>
        <p className="tnum mt-1 text-[12px] text-white/70">Nov demand +22%</p>
        <p className="mt-1 text-[11px] text-white/45">Suggests new reordering rule min/max</p>
      </div>
    </div>
  );
}

function ExtendLayer() {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="rounded-xl border border-line bg-white p-3">
        <div className="flex gap-1.5">
          {["#e7e2ed", "#e7e2ed", "#e7e2ed"].map((c, i) => (
            <span key={i} className="size-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-3 text-[12px] text-mute">Dealer portal · synced with Odoo</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["Sales orders", "142"],
            ["Credit limit left", "₹6.8 L"],
            ["Next delivery", "WH/OUT/00412"],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0 rounded-lg bg-paper p-2">
              <p className="truncate text-[10.5px] text-mute">{k}</p>
              <p className="tnum truncate text-[13px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[92px] flex-col rounded-[16px] border border-line bg-white p-2">
        <Smartphone className="mx-auto size-3 text-mute" aria-hidden />
        <p className="mt-2 text-[10px] text-mute">Field sales app</p>
        <p className="text-[12px] font-semibold">Visit 4 of 9</p>
        <div className="mt-2 h-1 rounded-full bg-paper">
          <div className="h-full w-[44%] rounded-full bg-violet" />
        </div>
        <span className="mt-auto rounded-lg bg-[#efeafd] px-1 py-1.5 text-center text-[10px] font-medium leading-none text-plum">New quotation</span>
      </div>
    </div>
  );
}

function RunLayer() {
  // Real Odoo app names. The first six are installed; the dashed ones are available to add later.
  const modules = ["Sales", "Purchase", "Inventory", "Accounting", "Manufacturing", "Employees", "Point of Sale", "CRM"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {modules.map((m, i) => (
        <span
          key={m}
          className={`rounded-lg border px-2.5 py-1.5 text-[12.5px] ${
            i < 6 ? "border-line bg-white text-ink" : "border-dashed border-line-strong text-mute"
          }`}
        >
          {m}
          {i < 6 && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-mint align-middle" aria-hidden />}
        </span>
      ))}
    </div>
  );
}
