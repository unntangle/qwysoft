"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Gently pulls its child towards the cursor, springing back on leave.
 * The hit area is a little larger than the child, so the pull starts just
 * before you reach it. Mouse only; off for reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 240, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 240, damping: 16, mass: 0.4 });
  return (
    <div
      ref={ref}
      className={`-m-3 p-3 ${className ?? ""}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
