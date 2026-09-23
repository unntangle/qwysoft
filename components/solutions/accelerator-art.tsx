/* ------------------------------------------------------------------
   Original flat illustrations for the pre-built platform cards:
   a bold solid ground, simple geometric shapes, fine line work and a
   few arrows. QWY's own palette. One per platform, picked by name.
------------------------------------------------------------------- */

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1 L7 4 L1 7" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
}

/** CRM & HRMS: a staircase of pipeline stages, a lead arcing up to "won" */
function Crm() {
  const ground = "#6d4de6";
  const step = "#e6defe";
  const ink = "#241656";
  const steps = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-crm" color={ink} />
      </defs>
      <rect width="400" height="300" fill={ground} />
      {/* faint horizon lines */}
      {[60, 90, 120].map((y) => (
        <path key={y} d={`M0 ${y} H400`} stroke="#8d74f0" strokeWidth="1" />
      ))}
      {steps.map((i) => (
        <rect key={i} x={40 + i * 64} y={230 - (i + 1) * 30} width="60" height={(i + 1) * 30 + 70} rx="6" fill={step} opacity={0.55 + i * 0.1} />
      ))}
      {/* the lead's dotted path, hopping step to step */}
      <path
        d="M70 190 Q 102 150 134 160 Q 166 120 198 130 Q 230 90 262 100 Q 294 60 326 70"
        fill="none"
        stroke={ink}
        strokeWidth="1.4"
        strokeDasharray="3 5"
        markerEnd="url(#a-crm)"
      />
      <circle cx="70" cy="190" r="7" fill={ground} stroke={ink} strokeWidth="1.4" />
      <circle cx="346" cy="58" r="16" fill="#ff5c95" />
      <path d="M339 58 l5 5 l9 -10" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** E-commerce: a fan of product cards inside a big renewal loop */
function Commerce() {
  const ground = "#ff8a65";
  const card = "#fff1ea";
  const ink = "#5a1f10";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-com" color={ink} />
      </defs>
      <rect width="400" height="300" fill={ground} />
      {/* renewal loop */}
      <path d="M318 150 A 118 118 0 1 1 282 67" fill="none" stroke={card} strokeWidth="2" strokeOpacity="0.8" markerEnd="url(#a-com)" />
      <circle cx="200" cy="150" r="96" fill="none" stroke={ink} strokeOpacity="0.25" strokeDasharray="2 6" />
      {/* fanned product cards */}
      {[-16, 0, 16].map((rot, i) => (
        <g key={rot} transform={`rotate(${rot} 200 190)`}>
          <rect x="164" y="92" width="72" height="96" rx="10" fill={card} opacity={i === 1 ? 1 : 0.75} />
          <rect x="174" y="102" width="52" height="46" rx="6" fill={i === 1 ? "#ffc2a8" : "#ffd9c9"} />
          <rect x="174" y="156" width="34" height="5" rx="2.5" fill="#f1a88c" />
          <rect x="174" y="166" width="22" height="5" rx="2.5" fill="#f7c4b0" />
        </g>
      ))}
      {/* tiny coins */}
      {[
        [96, 88],
        [310, 210],
        [120, 232],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#ffd166" stroke={ink} strokeOpacity="0.35" />
      ))}
    </svg>
  );
}

