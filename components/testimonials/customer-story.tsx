import { Container } from "@/components/ui/container";
import { Kasavu } from "@/components/ui/kasavu";
import { STORY } from "@/lib/constants";

export function CustomerStory() {
  return (
    <section id="story" className="relative overflow-hidden py-28 sm:py-40" aria-labelledby="story-title">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-[10%] -z-10 h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(220,212,248,0.7),transparent_70%)]"
      />
      <Container>
        <h2 id="story-title" className="sr-only">
          Customer story
        </h2>
        <div className="grid gap-16 lg:grid-cols-12">
          <figure className="lg:col-span-9">
            <Kasavu className="mb-12 max-w-[120px]" />
            <blockquote>
              <p className="display text-[clamp(1.9rem,1.2rem+2.6vw,3.6rem)] leading-[1.14] tracking-[-0.02em] text-ink">
                &ldquo;{STORY.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-lavender to-peach text-[15px] font-semibold text-plum">
                {STORY.name
                  .split(" ")
                  .map((w) => w[0].toUpperCase())
                  .join("")}
              </span>
              <span>
                <span className="block text-[15px] font-semibold">{STORY.name}</span>
                <span className="block text-[14px] text-mute">
                  {STORY.role}, {STORY.company}
                </span>
              </span>
            </figcaption>
          </figure>

          <dl className="flex flex-col justify-end gap-10 lg:col-span-3">
            {STORY.metrics.map((m) => (
              <div key={m.label} className="border-t border-ink/15 pt-5">
                <dt className="sr-only">{m.label}</dt>
                <dd className="display text-[3rem] leading-none text-plum">{m.value}</dd>
                <dd className="mt-3 text-[0.95rem] text-ink-soft">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
