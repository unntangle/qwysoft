import Image from "next/image";
import { IndustrySwitchboard } from "@/components/trust/industry-switchboard";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { STACK } from "@/lib/constants";

export function Trust() {
  return (
    <section id="trust" className="relative pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="trust-title">
      <Container>
        <div className="max-w-3xl">
          <h2 id="trust-title" className="display display-sm max-w-[18ch]">
            Built for Teams Building <Grad>What Comes Next.</Grad>
          </h2>
          <p className="lede mt-6 max-w-[56ch]">
            From single-outlet businesses to multi-branch operations across Kerala and beyond, we build the systems that run
            sales, stock, people and finance, and the intelligence on top.
          </p>
        </div>

        <div className="mt-14">
          <IndustrySwitchboard />
        </div>

        <div className="mt-20 grid items-center gap-10 border-t border-line pt-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-[1.0625rem] font-medium text-ink">Built on technologies you trust</p>
            <p className="mt-3 max-w-[34ch] text-[0.975rem] leading-relaxed text-ink-soft">
              Powerful frameworks, robust databases and cloud-ready platforms for high performance, security and long-term
              scalability.
            </p>
          </div>
          <div
            className="marquee space-y-10 overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:col-span-9"
            aria-label="Technologies we use"
          >
            {[STACK.slice(0, Math.ceil(STACK.length / 2)), STACK.slice(Math.ceil(STACK.length / 2))].map((row, r) => {
              // Repeat the row so one copy is wider than the viewport, then render it twice for a seamless loop
              const set = [...row, ...row, ...row];
              return (
                <div
                  key={r}
                  className={`flex w-max ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
                >
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="flex shrink-0 items-center gap-20 pr-20" aria-hidden={copy === 1}>
                      {set.map((t, i) => (
                        <li key={`${t.name}-${i}`} className="shrink-0">
                          <span
                            className="relative block h-16 w-44 transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[scale] [backface-visibility:hidden] hover:scale-[1.15]"
                            title={t.name}
                          >
                            <Image
                              src={t.logo}
                              alt={copy === 0 && i < row.length ? t.name : ""}
                              fill
                              sizes="176px"
                              className="object-contain object-center mix-blend-multiply"
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
