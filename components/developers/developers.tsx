import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { CodePanel, type Snippet } from "@/components/developers/code-panel";
import { TeamTabs } from "@/components/developers/team-tabs";

const SNIPPETS: Snippet[] = [
  {
    id: "odoo",
    label: "Odoo external API",
    file: "sync/pull_orders.py",
    lang: "python",
    code: `import xmlrpc.client

URL, DB = "https://erp.example.in", "production"
common = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common")
uid = common.authenticate(DB, USER, API_KEY, {})
models = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/object")

# Pull orders confirmed since the last sync
orders = models.execute_kw(DB, uid, API_KEY,
    "sale.order", "search_read",
    [[("state", "=", "sale"), ("write_date", ">=", since)]],
    {"fields": ["name", "partner_id", "amount_total"], "limit": 500})

warehouse.upsert("sales_orders", orders, key="name")`,
  },
  {
    id: "webhook",
    label: "Forecast webhook",
    file: "app/api/forecast/route.ts",
    lang: "ts",
    code: `import { odoo } from "@/lib/odoo";

// Called by the forecasting service when cover runs low
export async function POST(req: Request) {
  const event = await req.json();
  // { sku, warehouse, daysOfCover, suggestedQty, confidence }

  if (event.daysOfCover < 7 && event.confidence > 0.8) {
    const po = await odoo.create("purchase.order", {
      partner_id: await odoo.preferredVendor(event.sku),
      order_line: [{ product: event.sku, qty: event.suggestedQty }],
      state: "draft",
    });
    return Response.json({ created: po.id });
  }
  return Response.json({ created: null });
}`,
  },
  {
    id: "rest",
    label: "REST API",
    file: "GET /v1/insights",
    lang: "ts",
    code: `const res = await fetch("https://api.example.in/v1/insights?branch=kochi", {
  headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
});

const { insights } = await res.json();
// [{ type: "stockout_risk", sku: "BASMATI-5KG",
//    daysOfCover: 6, confidence: 0.91, action: "raise_po" }]`,
  },
];

const PIPELINE = [
  { name: "Sources", items: ["Odoo", "POS", "Apps", "Banks"] },
  { name: "Sync", items: ["Change capture", "Validation"] },
  { name: "Warehouse", items: ["PostgreSQL", "dbt models"] },
  { name: "Intelligence", items: ["Forecasts", "Anomalies"] },
  { name: "Delivery", items: ["Console", "APIs", "Alerts"] },
];

export function Developers() {
  return (
    <section id="developers" data-nav="dark" className="relative overflow-hidden bg-night py-16 text-white sm:py-24" aria-labelledby="developers-title">
      <div aria-hidden className="grid-night pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[20%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(115,87,232,0.3),transparent_70%)] blur-2xl"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="kicker mb-6 text-violet-soft">For developers</p>
          <h2 id="developers-title" className="display display-md max-w-[15ch]">
            <Grad tone="dark">Open by design</Grad>, down to the last endpoint.
          </h2>
          <p className="lede mt-6 max-w-[56ch] text-white/60">
            Documented integrations, clean data contracts and code you own. Your engineers can extend anything we build.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <CodePanel snippets={SNIPPETS} />
          </div>

          <div className="surface-night rounded-[var(--radius-card)] p-6 lg:col-span-5">
            <p className="text-[13px] text-white/55">Data pipeline, as we typically deploy it</p>
            <ol className="relative mt-6 space-y-3">
              <span aria-hidden className="absolute bottom-5 left-[15px] top-5 w-px bg-gradient-to-b from-violet-soft via-saffron to-violet-soft opacity-50" />
              {PIPELINE.map((p, i) => (
                <li key={p.name} className="relative flex items-start gap-4">
                  <span className="relative z-10 grid size-[31px] shrink-0 place-items-center rounded-full border border-white/15 bg-[#1b1440] text-[12px] tnum text-white/70">
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06]">
                    <p className="text-[14px] font-medium">{p.name}</p>
                    <p className="mt-1.5 flex flex-wrap gap-1.5">
                      {p.items.map((it) => (
                        <span key={it} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11.5px] text-white/60">
                          {it}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {[
                ["p95 sync lag", "14 s"],
                ["API uptime", "99.95%"],
                ["Schema tests", "412 passing"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[11px] text-white/40">{k}</p>
                  <p className="tnum mt-1 text-[14px] font-medium">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="max-w-3xl">
            <h3 className="display display-sm max-w-[18ch]">Dedicated teams that work as <Grad tone="dark">an extension of yours.</Grad></h3>
            <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-white/55">
              Consistency, speed and accountability in every phase: continuous support, quick iterations and dependable
              execution, so your roadmap keeps moving.
            </p>
          </div>
          <div className="mt-10">
            <TeamTabs />
          </div>
        </div>
      </Container>
    </section>
  );
}
