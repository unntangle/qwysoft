import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroComposition } from "@/components/hero/hero-composition";
import { HeroCentered } from "@/components/hero/hero-center";
import { HeroFade, HeroGlow, HeroRise } from "@/components/hero/hero-scroll";
import { HERO, STACK } from "@/lib/constants";

/* ------------------------------------------------------------------
   Hero, in the manner of Mixpanel's enterprise page: one big rounded
   card inset from the page, deep indigo at the top warming to violet
   and a glowing lavender "floor" under the product shot. Centred pill,
   typed headline, copy, buttons, a quiet strip of the platforms we
   build on, the QWY console with its floating cards, then three
   short pillars along the bottom.
------------------------------------------------------------------- */

// Logos that read cleanly as white silhouettes
const STRIP = STACK.filter((s) => !/django|aws/i.test(s.name));

const PILLARS = [
  { title: "One system of record", body: "Sales, stock, people and finance in Odoo, configured to how you work." },
  { title: "Software built around you", body: "Custom web and mobile apps that extend Odoo to your teams and customers." },
  { title: "Intelligence on top", body: "Forecasts, alerts and answers drawn from your own live data." },
];

export function Hero() {
  return (
    <section className="relative px-2 pt-[5.5rem] sm:px-3 sm:pt-24" aria-labelledby="hero-title">
      <div data-nav="dark" className="relative isolate overflow-hidden rounded-[32px] text-white sm:rounded-[40px]">
        {/* Background: indigo → violet, a glowing floor under the product shot, dark again at the foot */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#22033d_0%,#33055f_22%,#5a0aa6_50%,#7a2fd4_66%,#5a0aa6_84%,#26043f_100%)]"
        />
        <HeroGlow className="absolute inset-x-0 top-[48%] -z-10 h-[40%] origin-bottom bg-[radial-gradient(50%_60%_at_50%_70%,rgba(240,226,255,0.95)_0%,rgba(196,150,255,0.55)_35%,rgba(122,47,212,0)_75%)]" />
        <div aria-hidden className="grain absolute inset-0 -z-10 opacity-60" />

        <Container className="relative pb-14 pt-16 sm:pt-20">
          <HeroFade>
          {/* Pill */}
          <div className="flex justify-center">
            <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[13px] text-white/85 backdrop-blur">
              Odoo Silver Partner
            </span>
          </div>

          <div className="mt-7">
            <HeroCentered
              slides={HERO.slides}
              actions={
                <>
                  <Button href={HERO.primary.href} variant="light">
                    {HERO.primary.label}
                  </Button>
                  <Button href={HERO.secondary.href} variant="ghost-light" arrow={false}>
                    {HERO.secondary.label}
                  </Button>
                </>
              }
            />
          </div>
          </HeroFade>

          {/* Everything below the buttons. The light-beam layer starts at the top of this block,
              so its crisp top edge always sits in the gap under the buttons, never behind them. */}
          <div className="relative mt-12 pt-12">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[62%] w-[100vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_100%,transparent_150deg,rgba(255,255,255,0.10)_170deg,transparent_180deg,rgba(255,255,255,0.10)_190deg,transparent_210deg)]"
            />

          {/* Platforms we build on */}
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-[12.5px] text-white/45">Built on the platforms you trust</p>
            {/* Scrolling carousel of logos, fading out at both edges */}
            <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max animate-marquee" style={{ animationDuration: "40s" }}>
                {[0, 1].map((copy) => (
                  <ul key={copy} className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={copy === 1}>
                    {[...STRIP, ...STRIP].map((s, i) => (
                      <li key={`${s.name}-${i}`} className="relative h-7 w-24 shrink-0">
                        <Image
                          src={s.logo}
                          alt={copy === 0 && i < STRIP.length ? s.name : ""}
                          fill
                          sizes="96px"
                          className="object-contain opacity-55 brightness-0 invert"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          {/* Product shot, lit from the floor: stands up flat as it scrolls into view */}
          <HeroRise className="relative">
            <HeroComposition />
          </HeroRise>

          {/* Pillars */}
          <ul className="mx-auto mt-24 grid max-w-5xl gap-8 text-center sm:grid-cols-3 lg:mt-28">
            {PILLARS.map((p) => (
              <li key={p.title}>
                <span className="mx-auto grid size-6 place-items-center rounded-full border border-white/40">
                  <Check className="size-3.5" strokeWidth={2.2} aria-hidden />
                </span>
                <p className="mt-3 text-[1.0625rem] font-medium">{p.title}</p>
                <p className="mx-auto mt-1.5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/60">{p.body}</p>
              </li>
            ))}
          </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
