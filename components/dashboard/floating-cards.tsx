import { Check, CircleDot, FileCheck2, Sparkles, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export function InsightCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[320px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[var(--shadow-float)] backdrop-blur", className)}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-plum">
          <Sparkles className="size-3.5" aria-hidden /> QWY Intelligence
        </p>
        <span className="rounded-md bg-[#fff0f3] px-1.5 py-0.5 text-[10.5px] font-medium text-rose">Stock-out risk</span>
      </div>
      <p className="mt-3 text-[14px] leading-snug text-ink">
        Basmati 5 kg at <span className="font-medium">Kochi</span> runs out in <span className="font-medium">6 days</span> at
        current sell-through.
      </p>
      <div className="mt-3 rounded-xl bg-paper p-3">
        <p className="text-[11px] text-mute">Recommended</p>
        <p className="mt-0.5 text-[12.5px] font-medium text-ink">Raise a PO for 1,200 units from the Palakkad supplier</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="rounded-md bg-ink px-2.5 py-1 text-[11.5px] font-medium text-white">Create draft PO</span>
          <span className="px-1.5 text-[11.5px] text-mute">Dismiss</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-mute">
        <span>Confidence</span>
        <span className="h-1 flex-1 rounded-full bg-paper">
          <span className="block h-full w-[91%] rounded-full bg-gradient-to-r from-violet to-saffron" />
        </span>
        <span className="tnum font-medium text-ink">91%</span>
      </div>
    </div>
  );
}

const SOURCES = ["Sales", "Inventory", "Accounting", "POS"];

export function SyncCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[280px] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium">Connected sources</p>
        <span className="flex items-center gap-1.5 text-[11px] text-mint">
          <span className="live-dot size-1.5 rounded-full bg-mint" /> Live
        </span>
      </div>
      <div className="relative mt-3 flex items-center gap-3">
        <ul className="flex flex-col gap-1.5">
          {SOURCES.map((s) => (
            <li key={s} className="flex items-center gap-1.5 rounded-md border border-line bg-ivory px-2 py-1 text-[11.5px] text-ink-soft">
              <span className="size-1.5 rounded-full bg-[#875a7b]" aria-hidden />
              Odoo {s}
            </li>
          ))}
        </ul>
        <svg viewBox="0 0 60 112" className="h-[112px] w-[48px] shrink-0" aria-hidden>
          {[14, 42, 70, 98].map((y) => (
            <path
              key={y}
              d={`M0 ${y} C 30 ${y}, 30 56, 60 56`}
              fill="none"
              stroke="#a898f2"
              strokeWidth="1.25"
              strokeDasharray="3 5"
              className="animate-flow"
            />
          ))}
        </svg>
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-[11px] font-semibold text-white">qwy</div>
      </div>
      <p className="tnum mt-3 text-[11px] text-mute">1.2M records indexed, 0 conflicts</p>
    </div>
  );
}

export function AutomationCard({ className }: { className?: string }) {
  const steps = [
    { label: "Vendor bill read from email", done: true },
    { label: "Matched to PO/2026/0914", done: true },
    { label: "Posted to ledger", done: true },
  ];
  return (
    <div className={cn("w-full max-w-[260px] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]", className)}>
      <p className="flex items-center gap-1.5 text-[12.5px] font-medium">
        <FileCheck2 className="size-3.5 text-violet" aria-hidden /> Automation ran
      </p>
      <ol className="mt-3 space-y-2">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[11.5px] text-ink-soft">
            <span className="grid size-4 place-items-center rounded-full bg-[#e8f6f0] text-mint">
              <Check className="size-2.5" strokeWidth={3} aria-hidden />
            </span>
            {s.label}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11px] text-mute">₹1,84,250 posted with no manual touch</p>
    </div>
  );
}

export function FleetCard({ className }: { className?: string }) {
  const stops = [
    [18, 58],
    [36, 40],
    [54, 48],
    [72, 26],
    [90, 34],
  ];
  return (
    <div className={cn("w-full max-w-[240px] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]", className)}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[12.5px] font-medium">
          <Truck className="size-3.5 text-saffron" aria-hidden /> Deliveries today
        </p>
        <span className="tnum text-[12.5px] font-semibold">184</span>
      </div>
      <svg viewBox="0 0 108 70" className="mt-2 h-auto w-full" aria-hidden>
        <rect width="108" height="70" rx="8" fill="#f7f5fb" />
        <path d="M10 62 L30 18 M40 70 L60 0 M0 30 L108 44 M70 70 L100 0" stroke="#ebe6f2" strokeWidth="3" />
        <path
          d={`M ${stops.map((p) => p.join(" ")).join(" L ")}`}
          fill="none"
          stroke="#ee7636"
          strokeWidth="1.75"
          strokeDasharray="3 3"
        />
        {stops.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 2 ? 3.5 : 2.5} fill={i < 3 ? "#ee7636" : "#fff"} stroke="#ee7636" strokeWidth="1.5" />
        ))}
      </svg>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-mute">
        <CircleDot className="size-3 text-mint" aria-hidden /> 12 vans on route, avg. ETA 38 min
      </p>
    </div>
  );
}
