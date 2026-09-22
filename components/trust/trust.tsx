import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { INDUSTRIES, STACK, STATS } from "@/lib/constants";

export function Trust() {
  return (
    <section id="trust" className="relative pb-16 pt-24 sm:pb-20 sm:pt-32" aria-labelledby="trust-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <h2 id="trust-title" className="display display-sm max-w-[16ch] lg:col-span-5">
            Built for teams building what comes next.
          </h2>
          <dl className="grid grid-cols-3 gap-6 lg:col-span-6 lg:col-start-7">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-ink/15 pt-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-[clamp(2.4rem,1.6rem+2.6vw,4rem)] leading-none text-ink">
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-3 max-w-[18ch] text-[0.9375rem] leading-snug text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <p className="text-[0.9375rem] text-mute lg:col-span-3">Industries we run operations for</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] tracking-[-0.015em] text-ink/75 lg:col-span-9">
            {INDUSTRIES.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-[0.9375rem] text-mute">Built on technologies you trust</p>
            <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed text-ink-soft">
              Powerful frameworks, robust databases and cloud-ready platforms for high performance, security and long-term
              scalability.
            </p>
          </div>
          <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-4 lg:col-span-9">
            {STACK.map((t) => (
              <li key={t.name} className="flex justify-center sm:justify-start">
                <span
                  className="relative block h-11 w-32 opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
                  title={t.name}
                >
                  <Image
                    src={t.logo}
                    alt={t.name}
                    fill
                    sizes="128px"
                    className="object-contain object-center mix-blend-multiply sm:object-left"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
