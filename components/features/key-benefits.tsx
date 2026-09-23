"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Key features and benefits, as a bento grid in the site's flat
   illustration language: a few bold colour-ground cards (violet,
   coral, yellow, mint) among white ones, each with its own small
   geometric motif that shifts on hover. Cards rise in as you scroll.
------------------------------------------------------------------- */

type Tone = "violet" | "coral" | "yellow" | "mint" | "white";

type Benefit = {
  title: string;
  body: string;
  tone: Tone;
  motif: Motif;
  span?: string;
  big?: boolean;
};

type Motif = "squares" | "code" | "blocks" | "people" | "stairs" | "links" | "gears" | "pulse";

const BENEFITS: Benefit[] = [
  {
    title: "Comprehensive solutions",
    body: "Complete solutions tailored to your business needs, with seamless results from planning to execution.",
    tone: "violet",
    motif: "squares",
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    title: "Expertise in application development",
    body: "High-performance, scalable applications built for modern business demands, with reliability, flexibility and innovation.",
    tone: "white",
    motif: "code",
  },
  {
    title: "Innovative pre-built platforms",
    body: "Ready-to-use platforms that streamline operations and accelerate growth.",
    tone: "coral",
    motif: "blocks",
  },
  {
    title: "Experienced team",
    body: "A skilled team delivering innovative and reliable digital solutions.",
    tone: "white",
    motif: "people",
  },
  {
    title: "Scalable solutions",
    body: "Systems that grow with your business, so you scale operations without compromising performance or stability.",
    tone: "white",
    motif: "stairs",
  },
  {
    title: "Seamless integration",
    body: "Connect your existing tools, third-party applications and workflows into one unified, efficient digital ecosystem.",
    tone: "yellow",
    motif: "links",
    span: "lg:col-span-2",
  },
  {
    title: "Process automation",
    body: "Intelligent automation that reduces manual effort, improves accuracy and speeds up business processes.",
    tone: "white",
    motif: "gears",
  },
  {
    title: "Real-time insights & control",
    body: "Monitor and manage your business with real-time dashboards and data-driven insights for faster, smarter decisions.",
    tone: "mint",
    motif: "pulse",
  },
];

const TONES: Record<Tone, { card: string; title: string; body: string; ink: string; soft: string }> = {
  violet: { card: "bg-[#6d4de6] border-transparent", title: "text-white", body: "text-white/75", ink: "#ffffff", soft: "#b9a6f7" },
  coral: { card: "bg-[#ff8a65] border-transparent", title: "text-[#3a0f06]", body: "text-[#3a0f06]/75", ink: "#3a0f06", soft: "#ffd0bf" },
  yellow: { card: "bg-[#ffd166] border-transparent", title: "text-[#3a2a06]", body: "text-[#3a2a06]/75", ink: "#3a2a06", soft: "#fff0c2" },
  mint: { card: "bg-[#62d2bd] border-transparent", title: "text-[#0e3a33]", body: "text-[#0e3a33]/75", ink: "#0e3a33", soft: "#d4f5ee" },
  white: { card: "bg-white border-line", title: "text-ink", body: "text-ink-soft", ink: "#6d4de6", soft: "#e6defe" },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function KeyBenefits() {
  return (
    <section id="benefits" className="pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="benefits-title">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker mb-6">Why QWY</p>
          <h2 id="benefits-title" className="display display-sm mx-auto max-w-[22ch]">
            Key <Grad>Features and Benefits</Grad>
          </h2>
          <p className="lede mx-auto mt-6 max-w-[56ch]">
            At QWY Software, we take pride in delivering top-notch services tailored to the unique needs of your business.
            Here&rsquo;s why businesses choose us.
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => {
            const t = TONES[b.tone];
            return (
              <motion.li
                key={b.title}
                className={cn("group", b.span)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease }}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[24px] border p-6 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(23,19,31,0.4)] sm:p-7",
                    t.card,
                  )}
                >
                  {/* Motif */}
                  <div
                    className={cn(
                      "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:scale-110",
                      b.big ? "size-40 sm:size-48" : "size-16",
                    )}
                  >
                    <MotifArt kind={b.motif} ink={t.ink} soft={t.soft} />
                  </div>

                  <div className="mt-auto pt-8">
                    <h3
                      className={cn(
                        "font-medium tracking-[-0.02em]",
                        b.big ? "text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] leading-[1.1]" : "text-[1.1rem] leading-snug",
                        t.title,
                      )}
                    >
                      {b.title}
                    </h3>
                    <p className={cn("mt-2 leading-relaxed", b.big ? "max-w-[42ch] text-[1.0625rem]" : "text-[0.925rem]", t.body)}>
                      {b.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Small flat geometric motifs, one per benefit, drawn in the card's own ink and soft tint */
function MotifArt({ kind, ink, soft }: { kind: Motif; ink: string; soft: string }) {
  const common = { viewBox: "0 0 64 64", className: "h-full w-full", "aria-hidden": true } as const;
  switch (kind) {
    case "squares":
      return (
        <svg {...common}>
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={4 + k * 5} y={4 + k * 5} width={56 - k * 10} height={56 - k * 10} rx={6 - k} fill="none" stroke={k === 4 ? ink : soft} strokeWidth="1.4" />
          ))}
          <rect x="27" y="27" width="10" height="10" rx="2" fill={ink} />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="56" height="44" rx="8" fill={soft} />
          <path d="M24 26 l-7 6 7 6 M40 26 l7 6 -7 6 M35 22 l-6 20" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "blocks":
      return (
        <svg {...common}>
          <rect x="6" y="30" width="24" height="24" rx="5" fill={soft} />
          <rect x="34" y="30" width="24" height="24" rx="5" fill={soft} />
          <rect x="20" y="6" width="24" height="24" rx="5" fill={ink} />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          {[
            [16, 22],
            [32, 18],
            [48, 22],
          ].map(([x, y], k) => (
            <g key={k}>
              <circle cx={x} cy={y} r="7" fill={k === 1 ? ink : soft} />
              <path d={`M${x - 11} ${y + 28} a11 11 0 0 1 22 0`} fill={k === 1 ? ink : soft} />
            </g>
          ))}
        </svg>
      );
    case "stairs":
      return (
        <svg {...common}>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={6 + k * 13} y={46 - k * 12} width="11" height={12 + k * 12} rx="3" fill={k === 3 ? ink : soft} />
          ))}
        </svg>
      );
    case "links":
      return (
        <svg {...common}>
          <path d="M14 32 H50" stroke={soft} strokeWidth="2" strokeDasharray="3 4" />
          {[14, 32, 50].map((x, k) => (
            <circle key={x} cx={x} cy="32" r={k === 1 ? 10 : 7} fill={k === 1 ? ink : soft} />
          ))}
          <path d="M32 22 V8 M32 42 V56" stroke={soft} strokeWidth="2" strokeDasharray="3 4" />
          <circle cx="32" cy="8" r="4" fill={soft} />
          <circle cx="32" cy="56" r="4" fill={soft} />
        </svg>
      );
    case "gears":
      return (
        <svg {...common}>
          <circle cx="26" cy="28" r="14" fill="none" stroke={soft} strokeWidth="6" strokeDasharray="5 4" />
          <circle cx="26" cy="28" r="5" fill={ink} />
          <circle cx="46" cy="46" r="9" fill="none" stroke={ink} strokeWidth="4" strokeDasharray="4 3" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="56" height="48" rx="8" fill={soft} />
          <path d="M10 36 H20 L25 24 L32 44 L38 30 L42 36 H54" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
