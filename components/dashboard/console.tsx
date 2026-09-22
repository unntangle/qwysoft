import {
  BarChart3,
  Bot,
  Boxes,
  ChevronDown,
  Factory,
  LayoutGrid,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { LineChart, Sparkline } from "@/components/dashboard/charts";
import { FORECAST_LOWER, FORECAST_UPPER, FY_MONTHS, REVENUE_ACTUAL, REVENUE_FORECAST, WAREHOUSES } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: ShoppingBag, label: "Sales" },
  { icon: Boxes, label: "Inventory" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Truck, label: "Fleet" },
  { icon: Users, label: "People" },
  { icon: Workflow, label: "Automations" },
];

const KPIS = [
  { label: "Revenue, Sep", value: "₹48.2 L", delta: "+8.4%", up: true, spark: [38, 41, 39, 45, 46, 48] },
  { label: "Orders", value: "12,480", delta: "+5.1%", up: true, spark: [9.8, 10.4, 10.1, 11.2, 11.9, 12.5] },
  { label: "Stock turns", value: "6.4×", delta: "+0.6", up: true, spark: [5.1, 5.4, 5.6, 5.9, 5.8, 6.4] },
  { label: "On-time delivery", value: "96.2%", delta: "−1.1 pt", up: false, spark: [97.8, 97.5, 97.9, 97.3, 96.9, 96.2] },
];

export function Console({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] border border-line bg-white text-ink shadow-[var(--shadow-panel)]",
        className,
      )}
    >
      {/* App bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-violet to-rose text-[11px] font-semibold text-white">
            KR
          </span>
          <span className="hidden text-sm font-medium sm:inline">Kaveri Retail Group</span>
          <ChevronDown className="size-3.5 text-mute" aria-hidden />
        </div>
        <div className="ml-2 hidden h-8 flex-1 items-center gap-2 rounded-lg bg-paper px-3 text-[13px] text-mute md:flex md:max-w-sm">
          <Search className="size-3.5" aria-hidden />
          Ask a question or search records
          <kbd className="ml-auto rounded border border-line-strong bg-white px-1.5 text-[10px] text-mute">⌘K</kbd>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[12px] text-mute">
          <span className="hidden items-center gap-1.5 lg:flex">
            <span className="live-dot size-1.5 rounded-full bg-mint" />
            Synced with Odoo, 2 min ago
          </span>
          <span className="rounded-md border border-line px-2 py-1 text-ink/80">FY 26–27, Q2</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-[184px] shrink-0 flex-col gap-0.5 border-r border-line p-3 lg:flex">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px]",
                active ? "bg-paper font-medium text-ink" : "text-ink-soft",
              )}
            >
              <Icon className={cn("size-4", active ? "text-violet" : "text-mute")} strokeWidth={1.75} aria-hidden />
              {label}
            </span>
          ))}
          <div className="mt-auto rounded-xl bg-gradient-to-br from-[#f3efff] to-[#fff1e8] p-3">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-plum">
              <Sparkles className="size-3.5" aria-hidden /> 3 new insights
            </p>
            <p className="mt-1 text-[11px] leading-snug text-ink-soft">Stock, delivery and margin signals this week.</p>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[12px] text-mute">Overview</p>
              <p className="text-[17px] font-semibold tracking-[-0.01em]">All branches</p>
            </div>
            <div className="hidden gap-1 rounded-lg bg-paper p-1 text-[12px] sm:flex">
              {["All", "Kochi", "Kozhikode", "Trivandrum"].map((b, i) => (
                <span key={b} className={cn("rounded-md px-2.5 py-1", i === 0 ? "bg-white font-medium shadow-sm" : "text-mute")}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-xl border border-line p-3">
                <p className="text-[11.5px] text-mute">{k.label}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className="tnum text-[19px] font-semibold tracking-[-0.02em]">{k.value}</p>
                  <span className={cn("tnum mb-0.5 text-[11px] font-medium", k.up ? "text-mint" : "text-rose")}>{k.delta}</span>
                </div>
                <Sparkline values={k.spark} color={k.up ? "#7357e8" : "#de4a6e"} className="mt-2 h-6" />
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_236px]">
            <div className="rounded-xl border border-line p-3.5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-[13px] font-medium">
                  <BarChart3 className="size-3.5 text-violet" aria-hidden />
                  Revenue vs AI forecast
                </p>
                <div className="flex gap-3 text-[11px] text-mute">
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 rounded bg-violet" /> Actual
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 rounded border-t-2 border-dashed border-saffron" /> Forecast
                  </span>
                </div>
              </div>
              <LineChart
                labels={FY_MONTHS}
                height={190}
                min={34}
                max={64}
                format={{ prefix: "₹", suffix: " L", decimals: 1 }}
                series={[
                  { name: "Actual", values: REVENUE_ACTUAL, color: "#7357e8", area: true },
                  { name: "Forecast", values: REVENUE_FORECAST, color: "#ee7636", dashed: true },
                ]}
                band={{ lower: FORECAST_LOWER, upper: FORECAST_UPPER, color: "rgba(238,118,54,0.10)" }}
              />
            </div>

            <div className="rounded-xl border border-line p-3.5">
              <p className="text-[13px] font-medium">Days of stock cover</p>
              <p className="text-[11px] text-mute">Top 40 SKUs, by warehouse</p>
              <ul className="mt-3 space-y-3">
                {WAREHOUSES.map((w) => (
                  <li key={w.name}>
                    <div className="flex justify-between text-[12px]">
                      <span className="truncate text-ink-soft">{w.name}</span>
                      <span className={cn("tnum font-medium", w.cover < 8 ? "text-rose" : "text-ink")}>{w.cover} days</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-paper">
                      <div
                        className={cn("h-full rounded-full", w.cover < 8 ? "bg-rose" : "bg-violet-soft")}
                        style={{ width: `${Math.min(100, (w.cover / 28) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-[#fff4ee] p-2 text-[11px] leading-snug text-[#9a4a1f]">
                <Bot className="mt-px size-3.5 shrink-0" aria-hidden />
                Kochi falls below safety stock on 28 Sep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
