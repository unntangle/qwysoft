"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------
   Full-bleed flat illustrations for the Dedicated Teams panel, one per
   discipline, in the same language as the platform and custom-software
   art (bold ground, simple shapes, fine lines), with a subtle animation
   that replays when the tab changes.
------------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

export const TEAM_TONE = [
  { ink: "#1f2366", fill: "#a9b1f6", wash: "#eef0fd", ground: "#6d74e6" }, // Solutions Engineering
  { ink: "#0f4a38", fill: "#96d3b4", wash: "#ebf6f0", ground: "#43b88f" }, // QA
  { ink: "#0f3d5c", fill: "#9fcbe8", wash: "#eaf4fb", ground: "#4b9fd6" }, // DevOps
  { ink: "#2e1a66", fill: "#c3b1ee", wash: "#f3effc", ground: "#8f6fe8" }, // AI / ML
] as const;

type Tone = (typeof TEAM_TONE)[number];

export function TeamGraphic({ index }: { index: number }) {
  const t = TEAM_TONE[index % TEAM_TONE.length];
  if (index === 0) return <Stack t={t} />;
  if (index === 1) return <Checks t={t} />;
  if (index === 2) return <Pipeline t={t} />;
  return <Forecast t={t} />;
}

const svgProps = {
  // Framed for the 380px-tall card: trims empty ground above and below the artwork
  viewBox: "0 35 560 370",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
} as const;

function Grid({ color }: { color: string }) {
  return (
    <g stroke={color} strokeWidth="1">
      {[70, 140, 210, 280, 350, 420, 490].map((x) => (
        <path key={`v${x}`} d={`M${x} 0 V440`} />
      ))}
      {[70, 140, 210, 280, 350].map((y) => (
        <path key={`h${y}`} d={`M0 ${y} H560`} />
      ))}
    </g>
  );
}

/** Solutions Engineering: frontend, API and database slabs, a request dropping through */
function Stack({ t }: { t: Tone }) {
  const slabs = [
    { y: 110, label: "Frontend" },
    { y: 190, label: "API" },
    { y: 270, label: "Database" },
  ];
  return (
    <svg {...svgProps}>
      <rect width="560" height="440" fill={t.ground} />
      <Grid color="#8a90ee" />
      {slabs.map((s, i) => (
        <motion.g
          key={s.label}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.6, ease }}
        >
          <rect x={130 + i * 10} y={s.y} width={300 - i * 20} height="60" rx="14" fill={t.wash} opacity={1 - i * 0.12} />
          <text x={158 + i * 10} y={s.y + 36} fontSize="16" fill={t.ink} fontFamily="inherit">
            {s.label}
          </text>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={330 - i * 10 + k * 22} y={s.y + 24} width="14" height="12" rx="3" fill={t.fill} />
          ))}
        </motion.g>
      ))}
      {/* request line and travelling dot */}
      <path d="M100 80 V360" stroke={t.wash} strokeWidth="1.4" strokeDasharray="4 6" />
      <motion.circle
        cx="100"
        r="8"
        fill="#ff5c95"
        initial={{ cy: 80, opacity: 0 }}
        animate={{ cy: [80, 360], opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.6, duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
      />
      <circle cx="470" cy="110" r="34" fill="#ff5c95" />
      <text x="470" y="115" fontSize="14" textAnchor="middle" fill="#fff" fontFamily="inherit">
        180 ms
      </text>
    </svg>
  );
}

