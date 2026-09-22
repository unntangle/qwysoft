import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroComposition } from "@/components/hero/hero-composition";
import { HeroText } from "@/components/hero/hero-text";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden pb-28 pt-32 sm:pt-40 lg:pb-44" aria-labelledby="hero-title">
      {/* Atmosphere: saffron dawn rising into lavender dusk. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbf9f5_0%,#fbf9f5_28%,#f6f1fb_62%,#fbf9f5_100%)]" />
        <div className="animate-drift absolute left-[-12%] top-[30%] h-[85vh] w-[75vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,170,120,0.85),rgba(255,210,180,0.45)_45%,transparent_72%)] blur-2xl" />
        <div className="animate-drift absolute right-[-18%] top-[22%] h-[80vh] w-[65vw] rounded-full bg-[radial-gradient(closest-side,rgba(150,130,240,0.7),rgba(210,200,248,0.4)_50%,transparent_75%)] blur-2xl [animation-delay:-9s]" />
        <div className="grid-faint absolute inset-x-0 top-[40%] h-[60%] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      </div>

      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <HeroText eyebrow={HERO.eyebrow} title={HERO.title} />
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="lede max-w-[42ch]">{HERO.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={HERO.primary.href}>{HERO.primary.label}</Button>
              <Button href={HERO.secondary.href} variant="secondary" arrow={false}>
                {HERO.secondary.label}
              </Button>
            </div>
          </div>
        </div>

        <HeroComposition />
      </Container>
    </section>
  );
}
