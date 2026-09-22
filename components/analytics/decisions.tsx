"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Database, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Bars, LineChart } from "@/components/dashboard/charts";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { DAILY_LABELS, DAILY_ORDERS } from "@/lib/data";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Connect every source",
    body: "Odoo, your custom apps, POS counters and delivery vans stream into one governed model. No exports, no copy-paste.",
    stat: { to: 1.2, decimals: 1, suffix: "M", label: "records unified per day" },
  },
  {
    title: "See the whole operation",
    body: "Branches, channels and warehouses on one screen, refreshed in seconds, with the history that explains the present.",
    stat: { to: 14, decimals: 0, suffix: " s", label: "from counter sale to dashboard" },
  },
  {
    title: "Act on what matters",
    body: "Forecasts and anomalies arrive as recommendations with reasons, owners and a one-click action in the ERP.",
    stat: { to: 72, decimals: 0, suffix: "%", label: "of routine decisions automated" },
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Decisions() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  const glowX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "20%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section id="decisions" data-nav="dark" className="relative bg-night text-white" aria-labelledby="decisions-title">
      {/* Soft seam from paper into night */}
      <div aria-hidden className="h-32 bg-linear-to-b/oklab from-paper to-night" />

      <Container className="pb-8 pt-10 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="decisions-title" className="display display-md max-w-[15ch] lg:col-span-7">
            Turn complex operations into clear decisions.
          </h2>
          <p className="lede text-white/60 lg:col-span-4 lg:col-start-9">
            The QWY Console sits on top of your ERP and apps. It is where the numbers meet, and where the next action starts.
          </p>
        </div>
      </Container>

      {/* Desktop: pinned narrative */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: "300vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            aria-hidden
            style={{ x: glowX }}
            className="pointer-events-none absolute right-[-10%] top-[10%] h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(115,87,232,0.45),rgba(90,45,140,0.2)_55%,transparent_75%)] blur-2xl"
          />
          <div aria-hidden className="grid-night pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_65%_50%,black,transparent)]" />

          <Container className="relative grid grid-cols-12 gap-10">
            <ol className="col-span-4 space-y-3 self-center">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "rounded-2xl border p-6 transition-all duration-700",
                    i === step ? "border-white/15 bg-white/[0.05]" : "border-transparent opacity-40",
                  )}
                >
                  <p className="flex items-center gap-3 text-[13px] text-white/50">
                    <span className="tnum">{`0${i + 1}`}</span>
                    <span className="h-px flex-1 bg-white/10">
                      <motion.span
                        className="block h-px origin-left bg-violet-soft"
                        animate={{ scaleX: i < step ? 1 : i === step ? 0.5 : 0 }}
                        transition={{ duration: 0.6, ease }}
                      />
                    </span>
                  </p>
                  <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <AnimatePresence initial={false}>
                    {i === step && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-[0.975rem] leading-relaxed text-white/60">{s.body}</p>
                        <p className="mt-5 flex items-baseline gap-2">
                          <span className="display text-[2.6rem] leading-none">
                            <Counter to={s.stat.to} decimals={s.stat.decimals} suffix={s.stat.suffix} duration={1.2} />
                          </span>
                          <span className="text-[13px] text-white/50">{s.stat.label}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ol>

            <motion.div style={{ y: panelY }} className="relative col-span-8 col-start-5">
              <DecisionsStage step={step} />
            </motion.div>
          </Container>
        </div>
      </div>

      {/* Mobile and tablet: the same story, stacked */}
      <Container className="space-y-14 pb-24 pt-10 lg:hidden">
        {STEPS.map((s, i) => (
          <div key={s.title}>
            <p className="tnum text-[13px] text-white/45">{`0${i + 1}`}</p>
            <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-2 text-[0.975rem] leading-relaxed text-white/60">{s.body}</p>
            <div className="mt-6">
              {i === 0 && <SourcesPanel active />}
              {i === 1 && <OrdersPanel />}
              {i === 2 && <RecommendationPanel />}
            </div>
          </div>
        ))}
      </Container>

      <div aria-hidden className="h-40 bg-linear-to-b/oklab from-night to-[#fdf3ec]" />
    </section>
  );
}

