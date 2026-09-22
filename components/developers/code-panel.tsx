"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type Snippet = { id: string; label: string; file: string; lang: "python" | "ts"; code: string };

const KEYWORDS: Record<Snippet["lang"], string[]> = {
  python: ["import", "from", "def", "return", "for", "in", "if", "as", "with", "True", "False", "None"],
  ts: ["import", "from", "export", "async", "function", "const", "await", "return", "if", "new", "type"],
};

/** Tiny, dependency-free highlighter: comments, strings, numbers, keywords. */
function highlight(line: string, lang: Snippet["lang"]) {
  const commentStart = lang === "python" ? line.indexOf("#") : line.indexOf("//");
  const code = commentStart >= 0 ? line.slice(0, commentStart) : line;
  const comment = commentStart >= 0 ? line.slice(commentStart) : "";
  const parts = code.split(/("[^"]*"|'[^']*'|`[^`]*`|\b\d[\d_.]*\b|\b[A-Za-z_]+\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (/^["'`]/.test(p)) return <span key={i} className="text-[#f5b58c]">{p}</span>;
        if (/^\d/.test(p)) return <span key={i} className="text-[#f2d399]">{p}</span>;
        if (KEYWORDS[lang].includes(p)) return <span key={i} className="text-[#b9a9ff]">{p}</span>;
        if (/^[A-Z]/.test(p)) return <span key={i} className="text-[#8fd6c0]">{p}</span>;
        return <span key={i}>{p}</span>;
      })}
      {comment && <span className="text-white/35">{comment}</span>}
    </>
  );
}

export function CodePanel({ snippets }: { snippets: Snippet[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const s = snippets[active];
  const lines = s.code.split("\n");

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#130e28] shadow-[0_40px_80px_-40px_rgba(16,12,32,0.8)]">
      <div className="flex items-center gap-1 border-b border-white/10 px-3 pt-3" role="tablist" aria-label="Code examples">
        {snippets.map((sn, i) => (
          <button
            key={sn.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px rounded-t-lg border-b-2 px-3 py-2 text-[12.5px] transition-colors",
              i === active ? "border-violet-soft text-white" : "border-transparent text-white/45 hover:text-white/75",
            )}
          >
            {sn.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(s.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="mb-2 ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-white/45 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex items-center justify-between px-5 pt-4 text-[11.5px] text-white/35">
        <span className="font-mono">{s.file}</span>
      </div>
      <pre className="overflow-x-auto px-5 pb-6 pt-3 font-mono text-[12.5px] leading-[1.75] text-white/85 sm:text-[13px]">
        <code>
          {lines.map((l, i) => (
            <span key={i} className="grid grid-cols-[2rem_1fr]">
              <span className="select-none text-right pr-4 text-white/20">{i + 1}</span>
              <span className="whitespace-pre">{highlight(l, s.lang)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