/** QA: a test board whose checks draw in one by one, with a magnifier */
function Checks({ t }: { t: Tone }) {
  const rows = [120, 180, 240, 300];
  return (
    <svg {...svgProps}>
      <rect width="560" height="440" fill={t.ground} />
      <Grid color="#63c7a3" />
      <rect x="120" y="80" width="300" height="290" rx="18" fill={t.wash} />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="150" y={y - 16} width="32" height="32" rx="9" fill="#fff" stroke={t.fill} strokeWidth="1.5" />
          <motion.path
            d={`M158 ${y} l6 6 l12 -13`}
            fill="none"
            stroke={t.ink}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.35 }}
          />
          <rect x="198" y={y - 8} width={[170, 140, 160, 120][i]} height="10" rx="5" fill={t.fill} />
          <rect x="198" y={y + 8} width={[90, 110, 70, 100][i]} height="7" rx="3.5" fill={t.fill} opacity="0.5" />
        </g>
      ))}
      {/* magnifier */}
      <motion.g
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <circle cx="430" cy="300" r="46" fill="none" stroke="#fff" strokeWidth="10" />
        <circle cx="430" cy="300" r="46" fill="#ffffff" fillOpacity="0.18" />
        <path d="M463 333 L505 375" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

/** DevOps: Build → Test → Deploy → Monitor nodes along a flowing pipe into the cloud */
function Pipeline({ t }: { t: Tone }) {
  const nodes = [
    { x: 90, y: 300 },
    { x: 200, y: 230 },
    { x: 310, y: 270 },
    { x: 410, y: 190 },
  ];
  const d = "M90 300 C 140 300, 150 230, 200 230 S 270 270, 310 270 S 370 190, 410 190 S 470 130, 470 130";
  return (
    <svg {...svgProps}>
      <rect width="560" height="440" fill={t.ground} />
      <Grid color="#6fb3e0" />
      {/* cloud */}
      <g fill={t.wash}>
        <circle cx="440" cy="120" r="44" />
        <circle cx="490" cy="130" r="36" />
        <circle cx="400" cy="140" r="30" />
        <rect x="400" y="130" width="126" height="40" rx="20" />
      </g>
      <path d={d} fill="none" stroke={t.wash} strokeWidth="16" strokeLinecap="round" opacity="0.5" />
      <path d={d} fill="none" stroke={t.ink} strokeWidth="2" strokeDasharray="6 4" className="animate-flow" />
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.3, type: "spring", stiffness: 260, damping: 16 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="22" fill="#fff" />
          <circle cx={n.x} cy={n.y} r="10" fill={i === 3 ? "#ff5c95" : t.ground} />
        </motion.g>
      ))}
      <motion.circle
        cx="410"
        cy="190"
        r="22"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ delay: 1.4, duration: 1.6, repeat: Infinity }}
        style={{ transformOrigin: "410px 190px" }}
      />
    </svg>
  );
}

/** AI / ML: actuals draw in, then a dashed forecast with a confidence band */
function Forecast({ t }: { t: Tone }) {
  return (
    <svg {...svgProps}>
      <rect width="560" height="440" fill={t.ground} />
      <Grid color="#a78ef0" />
      {/* bars of history */}
      {[150, 190, 170, 220, 205, 240].map((h, i) => (
        <rect key={i} x={70 + i * 36} y={380 - h} width="22" height={h} rx="5" fill={t.wash} opacity={0.35 + i * 0.07} />
      ))}
      {/* confidence band */}
      <motion.path
        d="M290 150 C 340 130, 400 100, 500 70 L 500 190 C 400 200, 340 196, 290 176 Z"
        fill={t.wash}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      />
      {/* actuals */}
      <motion.path
        d="M60 260 C 110 240, 150 250, 190 214 S 250 180, 290 162"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {/* forecast */}
      <motion.path
        d="M290 162 C 340 150, 400 136, 500 128"
        fill="none"
        stroke="#ff5c95"
        strokeWidth="3"
        strokeDasharray="8 8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 0.9, ease: "easeInOut" }}
      />
      <motion.circle
        cx="290"
        cy="162"
        r="9"
        fill="#fff"
        stroke={t.ink}
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 400, damping: 16 }}
        style={{ transformOrigin: "290px 162px" }}
      />
      <path d="M290 60 V380" stroke="#fff" strokeOpacity="0.5" strokeDasharray="3 6" />
    </svg>
  );
}