function DecisionsStage({ step }: { step: number }) {
  return (
    <div className="relative">
      <div className={cn("transition-all duration-700", step === 0 ? "opacity-40 blur-[1px]" : "opacity-100")}>
        <OrdersPanel />
      </div>

      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="sources"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-x-[12%] top-[12%]"
          >
            <SourcesPanel active />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="absolute -right-8 -top-10 w-[230px]"
          >
            <div className="surface-night rounded-2xl p-4 backdrop-blur-md">
              <p className="text-[12px] text-white/55">Orders by branch, this week</p>
              <Bars
                className="mt-4"
                tone="dark"
                height={96}
                values={[1240, 890, 1480, 760, 610]}
                labels={["Kochi", "TCR", "TVM", "KZD", "KNR"]}
                highlight={2}
                color="rgba(168,152,242,0.35)"
                highlightColor="#a898f2"
                format={{}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="rec"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease }}
            className="absolute -bottom-16 left-[6%] w-[380px]"
          >
            <RecommendationPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div className="surface-night rounded-[22px] p-5 backdrop-blur-md sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[12.5px] text-white/55">Daily orders, September</p>
          <p className="mt-1 flex items-baseline gap-3">
            <span className="tnum text-[2rem] font-semibold tracking-[-0.03em]">
              <Counter to={14982} />
            </span>
            <span className="text-[12.5px] font-medium text-[#7fe0bd]">+11.8% vs August</span>
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1 text-[11.5px]">
          {["7D", "30D", "QTD"].map((t, i) => (
            <span key={t} className={cn("rounded-md px-2 py-1", i === 1 ? "bg-white/10 text-white" : "text-white/45")}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <LineChart
        className="mt-4"
        tone="dark"
        height={230}
        labels={DAILY_LABELS}
        min={360}
        max={640}
        format={{ suffix: " orders" }}
        series={[{ name: "Orders", values: DAILY_ORDERS, color: "#a898f2", area: true }]}
      />
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        {[
          ["Avg. basket", "₹1,284"],
          ["Repeat customers", "31.4%"],
          ["Returns", "1.8%"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[11.5px] text-white/45">{k}</p>
            <p className="tnum mt-0.5 text-[15px] font-medium">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourcesPanel({ active }: { active?: boolean }) {
  const sources = [
    { name: "Odoo Sales & Inventory", rows: "412k rows" },
    { name: "POS, 38 counters", rows: "96k bills" },
    { name: "Delivery app", rows: "18k trips" },
    { name: "Bank statements", rows: "4 accounts" },
  ];
  return (
    <div className="rounded-[22px] border border-white/12 bg-[#1b1440]/90 p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <p className="flex items-center gap-2 text-[13px] font-medium">
        <Database className="size-4 text-violet-soft" aria-hidden /> Sources syncing
      </p>
      <ul className="mt-4 space-y-2">
        {sources.map((s, i) => (
          <li key={s.name} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 text-[13px]">
            <span className="flex items-center gap-2">
              <span className={cn("size-1.5 rounded-full bg-[#7fe0bd]", active && "live-dot")} style={{ animationDelay: `${i * 0.3}s` }} />
              {s.name}
            </span>
            <span className="tnum text-white/45">{s.rows}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationPanel() {
  return (
    <div className="rounded-[22px] border border-white/60 bg-white p-5 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
      <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-plum">
        <Sparkles className="size-3.5" aria-hidden /> Recommendation
      </p>
      <p className="mt-2 text-[15px] leading-snug">
        Move 300 units of festive gift packs from Thrissur to Thiruvananthapuram before Friday.
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
        TVM is selling 2.3× faster than forecast; Thrissur holds 41 days of cover.
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-white">
          Create transfer in Odoo <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
        <span className="tnum text-[12px] text-mute">Impact ≈ ₹3.1 L</span>
      </div>
    </div>
  );
}
