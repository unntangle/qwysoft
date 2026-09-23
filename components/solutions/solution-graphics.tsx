"use client";

import { motion } from "framer-motion";
import type { SolutionKey } from "@/lib/constants";

/* ------------------------------------------------------------------
   One small, calm graphic per Odoo solution, shown in the inset panel
   of the Odoo ERP card. Sarvam-like softness (white chips on pale grey,
   one gentle accent), but each solution gets its own picture, its own
   accent and a subtle animation that replays when you switch to it.
------------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

// One soft accent per solution: [ink, fill, wash]
export const SOLUTION_TONE: Record<SolutionKey, { ink: string; fill: string; wash: string }> = {
  trading: { ink: "#3f45b5", fill: "#a9b1f6", wash: "#eef0fd" },
  manufacturing: { ink: "#a0521f", fill: "#f3b58a", wash: "#fdf1e8" },
  projects: { ink: "#2c7a57", fill: "#96d3b4", wash: "#ebf6f0" },
  restaurant: { ink: "#a8266a", fill: "#f1a7c8", wash: "#fcedf4" },
  hr: { ink: "#5a3aa0", fill: "#c3b1ee", wash: "#f3effc" },
  crm: { ink: "#1f6c9a", fill: "#9fcbe8", wash: "#eaf4fb" },
  ecommerce: { ink: "#8a6a12", fill: "#e6cd82", wash: "#fbf5e4" },
  pos: { ink: "#1d7a78", fill: "#93d4d0", wash: "#e9f6f5" },
};

export function SolutionGraphic({ k }: { k: SolutionKey }) {
  const t = SOLUTION_TONE[k];
  switch (k) {
    case "trading":
      return <Ledger t={t} />;
    case "manufacturing":
      return <WorkOrder t={t} />;
    case "projects":
      return <Timesheet t={t} />;
    case "restaurant":
      return <Kitchen t={t} />;
    case "hr":
      return <Attendance t={t} />;
    case "crm":
      return <Pipeline t={t} />;
    case "ecommerce":
      return <OrderTrail t={t} />;
    case "pos":
      return <Receipt t={t} />;
  }
}

type Tone = (typeof SOLUTION_TONE)[SolutionKey];
const chip = "rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-ink";

/** Trading: three branches flow into one ledger, the total counts up */
function Ledger({ t }: { t: Tone }) {
  const branches = ["Kochi", "Kozhikode", "Thiruvananthapuram"];
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <ul className="space-y-2">
        {branches.map((b, i) => (
          <motion.li
            key={b}
            className={chip}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.45, ease }}
          >
            {b}
          </motion.li>
        ))}
      </ul>
      <svg viewBox="0 0 60 100" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
        {[16, 50, 84].map((y, i) => (
          <motion.path
            key={y}
            d={`M0 ${y} C 30 ${y}, 30 50, 60 50`}
            fill="none"
            stroke={t.fill}
            strokeWidth="1.5"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            className="animate-flow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          />
        ))}
      </svg>
      <motion.div
        className="rounded-2xl border border-line bg-white px-4 py-3 text-center shadow-[0_10px_24px_-18px_rgba(23,19,31,0.4)]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
      >
        <p className="text-[11px] text-mute">One ledger</p>
        <p className="tnum mt-0.5 text-[1.1rem] font-medium" style={{ color: t.ink }}>
          ₹4.8 Cr
        </p>
      </motion.div>
    </div>
  );
}

/** Manufacturing: a work order moves stage by stage, cost tracked live */
function WorkOrder({ t }: { t: Tone }) {
  const stages = ["Cut", "Assemble", "Quality", "Pack"];
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-ink">WO/0142 · Steel racks</span>
        <span style={{ color: t.ink }}>Cost live</span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {stages.map((s, i) => (
          <div key={s}>
            <div className="h-2 overflow-hidden rounded-full" style={{ background: t.wash }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: t.fill }}
                initial={{ width: 0 }}
                animate={{ width: i < 3 ? "100%" : "45%" }}
                transition={{ delay: 0.2 + i * 0.35, duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1.5 text-center text-[11px] text-ink-soft">{s}</p>
          </div>
        ))}
      </div>
      <motion.div
        className="mt-5 flex items-center justify-between rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <span className="text-ink-soft">Actual vs planned</span>
        <span className="tnum font-medium" style={{ color: t.ink }}>
          ₹1,24,500 · −3%
        </span>
      </motion.div>
    </div>
  );
}

