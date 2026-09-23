"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
import {
  AlertTriangle,
  BellRing,
  Boxes,
  BrainCircuit,
  Camera,
  Check,
  Clock3,
  Database,
  FileText,
  Gauge,
  Globe,
  LayoutDashboard,
  MapPin,
  Monitor,
  Package,
  Plug,
  RefreshCw,
  Repeat,
  ScanBarcode,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Wallet,
  WifiOff,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useRef } from "react";
import { Sparkline } from "@/components/dashboard/charts";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Grad } from "@/components/ui/grad";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Custom software, as a deck of full-width stacked cards.
   On desktop each card pins under the header; as you scroll, the next
   card slides up over it and the covered one eases back (smaller and
   slightly dimmed), so the capabilities pile up one by one.
   On mobile the cards simply stack and reveal as they scroll in.
------------------------------------------------------------------- */

type Chapter = {
  hash: string;
  commit: string;
  title: string;
  body: string;
  visual: (dark: boolean) => React.ReactNode;
  accent: string;
  icon: LucideIcon;
  tint?: string;
  tags?: string[];
};

const CHAPTERS: Chapter[] = [
  {
    hash: "a3f9c1e",
    accent: "#ff1f6b",
    icon: Globe,
    commit: "feat(web): purchase approvals portal",
    title: "Web solutions",
    body: "Every business runs on processes that are uniquely its own. We build custom web applications for your operational needs, integrated with ERP platforms like Odoo and built to scale as you grow, with a focus on performance, security and user experience.",
    visual: (d) => <WebVisual dark={d} />,
    tint: "bg-[radial-gradient(80%_70%_at_100%_100%,rgba(220,212,248,0.7),transparent_70%)]",
    tags: ["Custom web applications", "Scalable architecture", "Secure & high performance"],
  },
  {
    hash: "7be20d4",
    accent: "#ee7636",
    icon: Smartphone,
    commit: "feat(mobile): delivery app with proof of delivery",
    title: "Mobile solutions",
    body: "Your business doesn't stop moving, and neither should your technology. Custom mobile apps that streamline operations, engage customers and integrate with your ERP, with real-time data, workflow automation and on-the-go decisions.",
    visual: (d) => <MobileVisual dark={d} />,
    tint: "bg-[radial-gradient(80%_70%_at_50%_110%,rgba(255,217,194,0.8),transparent_70%)]",
    tags: ["Cross-platform development", "Secure & scalable architecture", "Real-time analytics"],
  },
  {
    hash: "c41d8a2",
    accent: "#8f5cff",
    icon: BrainCircuit,
    commit: "feat(ai): cash anomaly detection",
    title: "AI-powered solutions",
    body: "The smartest businesses aren't just automated, they're adaptive. AI that analyses, learns and improves over time, integrated with your ERP to automate workflows, uncover insights and sharpen decision-making.",
    visual: (d) => <AiVisual dark={d} />,
    tint: "bg-[radial-gradient(70%_70%_at_0%_0%,rgba(255,200,215,0.5),transparent_70%)]",
    tags: ["Machine learning", "Automation", "Data analytics"],
  },
  {
    hash: "19e6f7b",
    accent: "#2f9e7a",
    icon: Workflow,
    commit: "feat(flow): order-to-invoice automation",
    title: "Process automation",
    body: "Approvals, reconciliations and hand-offs that run themselves, with a clear audit trail.",
    visual: () => <AutomationVisual />,
    tint: "bg-[radial-gradient(70%_80%_at_0%_100%,rgba(255,217,194,0.55),transparent_70%)]",
  },
  {
    hash: "5d2a0c9",
    accent: "#3a5bff",
    icon: Plug,
    commit: "feat(integrations): payments, GST, WhatsApp",
    title: "Seamless integration",
    body: "Payments, tax, marketplaces and messaging connected into one unified flow of data.",
    visual: () => <IntegrationVisual />,
    tint: "bg-[radial-gradient(60%_60%_at_50%_50%,rgba(220,212,248,0.6),transparent_75%)]",
  },
  {
    hash: "e8b3f61",
    accent: "#c3158a",
    icon: LayoutDashboard,
    commit: "feat(dashboards): live operations view",
    title: "Real-time insight and control",
    body: "Live dashboards that show what is happening now, not what happened at month end.",
    visual: () => <InsightVisual />,
    tint: "bg-[radial-gradient(60%_90%_at_100%_0%,rgba(220,212,248,0.7),transparent_70%)]",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Only the first three are shown for now (web, mobile, AI). To bring the others
// back (automation, integration, dashboards), raise this number.
const SHOWN = CHAPTERS.slice(0, 3);

const textStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Capabilities() {
  const stackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="capabilities" className="relative bg-paper py-16 sm:py-24" aria-labelledby="capabilities-title">
      <div
        aria-hidden
        className="grid-faint pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_15%,black_85%,transparent)]"
      />
      <Container className="relative">
        <SectionIntro
          className="max-w-5xl"
          kicker="Custom Software Solutions"
          titleClassName="xl:whitespace-nowrap"
          title={
            <span id="capabilities-title">
              Software that <Grad>fits your business</Grad>,<br className="hidden xl:block" /> not the other way around.
            </span>
          }
          body="Whether it is a new platform or an existing system that needs to grow up, we build tools that are practical, reliable and easy to scale."
        />

        <ol ref={stackRef} className="relative mt-16">
          {SHOWN.map((c, i) => (
            <StackCard key={c.hash} c={c} i={i} n={SHOWN.length} progress={scrollYProgress} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StackCard({ c, i, n, progress }: { c: Chapter; i: number; n: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const last = i === n - 1;
  const dark = i % 2 === 1; // alternate light / dark so the pile reads as separate cards
  const Icon = c.icon;
  // Once the next card starts covering this one, ease it back and dim it a touch
  const targetScale = 1 - (n - 1 - i) * 0.035;
  const scale = useTransform(progress, [i / n, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, dark ? 0.25 : 0.12]);

  return (
    <li
      className={cn("mb-6 lg:sticky lg:h-[min(440px,calc(100vh-150px))]", last ? "lg:mb-0" : "lg:mb-[14vh]")}
      style={{ top: 104 + i * 16 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease }}
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={cn(
          "relative h-full overflow-hidden rounded-[28px] border shadow-[0_-24px_60px_-34px_rgba(45,22,90,0.35),0_30px_60px_-40px_rgba(45,22,90,0.3)]",
          dark ? "border-white/10 bg-night text-white" : "border-line bg-white text-ink",
        )}
      >
        {/* Accent glow behind the visual, and a gradient edge along the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(55% 80% at 78% 50%, ${c.accent}${dark ? "33" : "1f"}, transparent 70%), radial-gradient(40% 60% at 0% 100%, ${c.accent}${dark ? "1f" : "12"}, transparent 70%)`,
          }}
        />
        {dark && <div aria-hidden className="grid-night pointer-events-none absolute inset-0 opacity-60" />}
        {/* Big outlined number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-6 select-none text-[190px] font-semibold leading-none tracking-[-0.06em] text-transparent"
          style={{ WebkitTextStroke: `1.5px ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,19,31,0.07)"}` }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="relative grid h-full gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-10">
          {/* Text */}
          <motion.div variants={textStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <motion.div variants={rise} className="flex items-center gap-3">
              <span
                className="grid size-10 place-items-center rounded-xl"
                style={{ background: `${c.accent}${dark ? "2e" : "17"}`, color: dark ? "#fff" : c.accent }}
              >
                <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
            </motion.div>
            <motion.h3
              variants={rise}
              className="mt-5 text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              {c.title}
            </motion.h3>
            <motion.p
              variants={rise}
              className={cn("mt-3 max-w-[50ch] text-[0.975rem] leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}
            >
              {c.body}
            </motion.p>
            {c.tags && (
              <motion.ul variants={rise} className="mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <li
                    key={tag}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px]",
                      dark ? "border-white/15 bg-white/5 text-white/75" : "border-line bg-white/80 text-ink-soft",
                    )}
                  >
                    <span className="size-1.5 rounded-full" style={{ background: c.accent }} />
                    {tag}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Product visual on a dotted panel */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className={cn(
              "relative rounded-2xl p-5 ring-1 backdrop-blur-sm sm:p-6",
              dark
                ? "bg-white/[0.04] ring-white/10 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:14px_14px]"
                : "bg-ivory/60 ring-line [background-image:radial-gradient(rgba(23,19,31,0.08)_1px,transparent_1px)] [background-size:14px_14px]",
            )}
          >
            {c.visual(dark)}
          </motion.div>
        </div>

        {!last && !reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
        )}
      </motion.div>
    </li>
  );
}

/* ---------- Infographics for the three solutions (theme-aware, animate when in view) ---------- */

const tone = (dark: boolean) => ({
  mute: dark ? "text-white/50" : "text-mute",
  line: dark ? "rgba(255,255,255,0.16)" : "#dcd6e4",
  tile: dark ? "bg-white/[0.08] ring-white/15 text-white" : "bg-white ring-line text-ink shadow-[0_6px_16px_-10px_rgba(45,22,90,0.3)]",
  chip: dark ? "bg-white/[0.07] ring-white/15 text-white/85" : "bg-white ring-line text-ink-soft",
  border: dark ? "border-white/10" : "border-line",
});

/** Web: a live request flow through the stack, plus the three qualities it is built for. */
function WebVisual({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const t = tone(dark);
  const nodes = [
    { icon: Monitor, label: "Web app", sub: "Your workflows" },
    { icon: Server, label: "API layer", sub: "Secure access" },
    { icon: Boxes, label: "Odoo ERP", sub: "Single source" },
    { icon: Database, label: "Database", sub: "PostgreSQL" },
  ];
  const rings = [
    { icon: Gauge, label: "Performance" },
    { icon: ShieldCheck, label: "Security" },
    { icon: TrendingUp, label: "Scalability" },
  ];
  return (
    <div ref={ref}>
      <p className={cn("font-mono text-[11px]", t.mute)}>request flow</p>
      <div className="mt-4 flex items-start">
        {nodes.map((n, i) => (
          <Fragment key={n.label}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.18, duration: 0.5, ease }}
              className="flex w-[22%] shrink-0 flex-col items-center text-center"
            >
              <span className={cn("grid size-11 place-items-center rounded-xl ring-1", t.tile)}>
                <n.icon className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <span className="mt-2 text-[12px] font-medium leading-tight">{n.label}</span>
              <span className={cn("text-[10.5px] leading-tight", t.mute)}>{n.sub}</span>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="relative mt-[22px] h-px flex-1">
                <motion.span
                  className="absolute inset-0 origin-left"
                  style={{ background: t.line }}
                  initial={{ scaleX: 0 }}
                  animate={on ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.4 }}
                />
                {on && (
                  <motion.span
                    className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1f6b] shadow-[0_0_8px_2px_rgba(255,31,107,0.5)]"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.1, delay: 0.8 + i * 0.35, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                  />
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className={cn("mt-6 grid grid-cols-3 gap-3 border-t pt-5", t.border)}>
        {rings.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2.5">
            <div className="relative size-11 shrink-0">
              <svg viewBox="0 0 44 44" className="size-full -rotate-90" aria-hidden>
                <defs>
                  <linearGradient id={`web-ring-${i}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#ff1f6b" />
                    <stop offset="1" stopColor="#8f5cff" />
                  </linearGradient>
                </defs>
                <circle cx="22" cy="22" r="19" fill="none" stroke={t.line} strokeWidth="3" />
                <motion.circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke={`url(#web-ring-${i})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={on ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.2, duration: 1.1, ease }}
                />
              </svg>
              <r.icon className="absolute inset-0 m-auto size-4" strokeWidth={1.75} aria-hidden />
            </div>
            <span className="text-[12px] font-medium leading-tight">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mobile: a wireframe phone drawing a delivery route, wired to the app's key capabilities. */
function MobileVisual({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const t = tone(dark);
  const left = [
    { icon: WifiOff, label: "Works offline" },
    { icon: MapPin, label: "GPS tracking" },
    { icon: ScanBarcode, label: "Barcode scan" },
  ];
  const right = [
    { icon: BellRing, label: "Push alerts" },
    { icon: Camera, label: "Photo proof" },
    { icon: RefreshCw, label: "Live ERP sync" },
  ];
  const Chip = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
    <span className={cn("flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11.5px] ring-1", t.chip)}>
      <Icon className="size-3.5 text-saffron" strokeWidth={1.75} aria-hidden />
      {label}
    </span>
  );
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
        <ul className="hidden flex-col items-end gap-5 sm:flex">
          {left.map((f, i) => (
            <motion.li
              key={f.label}
              className="flex items-center"
              initial={{ opacity: 0, x: -14 }}
              animate={on ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease }}
            >
              <Chip {...f} />
              <motion.span
                className="h-px w-5 origin-right"
                style={{ background: t.line }}
                initial={{ scaleX: 0 }}
                animate={on ? { scaleX: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.15 }}
              />
            </motion.li>
          ))}
        </ul>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className={cn("relative w-[124px] rounded-[24px] p-1.5 ring-1", dark ? "bg-white/10 ring-white/20" : "bg-white ring-line shadow-[var(--shadow-float)]")}
        >
          <div className={cn("overflow-hidden rounded-[19px] pb-2.5", dark ? "bg-[#1b1440]" : "bg-ivory")}>
            <div className={cn("mx-auto mt-1.5 h-1 w-8 rounded-full", dark ? "bg-white/20" : "bg-ink/15")} />
            <div className="px-2 pt-2">
              <div className={cn("relative overflow-hidden rounded-lg", dark ? "bg-white/[0.06]" : "bg-white")}>
                <svg viewBox="0 0 100 70" className="block h-[70px] w-full" aria-hidden>
                  {[14, 28, 42, 56].map((y) => (
                    <line key={y} x1="0" x2="100" y1={y} y2={y} stroke={t.line} strokeWidth="0.6" />
                  ))}
                  {[20, 40, 60, 80].map((x) => (
                    <line key={x} y1="0" y2="70" x1={x} x2={x} stroke={t.line} strokeWidth="0.6" />
                  ))}
                  <motion.path
                    d="M10 58 C 30 58, 28 26, 52 30 S 82 14, 90 12"
                    fill="none"
                    stroke="#ee7636"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={on ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
                  />
                  <circle cx="10" cy="58" r="3" fill="#ee7636" />
                  <motion.circle
                    cx="90"
                    cy="12"
                    r="4"
                    fill="#ff1f6b"
                    initial={{ scale: 0 }}
                    animate={on ? { scale: [0, 1.3, 1] } : {}}
                    transition={{ delay: 1.9, duration: 0.4 }}
                    style={{ transformOrigin: "90px 12px" }}
                  />
                </svg>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {["w-[85%]", "w-[65%]", "w-[75%]"].map((w) => (
                  <div key={w} className={cn("h-1.5 animate-pulse rounded-full", w, dark ? "bg-white/15" : "bg-ink/10")} />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={on ? { opacity: 1 } : {}}
                transition={{ delay: 2.1 }}
                className="mt-2.5 flex items-center justify-center gap-1 rounded-md bg-saffron py-1 text-[9px] font-medium text-white"
              >
                <Check className="size-2.5" aria-hidden /> Delivered
              </motion.div>
            </div>
          </div>
        </motion.div>

        <ul className="hidden flex-col items-start gap-5 sm:flex">
          {right.map((f, i) => (
            <motion.li
              key={f.label}
              className="flex items-center"
              initial={{ opacity: 0, x: 14 }}
              animate={on ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5, ease }}
            >
              <motion.span
                className="h-px w-5 origin-left"
                style={{ background: t.line }}
                initial={{ scaleX: 0 }}
                animate={on ? { scaleX: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.15 }}
              />
              <Chip {...f} />
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-5 flex flex-wrap justify-center gap-2 font-mono text-[11px]"
      >
        {["iOS", "Android", "one codebase"].map((p) => (
          <span key={p} className={cn("rounded-md px-2 py-0.5 ring-1", t.chip)}>
            {p}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** AI: business data flows into a model and comes out as forecasts, alerts and automatic actions. */
function AiVisual({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const t = tone(dark);
  const inputs = [
    { icon: FileText, label: "Invoices", y: 36 },
    { icon: ShoppingCart, label: "Orders", y: 92 },
    { icon: Package, label: "Stock", y: 148 },
    { icon: Wallet, label: "Payments", y: 204 },
  ];
  const outputs = [
    { icon: TrendingUp, label: "Forecasts", y: 60 },
    { icon: AlertTriangle, label: "Anomaly alerts", y: 120 },
    { icon: Zap, label: "Auto-actions", y: 180 },
  ];
  const CX = 240;
  const CY = 120;
  const inPath = (y: number) => `M118 ${y} C 165 ${y}, 165 ${CY}, 204 ${CY}`;
  const outPath = (y: number) => `M276 ${CY} C 315 ${CY}, 315 ${y}, 350 ${y}`;
  return (
    <div ref={ref}>
      <div className="relative aspect-[480/240] w-full">
        <svg viewBox="0 0 480 240" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <linearGradient id="ai-flow" x1="0" x2="1">
              <stop offset="0" stopColor="#ff1f6b" />
              <stop offset="1" stopColor="#8f5cff" />
            </linearGradient>
          </defs>
          {[...inputs.map((n) => inPath(n.y)), ...outputs.map((n) => outPath(n.y))].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke={t.line} strokeWidth="1.5" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#ai-flow)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={on ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: (i < inputs.length ? 0.3 : 1.1) + (i % 4) * 0.1, duration: 0.6, ease }}
              />
              {on && (
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="#ff1f6b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="trace-signal"
                  style={{ animationDelay: `${(i < inputs.length ? 1 : 1.9) + (i % 4) * 0.35}s` }}
                />
              )}
            </g>
          ))}
          <g className="animate-[spin_16s_linear_infinite]" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r="52" fill="none" stroke={t.line} strokeWidth="1.2" strokeDasharray="3 6" />
          </g>
        </svg>

        {/* Model core */}
        <motion.div
          className="absolute left-1/2 top-1/2 grid aspect-square w-[15%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(135deg,#ff1f6b,#c3158a_50%,#5a0aa6)] text-white shadow-[0_16px_34px_-14px_rgba(195,21,138,0.7)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={on ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
        >
          <span aria-hidden className="absolute -inset-2 animate-ping rounded-full bg-[#8f5cff]/15 [animation-duration:2.4s]" />
          <BrainCircuit className="relative size-[42%]" strokeWidth={1.6} aria-hidden />
        </motion.div>

        {inputs.map((n, i) => (
          <motion.span
            key={n.label}
            className={cn("absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] ring-1", t.chip)}
            style={{ left: `${(66 / 480) * 100}%`, top: `${(n.y / 240) * 100}%` }}
            initial={{ opacity: 0, x: -10 }}
            animate={on ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.45, ease }}
          >
            <n.icon className="size-3.5 text-violet" strokeWidth={1.75} aria-hidden />
            {n.label}
          </motion.span>
        ))}

        {outputs.map((n, i) => (
          <motion.span
            key={n.label}
            className={cn(
              "absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
              t.chip,
            )}
            style={{ left: `${(354 / 480) * 100}%`, top: `${(n.y / 240) * 100}%` }}
            initial={{ opacity: 0, x: 10 }}
            animate={on ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.45, ease }}
          >
            <n.icon className="size-3.5 text-rose" strokeWidth={1.75} aria-hidden />
            {n.label}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className={cn("mt-3 flex items-center justify-center gap-1.5 text-[11.5px]", t.mute)}
      >
        <Repeat className="size-3.5 text-violet" aria-hidden /> Learns from your Odoo data and improves every month
      </motion.p>
    </div>
  );
}

function AutomationVisual() {
  const nodes = [
    { label: "Sales order confirmed", sub: "Odoo" },
    { label: "Credit check", sub: "Rule" },
    { label: "Pick list to warehouse", sub: "WhatsApp" },
    { label: "Invoice issued", sub: "GST e-invoice" },
  ];
  return (
    <div className="relative">
      <ol className="grid gap-3 sm:grid-cols-4">
        {nodes.map((n, i) => (
          <li key={n.label} className="relative">
            <div className="surface rounded-xl p-3">
              <p className="text-[10.5px] text-mute">{n.sub}</p>
              <p className="mt-1 text-[12.5px] font-medium leading-snug">{n.label}</p>
              <p className="mt-2 flex items-center gap-1 text-[10.5px] text-mint">
                <Check className="size-3" aria-hidden /> {["0.2s", "0.4s", "1.1s", "2.3s"][i]}
              </p>
            </div>
            {i < nodes.length - 1 && (
              <svg className="absolute -right-3 top-1/2 hidden h-2 w-3 -translate-y-1/2 sm:block" viewBox="0 0 12 8" aria-hidden>
                <path d="M0 4 H12" stroke="#a898f2" strokeWidth="1.5" strokeDasharray="2 2" className="animate-flow" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-center gap-1.5 text-[12px] text-ink-soft">
        <Clock3 className="size-3.5 text-violet" aria-hidden />
        Order to invoice in <span className="font-medium text-ink">4 seconds</span>, down from half a day.
      </p>
    </div>
  );
}

function IntegrationVisual() {
  const around = ["Payments", "GST portal", "Tally", "Marketplaces", "WhatsApp", "Banks"];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[240px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="100" cy="100" r="74" fill="none" stroke="#e7e2ed" strokeDasharray="2 5" />
        {around.map((_, i) => {
          const a = (i / around.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={100}
              y1={100}
              x2={100 + Math.cos(a) * 74}
              y2={100 + Math.sin(a) * 74}
              stroke="#cfc6f5"
              strokeDasharray="3 4"
              className="animate-flow"
            />
          );
        })}
      </svg>
      {around.map((l, i) => {
        const a = (i / around.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={l}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-white px-1.5 py-0.5 text-[10.5px] text-ink-soft shadow-sm"
            style={{ left: `${50 + Math.cos(a) * 37}%`, top: `${50 + Math.sin(a) * 37}%` }}
          >
            {l}
          </span>
        );
      })}
      <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-ink text-white">
        <Plug className="size-5" aria-hidden />
      </span>
    </div>
  );
}

function InsightVisual() {
  const tiles = [
    { label: "Orders today", to: 1284, color: "#7357e8", spark: [3, 4, 3.6, 5, 5.4, 6.1, 7] },
    { label: "Collections, ₹", to: 1842600, color: "#ee7636", spark: [4, 3.2, 4.5, 5.1, 4.8, 6.2, 6.8] },
    { label: "Open tickets", to: 23, color: "#2f9e7a", spark: [9, 8, 8.5, 7, 6.2, 5, 4.1] },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.label} className="surface rounded-xl p-4">
          <p className="flex items-center justify-between text-[11.5px] text-mute">
            {t.label}
            <span className="flex items-center gap-1 text-mint">
              <span className="live-dot size-1.5 rounded-full bg-mint" /> live
            </span>
          </p>
          <p className="mt-2 text-[1.5rem] font-semibold tracking-[-0.02em]">
            <Counter to={t.to} />
          </p>
          <Sparkline values={t.spark} color={t.color} className="mt-3 h-8" />
        </div>
      ))}
    </div>
  );
}
