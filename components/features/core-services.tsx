"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Core services — a scroll-driven "service console".
   Desktop: the section pins while you scroll. The list on the left
   steps through the four services; the dark console on the right
   swaps to a live visual for each one, and the delivery pipeline
   along its bottom fills with scroll progress.
   Mobile: the same story, stacked, each visual starting when in view.
------------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

type ServiceKey = "custom" | "ai" | "odoo" | "platforms";

type Service = {
  key: ServiceKey;
  title: string;
  body: string;
  href: string;
  path: string;
  chips: string[];
};

const SERVICES: Service[] = [
  {
    key: "custom",
    title: "Custom Software Solutions",
    body: "We design and develop tailored software that aligns with your unique business processes and operational goals.",
    href: "#capabilities",
    path: "services/custom-software",
    chips: ["Web apps", "Mobile apps", "APIs & integrations"],
  },
  {
    key: "ai",
    title: "AI & Machine Learning",
    body: "Predictive analytics, process automation and decision support that learn from your own data and improve over time.",
    href: "#intelligence",
    path: "services/applied-ai",
    chips: ["Forecasting", "Document AI", "Anomaly alerts"],
  },
  {
    key: "odoo",
    title: "Odoo ERP Services",
    body: "Your operations in a single, well-organised Odoo system, structured and customised to match your workflows.",
    href: "#solutions",
    path: "services/odoo-erp",
    chips: ["Implementation", "Customisation", "Migration"],
  },
  {
    key: "platforms",
    title: "Pre-Built Platforms & Accelerators",
    body: "Ready starting points built on proven use cases, so you go live faster with full room for customisation.",
    href: "#accelerators",
    path: "services/accelerators",
    chips: ["Retail", "Distribution", "Services"],
  },
];

const STEPS = ["Discover", "Design & build", "Integrate", "Launch & improve"];

export function CoreServices() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(SERVICES.length - 1, Math.max(0, Math.floor(v * SERVICES.length))));
  });

  // Clicking a service scrolls to the middle of its step
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / SERVICES.length) * travel, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="core-services" className="relative" aria-labelledby="core-services-title">
        <Container className="pt-24 sm:pt-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">What we do</p>
              <h2 id="core-services-title" className="display display-md max-w-[14ch]">
                Our <Grad>core services</Grad>
              </h2>
            </div>
            <p className="lede lg:col-span-4 lg:col-start-9">
              Four ways we help, delivered by one team: from the first workshop to go-live and the improvements after it.
            </p>
          </div>
        </Container>

        {/* Desktop: pinned service console */}
        <div ref={ref} className="relative hidden lg:block" style={{ height: `${SERVICES.length * 90 + 10}vh` }}>
          <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-20">
            <div
              aria-hidden
              className="grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(55%_60%_at_70%_55%,black,transparent)]"
            />
            <Container className="relative grid w-full grid-cols-12 gap-10">
              <div className="col-span-5 flex gap-6 self-center">
                {/* Progress rail */}
                <div className="relative w-[2px] shrink-0 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className="absolute inset-0 origin-top bg-[linear-gradient(180deg,#ff1f6b,#8f5cff)]"
                    style={{ scaleY: scrollYProgress }}
                  />
                </div>
                <ol className="flex-1">
                  {SERVICES.map((s, i) => (
                    <ServiceItem key={s.key} service={s} index={i} on={i === active} onSelect={() => goTo(i)} />
                  ))}
                </ol>
              </div>

              <div className="col-span-7 self-center">
                <Console active={active} progress={scrollYProgress} />
              </div>
            </Container>
          </div>
        </div>

        {/* Mobile and tablet: stacked */}
        <Container className="space-y-14 pb-24 pt-12 lg:hidden">
          {SERVICES.map((s, i) => (
            <div key={s.key}>
              <p className="tnum font-mono text-[12px] text-plum">{`0${i + 1} / 0${SERVICES.length}`}</p>
              <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[0.975rem] leading-relaxed text-ink-soft">{s.body}</p>
              <Chips chips={s.chips} />
              <div className="relative mt-6 overflow-hidden rounded-[var(--radius-card)] bg-night p-5 text-white ring-1 ring-white/10">
                <div aria-hidden className="grid-night absolute inset-0 opacity-70" />
                <InViewMount className="relative h-[300px]">
                  <Visual k={s.key} />
                </InViewMount>
              </div>
            </div>
          ))}
          <StaticPipeline />
        </Container>

        <div className="hidden h-20 lg:block" aria-hidden />
      </section>
    </MotionConfig>
  );
}