/** Projects: a week of timesheet bars grows to a total, ready to invoice */
function Timesheet({ t }: { t: Tone }) {
  const days = [
    { d: "M", h: 70 },
    { d: "T", h: 90 },
    { d: "W", h: 60 },
    { d: "T", h: 100 },
    { d: "F", h: 80 },
  ];
  return (
    <div>
      <div className="flex h-28 items-end gap-3">
        {days.map((x, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <motion.span
              className="w-full rounded-t-lg"
              style={{ background: i === 3 ? t.fill : t.wash }}
              initial={{ height: 0 }}
              animate={{ height: `${x.h}%` }}
              transition={{ delay: i * 0.08, duration: 0.55, ease }}
            />
            <span className="text-[11px] text-mute">{x.d}</span>
          </div>
        ))}
      </div>
      <motion.div
        className="mt-4 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="tnum text-[1.1rem] font-medium" style={{ color: t.ink }}>
          38.5 h
        </span>
        <span className={chip}>Ready to invoice</span>
      </motion.div>
    </div>
  );
}

/** Restaurants: kitchen tickets slide in beside a food-cost ring */
function Kitchen({ t }: { t: Tone }) {
  const tickets = [
    { table: "Table 4", item: "2 × Biryani", state: "Cooking" },
    { table: "Table 9", item: "1 × Appam stew", state: "Ready" },
  ];
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <ul className="space-y-2">
        {tickets.map((k, i) => (
          <motion.li
            key={k.table}
            className="rounded-2xl border border-line bg-white px-3.5 py-2.5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.25, duration: 0.45, ease }}
          >
            <div className="flex items-center justify-between text-[11px] text-mute">
              {k.table}
              <span style={{ color: k.state === "Ready" ? t.ink : undefined }}>{k.state}</span>
            </div>
            <p className="mt-0.5 text-[13px] text-ink">{k.item}</p>
          </motion.li>
        ))}
      </ul>
      <div className="relative size-24">
        <svg viewBox="0 0 44 44" className="size-full -rotate-90" aria-hidden>
          <circle cx="22" cy="22" r="18" fill="none" stroke={t.wash} strokeWidth="4" />
          <motion.circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={t.fill}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.31 }}
            transition={{ delay: 0.4, duration: 1, ease }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <span>
            <span className="tnum block text-[1rem] font-medium" style={{ color: t.ink }}>
              31%
            </span>
            <span className="block text-[9.5px] text-mute">food cost</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** HR & payroll: an attendance calendar fills in, then the payslip is ready */
function Attendance({ t }: { t: Tone }) {
  const days = Array.from({ length: 20 }, (_, i) => i);
  const leave = new Set([6, 13]);
  return (
    <div>
      <p className="text-[12px] text-ink-soft">September attendance</p>
      <div className="mt-3 grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <motion.span
            key={d}
            className="aspect-square rounded-md"
            style={{ background: leave.has(d) ? t.wash : t.fill }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: d * 0.035, duration: 0.25 }}
          />
        ))}
      </div>
      <motion.div
        className="mt-5 flex items-center justify-between rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <span className="text-ink">Payslip ready</span>
        <span className="tnum" style={{ color: t.ink }}>
          18 of 20 days
        </span>
      </motion.div>
    </div>
  );
}

