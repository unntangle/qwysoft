import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";

const CORE_SERVICES = [
  {
    title: "Custom Software Solutions",
    body: "We design and develop tailored software solutions that align with your unique business processes and operational goals.",
    href: "#capabilities",
  },
  {
    title: "AI & Machine Learning Capabilities",
    body: "We embed intelligence into your operations: predictive analytics, process automation and decision support that learn from your own data and improve over time.",
    href: "#intelligence",
  },
  {
    title: "Odoo ERP Services & Solutions",
    body: "We bring your operations into a single, well-organised system using Odoo, structured and customised to match your workflows.",
    href: "#solutions",
  },
  {
    title: "Pre-Built Platforms & Accelerators",
    body: "Ready starting points built on proven use cases, so you go live faster while keeping full room for customisation.",
    href: "#accelerators",
  },
];

export function CoreServices() {
  return (
    <section id="core-services" className="py-24 sm:py-32" aria-labelledby="core-services-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="kicker mb-6">What we do</p>
            <h2 id="core-services-title" className="display display-md max-w-[14ch]">
              Our core services
            </h2>

            <div className="mt-10 border-t border-line">
              {CORE_SERVICES.map((s, i) => (
                <details key={s.title} className="group border-b border-line" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="text-[1.125rem] font-semibold tracking-[-0.015em] transition-colors group-open:text-plum">
                      {s.title}
                    </span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-mute transition-all duration-300 group-open:rotate-45 group-open:border-plum group-open:text-plum">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <div className="pb-6 pr-12">
                    <p className="text-[0.975rem] leading-relaxed text-ink-soft">{s.body}</p>
                    <a href={s.href} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-plum">
                      Learn more <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-[linear-gradient(135deg,#1d1745_0%,#3a1f95_55%,#8e0f9c_100%)] p-8 text-white sm:p-10">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,31,107,0.45),transparent)] blur-2xl"
              />
              <div aria-hidden className="grid-night absolute inset-0 opacity-60" />
              <div className="relative">
                <p className="text-[13px] text-white/55">Delivered end to end</p>
                <ul className="mt-6 space-y-3">
                  {["Discover and map processes", "Design and build", "Integrate with Odoo and your tools", "Launch, support and improve"].map(
                    (step, i) => (
                      <li key={step} className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10">
                        <span className="tnum grid size-7 place-items-center rounded-full bg-white/10 text-[12px]">{i + 1}</span>
                        <span className="text-[14.5px]">{step}</span>
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-8 rounded-2xl bg-[linear-gradient(100deg,#ff1f6b,#c3158a)] p-5 text-[14.5px] leading-relaxed">
                  Our custom applications help automate workflows, improve efficiency, and support scalable digital
                  transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
