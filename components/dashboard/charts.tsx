"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { cn, scaleSeries, smoothPath } from "@/lib/utils";

/* ------------------------------------------------------------------
   Lightweight SVG charts. No chart library: every chart on the page
   costs a few hundred bytes and animates on the compositor.
------------------------------------------------------------------- */

/** Serializable number format, so server components can configure charts. */
export type Fmt = { prefix?: string; suffix?: string; decimals?: number };
const fmt = (v: number, f?: Fmt) =>
  `${f?.prefix ?? ""}${v.toLocaleString("en-IN", { minimumFractionDigits: f?.decimals ?? 0, maximumFractionDigits: f?.decimals ?? 0 })}${f?.suffix ?? ""}`;

export type Series = {
  name: string;
  values: (number | null)[];
  color: string;
  dashed?: boolean;
  area?: boolean;
};

export function LineChart({
  series,
  labels,
  height = 220,
  width = 640,
  min,
  max,
  tone = "light",
  format,
  className,
  gridLines = 4,
  showAxis = true,
  band,
}: {
  series: Series[];
  labels: string[];
  height?: number;
  width?: number;
  min?: number;
  max?: number;
  tone?: "light" | "dark";
  format?: Fmt;
  className?: string;
  gridLines?: number;
  showAxis?: boolean;
  /** Optional shaded confidence band: [lower[], upper[]] */
  band?: { lower: (number | null)[]; upper: (number | null)[]; color: string };
}) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  const padX = 8;
  const padTop = 14;
  const padBottom = showAxis ? 26 : 8;
  const plotH = height - padTop - padBottom;

  const all = [
    ...series.flatMap((s) => s.values.filter((v): v is number => v != null)),
    ...(band ? [...band.lower, ...band.upper].filter((v): v is number => v != null) : []),
  ];
  const lo = min ?? Math.min(...all);
  const hi = max ?? Math.max(...all);
  const n = labels.length;
  const stepX = (width - padX * 2) / Math.max(n - 1, 1);
  const x = (i: number) => padX + i * stepX;
  const y = (v: number) => padTop + (1 - (v - lo) / (hi - lo || 1)) * plotH;

  const toPts = (vals: (number | null)[]) =>
    vals.map((v, i) => (v == null ? null : { x: x(i), y: y(v) })).filter(Boolean) as { x: number; y: number }[];

  const grid = Array.from({ length: gridLines + 1 }, (_, i) => padTop + (plotH / gridLines) * i);
  const gridColor = tone === "dark" ? "rgba(220,212,248,0.09)" : "rgba(90,45,140,0.08)";
  const labelColor = tone === "dark" ? "rgba(255,255,255,0.45)" : "#8a8499";

  let bandPath = "";
  if (band) {
    const up = toPts(band.upper);
    const low = toPts(band.lower).reverse();
    if (up.length && low.length) {
      bandPath = `M ${up.map((p) => `${p.x},${p.y}`).join(" L ")} L ${low.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
    }
  }

  const animateDraw = inView || reduce;

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label={series.map((s) => s.name).join(" vs ")}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * width;
          const i = Math.round((px - padX) / stepX);
          setHover(Math.max(0, Math.min(n - 1, i)));
        }}
      >
        <defs>
          {series.map((s, si) => (
            <linearGradient key={si} id={`${id}-a${si}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity={tone === "dark" ? 0.35 : 0.22} />
              <stop offset="1" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {grid.map((gy, i) => (
          <line key={i} x1={0} x2={width} y1={gy} y2={gy} stroke={gridColor} strokeDasharray={i === gridLines ? "0" : "2 4"} />
        ))}

        {bandPath && (
          <motion.path
            d={bandPath}
            fill={band!.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: animateDraw ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        )}

        {series.map((s, si) => {
          const pts = toPts(s.values);
          const d = smoothPath(pts);
          const last = pts[pts.length - 1];
          const first = pts[0];
          return (
            <g key={si}>
              {s.area && last && (
                <motion.path
                  d={`${d} L ${last.x},${padTop + plotH} L ${first.x},${padTop + plotH} Z`}
                  fill={`url(#${id}-a${si})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animateDraw ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + si * 0.2 }}
                />
              )}
              <motion.path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={s.dashed ? 1.75 : 2.25}
                strokeLinecap="round"
                strokeDasharray={s.dashed ? "5 6" : undefined}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={animateDraw ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: si * 0.25 }}
              />
            </g>
          );
        })}

        {showAxis &&
          labels.map((l, i) =>
            i % Math.ceil(n / 7) === 0 || i === n - 1 ? (
              <text key={i} x={x(i)} y={height - 6} fontSize="11" fill={labelColor} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>
                {l}
              </text>
            ) : null,
          )}

        {hover != null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={padTop} y2={padTop + plotH} stroke={tone === "dark" ? "rgba(255,255,255,0.25)" : "rgba(23,19,31,0.18)"} />
            {series.map((s, si) => {
              const v = s.values[hover];
              return v == null ? null : (
                <circle key={si} cx={x(hover)} cy={y(v)} r={4} fill={tone === "dark" ? "#171131" : "#fff"} stroke={s.color} strokeWidth={2} />
              );
            })}
          </g>
        )}
      </svg>

      {hover != null && (
        <div
          className={cn(
            "pointer-events-none absolute top-1 z-10 min-w-[150px] rounded-lg px-3 py-2 text-xs shadow-lg",
            tone === "dark" ? "bg-[#221a45] text-white ring-1 ring-white/10" : "bg-ink text-white",
          )}
          style={{
            left: `${(x(hover) / width) * 100}%`,
            transform: `translateX(${hover > n / 2 ? "calc(-100% - 12px)" : "12px"})`,
          }}
        >
          <p className="mb-1 text-white/55">{labels[hover]}</p>
          {series.map((s, si) => {
            const v = s.values[hover];
            return v == null ? null : (
              <p key={si} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-white/75">
                  <span className="size-1.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="tnum font-medium">{fmt(v, format)}</span>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Static micro trend line for KPI tiles. */
export function Sparkline({
  values,
  color = "#7357e8",
  width = 96,
  height = 28,
  className,
  fill = true,
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const pts = scaleSeries(values, { width, height, padY: 3 });
  const d = smoothPath(pts);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-s`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${d} L ${width},${height} L 0,${height} Z`} fill={`url(#${id}-s)`} />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Vertical bars that grow in when visible. */
export function Bars({
  values,
  labels,
  highlight,
  color = "#dcd4f8",
  highlightColor = "#7357e8",
  height = 140,
  tone = "light",
  format,
  className,
}: {
  values: number[];
  labels?: string[];
  highlight?: number;
  color?: string;
  highlightColor?: string;
  height?: number;
  tone?: "light" | "dark";
  format?: Fmt;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const max = Math.max(...values);
  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="flex items-end gap-[6%]" style={{ height }}>
        {values.map((v, i) => (
          <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
            <span
              className={cn(
                "pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100 tnum",
                tone === "dark" ? "bg-white text-ink" : "bg-ink text-white",
              )}
            >
              {fmt(v, format)}
            </span>
            <motion.div
              className="w-full origin-bottom rounded-t-[5px]"
              style={{ height: `${(v / max) * 100}%`, background: i === highlight ? highlightColor : color }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={inView || reduce ? { scaleY: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex gap-[6%]">
          {labels.map((l, i) => (
            <span key={i} className={cn("flex-1 truncate text-center text-[11px]", tone === "dark" ? "text-white/45" : "text-mute")}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