/* ---------- Left list ---------- */

function ServiceItem({ service, index, on, onSelect }: { service: Service; index: number; on: boolean; onSelect: () => void }) {
  return (
    <li className="border-b border-line/70 last:border-0">
      <button
        type="button"
        onClick={onSelect}
        aria-current={on ? "step" : undefined}
        className="group flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
      >
        <span className={cn("tnum w-5 shrink-0 font-mono text-[12px] transition-colors duration-500", on ? "text-plum" : "text-mute")}>
          {`0${index + 1}`}
        </span>
        <span
          className={cn(
            "text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-500",
            on ? "text-ink" : "text-ink/30 group-hover:text-ink/60",
          )}
        >
          {service.title}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {on && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-9">
              <p className="max-w-[46ch] text-[0.975rem] leading-relaxed text-ink-soft">{service.body}</p>
              <Chips chips={service.chips} />
              <a href={service.href} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-plum">
                Learn more <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Chips({ chips }: { chips: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <li key={c} className="rounded-md border border-line bg-white/70 px-2 py-1 text-[12px] text-ink-soft">
          {c}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Right console ---------- */

function Console({ active, progress }: { active: number; progress: MotionValue<number> }) {
  const s = SERVICES[active];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_30%_70%,rgba(255,200,165,0.5),transparent_100%),radial-gradient(45%_45%_at_80%_20%,rgba(190,176,245,0.6),transparent_100%)]"
      />
      <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-night text-white shadow-[var(--shadow-panel)] ring-1 ring-white/10">
        <div aria-hidden className="grid-night absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,31,107,0.35),transparent)] blur-2xl"
        />

        {/* Title bar */}
        <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-3">
          <span className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/15" />
            ))}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={s.path}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[12px] text-white/55"
            >
              qwy://{s.path}
            </motion.span>
          </AnimatePresence>
          <span className="ml-auto flex items-center gap-1.5 text-[11.5px] text-[#7fe0bd]">
            <span className="live-dot size-1.5 rounded-full bg-[#7fe0bd]" /> running
          </span>
        </div>

        {/* Stage */}
        <div className="relative h-[340px] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease }}
              className="h-full"
            >
              <Visual k={s.key} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Pipeline progress={progress} />
      </div>
    </div>
  );
}

