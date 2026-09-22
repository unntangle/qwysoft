import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { ENTERPRISE } from "@/lib/constants";

const STATUS = [
  { k: "Uptime, last 90 days", v: "99.95%" },
  { k: "Last verified backup", v: "Today, 02:00 IST" },
  { k: "Restore drill", v: "Passed, 14 Sep" },
  { k: "Encryption", v: "TLS 1.3, AES-256 at rest" },
  { k: "Access reviews", v: "Quarterly" },
];

export function Enterprise() {
  return (
    <section id="enterprise" className="bg-paper py-24 sm:py-36" aria-labelledby="enterprise-title">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="kicker mb-6">For the enterprise</p>
              <h2 id="enterprise-title" className="display display-md max-w-[16ch]">
                Engineering you can hand to <Grad>your auditors.</Grad>
              </h2>
              <p className="lede mt-6 max-w-[44ch]">
                The systems we build carry your revenue, payroll and customer data. They are designed, tested and operated
                accordingly.
              </p>

              <dl className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
                <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-[12.5px] text-mute">
                  <span className="live-dot size-1.5 rounded-full bg-mint" /> Operations status, managed deployments
                </div>
                {STATUS.map((s) => (
                  <div key={s.k} className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 last:border-0">
                    <dt className="text-[13.5px] text-ink-soft">{s.k}</dt>
                    <dd className="tnum text-right text-[13.5px] font-medium">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {ENTERPRISE.map((e) => (
              <li key={e.title} className="border-t border-ink/12 py-8">
                <h3 className="text-[1.125rem] font-semibold tracking-[-0.015em]">{e.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink-soft">{e.body}</p>
              </li>
            ))}
            <li className="border-t border-ink/12 py-8 sm:col-span-2">
              <p className="text-[0.975rem] leading-relaxed text-ink-soft">
                Integrations we run in production include payment gateways, GST e-invoicing, Tally, marketplaces, WhatsApp
                Business and bank statement feeds.
              </p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
