import { ArrowUpRight, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { Thumb } from "@/components/ui/thumb";
import { ACCELERATORS } from "@/lib/constants";

export function Accelerators() {
  return (
    <section id="accelerators" className="pb-16 sm:pb-24" aria-labelledby="accelerators-title">
      <Container>
        <div className="border-t border-line pt-16">
          <div className="max-w-3xl">
            <h2 id="accelerators-title" className="display display-sm max-w-[18ch]">
              Pre-built platforms, so you start at <Grad>eighty percent.</Grad>
            </h2>
            <p className="lede mt-6 max-w-[56ch]">
              Proven starting points for common operations. Less implementation time, with full room to customise the part
              that makes your business yours.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ACCELERATORS.map((a, i) => (
            <li key={a.name}>
              <a
                href="#contact"
                className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(90,45,140,0.35)]"
              >
                <Thumb hue={a.hue} seed={i + 2} className="aspect-[4/3]">
                  <div className="flex h-full flex-col justify-between p-5">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-white/80 px-2 py-1 text-[12px] font-medium text-ink backdrop-blur">
                      <Timer className="size-3.5" aria-hidden /> Live in {a.weeks}
                    </span>
                    <ArrowUpRight
                      className="size-5 self-end text-ink/60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                </Thumb>
                <div className="p-5">
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{a.name}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
