import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroComposition } from "@/components/hero/hero-composition";
import { HeroSlides } from "@/components/hero/hero-text";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden pb-28 pt-32 sm:pt-40 lg:pb-44" aria-labelledby="hero-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-ivory" />

      <Container>
        <HeroSlides
          eyebrow={HERO.eyebrow}
          slides={HERO.slides}
          actions={
            <>
              <Button href={HERO.primary.href}>{HERO.primary.label}</Button>
              <Button href={HERO.secondary.href} variant="secondary" arrow={false}>
                {HERO.secondary.label}
              </Button>
            </>
          }
        />

        <HeroComposition />
      </Container>
    </section>
  );
}
