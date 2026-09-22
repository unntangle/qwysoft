"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  Hotel,
  Scale,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Industry switchboard.
   Pick an industry (or let it cycle) and the blueprint on the right
   re-wires itself: module nodes fly into orbit around the QWY + Odoo
   core, connections draw in and data pulses along them.
   Example outcomes are illustrative — edit INDUSTRIES to match reality.
------------------------------------------------------------------- */

type Industry = { name: string; icon: LucideIcon; modules: string[]; outcome: string };

const INDUSTRIES: Industry[] = [
  { name: "Manufacturing", icon: Factory, modules: ["MRP", "Quality", "Maintenance", "Purchase", "Costing"], outcome: "Live work-order costing" },
  { name: "Retail & E-commerce", icon: ShoppingBag, modules: ["POS", "eCommerce", "Loyalty", "Inventory", "GST billing"], outcome: "One stock view across stores and web" },
  { name: "Healthcare", icon: HeartPulse, modules: ["Appointments", "Pharmacy", "Billing", "Patient app", "Inventory"], outcome: "Front desk to pharmacy in one flow" },
  { name: "Logistics & Delivery", icon: Truck, modules: ["Fleet", "Routing", "Driver app", "Proof of delivery", "Invoicing"], outcome: "Every van tracked, every drop proven" },
  { name: "Education", icon: GraduationCap, modules: ["Admissions", "Fees", "Timetables", "Parent app", "Payroll"], outcome: "Admissions to fee receipts, no paper" },
  { name: "Hospitality", icon: Hotel, modules: ["Bookings", "POS", "Housekeeping", "Inventory", "Accounting"], outcome: "Rooms, restaurant and books in sync" },
  { name: "Food & Beverage", icon: UtensilsCrossed, modules: ["Kitchen display", "Recipes", "Stock", "POS", "Purchase"], outcome: "Daily food-cost variance" },
  { name: "Professional Services", icon: Briefcase, modules: ["Projects", "Timesheets", "Invoicing", "CRM", "Documents"], outcome: "Hours to invoice without re-keying" },
  { name: "Trading", icon: Scale, modules: ["Sales", "Purchase", "Multi-warehouse", "Accounting", "Dealer portal"], outcome: "One ledger for every branch" },
  { name: "Construction", icon: HardHat, modules: ["Job costing", "Subcontracts", "Assets", "Site app", "Purchase"], outcome: "Budget vs actual, per site, live" },
];

const CYCLE_MS = 4800;
const REVEAL_STEP = 0.45; // s between each module wiring in, one by one
const ITEM_H = 56; // px per dial row
const DIAL_H = 392; // visible dial window (7 rows)

// Blueprint geometry (SVG units)
const W = 560;
const H = 380;
const CX = W / 2;
const CY = H / 2;
const RX = 200;
const RY = 135;

function nodePositions(n: number, offset: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + offset + (i / n) * Math.PI * 2;
    return { x: CX + Math.cos(a) * RX, y: CY + Math.sin(a) * RY };
  });
}

