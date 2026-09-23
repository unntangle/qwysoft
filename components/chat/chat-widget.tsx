"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ACCELERATORS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   QWY AI assistant, laid out like "Ask AWS" in QWY's brand colours:
   - a dark rounded-square launcher bottom-right
   - a panel whose gradient header (logo purple → magenta) carries the
     title, an "AI" badge, a short intro and the question box
   - "Want help getting started?" with gradient-bordered intent buttons
   - once the chat starts, the header slims down and the input moves
     to the bottom like a normal conversation
   Answers come from /api/chat (Claude) when ANTHROPIC_API_KEY is set;
   otherwise from the built-in answers below, drawn from the site copy.
------------------------------------------------------------------- */

type Action = { label: string; href: string };
type Msg = { role: "user" | "assistant"; content: string; actions?: Action[] };

const INTENTS = [
  "I want to learn about Odoo ERP services",
  "I need a custom web or mobile app",
  "I'm looking for a dedicated tech team",
  "I'd like to talk to the team",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm the QWY assistant. Ask me about Odoo ERP, custom software, AI, dedicated teams or our pre-built platforms.",
};

const HEADER_BG = "bg-[linear-gradient(120deg,#33055f_0%,#5a0aa6_45%,#8f14a0_75%,#c3158a_100%)]";
const ease = [0.22, 1, 0.36, 1] as const;

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const started = messages.some((m) => m.role === "user");

  // Keep the newest message in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, busy, reduce]);

  // Focus the input on open; Esc closes
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setBusy(true);

    let reply: Msg | null = null;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.reply) reply = { role: "assistant", content: data.reply, actions: actionsFor(q) };
      }
    } catch {
      /* fall through to the built-in answers */
    }
    if (!reply) {
      await new Promise((r) => setTimeout(r, 650)); // a natural beat before answering
      reply = localReply(q);
    }
    setMessages((m) => [...m, reply!]);
    setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const inputBox = (dark: boolean) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send(input);
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl bg-white py-1.5 pl-4 pr-1.5 transition-shadow",
        dark ? "shadow-[0_8px_20px_-12px_rgba(20,0,40,0.6)]" : "border border-line focus-within:border-[#c9b3f0]",
      )}
    >
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={started ? "Ask a follow-up…" : "Ask a question"}
        aria-label="Message"
        maxLength={500}
        className="min-w-0 flex-1 bg-transparent py-1.5 text-[14.5px] text-ink outline-none placeholder:text-mute"
      />
      <button
        type="submit"
        disabled={!input.trim() || busy}
        aria-label="Send"
        className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-[linear-gradient(135deg,#5a0aa6,#c3158a)] text-white transition-opacity disabled:cursor-default disabled:bg-none disabled:bg-[#c9c6cf]"
      >
        <ArrowRight className="size-4" strokeWidth={2.2} aria-hidden />
      </button>
    </form>
  );

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask QWY"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            style={{ transformOrigin: "100% 100%" }}
            className="flex h-[min(620px,calc(100vh-7.5rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-30px_rgba(40,10,90,0.45),0_12px_24px_-12px_rgba(40,10,90,0.18)]"
          >
            {/* Header: large with the question box before the chat starts, slim after */}
            <div className={cn("relative overflow-hidden text-white", HEADER_BG, started ? "px-5 py-4" : "rounded-b-2xl px-5 pb-5 pt-5")}>
              <div
                aria-hidden
                className="absolute -right-12 -top-16 size-52 rounded-full bg-[radial-gradient(closest-side,rgba(255,31,107,0.35),transparent)]"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimise chat"
                className={cn(
                  "absolute right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-lg text-white/85 transition-colors hover:bg-white/15 hover:text-white",
                  started ? "top-1/2 -translate-y-1/2" : "top-3",
                )}
              >
                <Minus className="size-5" strokeWidth={2.4} aria-hidden />
              </button>

              <div className="relative pr-10">
                <p className="flex items-center gap-2.5">
                  <span className={cn("font-semibold tracking-[-0.01em]", started ? "text-[17px]" : "text-[20px]")}>Ask QWY</span>
                  <span className="rounded-md border border-white/70 bg-white px-1.5 py-0.5 text-[11px] font-semibold leading-none text-[#5a0aa6]">
                    AI
                  </span>
                </p>
                {!started && (
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/80">
                    Quick guidance on Odoo ERP, custom software and AI.
                  </p>
                )}
              </div>
              {!started && <div className="relative mt-4">{inputBox(true)}</div>}
            </div>

            {/* Body */}
            {!started ? (
              <div className="flex-1 overflow-y-auto px-6 pb-4 pt-6">
                <p className="text-[15.5px] font-medium text-ink">Want help getting started?</p>
                <p className="mt-1.5 text-[14.5px] text-ink-soft">Tell us a little bit about what you&rsquo;re looking for.</p>
                <ul className="mt-4 flex flex-col items-start gap-2">
                  {INTENTS.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease }}
                    >
                      <button
                        type="button"
                        onClick={() => send(t)}
                        className="cursor-pointer rounded-full border border-[#e6dcf2] bg-[#faf7fd] px-3.5 py-1.5 text-left text-[13px] text-ink-soft transition-colors duration-200 hover:border-[#cdb6ee] hover:bg-[#f4edfc] hover:text-[#5a0aa6]"
                      >
                        {t}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#faf9fc] px-4 py-5" aria-live="polite">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] whitespace-pre-line px-4 py-2.5 text-[14px] leading-relaxed",
                        m.role === "user"
                          ? "rounded-2xl rounded-br-md bg-[linear-gradient(135deg,#5a0aa6,#8f14a0)] text-white"
                          : "rounded-2xl rounded-bl-md border border-line bg-white text-ink",
                      )}
                    >
                      {m.content}
                    </div>
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.actions.map((a) => (
                          <a
                            key={a.label}
                            href={a.href}
                            onClick={() => a.href.startsWith("#") && setOpen(false)}
                            className="rounded-lg bg-[linear-gradient(95deg,#5a0aa6,#c3158a)] p-px text-[12.5px] font-medium"
                          >
                            <span className="block rounded-[7px] bg-white px-3 py-1.5 text-[#5a0aa6] transition-colors hover:bg-[#f6effd]">
                              {a.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {busy && (
                  <div className="flex items-start">
                    <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3.5" aria-label="Assistant is typing">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="size-1.5 rounded-full bg-[#8f14a0]"
                          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-line bg-white px-4 pb-3 pt-3">
              {started && <div className="mb-2.5">{inputBox(false)}</div>}
              <p className="text-center text-[12px] text-ink-soft">
                By chatting, you agree to our{" "}
                <a href="/privacy" className="font-medium text-[#8f14a0] hover:underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open chat with QWY assistant"}
          aria-expanded={open}
          className="relative grid size-14 cursor-pointer place-items-center rounded-2xl bg-[#17213a] text-white shadow-[0_14px_28px_-12px_rgba(23,33,58,0.6)] transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#1f2b4a]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "s"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {open ? (
                <X className="size-5" aria-hidden />
              ) : (
                // Chat bubble with "AI" written inside it
                <span className="relative block size-7" aria-hidden>
                  <MessageSquare className="size-7" strokeWidth={1.6} />
                  <span className="absolute inset-x-0 top-[29%] text-center text-[8.5px] font-bold leading-none tracking-[0.02em]">AI</span>
                </span>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

/* ---------- Built-in answers (used when the AI endpoint isn't configured) ---------- */

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

const CONSULT: Action = { label: "Get a free consultation", href: "#contact" };

function actionsFor(text: string): Action[] {
  const q = text.toLowerCase();
  if (has(q, ["odoo", "erp"])) return [{ label: "See Odoo services", href: "#solutions" }, CONSULT];
  if (has(q, ["platform", "accelerator", "fleet", "e-commerce", "ecommerce", "crm", "hrms", "marketplace", "go live"]))
    return [{ label: "See pre-built platforms", href: "#accelerators" }, CONSULT];
  if (has(q, ["team", "hire", "developer", "engineer", "qa", "devops"])) return [{ label: "See dedicated teams", href: "#teams" }, CONSULT];
  if (/\b(app|apps|web|mobile|ai|ml)\b/.test(q) || has(q, ["custom", "machine learning"])) return [{ label: "See custom software", href: "#capabilities" }, CONSULT];
  return [CONSULT];
}

function localReply(text: string): Msg {
  const q = text.toLowerCase();

  if (has(q, ["talk", "contact", "call", "phone", "email", "reach", "speak", "whatsapp", "team"]) && !has(q, ["dedicated", "hire", "tech team"])) {
    return {
      role: "assistant",
      content: `You can reach the team at ${SITE.email} or ${SITE.phone}. We're also on WhatsApp, and a free consultation is a great place to start.`,
      actions: [
        { label: "Call now", href: SITE.phoneHref },
        { label: "WhatsApp", href: SITE.whatsappHref },
        CONSULT,
      ],
    };
  }
  if (has(q, ["price", "cost", "pricing", "quote", "budget", "how much", "rate"])) {
    return {
      role: "assistant",
      content:
        "Pricing depends on scope: the modules you need, customisation and integrations. The quickest way to a clear number is a free consultation where we map your workflows.",
      actions: [CONSULT],
    };
  }
  if (has(q, ["go live", "how fast", "how long", "timeline", "weeks", "platform", "accelerator", "fleet", "crm", "hrms", "marketplace", "e-commerce", "ecommerce"])) {
    return {
      role: "assistant",
      content: `Our pre-built platforms get you most of the way from day one:\n${ACCELERATORS.map((a) => `• ${a.name}: live in ${a.weeks}`).join("\n")}\nCustom projects are planned with you after a short discovery.`,
      actions: actionsFor("platform"),
    };
  }
  if (has(q, ["odoo", "erp", "implement", "migrat", "integrat", "customi"])) {
    return {
      role: "assistant",
      content:
        "As an Odoo Silver Partner we handle implementation, customisation, migration, integration, development and support, from sales and inventory to accounting, manufacturing and HR, configured to how you work.",
      actions: actionsFor("odoo"),
    };
  }
  if (has(q, ["dedicated", "hire", "developer", "engineer", "qa", "devops", "resource", "tech team"])) {
    return {
      role: "assistant",
      content:
        "Our dedicated teams work in your sprints: solutions engineering, QA (manual and automation), DevOps and cloud on AWS, GCP and Azure, and AI/ML engineers.",
      actions: actionsFor("team"),
    };
  }
  if (/\bai\b/.test(q) || has(q, ["machine learning", "forecast", "automation", "analytics"])) {
    return {
      role: "assistant",
      content:
        "We build applied AI on your own data: demand forecasting, late-payment risk, document AI and workflow automation, usually on top of Odoo and your custom apps.",
      actions: actionsFor("ai"),
    };
  }
  if (has(q, ["app", "web", "mobile", "custom", "software", "portal", "build"])) {
    return {
      role: "assistant",
      content:
        "Yes, we build custom web and mobile apps around your workflows, integrated with Odoo and your other systems, with a focus on performance, security and a great user experience.",
      actions: actionsFor("custom"),
    };
  }
  if (has(q, ["where", "office", "location", "address", "based"])) {
    return {
      role: "assistant",
      content: `We're at ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}, and we work with clients across India and beyond.`,
      actions: [CONSULT],
    };
  }
  if (has(q, ["career", "job", "hiring", "vacanc", "intern"])) {
    return {
      role: "assistant",
      content: `We're always glad to meet good people. Send your CV to ${SITE.careersEmail}.`,
      actions: [{ label: "Email careers", href: `mailto:${SITE.careersEmail}` }],
    };
  }
  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(q.trim())) {
    return { role: "assistant", content: "Hello! What are you looking to build or improve? I can help with Odoo, custom software, AI or teams." };
  }
  return {
    role: "assistant",
    content:
      "Good question. The team can give you a precise answer. Share a little about your business, or book a free consultation and we'll get back to you quickly.",
    actions: [CONSULT, { label: "Email us", href: `mailto:${SITE.email}` }],
  };
}
