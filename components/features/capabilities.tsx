import { AlertTriangle, Camera, Check, Clock3, MapPin, Plug } from "lucide-react";
import { Sparkline } from "@/components/dashboard/charts";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/utils";

type Tile = {
  title: string;
  body: string;
  span: string;
  visual: React.ReactNode;
  tint?: string;
  tags?: string[];
};

const TILES: Tile[] = [
  {
    title: "Web solutions",
    body: "Every business runs on processes that are uniquely its own. We build custom web applications for your operational needs, integrated with ERP platforms like Odoo and built to scale as you grow, with a focus on performance, security and user experience.",
    span: "lg:col-span-7",
    visual: <WebVisual />,
    tint: "bg-[radial-gradient(80%_70%_at_100%_100%,rgba(220,212,248,0.7),transparent_70%)]",
    tags: ["Custom web applications", "Scalable architecture", "Secure & high performance"],
  },
  {
    title: "Mobile solutions",
    body: "Your business doesn't stop moving, and neither should your technology. Custom mobile apps that streamline operations, engage customers and integrate with your ERP, with real-time data, workflow automation and on-the-go decisions.",
    span: "lg:col-span-5",
    visual: <MobileVisual />,
    tint: "bg-[radial-gradient(80%_70%_at_50%_110%,rgba(255,217,194,0.8),transparent_70%)]",
    tags: ["Cross-platform development", "Secure & scalable architecture", "Real-time analytics"],
  },
  {
    title: "AI-powered solutions",
    body: "The smartest businesses aren't just automated, they're adaptive. AI that analyses, learns and improves over time, integrated with your ERP to automate workflows, uncover insights and sharpen decision-making.",
    span: "lg:col-span-5",
    visual: <AiVisual />,
    tags: ["Machine learning", "Automation", "Data analytics"],
  },
  {
    title: "Process automation",
    body: "Approvals, reconciliations and hand-offs that run themselves, with a clear audit trail.",
    span: "lg:col-span-7",
    visual: <AutomationVisual />,
    tint: "bg-[radial-gradient(70%_80%_at_0%_100%,rgba(255,217,194,0.55),transparent_70%)]",
  },
  {
    title: "Seamless integration",
    body: "Payments, tax, marketplaces and messaging connected into one unified flow of data.",
    span: "lg:col-span-4",
    visual: <IntegrationVisual />,
  },
  {
    title: "Real-time insight and control",
    body: "Live dashboards that show what is happening now, not what happened at month end.",
    span: "lg:col-span-8",
    visual: <InsightVisual />,
    tint: "bg-[radial-gradient(60%_90%_at_100%_0%,rgba(220,212,248,0.7),transparent_70%)]",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-paper py-24 sm:py-36" aria-labelledby="capabilities-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionIntro
            className="lg:col-span-7"
            kicker="Custom software"
            title={<span id="capabilities-title">Software that fits your business, not the other way around.</span>}
          />
          <p className="lede lg:col-span-4 lg:col-start-9">
            Whether it is a new platform or an existing system that needs to grow up, we build tools that are practical,
            reliable and easy to scale.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 lg:grid-cols-12">
          {TILES.map((t) => (
            <li
              key={t.title}
              className={cn(
                "group relative flex min-h-[380px] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[border-color,box-shadow] duration-500 hover:border-violet-soft/60 hover:shadow-[0_30px_60px_-30px_rgba(90,45,140,0.35)]",
                t.span,
              )}
            >
              <div aria-hidden className={cn("pointer-events-none absolute inset-0", t.tint)} />
              <div className="relative flex-1 px-6 pt-6 sm:px-8 sm:pt-8">
                <div className="transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-1.5">
                  {t.visual}
                </div>
              </div>
              <div className="relative px-6 pb-7 pt-6 sm:px-8">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-2 max-w-[52ch] text-[0.975rem] leading-relaxed text-ink-soft">{t.body}</p>
                {t.tags && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <li key={tag} className="rounded-md border border-line bg-white/70 px-2 py-1 text-[12px] text-ink-soft">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Tile visuals: each one a small, believable piece of product ---------- */

function WebVisual() {
  const rows = [
    { id: "PR-2291", who: "Anjali M.", amt: "₹84,500", state: "Approved" },
    { id: "PR-2292", who: "Rahul K.", amt: "₹2,12,000", state: "Needs CFO" },
    { id: "PR-2293", who: "Fathima S.", amt: "₹36,900", state: "Approved" },
  ];
  return (
    <div className="surface overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 border-b border-line bg-ivory px-3 py-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-line-strong" />
          ))}
        </span>
        <span className="ml-2 rounded-md bg-white px-2 py-0.5 text-[11px] text-mute">procure.yourcompany.in</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold">Purchase requests</p>
          <span className="rounded-md bg-ink px-2 py-1 text-[11px] text-white">New request</span>
        </div>
        <table className="mt-3 w-full text-left text-[12px]">
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="py-2 text-mute tnum">{r.id}</td>
                <td className="py-2">{r.who}</td>
                <td className="py-2 text-right tnum">{r.amt}</td>
                <td className="py-2 pl-3 text-right">
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[10.5px] font-medium",
                      r.state === "Approved" ? "bg-[#e8f6f0] text-mint" : "bg-[#fff1e7] text-saffron",
                    )}
                  >
                    {r.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="mx-auto w-[188px] rounded-[28px] border border-line bg-white p-2 shadow-[var(--shadow-float)]">
      <div className="rounded-[22px] bg-ivory p-3">
        <p className="text-[10px] text-mute">Delivery 7 of 18</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-tight">Sree Durga Stores</p>
        <p className="mt-1 flex items-center gap-1 text-[10.5px] text-mute">
          <MapPin className="size-3" aria-hidden /> Palayam, Thiruvananthapuram
        </p>
        <div className="mt-3 space-y-1.5">
          {["24 × Rice 5 kg", "12 × Sunflower oil 1 L"].map((l) => (
            <p key={l} className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-[10.5px]">
              <Check className="size-3 text-mint" aria-hidden /> {l}
            </p>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <span className="flex items-center justify-center gap-1 rounded-lg border border-line bg-white py-1.5 text-[10px]">
            <Camera className="size-3" aria-hidden /> Proof
          </span>
          <span className="rounded-lg bg-ink py-1.5 text-center text-[10px] text-white">Delivered</span>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  const vals = [42, 44, 43, 45, 44, 46, 45, 31, 44, 46, 45, 47];
  return (
    <div className="surface rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium">Daily cash receipts</p>
        <span className="flex items-center gap-1 rounded-md bg-[#fff0f3] px-1.5 py-0.5 text-[10.5px] font-medium text-rose">
          <AlertTriangle className="size-3" aria-hidden /> Anomaly
        </span>
      </div>
      <div className="relative mt-3">
        <Sparkline values={vals} color="#7357e8" width={240} height={70} className="h-[70px]" />
        <span className="absolute left-[63.6%] top-[62%] size-3 -translate-x-1/2 rounded-full border-2 border-rose bg-white" />
      </div>
      <p className="mt-3 text-[12px] leading-snug text-ink-soft">
        Thrissur branch deposited <span className="font-medium text-ink">31% less</span> on 14 Sep than the POS total.
      </p>
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
