import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { Thumb } from "@/components/ui/thumb";
import { RESOURCES } from "@/lib/constants";

export function Resources() {
  const [lead, ...rest] = RESOURCES;
  return (
    <section id="resources" className="py-24 sm:py-36" aria-labelledby="resources-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="resources-title" className="display display-md">
            <Grad>Insights</Grad>
          </h2>
          <a href="#resources" className="group flex items-center gap-1.5 text-[15px] font-medium text-plum">
            All articles
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <article className="group lg:col-span-6">
            <a href="#resources" className="block">
              <Thumb hue={lead.tone} seed={1} className="aspect-[16/11] rounded-[var(--radius-card)]">
                <div className="flex h-full items-start p-6">
                  <span className="rounded-md bg-white/80 px-2 py-1 text-[12px] font-medium text-ink backdrop-blur">Featured</span>
                </div>
              </Thumb>
              <p className="mt-5 text-[13px] text-mute">
                {lead.kind}, {lead.read}
              </p>
              <h3 className="display mt-2 max-w-[24ch] text-[clamp(1.6rem,1.2rem+1vw,2.2rem)] leading-[1.1] transition-colors group-hover:text-plum">
                {lead.title}
              </h3>
            </a>
          </article>

          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            {rest.map((r, i) => (
              <li key={r.title}>
                <article className="group">
                  <a href="#resources" className="block">
                    <Thumb hue={r.tone} seed={i + 4} className="aspect-[4/3] rounded-2xl transition-transform duration-700 group-hover:scale-[0.985]" />
                    <p className="mt-4 text-[13px] text-mute">
                      {r.kind}, {r.read}
                    </p>
                    <h3 className="mt-1.5 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] transition-colors group-hover:text-plum">
                      {r.title}
                    </h3>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