function Pipeline({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative border-t border-white/10 px-6 py-5">
      <p className="text-[11.5px] text-white/45">Delivered end to end</p>
      <div className="relative mt-4">
        <div className="absolute left-[7px] right-[7px] top-[7px] h-px bg-white/10" />
        <motion.div
          className="absolute left-[7px] right-[7px] top-[7px] h-px origin-left bg-[linear-gradient(90deg,#ff1f6b,#8f5cff)]"
          style={{ scaleX: progress }}
        />
        <ol className="relative flex justify-between">
          {STEPS.map((label, i) => (
            <PipelineStep key={label} label={label} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function PipelineStep({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const at = index / (STEPS.length - 1);
  const on = useTransform(progress, (v) => (v >= at - 0.02 ? 1 : 0));
  const dot = useTransform(on, [0, 1], ["rgba(255,255,255,0.14)", "#ff3d86"]);
  const text = useTransform(on, [0, 1], [0.45, 1]);
  const last = index === STEPS.length - 1;
  return (
    <li className={cn("flex flex-col gap-2", index === 0 ? "items-start" : last ? "items-end" : "items-center")}>
      <motion.span className="size-[15px] rounded-full ring-4 ring-night" style={{ background: dot }} />
      <motion.span className="text-[12px]" style={{ opacity: text }}>
        {label}
      </motion.span>
    </li>
  );
}

function StaticPipeline() {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-5">
      <p className="text-[12.5px] text-mute">Delivered end to end</p>
      <ol className="mt-4 space-y-2.5">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3 text-[14.5px]">
            <span className="tnum grid size-6 place-items-center rounded-full border border-line-strong text-[11px]">{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}

function InViewMount({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}

/* ---------- Visuals, one per service ---------- */

function Visual({ k }: { k: ServiceKey }) {
  if (k === "custom") return <CodeVisual />;
  if (k === "ai") return <AiVisual />;
  if (k === "odoo") return <OdooVisual />;
  return <PlatformVisual />;
}

type Tok = [kind: "kw" | "fn" | "str" | "num" | "tx", text: string];

const TOK_COLOR: Record<Tok[0], string> = {
  kw: "#b39cff",
  fn: "#ff8fbf",
  str: "#ffc79a",
  num: "#7fe0bd",
  tx: "rgba(255,255,255,0.78)",
};

const CODE: Tok[][] = [
  [["kw", "export async function "], ["fn", "approvePurchase"], ["tx", "(id) {"]],
  [["kw", "  const "], ["tx", "po = await "], ["fn", "odoo.read"], ["tx", "("], ["str", '"purchase.order"'], ["tx", ", id);"]],
  [["kw", "  if "], ["tx", "(po.amount_total > "], ["num", "200000"], ["tx", ") {"]],
  [["tx", "    await "], ["fn", "notify"], ["tx", "("], ["str", '"cfo"'], ["tx", ", po);"]],
  [["kw", "    return "], ["str", '"needs_cfo"'], ["tx", ";"]],
  [["tx", "  }"]],
  [["tx", "  await "], ["fn", "odoo.call"], ["tx", "(po, "], ["str", '"button_approve"'], ["tx", ");"]],
  [["kw", "  return "], ["str", '"approved"'], ["tx", ";"]],
  [["tx", "}"]],
];

function CodeVisual() {
  const rows = [
    { id: "P00291", amt: "₹84,500", state: "Approved" },
    { id: "P00292", amt: "₹2,12,000", state: "Needs CFO" },
    { id: "P00293", amt: "₹36,900", state: "Approved" },
  ];
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[1.45fr_1fr]">
      <div className="overflow-hidden rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
        <p className="mb-3 font-mono text-[11px] text-white/40">approvals/approve.ts</p>
        <div className="font-mono text-[11.5px] leading-[1.75]">
          {CODE.map((line, i) => (
            <motion.div
              key={i}
              className="flex"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.1, ease }}
            >
              <span className="w-6 shrink-0 select-none text-white/25">{i + 1}</span>
              <span className="whitespace-pre">
                {line.map(([kind, text], j) => (
                  <span key={j} style={{ color: TOK_COLOR[kind] }}>
                    {text}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hidden flex-col rounded-xl bg-white p-4 text-ink sm:flex">
        <div className="flex items-center justify-between">
          <p className="text-[12.5px] font-semibold">Purchase approvals</p>
          <span className="rounded-md bg-paper px-1.5 py-0.5 text-[10px] text-mute">Web app</span>
        </div>
        <ul className="mt-3 space-y-2">
          {rows.map((r, i) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.15, ease }}
              className="flex items-center justify-between rounded-lg border border-line px-2.5 py-2 text-[11.5px]"
            >
              <span className="tnum text-mute">{r.id}</span>
              <span className="tnum">{r.amt}</span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-medium",
                  r.state === "Approved" ? "bg-[#e8f6f0] text-mint" : "bg-[#fff1e7] text-saffron",
                )}
              >
                {r.state}
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] text-mint"
        >
          <Check className="size-3" aria-hidden /> Synced with Odoo Purchase
        </motion.p>
      </div>
    </div>
  );
}

function AiVisual() {
  const layers = [
    { x: 40, ys: [50, 110, 170], labels: ["Invoices", "Payments", "Orders"] },
    { x: 150, ys: [35, 85, 135, 185] },
    { x: 260, ys: [80, 140], labels: ["On time", "Late"] },
  ];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l].ys) for (const y2 of layers[l + 1].ys) edges.push({ x1: layers[l].x, y1, x2: layers[l + 1].x, y2 });
  }
  const risks = [
    { name: "Kerala Traders", v: 0.91 },
    { name: "Malabar Foods", v: 0.74 },
    { name: "Coastal Retail", v: 0.58 },
  ];
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[1.2fr_1fr]">
      <div className="relative rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        <p className="font-mono text-[11px] text-white/40">model: late_payment_v3</p>
        <svg viewBox="0 0 300 220" className="mt-1 h-[calc(100%-18px)] w-full" aria-hidden>
          {edges.map((e, i) => (
            <motion.line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="rgba(168,152,242,0.35)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + (e.x1 === 40 ? 0 : 0.5) + (i % 4) * 0.04, ease }}
            />
          ))}
          {/* Signals travelling through the network */}
          {[0, 1, 2].map((p) => (
            <motion.circle
              key={p}
              r={3}
              fill="#ff3d86"
              initial={{ opacity: 0 }}
              animate={{
                cx: [40, 150, 260],
                cy: [layers[0].ys[p], layers[1].ys[p + 1], layers[2].ys[p === 0 ? 1 : 0]],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.6, delay: 1.2 + p * 0.45, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
            />
          ))}
          {layers.map((l, li) =>
            l.ys.map((y, yi) => (
              <motion.g
                key={`${li}-${yi}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: li * 0.25 + yi * 0.05, ease }}
                style={{ transformOrigin: `${l.x}px ${y}px` }}
              >
                <circle cx={l.x} cy={y} r={7} fill="#1b1440" stroke={li === 2 && yi === 1 ? "#ff3d86" : "#a898f2"} strokeWidth={1.5} />
                {l.labels && (
                  <text
                    x={li === 0 ? l.x - 12 : l.x + 12}
                    y={y + 3.5}
                    textAnchor={li === 0 ? "end" : "start"}
                    fontSize={9.5}
                    fill="rgba(255,255,255,0.55)"
                  >
                    {l.labels[yi]}
                  </text>
                )}
              </motion.g>
            )),
          )}
        </svg>
      </div>

      <div className="hidden flex-col rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10 sm:flex">
        <p className="text-[12px] text-white/55">Late-payment risk, this quarter</p>
        <ul className="mt-4 space-y-3.5">
          {risks.map((r, i) => (
            <li key={r.name}>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/80">{r.name}</span>
                <span className="tnum text-white/60">{Math.round(r.v * 100)}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#8f5cff,#ff3d86)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${r.v * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.9 + i * 0.15, ease }}
                />
              </div>
            </li>
          ))}
        </ul>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-auto pt-3 text-[11.5px] leading-snug text-white/55"
        >
          Trained on your Odoo invoices and payments. Retrains monthly.
        </motion.p>
      </div>
    </div>
  );
}

function OdooVisual() {
  const apps = [
    { name: "Sales", c: "#ff3d86" },
    { name: "CRM", c: "#8f5cff" },
    { name: "Inventory", c: "#ee7636" },
    { name: "Accounting", c: "#2f9e7a" },
    { name: "Purchase", c: "#7357e8" },
    { name: "Manufacturing", c: "#de4a6e" },
    { name: "Employees", c: "#3a5bff" },
    { name: "Point of Sale", c: "#c3158a" },
    { name: "Website", c: "#a898f2" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] text-white/40">odoo · apps</p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/70"
        >
          Configured to your workflows
        </motion.span>
      </div>
      <ul className="mt-3 grid flex-1 grid-cols-3 gap-2.5">
        {apps.map((a, i) => (
          <motion.li
            key={a.name}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3 py-2.5 ring-1 ring-white/10"
          >
            <span
              className="grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-semibold text-white"
              style={{ background: a.c }}
              aria-hidden
            >
              {a.name[0]}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px]">{a.name}</span>
            <motion.span
              className="size-1.5 shrink-0 rounded-full bg-[#7fe0bd]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.06 }}
            />
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 text-[11.5px] ring-1 ring-white/10"
      >
        <span className="text-white/60">9 apps · 1 database · real-time</span>
        <span className="flex items-center gap-1.5 text-[#7fe0bd]">
          <Check className="size-3" aria-hidden /> No spreadsheets
        </span>
      </motion.div>
    </div>
  );
}

function PlatformVisual() {
  const lines: { t: string; tone?: "cmd" | "info" | "ok" }[] = [
    { t: '$ qwy deploy retail-accelerator --company "Sree Durga Stores"', tone: "cmd" },
    { t: "→ Installing Odoo apps: Point of Sale, Inventory, Accounting", tone: "info" },
    { t: "✓ GST e-invoicing configured", tone: "ok" },
    { t: "✓ Price lists and loyalty rules imported", tone: "ok" },
    { t: "✓ 14 store warehouses created", tone: "ok" },
    { t: "✓ Dashboards and reports ready", tone: "ok" },
  ];
  return (
    <div className="flex h-full flex-col rounded-xl bg-black/25 p-4 ring-1 ring-white/10">
      <p className="font-mono text-[11px] text-white/40">terminal</p>
      <div className="mt-3 space-y-1.5 font-mono text-[11.5px] leading-relaxed">
        {lines.map((l, i) => (
          <motion.p
            key={l.t}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.15 + i * 0.32 }}
            className={cn(
              "truncate",
              l.tone === "cmd" && "text-white",
              l.tone === "info" && "text-[#b39cff]",
              l.tone === "ok" && "text-[#7fe0bd]",
            )}
          >
            {l.t}
          </motion.p>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-[11.5px]">
          <span className="text-white/60">Setup progress</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-[#7fe0bd]"
          >
            Ready for UAT
          </motion.span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ff1f6b,#8f5cff)]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-2 text-[11px] text-white/45">Go live in weeks, not months, then customise what makes you different.</p>
      </div>
    </div>
  );
}
