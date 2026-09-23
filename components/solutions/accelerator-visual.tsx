import { RefreshCw, ShoppingCart, Store, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Static infographics for the pre-built platform cards.
   One subtle colour throughout (soft violet on a pale lavender-grey),
   so the five cards read as a calm, consistent set.
   Picked by the platform name, so reordering ACCELERATORS keeps the
   right picture.
------------------------------------------------------------------- */

// Single colour, in three strengths
const INK = "#6b5bd6"; // lines, icons, emphasis
const MID = "#b3a9ec"; // bars and fills
const SOFT = "#e4dff8"; // quiet fills and grid

export function AcceleratorVisual({ name }: { name: string; hue?: string }) {
  const n = name.toLowerCase();
  const Visual = n.includes("crm")
    ? Pipeline
    : n.includes("commerce")
      ? Storefront
      : n.includes("analytics")
        ? Chart
        : n.includes("marketplace")
          ? Marketplace
          : Fleet;
  return (
    <div
      aria-hidden
      className="relative aspect-[4/3] overflow-hidden bg-[#f6f4fb] bg-[radial-gradient(80%_70%_at_50%_100%,rgba(179,169,236,0.22),transparent_70%)]"
    >
      <div className="absolute inset-0 p-5">
        <Visual />
      </div>
    </div>
  );
}

const chip = "rounded-md bg-white px-1.5 py-0.5 text-[10px] font-medium text-ink-soft ring-1 ring-line";

/** CRM & HRMS: a sales funnel narrowing to "Won", with the team underneath. */
function Pipeline() {
  const stages = [
    { label: "Leads", w: 100 },
    { label: "Qualified", w: 76 },
    { label: "Proposal", w: 52 },
    { label: "Won", w: 32 },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-1.5">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] text-mute">{s.label}</span>
            <span className="flex-1">
              <span
                className="block h-3 rounded-full"
                style={{ width: `${s.w}%`, background: i === 3 ? INK : MID }}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {["AK", "RM", "FS", "VN"].map((p) => (
            <span
              key={p}
              className="grid size-6 place-items-center rounded-full bg-white text-[8px] font-semibold ring-2 ring-[#f6f4fb]"
              style={{ color: INK }}
            >
              {p}
            </span>
          ))}
        </div>
        <span className={chip}>Payroll ready</span>
      </div>
    </div>
  );
}

/** E-commerce & subscriptions: product tiles, a cart and a renewing subscription. */
function Storefront() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-white p-1.5 ring-1 ring-line">
            <div className="aspect-square rounded-md" style={{ background: i === 1 ? MID : SOFT }} />
            <div className="mt-1 h-1 w-3/4 rounded-full" style={{ background: SOFT }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="relative grid size-8 place-items-center rounded-full bg-white ring-1 ring-line" style={{ color: INK }}>
          <ShoppingCart className="size-4" />
          <span
            className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full text-[8px] font-semibold text-white"
            style={{ background: INK }}
          >
            3
          </span>
        </span>
        <span className={cn(chip, "flex items-center gap-1")}>
          <RefreshCw className="size-3" style={{ color: INK }} /> Renews monthly
        </span>
      </div>
    </div>
  );
}

/** Analytics & BI: a bar chart with a trend line across it. */
function Chart() {
  const bars = [38, 52, 44, 66, 58, 78, 72, 90];
  return (
    <div className="relative h-full">
      <div className="absolute inset-x-0 bottom-0 top-6 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%`, background: i === bars.length - 1 ? MID : SOFT }}
          />
        ))}
      </div>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 top-6 h-[calc(100%-1.5rem)] w-full">
        <path
          d="M2 40 L15 30 L28 34 L41 20 L54 24 L67 12 L80 15 L96 4"
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={cn(chip, "absolute left-0 top-0")}>Live KPIs</span>
    </div>
  );
}

/** Marketplace: vendors wired into one store. */
function Marketplace() {
  const vendors = [
    { x: 18, y: 22 },
    { x: 82, y: 22 },
    { x: 18, y: 78 },
    { x: 82, y: 78 },
  ];
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {vendors.map((v, i) => (
          <line
            key={i}
            x1={v.x}
            y1={v.y}
            x2={50}
            y2={50}
            stroke={MID}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {vendors.map((v, i) => (
        <span
          key={i}
          className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white text-[9px] font-semibold text-ink-soft ring-1 ring-line"
          style={{ left: `${v.x}%`, top: `${v.y}%` }}
        >
          V{i + 1}
        </span>
      ))}
      <span
        className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl text-white"
        style={{ background: INK }}
      >
        <Store className="size-5" />
      </span>
    </div>
  );
}

/** Fleet management: a delivery route between drops on a map grid, with the van on the way. */
function Fleet() {
  const route = "M8 80 C 25 80, 25 45, 45 50 S 70 20, 92 18";
  const drops = [
    { x: 8, y: 80 },
    { x: 45, y: 50 },
    { x: 92, y: 18 },
  ];
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {[20, 40, 60, 80].map((p) => (
          <g key={p} stroke={SOFT} strokeWidth="1">
            <line x1="0" x2="100" y1={p} y2={p} vectorEffect="non-scaling-stroke" />
            <line y1="0" y2="100" x1={p} x2={p} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        <path d={route} fill="none" stroke={INK} strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      </svg>
      {drops.map((p, i) => (
        <span
          key={i}
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, background: INK }}
        />
      ))}
      <span
        className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white ring-1 ring-line"
        style={{ left: "68%", top: "30%", color: INK }}
      >
        <Truck className="size-3.5" />
      </span>
      <span className={cn(chip, "absolute bottom-0 right-0")}>3 drops · on time</span>
    </div>
  );
}