export function IndustrySwitchboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const industry = INDUSTRIES[active];
  // Rotate the layout a little per industry so each blueprint feels different
  const nodes = nodePositions(industry.modules.length, (active % 3) * 0.35);

  // Progress (0 → 1) of the current industry. Drives both the moving
  // underline and the auto-advance, so hovering freezes the line in place
  // and it resumes from the same spot instead of restarting.
  const progress = useMotionValue(0);
  const running = !reduce && !paused && inView;

  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + Math.min(delta, 100) / CYCLE_MS;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % INDUSTRIES.length);
    } else {
      progress.set(next);
    }
  });

  // Manual selection (click / arrow keys) restarts the line
  useEffect(() => {
    progress.set(0);
  }, [active, progress]);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Industry dial: a 3D picker wheel of industries */}
      <div className="lg:col-span-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[0.9375rem] text-mute">Industries we run operations for</p>
          <p className="tnum text-[13px] text-mute">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(INDUSTRIES.length).padStart(2, "0")}
          </p>
        </div>

        <div
          className="relative mt-4 overflow-hidden [perspective:900px] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
          style={{ height: DIAL_H }}
          role="tablist"
          aria-label="Industries"
          aria-orientation="vertical"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % INDUSTRIES.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + INDUSTRIES.length) % INDUSTRIES.length);
            }
          }}
        >
          <motion.ul
            className="relative"
            animate={{ y: DIAL_H / 2 - ITEM_H / 2 - active * ITEM_H }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              const offset = i - active;
              const dist = Math.abs(offset);
              const on = offset === 0;
              return (
                <motion.li
                  key={ind.name}
                  style={{ height: ITEM_H, transformOrigin: "left center" }}
                  animate={{
                    opacity: on ? 1 : Math.max(0.1, 0.55 - dist * 0.14),
                    scale: on ? 1 : Math.max(0.6, 0.82 - dist * 0.06),
                    rotateX: reduce ? 0 : Math.max(-60, Math.min(60, offset * -20)),
                  }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    tabIndex={-1}
                    onClick={() => setActive(i)}
                    className="flex h-full w-full cursor-pointer items-center gap-4 px-4 text-left"
                  >
                    <span className={cn("tnum w-7 shrink-0 text-[13px] transition-colors", on ? "text-plum" : "text-mute")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "display whitespace-nowrap pb-[0.1em] text-[clamp(1.35rem,1.05rem+1.1vw,1.9rem)] leading-none",
                        on
                          ? "bg-[linear-gradient(95deg,#ff1f6b_0%,#c3158a_50%,#8f5cff_100%)] bg-clip-text text-transparent"
                          : "text-ink",
                      )}
                    >
                      {ind.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto grid size-7 shrink-0 place-items-center rounded-lg transition-all duration-500",
                        on ? "scale-100 bg-[linear-gradient(135deg,#ff1f6b,#8f5cff)] text-white opacity-100" : "scale-75 opacity-0",
                      )}
                    >
                      <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Moving underline: auto-advance progress along the selection window */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-5 right-5 origin-left rounded-full bg-[linear-gradient(90deg,#ff1f6b,#8f5cff)] opacity-70"
              style={{ top: DIAL_H / 2 + (ITEM_H - 6) / 2 - 1, height: 1.5, scaleX: progress }}
            />
          )}
        </div>

        {/* Up / down controls, aligned under the counter */}
        <div className="relative z-10 -mt-10 flex flex-col items-end gap-2">
          <button
            type="button"
            aria-label="Previous industry"
            onClick={() => setActive((a) => (a - 1 + INDUSTRIES.length) % INDUSTRIES.length)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink shadow-[0_6px_16px_-10px_rgba(45,22,90,0.35)] transition-colors hover:bg-[#ebe9ee]"
          >
            <ChevronUp className="size-4" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next industry"
            onClick={() => setActive((a) => (a + 1) % INDUSTRIES.length)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink shadow-[0_6px_16px_-10px_rgba(45,22,90,0.35)] transition-colors hover:bg-[#ebe9ee]"
          >
            <ChevronDown className="size-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      {/* Blueprint */}
      <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6" role="tabpanel" aria-live="polite">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white shadow-[var(--shadow-panel)]">
          <div aria-hidden className="grid-faint absolute inset-0 opacity-80" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(220,212,248,0.55),transparent_70%),radial-gradient(35%_35%_at_85%_90%,rgba(255,200,165,0.45),transparent_70%)]"
          />

          <div className="relative flex items-center justify-between px-5 pt-5">
            <p className="text-[12.5px] text-mute">System blueprint</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={industry.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-md bg-paper px-2 py-1 text-[12px] font-medium text-ink"
              >
                {industry.name}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
            {/* Orbit, connections and data pulses */}
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="wire" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff1f6b" />
                  <stop offset="1" stopColor="#8f5cff" />
                </linearGradient>
              </defs>
              <g className="origin-center animate-[spin_60s_linear_infinite]" style={{ transformOrigin: `${CX}px ${CY}px` }}>
                <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#e7e2ed" strokeDasharray="2 7" />
                <ellipse cx={CX} cy={CY} rx={RX * 0.58} ry={RY * 0.58} fill="none" stroke="#efeaf4" strokeDasharray="1 6" />
              </g>
              <AnimatePresence>
                {nodes.map((p, i) => {
                  const d = `M ${CX} ${CY} Q ${(CX + p.x) / 2 + (i % 2 ? 24 : -24)} ${(CY + p.y) / 2} ${p.x} ${p.y}`;
                  return (
                    <g key={`${industry.name}-${i}`}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="url(#wire)"
                        strokeWidth={1.5}
                        strokeOpacity={0.55}
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.45, delay: 0.1 + i * REVEAL_STEP, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {!reduce && (
                        <motion.circle
                          r={3}
                          fill="#ff1f6b"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.8, delay: 0.6 + i * REVEAL_STEP, repeat: Infinity, repeatDelay: 0.6 }}
                        >
                          <animateMotion dur="1.8s" begin={`${0.6 + i * REVEAL_STEP}s`} repeatCount="indefinite" path={d} />
                        </motion.circle>
                      )}
                    </g>
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Core */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}
            >
              {!reduce && (
                <>
                  <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-[#ff1f6b]/15 [animation-duration:2.6s]" aria-hidden />
                  <span className="absolute inset-0 -m-6 animate-ping rounded-full bg-[#8f5cff]/10 [animation-delay:1.3s] [animation-duration:2.6s]" aria-hidden />
                </>
              )}
              <div className="relative grid size-[88px] place-items-center rounded-full bg-[linear-gradient(135deg,#ff1f6b,#c3158a_50%,#5a0aa6)] text-center text-white shadow-[0_20px_40px_-16px_rgba(195,21,138,0.7)] sm:size-[104px]">
                <span className="flex flex-col items-center text-[13px] font-semibold leading-tight">
                  QWY
                  <span className="text-[11px] font-normal leading-none text-white/80">+</span>
                  <span className="text-[11px] font-normal text-white/80">Odoo</span>
                </span>
              </div>
            </div>

            {/* Module nodes */}
            <AnimatePresence>
              {nodes.map((p, i) => (
                <motion.div
                  key={`${industry.name}-${industry.modules[i]}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
                  initial={reduce ? false : { opacity: 0, scale: 0.6, x: `${((CX - p.x) / W) * 100}%`, y: `${((CY - p.y) / H) * 100}%` }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.4 + i * REVEAL_STEP }}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/95 px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_8px_20px_-10px_rgba(45,22,90,0.35)] backdrop-blur sm:text-[13px]">
                    <span className="size-1.5 rounded-full bg-[linear-gradient(135deg,#ff1f6b,#8f5cff)]" />
                    {industry.modules[i]}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Outcome */}
          <div className="relative flex items-center justify-between gap-4 border-t border-line bg-white/80 px-5 py-3.5 backdrop-blur">
            <span className="text-[12px] text-mute">What it delivers</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={industry.outcome}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
                className="text-right text-[13.5px] font-medium text-ink"
              >
                {industry.outcome}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
