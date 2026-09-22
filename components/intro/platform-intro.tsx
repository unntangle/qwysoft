import { Bot, Smartphone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const LAYERS = [
  {
    name: "Think",
    caption: "Applied AI on your own data",
    tint: "from-[#2a1f5c] to-[#4a2b86]",
    dark: true,
  },
  {
    name: "Extend",
    caption: "Custom web and mobile software",
    tint: "from-white to-[#f7f3ff]",
  },
  {
    name: "Run",
    caption: "Odoo ERP, configured to your workflows",
    tint: "from-white to-[#fff6f0]",
  },
];

export function PlatformIntro() {
  return (
    <section id="platform" className="relative overflow-hidden py-24 sm:py-36" aria-labelledby="platform-title">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="kicker mb-6">Who we are</p>
            <h2 id="platform-title" className="display display-md">
              One system for how your business actually works.
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              <p>
                QWY Software is a technology partner helping businesses streamline operations, scale efficiently and drive
                growth through smart digital solutions. We deliver end-to-end technology services, from Odoo ERP
                implementation, customisation and integration, to custom software development tailored to your unique
                workflows.
              </p>
              <p>
                Our dedicated technology teams work as an extension of your business, and our ready-to-deploy pre-built
                platforms and accelerators help you go live faster without starting from scratch.
              </p>
            </div>
          </div>

          <Reveal className="relative lg:col-span-7 lg:col-start-6">
            <div
              aria-hidden
              className="absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(50%_50%_at_30%_70%,rgba(255,200,165,0.55),transparent_100%),radial-gradient(45%_45%_at_75%_30%,rgba(190,176,245,0.55),transparent_100%)]"
            />
            <div className="relative mx-auto max-w-[640px] pb-6 pt-2 [perspective:1600px]">
              {LAYERS.map((l, i) => (
                <div
                  key={l.name}
                  className={`relative rounded-[22px] border bg-gradient-to-br p-5 sm:p-6 ${["sm:mr-[12%]", "sm:mx-[6%]", "sm:ml-[12%]"][i]} ${l.tint} ${
                    l.dark ? "border-white/10 text-white" : "border-line text-ink"
                  } shadow-[var(--shadow-panel)]`}
                  style={{
                    marginTop: i === 0 ? 0 : -14,
                    zIndex: 3 - i,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="display text-[1.9rem] leading-none">{l.name}</p>
                    <p className={`text-right text-[13px] ${l.dark ? "text-white/60" : "text-mute"}`}>{l.caption}</p>
                  </div>
                  <div className="mt-5">
                    {i === 0 && <ThinkLayer />}
                    {i === 1 && <ExtendLayer />}
                    {i === 2 && <RunLayer />}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ThinkLayer() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
      <div className="rounded-xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[12px] text-white/60">
          <Bot className="size-3.5" aria-hidden /> Asked by Finance
        </p>
        <p className="mt-1.5 text-[14px] leading-snug">Which customers are likely to pay late this quarter?</p>
        <p className="mt-3 text-[12.5px] leading-relaxed text-white/70">
          14 accounts, <span className="text-white">₹22.4 L</span> at risk. Payment gaps widened after credit limits rose in July.
        </p>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[12px] text-white/60">
          <Sparkles className="size-3.5 text-saffron" aria-hidden /> Forecast
        </p>
        <svg viewBox="0 0 120 44" className="mt-2 h-auto w-full" aria-hidden>
          <path d="M0 34 C 18 30, 26 36, 42 26 S 70 20, 80 18" fill="none" stroke="#a898f2" strokeWidth="2" />
          <path d="M80 18 C 92 14, 104 6, 120 8" fill="none" stroke="#ee7636" strokeWidth="2" strokeDasharray="3 4" />
        </svg>
        <p className="tnum mt-1 text-[12px] text-white/70">Nov demand +22%</p>
      </div>
    </div>
  );
}

function ExtendLayer() {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="rounded-xl border border-line bg-white p-3">
        <div className="flex gap-1.5">
          {["#e7e2ed", "#e7e2ed", "#e7e2ed"].map((c, i) => (
            <span key={i} className="size-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-3 text-[12px] text-mute">Dealer portal</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["Open orders", "142"],
            ["Credit left", "₹6.8 L"],
            ["Dispatch", "Today"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-paper p-2">
              <p className="text-[10.5px] text-mute">{k}</p>
              <p className="tnum text-[13px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[92px] flex-col rounded-[16px] border border-line bg-white p-2">
        <Smartphone className="mx-auto size-3 text-mute" aria-hidden />
        <p className="mt-2 text-[10px] text-mute">Field sales</p>
        <p className="text-[12px] font-semibold">Visit 4 of 9</p>
        <div className="mt-2 h-1 rounded-full bg-paper">
          <div className="h-full w-[44%] rounded-full bg-violet" />
        </div>
        <span className="mt-auto rounded-md bg-ink py-1 text-center text-[10px] text-white">Take order</span>
      </div>
    </div>
  );
}

function RunLayer() {
  const modules = ["Sales", "Purchase", "Inventory", "Accounting", "MRP", "Payroll", "POS", "CRM"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {modules.map((m, i) => (
        <span
          key={m}
          className={`rounded-lg border px-2.5 py-1.5 text-[12.5px] ${
            i < 6 ? "border-line bg-white text-ink" : "border-dashed border-line-strong text-mute"
          }`}
        >
          {m}
          {i < 6 && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-mint align-middle" aria-hidden />}
        </span>
      ))}
    </div>
  );
}
