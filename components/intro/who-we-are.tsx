"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------
   Who we are & what we do.
   Left: editorial statement, the story, and the numbers.
   Right: the story as a picture, revealed in sequence on scroll —
     • What we do: the card rises, its four rows slide in one by one
       and their tags pop in
     • What you get: swings in from the right, ticks pop in turn
     • How we work: swings in from the bottom-left, steps pop and the
       connecting lines draw between them
------------------------------------------------------------------- */

const STAT_LABELS = ["Projects delivered", "Years experience", "Client satisfaction"];

type Service = { title: string; body: string; tags: string[] };

const SERVICES: Service[] = [
  { title: "Odoo ERP", body: "Implementation, customisation and integration", tags: ["Sales", "Inventory", "Accounting", "HR"] },
  { title: "Custom software", body: "Web and mobile apps built around your workflows", tags: ["Web apps", "Mobile apps", "Applied AI"] },
  { title: "Dedicated teams", body: "An extension of your own team, in your sprints", tags: ["Consultants", "Engineers", "QA", "DevOps"] },
  { title: "Pre-built platforms", body: "Go live faster, without starting from scratch", tags: ["Ready modules", "Accelerators"] },
];

const OUTCOMES: { label: string; note: string }[] = [
  { label: "Streamlined operations", note: "One system, no re-keying" },
  { label: "Scale efficiently", note: "More branches, same effort" },
  { label: "Drive growth", note: "Decisions on live data" },
];

const STEPS = ["Discover", "Build", "Integrate", "Support"];

const ease = [0.22, 1, 0.36, 1] as const;

// Shared "play once when a third is in view" viewport
const VIEW = { once: true, amount: 0.3 } as const;

const rowList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const row: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease, staggerChildren: 0.05, delayChildren: 0.15 } },
};
const tag: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease } },
};

export function WhoWeAre() {
  const reduce = useReducedMotion();
  const init = reduce ? false : "hidden";

  return (
    <section id="about" className="relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="who-title">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Story */}
          <div className="lg:col-span-5">
            <p className="kicker mb-6">Who we are</p>
            <h2 id="who-title" className="display display-sm">
              Who We Are
              <span className="block bg-[linear-gradient(95deg,#ff1f6b_0%,#c3158a_50%,#6a1fd0_100%)] bg-clip-text pb-[0.12em] text-transparent">
                &amp; What We Do
              </span>
            </h2>
            <div className="mt-7 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              <p>
                QWY Software is a technology partner helping businesses streamline operations, scale efficiently and drive
                growth through smart digital solutions.
              </p>
              <p>
                We deliver end to end, from Odoo ERP implementation, customisation and integration to custom software built
                around your workflows. Our dedicated teams work as an extension of yours, and our pre-built platforms help
                you go live faster without starting from scratch.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <div key={s.label} className="border-t border-ink/15 pt-4">
                  <dt className="sr-only">{STAT_LABELS[i] ?? s.label}</dt>
                  <dd className="display text-[clamp(2.1rem,1.5rem+2vw,3.2rem)] leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-2.5 text-[14px] leading-snug text-ink-soft">{STAT_LABELS[i] ?? s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* What we do, what you get, how we work */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden
              className="absolute -inset-x-8 -inset-y-12 -z-10 bg-[radial-gradient(50%_55%_at_25%_75%,rgba(255,200,165,0.5),transparent_100%),radial-gradient(45%_50%_at_80%_25%,rgba(190,176,245,0.55),transparent_100%)]"
            />
            <div aria-hidden className="grid-faint absolute -inset-6 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />

            <div className="relative mx-auto max-w-[620px] pb-10 pt-4 sm:pb-24 sm:pt-28">
              {/* Main card: rises, then its rows slide in one by one */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.8, ease }}
                className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[var(--shadow-panel)]"
              >
                <div className="border-b border-line px-5 py-3.5">
                  <p className="text-[13.5px] font-semibold">What we do</p>
                </div>
                <motion.ul className="divide-y divide-line" variants={rowList} initial={init} whileInView="show" viewport={VIEW}>
                  {SERVICES.map(({ title, body, tags }, i) => (
                    <motion.li
                      key={title}
                      variants={row}
                      className="flex items-start gap-4 px-5 py-4 transition-colors duration-300 hover:bg-ivory/70"
                    >
                      <span className="tnum w-6 shrink-0 pt-[3px] text-[12px] font-medium text-plum">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold tracking-[-0.01em]">{title}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{body}</p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {tags.map((t) => (
                            <motion.span key={t} variants={tag} className="rounded-md bg-paper px-2 py-0.5 text-[11.5px] text-ink-soft">
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* What you get: swings in from the right, ticks pop in turn */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 60, y: -10, rotate: 4 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.8, ease, delay: 0.55 }}
                className="surface mt-4 rounded-2xl p-4 sm:absolute sm:-right-8 sm:top-0 sm:mt-0 sm:w-[250px]"
              >
                <p className="text-[12px] text-mute">What you get</p>
                <ul className="mt-3 space-y-3">
                  {OUTCOMES.map(({ label, note }, i) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <motion.span
                        initial={reduce ? false : { scale: 0, rotate: -30 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={VIEW}
                        transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.95 + i * 0.15 }}
                        className="mt-[2px] shrink-0"
                      >
                        <Check className="size-3.5 text-plum" strokeWidth={2.25} aria-hidden />
                      </motion.span>
                      <motion.span
                        initial={reduce ? false : { opacity: 0, x: 8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={VIEW}
                        transition={{ duration: 0.45, ease, delay: 1 + i * 0.15 }}
                      >
                        <span className="block text-[13px] font-medium leading-tight">{label}</span>
                        <span className="block text-[11.5px] text-mute">{note}</span>
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* How we work: swings in from the bottom-left, steps pop and the lines draw */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -60, y: 20, rotate: -4 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.8, ease, delay: 0.8 }}
                className="surface mt-4 rounded-2xl p-4 sm:absolute sm:-left-10 sm:bottom-0 sm:mt-0 sm:w-[290px]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-medium">How we work</p>
                  <span className="text-[11.5px] text-mute">One partner, end to end</span>
                </div>
                <ol className="mt-3 flex items-start">
                  {STEPS.map((label, i) => (
                    <li key={label} className="flex flex-1 flex-col items-center gap-1.5 last:flex-none">
                      <div className="flex w-full items-center">
                        <motion.span
                          initial={reduce ? false : { scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={VIEW}
                          transition={{ type: "spring", stiffness: 420, damping: 18, delay: 1.2 + i * 0.25 }}
                          className="tnum grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-white text-[11px] font-medium text-ink"
                        >
                          {i + 1}
                        </motion.span>
                        {i < STEPS.length - 1 && (
                          <motion.span
                            initial={reduce ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={VIEW}
                            transition={{ duration: 0.3, ease: "easeOut", delay: 1.3 + i * 0.25 }}
                            className="h-px flex-1 origin-left bg-line-strong"
                          />
                        )}
                      </div>
                      <motion.span
                        initial={reduce ? false : { opacity: 0, y: 4 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEW}
                        transition={{ duration: 0.35, delay: 1.25 + i * 0.25 }}
                        className="w-full text-[10.5px] text-mute"
                      >
                        {label}
                      </motion.span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
