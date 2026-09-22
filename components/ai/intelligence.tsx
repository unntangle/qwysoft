"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CornerDownLeft, FileText, GitCompareArrows, ShieldCheck, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { LineChart } from "@/components/dashboard/charts";
import { Container } from "@/components/ui/container";
import { StreamingText } from "@/components/ui/streaming-text";
import { REPEAT_KOZHIKODE, REPEAT_OTHERS, REPEAT_WEEKS } from "@/lib/data";

const QUESTION = "Why did repeat orders drop in Kozhikode this month?";
const ANSWER =
  "Repeat orders in Kozhikode fell 12% in September, mainly because deliveries got slower. After the route change on 9 September, average fulfilment time rose from 1.8 to 3.1 days, and customers who waited more than three days were 2.4× less likely to order again. Other branches held steady over the same weeks.";

const ease = [0.22, 1, 0.36, 1] as const;

export function Intelligence() {
  const [answered, setAnswered] = useState(false);
  const reduce = useReducedMotion();

  const evidence = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: answered ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section
      id="intelligence"
      className="grain relative overflow-hidden bg-[#fdf3ec] py-24 sm:py-36"
      aria-labelledby="intelligence-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fdf3ec_0%,#fbe7da_30%,#efe6fb_70%,#fbf9f5_100%)]" />
        <div className="absolute left-1/2 top-[4%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(238,118,54,0.22),transparent_100%)] blur-2xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker mb-6 inline-flex items-center gap-2.5">
            <span className="kasavu w-6" aria-hidden />
            Applied AI
            <span className="kasavu w-6" aria-hidden />
          </p>
          <h2 id="intelligence-title" className="display display-lg">
            Intelligence that works with your data.
          </h2>
          <p className="lede mx-auto mt-7 max-w-[56ch]">
            Ask a question the way you would ask your best analyst. QWY reads across your ERP, apps and logs, and answers with
            evidence, a recommendation and how sure it is.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-[1120px] rounded-[var(--radius-panel)] border border-white/80 bg-white/75 p-3 shadow-[var(--shadow-panel)] backdrop-blur-xl sm:p-4">
          {/* Query bar */}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 sm:px-5">
            <Sparkles className="size-4 shrink-0 text-violet" aria-hidden />
            <p className="flex-1 text-[15px] font-medium text-ink sm:text-[1.0625rem]">{QUESTION}</p>
            <span className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-mute sm:flex">
              <CornerDownLeft className="size-3" aria-hidden /> Ask
            </span>
          </div>

          <div className="grid gap-3 pt-3 lg:grid-cols-[1.08fr_1fr]">
            {/* Answer column */}
            <div className="flex flex-col rounded-2xl bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-mute">
                <span className="rounded-md bg-paper px-2 py-0.5">Sales orders, Odoo</span>
                <span className="rounded-md bg-paper px-2 py-0.5">Delivery logs</span>
                <span className="rounded-md bg-paper px-2 py-0.5">3,214 customers</span>
              </div>
              <StreamingText
                text={ANSWER}
                speed={45}
                onDone={() => setAnswered(true)}
                className="mt-5 text-[1.1rem] leading-[1.65] text-ink sm:text-[1.2rem]"
              />
              <motion.div {...evidence(0)} className="mt-auto pt-8">
                <div className="flex items-center gap-3 text-[12.5px]">
                  <ShieldCheck className="size-4 text-mint" aria-hidden />
                  <span className="text-ink-soft">Confidence</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-violet to-saffron"
                      initial={{ width: reduce ? "87%" : 0 }}
                      animate={answered ? { width: "87%" } : {}}
                      transition={{ duration: 1.2, ease }}
                    />
                  </span>
                  <span className="tnum font-medium text-ink">87%</span>
                </div>
                <p className="mt-2 text-[12px] text-mute">Based on 8 weeks of orders. Weather and pricing ruled out as causes.</p>
              </motion.div>
            </div>

            {/* Evidence column */}
            <div className="grid gap-3">
              <motion.div {...evidence(0.05)} className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium">Repeat-order rate, weekly</p>
                  <div className="flex gap-3 text-[11px] text-mute">
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-3 bg-saffron" /> Kozhikode
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-3 bg-violet-soft" /> Other branches
                    </span>
                  </div>
                </div>
                <div className="relative mt-3">
                  <LineChart
                    height={170}
                    labels={REPEAT_WEEKS}
                    min={25}
                    max={33}
                    format={{ suffix: "%", decimals: 1 }}
                    series={[
                      { name: "Other branches", values: REPEAT_OTHERS, color: "#a898f2" },
                      { name: "Kozhikode", values: REPEAT_KOZHIKODE, color: "#ee7636", area: true },
                    ]}
                  />
                  <span className="pointer-events-none absolute left-[57%] top-0 h-[80%] border-l border-dashed border-ink/25" aria-hidden />
                  <span className="pointer-events-none absolute left-[57%] top-0 ml-1.5 text-[10.5px] text-mute">Route change</span>
                </div>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                <motion.div {...evidence(0.2)} className="rounded-2xl bg-white p-5">
                  <p className="flex items-center gap-1.5 text-[12px] text-mute">
                    <GitCompareArrows className="size-3.5 text-violet" aria-hidden /> Pattern detected
                  </p>
                  <p className="mt-2 text-[14px] font-medium leading-snug">
                    Orders delivered after 3 days see <span className="tnum">2.4×</span> fewer reorders.
                  </p>
                  <p className="mt-2 text-[12px] text-mute">Holds across 11 pin codes on the new route.</p>
                </motion.div>
                <motion.div {...evidence(0.35)} className="rounded-2xl bg-ink p-5 text-white">
                  <p className="flex items-center gap-1.5 text-[12px] text-white/55">
                    <Target className="size-3.5 text-saffron" aria-hidden /> Recommended action
                  </p>
                  <p className="mt-2 text-[14px] font-medium leading-snug">Restore the Feroke hub route for the affected pin codes.</p>
                  <p className="mt-3 flex items-center gap-1 text-[12.5px] font-medium text-lavender">
                    Assign to Logistics <ArrowRight className="size-3.5" aria-hidden />
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-[1120px] gap-8 sm:grid-cols-3">
          {[
            { icon: FileText, title: "Document intelligence", body: "Vendor bills, POs and delivery notes read and posted, with exceptions routed to a person." },
            { icon: Sparkles, title: "Forecasting", body: "Demand, cash flow and staffing forecasts tuned to festivals, seasons and your own history." },
            { icon: ShieldCheck, title: "Grounded answers", body: "Every answer links to the records it came from. If the data is not there, it says so." },
          ].map(({ icon: Icon, title, body }) => (
            <li key={title} className="border-t border-ink/10 pt-5">
              <p className="flex items-center gap-2 text-[15px] font-semibold">
                <Icon className="size-4 text-plum" aria-hidden /> {title}
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
