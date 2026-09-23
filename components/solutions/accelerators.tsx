"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { AcceleratorArt } from "@/components/solutions/accelerator-art";
import { ACCELERATORS } from "@/lib/constants";

/* ------------------------------------------------------------------
   Pre-built platforms, five in a row, styled like Sarvam's customer-
   story cards: white card with a pale tile (fading to white, the
   platform's short name set bold like a logo), then the name,
   description and a quiet "Live in … · Platform" line.
------------------------------------------------------------------- */

// Short, wordmark-style label for each tile
const shortName = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("crm")) return "CRM & HRMS";
  if (n.includes("commerce")) return "E-commerce";
  if (n.includes("analytics")) return "Analytics & BI";
  if (n.includes("marketplace")) return "Marketplace";
  if (n.includes("fleet")) return "Fleet";
  return name;
};

// Very pale tints that fade to white, like Sarvam's logo tiles
const PALE = [
  "bg-[linear-gradient(180deg,#f7eed9_0%,#fbf8f0_75%,#ffffff_100%)]", // gold
  "bg-[linear-gradient(180deg,#fce9de_0%,#fef7f2_75%,#ffffff_100%)]", // peach
  "bg-[linear-gradient(180deg,#ebe6fb_0%,#f7f5fe_75%,#ffffff_100%)]", // lavender
  "bg-[linear-gradient(180deg,#fbe4ea_0%,#fdf5f7_75%,#ffffff_100%)]", // rose
  "bg-[linear-gradient(180deg,#e4e9fb_0%,#f6f8fe_75%,#ffffff_100%)]", // blue
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Accelerators() {
  return (
    <section id="accelerators" className="pb-10 sm:pb-12" aria-labelledby="accelerators-title">
      <Container>
        <div className="border-t border-line pt-8">
          <div className="max-w-3xl">
            <h2 id="accelerators-title" className="display display-sm max-w-[18ch]">
              Pre-Built Platforms, So You Start at <Grad>Eighty Percent.</Grad>
            </h2>
            <p className="lede mt-6 max-w-[56ch]">
              Proven starting points for common operations. Less implementation time, with full room to customise the part
              that makes your business yours.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ACCELERATORS.map((a, i) => (
            <motion.li
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
            >
              <a
                href="#contact"
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-2 transition-shadow duration-500 hover:shadow-[0_24px_48px_-32px_rgba(23,19,31,0.35)]"
              >
                {/* Flat geometric illustration */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 transition-[scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                    <AcceleratorArt name={a.name} />
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
                  <h3 className="text-[1.05rem] font-normal leading-snug tracking-[-0.01em] text-ink">{a.name}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{a.body}</p>
                  <p className="mt-auto pt-5 text-[12.5px] text-ink-soft">
                    Live in {a.weeks} <span className="px-1.5 text-mute">·</span> Platform
                  </p>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
