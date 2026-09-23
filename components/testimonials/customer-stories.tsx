"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { STORY } from "@/lib/constants";

/* ------------------------------------------------------------------
   Customer stories, in the manner of Sarvam's customer stories page:
   centred heading, one featured story, a grid of story cards (pastel
   tile where the client logo would sit, title, quiet meta line), then
   a centred quote between two thin ornamented rules.

   REPLACE: the stories below are anonymised placeholders. Swap in real,
   approved client names, logos and outcomes before launch.
------------------------------------------------------------------- */

type Story = { tile: string; title: string; body?: string; client: string; tag: string };

const FEATURED: Story = {
  tile: "Retail group",
  title: "How a 14-store retail group closes its books in three days",
  body: "Sales, stock and accounts moved onto one Odoo system, with a demand forecast that flags reorders before stores run out.",
  client: "Multi-store retail group, Kerala",
  tag: "Retail",
};

const STORIES: Story[] = [
  { tile: "Food manufacturer", title: "A food manufacturer that now costs every work order live", client: "Food manufacturer", tag: "Manufacturing" },
  { tile: "Logistics operator", title: "Every van tracked and every drop proven for a regional logistics operator", client: "Logistics operator", tag: "Logistics" },
  { tile: "School group", title: "Admissions to fee receipts, with no paper, for a school group", client: "School group", tag: "Education" },
  { tile: "Trading house", title: "One ledger for every branch of a growing trading house", client: "Trading house", tag: "Trading" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Very pale tints that fade to white, like Sarvam's logo tiles
const PALE = [
  "bg-[linear-gradient(180deg,#e3f1e0_0%,#f7fbf6_75%,#ffffff_100%)]",
  "bg-[linear-gradient(180deg,#e4e9fb_0%,#f6f8fe_75%,#ffffff_100%)]",
  "bg-[linear-gradient(180deg,#fbe8ee_0%,#fdf6f8_75%,#ffffff_100%)]",
  "bg-[linear-gradient(180deg,#fcefe2_0%,#fef9f4_75%,#ffffff_100%)]",
];

export function CustomerStories() {
  return (
    <section id="story" className="py-16 sm:py-24" aria-labelledby="story-title">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="story-title" className="display display-sm">
            Customer stories
          </h2>
          <p className="lede mx-auto mt-5 max-w-[52ch]">
            From single stores to multi-branch operations, see how businesses run on systems we built with them.
          </p>
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14"
        >
          <div className="grid gap-2 rounded-2xl border border-line bg-white p-2 lg:grid-cols-[0.95fr_1.05fr]">
            <div className={`grid aspect-[16/10] place-items-center rounded-xl px-6 text-center lg:aspect-auto lg:min-h-[320px] ${PALE[0]}`}>
              <p className="text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] font-bold tracking-[-0.03em] text-ink">{FEATURED.tile}</p>
            </div>
            <div className="flex flex-col px-4 py-5 sm:px-6 lg:py-7">
              <h3 className="text-[1.5rem] font-normal leading-snug tracking-[-0.02em]">{FEATURED.title}</h3>
              <p className="mt-3 max-w-[56ch] text-[0.975rem] leading-relaxed text-ink-soft">{FEATURED.body}</p>
              <p className="mt-4 text-[13px] text-ink-soft">{FEATURED.client}</p>
              <span className="mt-auto w-fit rounded-md border border-line bg-paper px-2 py-0.5 text-[12px] text-ink-soft">
                {FEATURED.tag}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {STORIES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
            >
              <div className="grid h-full grid-cols-[minmax(0,0.9fr)_1.1fr] gap-2 rounded-2xl border border-line bg-white p-2 sm:grid-cols-[240px_1fr]">
                {/* Logo tile: pale colour fading to white, client name set like a wordmark */}
                <div className={`grid min-h-[200px] place-items-center rounded-xl px-4 text-center sm:min-h-[240px] ${PALE[i % PALE.length]}`}>
                  <p className="text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-ink">{s.tile}</p>
                </div>
                <div className="flex flex-col px-3 py-4 sm:px-5">
                  <h3 className="text-[1.2rem] font-normal leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
                  <p className="mt-auto pt-6 text-[13px] text-ink-soft">
                    {s.client} <span className="px-1.5 text-mute">·</span> {s.tag}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Quote between two ornamented rules */}
        <Ornament className="mt-20" />
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl py-14 text-center"
        >
          <blockquote>
            <p className="text-[clamp(1.35rem,1.05rem+1vw,1.9rem)] leading-[1.35] tracking-[-0.015em] text-ink">
              {STORY.quote}
            </p>
          </blockquote>
          <figcaption className="mt-8">
            <span className="block text-[14.5px] font-medium">{STORY.name}</span>
            <span className="mt-1 block text-[13px] text-mute">
              {STORY.role}, {STORY.company}
            </span>
          </figcaption>
        </motion.figure>
        <Ornament />
      </Container>
    </section>
  );
}

/** A thin rule with a small mark at its centre, as Sarvam uses between blocks */
function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className ?? ""}`}>
      <span className="h-px flex-1 bg-line" />
      <span className="size-2 rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#ff1f6b,#8f5cff)]" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