/** Analytics & BI: quarter rings from the corner, points plotted, a trend rising */
function Analytics() {
  const ground = "#62d2bd";
  const ink = "#0e4a41";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-bi" color={ink} />
      </defs>
      <rect width="400" height="300" fill={ground} />
      {[260, 210, 160, 110, 60].map((r, i) => (
        <path key={r} d={`M20 ${280 - r} A ${r} ${r} 0 0 1 ${20 + r} 280`} fill="none" stroke="#e6fbf6" strokeWidth="1.3" strokeOpacity={0.9 - i * 0.1} />
      ))}
      <path d="M20 280 V20 M20 280 H380" stroke={ink} strokeWidth="1.3" />
      {/* bars rising on the right */}
      {[70, 110, 90, 150, 190].map((h, i) => (
        <rect key={i} x={250 + i * 24} y={280 - h} width="14" height={h} rx="3" fill="#e6fbf6" opacity={0.55 + i * 0.1} />
      ))}
      {/* trend */}
      <path d="M40 240 L110 205 L170 215 L230 150 L300 120 L360 60" fill="none" stroke={ink} strokeWidth="1.6" markerEnd="url(#a-bi)" />
      {[
        [110, 205],
        [170, 215],
        [230, 150],
        [300, 120],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill="none" stroke="#e6fbf6" />
          <circle cx={x} cy={y} r="4.5" fill="#e6fbf6" stroke={ink} strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

/** Marketplace: a grid of vendor shopfronts flowing along curves into one hub */
function Marketplace() {
  const ground = "#a98bff";
  const light = "#f1ecff";
  const ink = "#2a1a5e";
  const cells = Array.from({ length: 12 }, (_, i) => ({ x: 34 + (i % 3) * 44, y: 50 + Math.floor(i / 3) * 52 }));
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-mk" color={ink} />
      </defs>
      <rect width="400" height="300" fill={ground} />
      {/* vendor shopfronts */}
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="32" height="36" rx="5" fill={light} opacity={i % 4 === 1 ? 1 : 0.6} />
          <path d={`M${c.x} ${c.y + 10} H${c.x + 32}`} stroke={ground} strokeWidth="1.2" />
        </g>
      ))}
      {/* flows into the hub */}
      <g fill="none" stroke={ink} strokeWidth="1.3">
        <path d="M168 86 C 220 86, 220 150, 262 150" markerEnd="url(#a-mk)" />
        <path d="M168 150 H262" markerEnd="url(#a-mk)" />
        <path d="M168 214 C 220 214, 220 150, 262 150" markerEnd="url(#a-mk)" />
      </g>
      {/* hub */}
      <circle cx="314" cy="150" r="54" fill={light} />
      <circle cx="314" cy="150" r="38" fill="none" stroke={ground} strokeWidth="1.3" strokeDasharray="3 5" />
      <circle cx="314" cy="150" r="16" fill="#ff5c95" />
    </svg>
  );
}

/** Fleet: a winding road with stop pins and a van on its way */
function Fleet() {
  const ground = "#ffd166";
  const road = "#fff4d6";
  const ink = "#7a4a0e";
  const route = "M-10 240 C 70 240, 90 150, 170 150 S 260 60, 330 70 S 420 40, 420 40";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="400" height="300" fill={ground} />
      {/* contour lines */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M-10 ${280 - i * 18} C 100 ${260 - i * 18}, 200 ${300 - i * 18}, 410 ${250 - i * 18}`} fill="none" stroke="#f5bf45" strokeWidth="1.2" />
      ))}
      <path d={route} fill="none" stroke={road} strokeWidth="26" strokeLinecap="round" />
      <path d={route} fill="none" stroke={ink} strokeWidth="1.4" strokeDasharray="8 8" strokeOpacity="0.6" />
      {/* stop pins */}
      {[
        [96, 204],
        [230, 118],
        [342, 66],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y - 28})`}>
          <path d="M0 26 C -10 14, -12 8, -12 2 A 12 12 0 1 1 12 2 C 12 8, 10 14, 0 26 Z" fill="#ff5c95" />
          <circle cx="0" cy="1" r="4.5" fill="#fff" />
        </g>
      ))}
      {/* van */}
      <g transform="translate(150 132)">
        <rect x="0" y="0" width="38" height="22" rx="4" fill="#6d4de6" />
        <path d="M38 6 h8 l6 8 v8 h-14 Z" fill="#8d74f0" />
        <circle cx="10" cy="24" r="4.5" fill={ink} />
        <circle cx="40" cy="24" r="4.5" fill={ink} />
      </g>
    </svg>
  );
}

export function AcceleratorArt({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("crm")) return <Crm />;
  if (n.includes("commerce")) return <Commerce />;
  if (n.includes("analytics")) return <Analytics />;
  if (n.includes("marketplace")) return <Marketplace />;
  return <Fleet />;
}
