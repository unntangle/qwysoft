import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { LIFE_PHOTOS } from "@/lib/constants";

/**
 * Homepage team teaser. Buyers want to know who will build and run their
 * system; the full Life at QWY story lives on /about.
 */
export function Culture() {
  const strip = LIFE_PHOTOS.slice(0, 4);
  return (
    <section id="team" className="border-t border-line py-24 sm:py-32" aria-labelledby="team-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="kicker mb-6">The team behind your system</p>
            <h2 id="team-title" className="display display-md max-w-[16ch]">
              Built by a team in <Grad>Technopark</Grad>, Thiruvananthapuram.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="lede">
              Engineers, consultants and Odoo specialists who work as an extension of your team, from discovery to go-live
              and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about">Meet the team</Button>
              <Button href="/about#careers" variant="secondary" arrow={false}>
                Careers
              </Button>
            </div>
          </div>
        </div>

        {strip.length > 0 && (
          <ul className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {strip.map((p) => (
              <li key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
