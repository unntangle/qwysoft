import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------
   Who we are & what we do.
   Left: editorial statement, the story, and the numbers.
   Right: the story as a picture —
     • What we do: the four services named in the copy
     • What you get: the three outcomes (streamline, scale, grow)
     • How we work: one partner from discovery to ongoing support
------------------------------------------------------------------- */

const STAT_LABELS = ["Projects delivered", "Years experience", "Client satisfaction"];

type Service = { title: string; body: string; tags: string[] };

const SERVICES: Service[] = [
  {
    title: "Odoo ERP",
    body: "Implementation, customisation and integration",
    tags: ["Sales", "Inventory", "Accounting", "HR"],
  },
  {
    title: "Custom software",
    body: "Web and mobile apps built around your workflows",
    tags: ["Web apps", "Mobile apps", "Applied AI"],
  },
  {
    title: "Dedicated teams",
    body: "An extension of your own team, in your sprints",
    tags: ["Consultants", "Engineers", "QA", "DevOps"],
  },
  {
    title: "Pre-built platforms",
    body: "Go live faster, without starting from scratch",
    tags: ["Ready modules", "Accelerators"],
  },
];

const OUTCOMES: { label: string; note: string }[] = [
  { label: "Streamlined operations", note: "One system, no re-keying" },
  { label: "Scale efficiently", note: "More branches, same effort" },
  { label: "Drive growth", note: "Decisions on live data" },
];

const STEPS = ["Discover", "Build", "Integrate", "Support"];

export function WhoWeAre() {
  return (
    <section id="about" className="relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="who-title">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Story */}
          <div className="lg:col-span-5">
            <p className="kicker mb-6">Who we are</p>
            <h2 id="who-title" className="display display-sm">
              Who We Are
              <span className="block bg-[linear-gradient(95deg,#ff1f6b_0%,#c3158a_50%,#6a1fd0_100%)] bg-clip-text pb-[0.12em] text-transparent">
                &amp; What We Do
              </span>
            </h2>
            <div className="mt-7 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              <p>
                QWY Software is a technology partner helping businesses streamline operations, scale efficiently and drive
                growth through smart digital solutions.
              </p>
              <p>
                We deliver end to end, from Odoo ERP implementation, customisation and integration to custom software built
                around your workflows. Our dedicated teams work as an extension of yours, and our pre-built platforms help
                you go live faster without starting from scratch.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <div key={s.label} className="border-t border-ink/15 pt-4">
                  <dt className="sr-only">{STAT_LABELS[i] ?? s.label}</dt>
                  <dd className="display text-[clamp(2.1rem,1.5rem+2vw,3.2rem)] leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-2.5 text-[14px] leading-snug text-ink-soft">{STAT_LABELS[i] ?? s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* What we do, what you get, how we work */}
          <Reveal className="relative lg:col-span-7">
            <div
              aria-hidden
              className="absolute -inset-x-8 -inset-y-12 -z-10 bg-[radial-gradient(50%_55%_at_25%_75%,rgba(255,200,165,0.5),transparent_100%),radial-gradient(45%_50%_at_80%_25%,rgba(190,176,245,0.55),transparent_100%)]"
            />
            <div aria-hidden className="grid-faint absolute -inset-6 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />

            <div className="relative mx-auto max-w-[620px] pb-10 pt-4 sm:pb-24 sm:pt-28">
              {/* Main card: the four services */}
              <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[var(--shadow-panel)]">
                <div className="border-b border-line px-5 py-3.5">
                  <p className="text-[13.5px] font-semibold">What we do</p>
                </div>
                <ul className="divide-y divide-line">
                  {SERVICES.map(({ title, body, tags }, i) => (
                    <li key={title} className="flex items-start gap-4 px-5 py-4 transition-colors duration-300 hover:bg-ivory/70">
                      <span className="tnum w-6 shrink-0 pt-[3px] text-[12px] font-medium text-plum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold tracking-[-0.01em]">{title}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{body}</p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {tags.map((t) => (
                            <span key={t} className="rounded-md bg-paper px-2 py-0.5 text-[11.5px] text-ink-soft">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating: what you get */}
              <div className="surface mt-4 rounded-2xl p-4 sm:absolute sm:-right-8 sm:top-0 sm:mt-0 sm:w-[250px]">
                <p className="text-[12px] text-mute">What you get</p>
                <ul className="mt-3 space-y-3">
                  {OUTCOMES.map(({ label, note }) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <Check className="mt-[2px] size-3.5 shrink-0 text-plum" strokeWidth={2.25} aria-hidden />
                      <span>
                        <span className="block text-[13px] font-medium leading-tight">{label}</span>
                        <span className="block text-[11.5px] text-mute">{note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating: how we work, one partner end to end */}
              <div className="surface mt-4 rounded-2xl p-4 sm:absolute sm:-left-10 sm:bottom-0 sm:mt-0 sm:w-[290px]">
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-medium">How we work</p>
                  <span className="text-[11.5px] text-mute">One partner, end to end</span>
                </div>
                <ol className="mt-3 flex items-start">
                  {STEPS.map((label, i) => (
                    <li key={label} className="flex flex-1 flex-col items-center gap-1.5 last:flex-none">
                      <div className="flex w-full items-center">
                        <span className="tnum grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-white text-[11px] font-medium text-ink">
                          {i + 1}
                        </span>
                        {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line-strong" />}
                      </div>
                      <span className="w-full text-[10.5px] text-mute">{label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
