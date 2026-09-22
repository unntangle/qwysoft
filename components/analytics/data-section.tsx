import { Lightbulb } from "lucide-react";
import { Bars, LineChart } from "@/components/dashboard/charts";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Grad } from "@/components/ui/grad";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import {
  CHANNELS,
  COHORTS,
  FORECAST_LOWER,
  FORECAST_UPPER,
  FUNNEL,
  FY_MONTHS,
  REVENUE_ACTUAL,
  REVENUE_FORECAST,
  SEGMENTS,
} from "@/lib/data";
import { cn } from "@/lib/utils";

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[13.5px] leading-snug text-ink-soft">
      <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-saffron" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

function Panel({ className, title, meta, children }: { className?: string; title: string; meta?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-7", className)}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
        {meta && <p className="text-[12.5px] text-mute">{meta}</p>}
      </div>
      {children}
    </div>
  );
}

export function DataSection() {
  const funnelMax = FUNNEL[0].value;
  return (
    <section id="data" className="py-24 sm:py-36" aria-labelledby="data-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionIntro
            className="lg:col-span-7"
            kicker="Real-time insights"
            title={<span id="data-title">Every number, with <Grad>the reason</Grad> next to it.</span>}
          />
          <p className="lede lg:col-span-4 lg:col-start-9">
            Charts that end in a conclusion. Each view carries the insight a manager would otherwise spend an afternoon
            finding.
          </p>
        </div>

        <Reveal className="mt-16 grid gap-4 lg:grid-cols-12">
          <Panel className="lg:col-span-8" title="Revenue and AI forecast" meta="₹ lakhs, FY 2026–27">
            <div className="mb-4 flex flex-wrap gap-8">
              <div>
                <p className="text-[12px] text-mute">H1 actual</p>
                <p className="display text-[2.2rem] leading-none">
                  ₹<Counter to={2.58} decimals={2} /> Cr
                </p>
              </div>
              <div>
                <p className="text-[12px] text-mute">H2 forecast</p>
                <p className="display text-[2.2rem] leading-none text-saffron">
                  ₹<Counter to={3.18} decimals={2} /> Cr
                </p>
              </div>
            </div>
            <LineChart
              labels={FY_MONTHS}
              height={250}
              min={34}
              max={64}
              format={{ prefix: "₹", suffix: " L", decimals: 1 }}
              series={[
                { name: "Actual", values: REVENUE_ACTUAL, color: "#7357e8", area: true },
                { name: "Forecast", values: REVENUE_FORECAST, color: "#ee7636", dashed: true },
              ]}
              band={{ lower: FORECAST_LOWER, upper: FORECAST_UPPER, color: "rgba(238,118,54,0.1)" }}
            />
            <Insight>
              November peaks at ₹58.9 L with Diwali. Plan stock and staffing for the first week of the month, when 41% of
              festive orders landed last year.
            </Insight>
          </Panel>

          <Panel className="lg:col-span-4" title="Sales funnel" meta="CRM, this quarter">
            <ol className="space-y-2.5">
              {FUNNEL.map((f, i) => {
                const pct = (f.value / funnelMax) * 100;
                const conv = i > 0 ? Math.round((f.value / FUNNEL[i - 1].value) * 100) : null;
                return (
                  <li key={f.stage}>
                    <div className="flex justify-between text-[12.5px]">
                      <span className="text-ink-soft">{f.stage}</span>
                      <span className="tnum font-medium">{f.value.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-7 flex-1 rounded-md bg-paper">
                        <div
                          className="h-full rounded-md"
                          style={{
                            width: `${pct}%`,
                            background: `color-mix(in oklab, #7357e8 ${100 - i * 16}%, #dcd4f8)`,
                          }}
                        />
                      </div>
                      <span className={cn("tnum w-9 text-right text-[11.5px]", conv && conv < 55 ? "text-rose" : "text-mute")}>
                        {conv ? `${conv}%` : ""}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <Insight>Quotation to order is the leak: 52%. Quotes older than 5 days convert at half the rate.</Insight>
          </Panel>

          <Panel className="lg:col-span-7" title="Customer retention by cohort" meta="% ordering again, by month since first order">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-separate border-spacing-1 text-[12px]">
                <thead>
                  <tr className="text-mute">
                    <th className="w-12 text-left font-normal">Cohort</th>
                    {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                      <th key={m} className="font-normal">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COHORTS.map((c) => (
                    <tr key={c.label}>
                      <td className="text-ink-soft">{c.label}</td>
                      {Array.from({ length: 6 }).map((_, i) => {
                        const v = c.values[i];
                        return (
                          <td key={i} className="p-0">
                            {v != null ? (
                              <span
                                className={cn(
                                  "tnum grid h-9 place-items-center rounded-md",
                                  v > 60 ? "text-white" : v > 40 ? "text-white" : "text-ink",
                                )}
                                style={{
                                  background:
                                    v === 100
                                      ? "#5a2d8c"
                                      : `color-mix(in oklab, #7357e8 ${Math.round((v / 60) * 100)}%, #f4f1f8)`,
                                }}
                              >
                                {v}%
                              </span>
                            ) : (
                              <span className="block h-9 rounded-md bg-paper/60" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Insight>Cohorts since July keep 9 points more customers in month one, after the loyalty programme went live.</Insight>
          </Panel>

          <div className="grid min-w-0 gap-4 lg:col-span-5">
            <Panel title="Revenue by channel" meta="₹ lakhs, Q2">
              <Bars
                height={120}
                values={CHANNELS.map((c) => c.value)}
                labels={CHANNELS.map((c) => c.name)}
                highlight={1}
                format={{ prefix: "₹", suffix: " L", decimals: 1 }}
              />
              <Insight>Online grew 34% quarter on quarter, the fastest of any channel.</Insight>
            </Panel>
            <Panel title="Customer segments" meta="Share of revenue">
              <div className="flex h-3 overflow-hidden rounded-full">
                {SEGMENTS.map((s) => (
                  <span key={s.name} style={{ width: `${s.share}%`, background: s.color }} />
                ))}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px]">
                {SEGMENTS.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2 rounded-sm" style={{ background: s.color }} />
                    <span className="flex-1 text-ink-soft">{s.name}</span>
                    <span className="tnum font-medium">{s.share}%</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
