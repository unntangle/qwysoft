"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  Bug,
  ClipboardList,
  Cloud,
  CloudCog,
  Code2,
  Cog,
  Database,
  Eye,
  FileCheck,
  Gauge,
  Layers,
  Lock,
  Network,
  Play,
  Plug,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { TEAM_TONE, TeamGraphic } from "@/components/teams/team-graphics";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Dedicated technology teams.
   Four disciplines as tabs, shown in one white card (Sarvam-style):
   a soft blue-violet poster panel with the discipline in large white
   type and its roles as frosted chips, and the three things the team
   delivers alongside. Tabs auto-advance while the section is on screen
   and pause on hover.
------------------------------------------------------------------- */

type Team = {
  tab: string;
  core: LucideIcon;
  nodes: { icon: LucideIcon; label: string }[];
  items: { title: string; body: string }[];
};

const TEAMS: Team[] = [
  {
    tab: "Solutions Engineering",
    core: Code2,
    nodes: [
      { icon: Layers, label: "Frontend" },
      { icon: Server, label: "Backend" },
      { icon: Plug, label: "APIs" },
      { icon: Network, label: "Architecture" },
      { icon: Gauge, label: "Performance" },
      { icon: ShieldCheck, label: "Security" },
    ],
    items: [
      {
        title: "Frontend & Backend Development",
        body: "End-to-end application development: intuitive frontends on robust backends, delivering secure, scalable and high-performing software.",
      },
      {
        title: "Scalable Architecture",
        body: "Flexible system architectures that support growing user demand, seamless integrations and long-term business scalability.",
      },
      {
        title: "Performance Optimization",
        body: "Faster, more stable applications through code optimisation, infrastructure tuning and continuous performance monitoring.",
      },
    ],
  },
  {
    tab: "QA - Manual & Automation",
    core: BadgeCheck,
    nodes: [
      { icon: ClipboardList, label: "Test management" },
      { icon: Play, label: "Test execution" },
      { icon: Bug, label: "Bug tracking" },
      { icon: Activity, label: "Reporting" },
      { icon: FileCheck, label: "Test cases" },
      { icon: Lock, label: "Security testing" },
    ],
    items: [
      {
        title: "Manual & Automation Testing",
        body: "Manual validation and automated test scripts together, for software that is reliable, accurate and consistent.",
      },
      {
        title: "Regression & Load Testing",
        body: "Regression and load testing that verifies stability, finds performance bottlenecks and keeps apps fast under real workloads.",
      },
      {
        title: "CI Testing Integration",
        body: "Testing built into your CI pipelines for continuous quality checks, faster releases and fewer surprises in production.",
      },
    ],
  },
  {
    tab: "DevOps & Cloud Management",
    core: CloudCog,
    nodes: [
      { icon: Code2, label: "Development" },
      { icon: Cog, label: "Automation" },
      { icon: Eye, label: "Monitoring" },
      { icon: Cloud, label: "Cloud" },
      { icon: Rocket, label: "Deployment" },
      { icon: Lock, label: "Security" },
    ],
    items: [
      {
        title: "CI/CD Pipelines",
        body: "Automated build, test and deployment pipelines for faster releases, consistent delivery and more efficient development.",
      },
      {
        title: "AWS, GCP, Azure",
        body: "Cloud infrastructure set up and managed across AWS, Google Cloud and Microsoft Azure: scalable, secure and highly available.",
      },
      {
        title: "Monitoring & Security",
        body: "Continuous monitoring and strong security practices that keep systems stable, catch issues early and protect business data.",
      },
    ],
  },
  {
    tab: "AI / ML Engineering Resources",
    core: BrainCircuit,
    nodes: [
      { icon: Database, label: "Data pipelines" },
      { icon: Sparkles, label: "ML models" },
      { icon: TrendingUp, label: "Forecasting" },
      { icon: Activity, label: "Analytics" },
      { icon: Workflow, label: "Automation" },
      { icon: Search, label: "Smart search" },
    ],
    items: [
      {
        title: "Machine Learning Models",
        body: "Models that learn from your data patterns to power predictive insights and smarter business decisions.",
      },
      {
        title: "Data Analytics",
        body: "Analytics that turn raw business data into clear insight for planning, forecasting and day-to-day efficiency.",
      },
      {
        title: "AI Automation",
        body: "AI-driven automation that takes over repetitive processes, speeds up workflows and lifts overall productivity.",
      },
    ],
  },
];

const CYCLE_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

const listV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const itemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function DedicatedTeams() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const team = TEAMS[active];

  // Auto-advance: one progress value drives both the tab underline and the switch
  const progress = useMotionValue(0);
  const running = !reduce && !paused && inView;
  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + Math.min(delta, 100) / CYCLE_MS;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % TEAMS.length);
    } else progress.set(next);
  });
  useEffect(() => {
    progress.set(0);
  }, [active, progress]);

  return (
    <section id="teams" className="relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="teams-title">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="kicker mb-6">Dedicated technology teams</p>
          <h2 id="teams-title" className="display display-sm mx-auto lg:whitespace-nowrap">
            Teams That Work as <Grad>an Extension of Yours.</Grad>
          </h2>
          <p className="lede mx-auto mt-5 lg:whitespace-nowrap">
            Engineers, QA, DevOps and AI specialists who work in your sprints.
          </p>
        </motion.div>

        <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-12">
          {/* Tabs: a segmented pill control; the white pill slides to the active tab */}
          <div className="flex overflow-x-auto [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
            <div role="tablist" aria-label="Team disciplines" className="inline-flex shrink-0 gap-1 rounded-full bg-[#efeef1] p-1">
              {TEAMS.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.tab}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="teams-panel"
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-[14.5px] transition-colors duration-300",
                      on ? "font-medium text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="team-pill"
                        aria-hidden
                        className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-[0_2px_8px_-2px_rgba(23,19,31,0.18)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      >
                        {/* faint auto-advance progress inside the active pill */}
                        <motion.span
                          className="absolute inset-x-5 bottom-1 h-[2px] origin-left rounded-full"
                          style={{ scaleX: reduce ? 0 : progress, background: TEAM_TONE[active].fill, opacity: 0.7 }}
                        />
                      </motion.span>
                    )}
                    <span className="relative">{t.tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* One white card: poster panel + what the team delivers */}
          <motion.div
            id="teams-panel"
            role="tabpanel"
            aria-live="polite"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="mt-8 rounded-2xl border border-line bg-white p-2"
          >
            <div className="grid gap-2 lg:h-[380px] lg:grid-cols-[0.9fr_1.1fr]">
              {/* Full-bleed illustration for this discipline */}
              <div className="relative min-h-[300px] overflow-hidden rounded-xl lg:min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0"
                  >
                    <TeamGraphic index={active} />
                    <p className="absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[92%] rounded-full bg-white/85 px-4 py-1.5 text-center text-[12px] text-ink-soft backdrop-blur">
                      {team.nodes.map((n) => n.label).join("  ·  ")}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* What the team delivers */}
              <div className="px-4 py-5 sm:px-6 lg:py-6">
                <AnimatePresence mode="wait">
                  <motion.ol
                    key={active}
                    variants={listV}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="flex h-full flex-col justify-between gap-4"
                  >
                    {team.items.map((it, i) => (
                      <motion.li key={it.title} variants={itemV} className={cn(i > 0 && "border-t border-line pt-4")}>
                        <h3 className="text-[1.05rem] font-medium tracking-[-0.015em]">{it.title}</h3>
                        <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">{it.body}</p>
                      </motion.li>
                    ))}
                  </motion.ol>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
