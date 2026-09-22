"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TEAMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TeamTabs() {
  const [active, setActive] = useState(0);
  const team = TEAMS[active];
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-white/10" role="tablist" aria-label="Dedicated teams">
        {TEAMS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-1 py-3 pr-5 text-left text-[14px] transition-colors",
              i === active ? "border-saffron text-white" : "border-transparent text-white/45 hover:text-white/75",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul
          key={team.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 pt-8 md:grid-cols-3"
          role="tabpanel"
        >
          {team.points.map((p) => (
            <li key={p.title}>
              <h4 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-white">{p.title}</h4>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/55">{p.body}</p>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
