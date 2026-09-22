import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { ENGAGEMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Engagement() {
  return (
    <section id="engage" className="bg-paper py-24 sm:py-36" aria-labelledby="engage-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="kicker mb-6">Pricing</p>
            <h2 id="engage-title" className="display display-md max-w-[14ch]">
              <Grad>Three ways</Grad> to work with us.
            </h2>
          </div>
          <p className="lede lg:col-span-5 lg:col-start-8">
            Every engagement is priced to its scope after a free discovery session. No licence fees on code we write for you.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr]">
          {ENGAGEMENTS.map((e) => (
            <li
              key={e.name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-[var(--radius-card)] p-7 sm:p-8",
                e.featured ? "bg-indigo text-white lg:-my-4 lg:py-12" : "border border-line bg-white",
              )}
            >
              {e.featured && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(115,87,232,0.55),transparent)]"
                />
              )}
              <div className="relative flex items-center justify-between">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">{e.name}</h3>
                {e.featured && <span className="rounded-md bg-white/10 px-2 py-1 text-[12px] text-lavender">Most flexible</span>}
              </div>
              <p className={cn("display relative mt-6 text-[1.6rem] leading-tight", e.featured ? "text-white" : "text-ink")}>
                {e.fit}
              </p>
              <p className={cn("relative mt-4 text-[0.975rem] leading-relaxed", e.featured ? "text-white/65" : "text-ink-soft")}>
                {e.body}
              </p>
              <ul className="relative mt-7 space-y-2.5">
                {e.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2.5 text-[0.95rem]">
                    <Check className={cn("size-4", e.featured ? "text-saffron" : "text-plum")} aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto pt-10">
                <Button href="#contact" variant={e.featured ? "light" : "secondary"} className="w-full">
                  Discuss this model
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
