/* ------------------------------------------------------------------
   Original flat illustrations for the Custom Software Solutions cards,
   in the same language as the pre-built platform art: a bold solid
   ground, simple geometric shapes, fine line work and a few arrows.
   Web: periwinkle · Mobile: apricot · AI: rose.
------------------------------------------------------------------- */

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1 L7 4 L1 7" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
}

/** Web: a stack of browser windows, layout blocks, a chart and a click */
function Web() {
  const ground = "#6d74e6";
  const light = "#eef0fd";
  const ink = "#1f2366";
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="480" height="300" fill={ground} />
      {[40, 80, 120, 160, 200, 240].map((y) => (
        <path key={y} d={`M0 ${y} H480`} stroke="#8a90ee" strokeWidth="1" />
      ))}
      {/* back windows */}
      <rect x="150" y="40" width="240" height="160" rx="10" fill={light} opacity="0.35" />
      <rect x="120" y="60" width="240" height="160" rx="10" fill={light} opacity="0.6" />
      {/* front window */}
      <g>
        <rect x="90" y="80" width="250" height="170" rx="10" fill={light} />
        <path d="M90 102 H340" stroke="#c9cdf8" />
        {[104, 114, 124].map((x) => (
          <circle key={x} cx={x} cy="91" r="3.5" fill="#c9cdf8" />
        ))}
        <rect x="104" y="116" width="70" height="120" rx="6" fill="#dfe2fb" />
        {[128, 144, 160, 176].map((y) => (
          <rect key={y} x="114" y={y} width="44" height="6" rx="3" fill="#b9bef5" />
        ))}
        <rect x="186" y="116" width="140" height="70" rx="6" fill="#dfe2fb" />
        <path d="M198 172 L226 152 L252 160 L282 134 L312 128" fill="none" stroke={ground} strokeWidth="2.2" strokeLinecap="round" />
        <rect x="186" y="196" width="66" height="40" rx="6" fill="#dfe2fb" />
        <rect x="260" y="196" width="66" height="40" rx="6" fill="#ff5c95" />
      </g>
      {/* cursor clicking the button */}
      <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
        <path d="M300 190 v-8 M312 194 l6 -6 M290 194 l-6 -6" />
      </g>
      <path d="M304 212 L304 246 L312 238 L318 250 L324 247 L318 235 L329 235 Z" fill={ink} />
    </svg>
  );
}

/** Mobile: two phones, one sending to the other, with sync arrows */
function Mobile() {
  const ground = "#ff9a62";
  const light = "#fff3ea";
  const ink = "#5a2410";
  const phone = (x: number, y: number, tilt: number, accent: string) => (
    <g transform={`rotate(${tilt} ${x + 45} ${y + 85})`}>
      <rect x={x} y={y} width="90" height="170" rx="16" fill={light} />
      <rect x={x + 8} y={y + 14} width="74" height="142" rx="10" fill="#ffe0cc" />
      <rect x={x + 32} y={y + 5} width="26" height="4" rx="2" fill="#f5c3a6" />
      <rect x={x + 16} y={y + 26} width="58" height="42" rx="6" fill={accent} />
      {[80, 94, 108].map((dy) => (
        <rect key={dy} x={x + 16} y={y + dy} width={dy === 108 ? 34 : 58} height="7" rx="3.5" fill="#f5c3a6" />
      ))}
      <rect x={x + 16} y={y + 128} width="58" height="18" rx="9" fill={ink} opacity="0.85" />
    </g>
  );
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-mob" color={ink} />
      </defs>
      <rect width="480" height="300" fill={ground} />
      {/* signal arcs */}
      {[40, 64, 88].map((r) => (
        <path key={r} d={`M${240 - r} 70 A ${r} ${r} 0 0 1 ${240 + r} 70`} fill="none" stroke={light} strokeWidth="1.4" strokeOpacity="0.7" />
      ))}
      <circle cx="240" cy="70" r="6" fill={light} />
      {phone(88, 80, -8, "#ffb38a")}
      {phone(302, 70, 8, "#6d74e6")}
      {/* sync arrows */}
      <g fill="none" stroke={ink} strokeWidth="1.5">
        <path d="M200 170 C 230 150, 260 150, 290 170" markerEnd="url(#a-mob)" />
        <path d="M290 200 C 260 220, 230 220, 200 200" markerEnd="url(#a-mob)" />
      </g>
    </svg>
  );
}

/** AI: a constellation of data points feeding one insight, a forecast emerging */
function Ai() {
  const ground = "#e65a9a";
  const light = "#fdeaf2";
  const ink = "#4a0d2c";
  const nodes = [
    [70, 70],
    [60, 150],
    [80, 230],
    [140, 110],
    [150, 200],
  ];
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <Arrow id="a-ai" color={ink} />
      </defs>
      <rect width="480" height="300" fill={ground} />
      {/* soft rings behind the insight */}
      {[110, 84, 60].map((r) => (
        <circle key={r} cx="250" cy="150" r={r} fill="none" stroke={light} strokeOpacity="0.5" />
      ))}
      {/* data points wired into the insight */}
      <g stroke={light} strokeWidth="1.2" strokeOpacity="0.85">
        {nodes.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} L250 150`} />
        ))}
        <path d="M70 70 L140 110 L60 150 L150 200 L80 230" fill="none" strokeDasharray="3 5" />
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 7 : 10} fill={light} />
      ))}
      {/* the insight */}
      <circle cx="250" cy="150" r="40" fill={light} />
      <path d="M250 128 c1.5 11 7 16.5 18 18 -11 1.5 -16.5 7 -18 18 -1.5 -11 -7 -16.5 -18 -18 11 -1.5 16.5 -7 18 -18Z" fill={ground} />
      {/* forecast emerging */}
      <path d="M296 170 L340 150 L372 158 L420 110" fill="none" stroke={ink} strokeWidth="1.8" markerEnd="url(#a-ai)" />
      <path d="M340 150 L372 158 L420 110 L420 190 L372 200 L340 190 Z" fill={light} opacity="0.35" />
      {[
        [340, 150],
        [372, 158],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={light} stroke={ink} strokeWidth="1.2" />
      ))}
    </svg>
  );
}

export function CapabilityArt({ index }: { index: number }) {
  if (index === 0) return <Web />;
  if (index === 1) return <Mobile />;
  return <Ai />;
}
