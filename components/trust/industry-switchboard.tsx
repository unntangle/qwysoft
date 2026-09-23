"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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

// Blueprint geometry (SVG units): a circuit board with the QWY + Odoo core
// as the processor and each module wired to it with right-angled traces.
const W = 560;
const H = 360;
const CHIP = { x: 205, y: 132, w: 150, h: 96 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
// Module positions, clockwise from top-left, and the trace from each into the core
const SLOTS = [
  { x: 95, y: 70, d: "M150 70 H180 V150 H205" },
  { x: 280, y: 40, d: "M280 58 V132" },
  { x: 465, y: 70, d: "M410 70 H380 V150 H355" },
  { x: 465, y: 290, d: "M410 290 H380 V210 H355" },
  { x: 95, y: 290, d: "M150 290 H180 V210 H205" },
];
const VIAS = [
  [180, 70], [180, 150], [380, 70], [380, 150], [380, 290], [380, 210], [180, 290], [180, 210],
];
const DB_TRACE = "M280 228 V296";
const PINS = Array.from({ length: 7 }, (_, k) => CHIP.y + 6 + k * 12);

export function IndustrySwitchboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const industry = INDUSTRIES[active];

  // Progress (0 → 1) of the current industry. Drives both the moving
  // underline and the auto-advance, so hovering freezes the line in place
  // and it resumes from the same spot instead of restarting.
  const progress = useMotionValue(0);

  // Scroll-in for the blueprint card: it stays hidden until the section heading
  // has scrolled up under the site header, then starts tilted back in 3D,
  // smaller and lower, and "boots up" flat, with a scan line sweeping down it
  // and the grid drifting underneath.
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScroll } = useScroll({ target: cardRef, offset: ["start 90%", "start 45%"] });
  const cardP = useSpring(cardScroll, { stiffness: 110, damping: 22, mass: 0.6 });
  const cardRotateX = useTransform(cardP, [0, 1], [24, 0]);
  const cardScale = useTransform(cardP, [0, 1], [0.86, 1]);
  const cardY = useTransform(cardP, [0, 1], [70, 0]);
  const cardOpacity = useTransform(cardP, [0, 0.35], [0, 1]);
  const gridY = useTransform(cardP, [0, 1], [-40, 0]);
  const scanTop = useTransform(cardP, (v) => `${v * 100}%`);
  const scanOpacity = useTransform(cardP, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);

  // The dial holds on 01 until the visitor has actually scrolled down to this
  // section (the blueprint card has booted up). Scrolling back above it resets
  // to 01 so the story starts from the beginning next time.
  const [armed, setArmed] = useState(false);
  useMotionValueEvent(cardScroll, "change", (v) => {
    if (v >= 0.95 && !armed) setArmed(true);
    if (v <= 0.02 && armed) {
      setArmed(false);
      setActive(0);
      progress.set(0);
    }
  });

  const running = !reduce && !paused && inView && armed;

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
      <div
        ref={cardRef}
        className="relative mx-auto w-full max-w-[560px] [perspective:1400px] lg:col-span-6"
        role="tabpanel"
        aria-live="polite"
      >
        <motion.div
          className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white shadow-[var(--shadow-panel)]"
          style={
            reduce
              ? undefined
              : { rotateX: cardRotateX, scale: cardScale, y: cardY, opacity: cardOpacity, transformOrigin: "50% 100%" }
          }
        >
          <motion.div aria-hidden className="grid-faint absolute -inset-y-10 inset-x-0 opacity-80" style={reduce ? undefined : { y: gridY }} />
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 z-20 h-16 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(143,92,255,0.10)_45%,rgba(255,31,107,0.14)_50%,rgba(143,92,255,0.10)_55%,transparent)]"
              style={{ top: scanTop, opacity: scanOpacity }}
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,#ff1f6b_30%,#8f5cff_70%,transparent)] opacity-60" />
            </motion.div>
          )}
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
            {/* Board: idle traces, live traces with signals, vias and chip pins */}
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="trace" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#ff1f6b" />
                  <stop offset="1" stopColor="#8f5cff" />
                </linearGradient>
              </defs>

              {SLOTS.map((s) => (
                <path key={s.d} d={s.d} fill="none" stroke="#e9e4ef" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              ))}

              <AnimatePresence>
                {SLOTS.map((s, i) => (
                  <g key={`${industry.name}-${i}`}>
                    <motion.path
                      d={s.d}
                      fill="none"
                      stroke="url(#trace)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.45, delay: 0.1 + i * REVEAL_STEP, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {!reduce && (
                      <path
                        d={s.d}
                        pathLength={1}
                        fill="none"
                        stroke="#ff1f6b"
                        strokeWidth={4}
                        strokeLinecap="round"
                        className="trace-signal"
                        style={{ animationDelay: `${0.6 + i * REVEAL_STEP}s` }}
                      />
                    )}
                  </g>
                ))}
              </AnimatePresence>

              {/* Core → database */}
              <path d={DB_TRACE} fill="none" stroke="#2f9e7a" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="4 5" className="animate-flow" />

              {VIAS.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill="#fff" stroke="#d9d2e3" strokeWidth={1.5} />
              ))}

              {PINS.map((py) => (
                <g key={py} fill="#d9d2e3">
                  <rect x={CHIP.x - 7} y={py - 1.5} width={7} height={3} rx={1} />
                  <rect x={CHIP.x + CHIP.w} y={py - 1.5} width={7} height={3} rx={1} />
                </g>
              ))}
            </svg>

            {/* Core processor */}
            <div
              className="absolute grid place-items-center rounded-2xl bg-[linear-gradient(135deg,#ff1f6b,#c3158a_50%,#5a0aa6)] text-white shadow-[0_20px_40px_-16px_rgba(195,21,138,0.7)]"
              style={{ left: pct(CHIP.x, W), top: pct(CHIP.y, H), width: pct(CHIP.w, W), height: pct(CHIP.h, H) }}
            >
              <span aria-hidden className="absolute inset-[6px] rounded-xl border border-white/20" />
              <span aria-hidden className="absolute left-3 top-3 size-1.5 rounded-full bg-white/70" />
              {!reduce && (
                <span aria-hidden className="absolute -inset-1.5 animate-pulse rounded-[20px] ring-2 ring-[#ff1f6b]/25" />
              )}
              <span className="relative flex flex-col items-center text-center leading-tight">
                <span className="block text-[15px] font-semibold tracking-[0.04em]">QWY</span>
                <span className="block text-[11px] leading-none text-white/75">+</span>
                <span className="block text-[11px] text-white/75">Odoo core</span>
              </span>
            </div>

            {/* One database */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(280, W), top: pct(310, H) }}
            >
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/95 px-2.5 py-1 text-[11px] text-ink-soft">
                <span className="live-dot size-1.5 rounded-full bg-mint" />1 database · live
              </span>
            </div>

            {/* Module components */}
            <AnimatePresence>
              {SLOTS.map((s, i) => (
                <motion.div
                  key={`${industry.name}-${industry.modules[i]}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pct(s.x, W), top: pct(s.y, H) }}
                  initial={reduce ? false : { opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.05 + i * REVEAL_STEP }}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink shadow-[0_8px_20px_-12px_rgba(45,22,90,0.35)] sm:text-[12.5px]">
                    <motion.span
                      className="size-1.5 rounded-full"
                      initial={reduce ? false : { backgroundColor: "#d9d2e3" }}
                      animate={{ backgroundColor: "#2f9e7a" }}
                      transition={{ delay: 0.55 + i * REVEAL_STEP, duration: 0.2 }}
                    />
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
        </motion.div>
      </div>
    </div>
  );
}