/** CRM: a small pipeline; one lead card glides across to Won */
function Pipeline({ t }: { t: Tone }) {
  const cols = ["New", "Proposal", "Won"];
  return (
    <div className="relative grid grid-cols-3 gap-2">
      {cols.map((c, i) => (
        <div key={c} className="rounded-xl p-2" style={{ background: i === 2 ? t.wash : "rgba(255,255,255,0.6)" }}>
          <p className="text-[11px] text-mute">{c}</p>
          <div className="mt-2 space-y-1.5">
            {Array.from({ length: i === 0 ? 3 : i === 1 ? 2 : 1 }).map((_, j) => (
              <span key={j} className="block h-6 rounded-lg border border-line bg-white" />
            ))}
          </div>
        </div>
      ))}
      {/* The moving lead: slides one column at a time (each step ≈ one card width plus the gap) */}
      <motion.span
        className="absolute left-2 top-[30px] flex h-6 w-[calc(33.333%-22px)] items-center truncate rounded-lg px-2 text-[10.5px] font-medium shadow-[0_8px_18px_-10px_rgba(23,19,31,0.4)]"
        style={{ background: "#fff", color: t.ink, outline: `1.5px solid ${t.fill}` }}
        initial={{ x: "0%", opacity: 0 }}
        animate={{ x: ["0%", "0%", "132%", "132%", "264%", "264%"], opacity: [0, 1, 1, 1, 1, 1] }}
        transition={{ duration: 3.2, times: [0, 0.12, 0.4, 0.55, 0.85, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
      >
        Anand Traders
      </motion.span>
    </div>
  );
}

/** E-commerce: an order travels Placed → Paid → Packed → Shipped */
function OrderTrail({ t }: { t: Tone }) {
  const steps = ["Placed", "Paid", "Packed", "Shipped"];
  return (
    <div>
      <p className="text-[12px] text-ink-soft">Order #2048 · 3 items</p>
      <div className="relative mt-6">
        <div className="absolute left-3 right-3 top-3 h-px" style={{ background: t.wash }} />
        <motion.div
          className="absolute left-3 top-3 h-px"
          style={{ background: t.fill }}
          initial={{ width: 0 }}
          animate={{ width: "calc(100% - 1.5rem)" }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeInOut" }}
        />
        <ol className="relative flex justify-between">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-2">
              <motion.span
                className="grid size-6 place-items-center rounded-full border-2 border-white"
                style={{ background: t.wash }}
                animate={{ background: t.fill }}
                transition={{ delay: 0.2 + i * 0.5, duration: 0.3 }}
              />
              <span className="text-[11px] text-ink-soft">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <motion.div
        className="mt-6 flex items-center justify-between rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
      >
        <span className="text-ink">Stock updated</span>
        <span style={{ color: t.ink }}>Invoice posted</span>
      </motion.div>
    </div>
  );
}

/** POS: a receipt prints line by line, with an offline-safe sync pulse */
function Receipt({ t }: { t: Tone }) {
  const lines = [
    ["Rice 5 kg", "₹420"],
    ["Coconut oil 1 L", "₹235"],
    ["Loyalty points", "−₹20"],
  ];
  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-4">
      <motion.div
        className="overflow-hidden rounded-t-xl border border-line bg-white px-3.5 pt-3 [mask-image:linear-gradient(black_85%,transparent)]"
        initial={{ height: 0 }}
        animate={{ height: 150 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-center text-[10.5px] text-mute">Counter 2 · GST invoice</p>
        <ul className="mt-2.5 space-y-1.5 text-[12px]">
          {lines.map(([a, b]) => (
            <li key={a} className="flex justify-between text-ink">
              <span>{a}</span>
              <span className="tnum">{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2.5 flex justify-between border-t border-dashed border-line pt-2 text-[12.5px] font-medium">
          <span>Total</span>
          <span className="tnum" style={{ color: t.ink }}>
            ₹635
          </span>
        </div>
      </motion.div>
      <div className="flex flex-col items-center gap-2 pt-2">
        <span className="relative grid size-10 place-items-center rounded-full bg-white ring-1 ring-line">
          <span className="absolute inset-0 animate-ping rounded-full [animation-duration:2.4s]" style={{ background: t.wash }} />
          <span className="relative size-2.5 rounded-full" style={{ background: t.fill }} />
        </span>
        <span className="text-center text-[10.5px] leading-tight text-ink-soft">
          Offline-safe
          <br />
          syncs later
        </span>
      </div>
    </div>
  );
}
