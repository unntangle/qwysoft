"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircleMore, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ACCELERATORS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   QWY AI assistant: a floating launcher bottom-right that opens a
   rounded chat panel in the site's style (logo-purple header, soft
   bubbles, suggested questions, typing dots, pill input).
   Answers come from /api/chat (Claude) when ANTHROPIC_API_KEY is set;
   otherwise from the built-in answers below, drawn from the site copy.
------------------------------------------------------------------- */

type Action = { label: string; href: string };
type Msg = { role: "user" | "assistant"; content: string; actions?: Action[] };

const SUGGESTIONS = ["What Odoo services do you offer?", "Can you build a custom app?", "How fast can we go live?", "Talk to the team"];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the QWY assistant. Ask me about Odoo ERP, custom software, AI, dedicated teams or our pre-built platforms.",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="QWY assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            style={{ transformOrigin: "100% 100%" }}
            className="flex h-[min(600px,calc(100vh-7.5rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-30px_rgba(40,10,90,0.45),0_12px_24px_-12px_rgba(40,10,90,0.18)]"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#33055f_0%,#5a0aa6_55%,#7a2fd4_100%)] px-5 pb-5 pt-5 text-white">
              <div
                aria-hidden
                className="absolute -right-10 -top-16 size-44 rounded-full bg-[radial-gradient(closest-side,rgba(255,143,196,0.45),transparent)]"
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                    <Sparkles className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium leading-tight">QWY Assistant</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/70">
                      <span className="size-1.5 rounded-full bg-[#7fe0bd]" /> Online · replies instantly
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="grid size-8 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            {/* Messages */}
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
                        ? "rounded-[20px] rounded-br-md bg-[linear-gradient(135deg,#5a0aa6,#7a2fd4)] text-white"
                        : "rounded-[20px] rounded-bl-md border border-line bg-white text-ink",
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
                          className="rounded-full border border-[#e3d6f7] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#5a0aa6] transition-colors hover:bg-[#f4edfd]"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {busy && (
                <div className="flex items-start">
                  <div className="flex gap-1 rounded-[20px] rounded-bl-md border border-line bg-white px-4 py-3.5" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-[#7a2fd4]"
                        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="cursor-pointer rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] text-ink-soft transition-colors hover:border-[#d9c6f4] hover:text-[#5a0aa6]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line bg-white p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-line bg-[#faf9fc] py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-[#c9b3f0]">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about QWY…"
                  aria-label="Message"
                  maxLength={500}
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-mute"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#5a0aa6,#7a2fd4)] text-white transition-opacity disabled:opacity-35"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} aria-hidden />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-mute">AI answers can be imperfect. For quotes, talk to our team.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: reduce ? 0 : 1.2, duration: 0.4, ease }}
              className="hidden rounded-full border border-line bg-white px-3.5 py-2 text-[13px] text-ink shadow-[0_10px_24px_-14px_rgba(40,10,90,0.35)] sm:block"
            >
              Ask QWY AI
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open chat with QWY assistant"}
          aria-expanded={open}
          className="relative grid size-14 cursor-pointer place-items-center rounded-full bg-[linear-gradient(135deg,#ff1f6b_0%,#c3158a_45%,#5a0aa6_100%)] text-white shadow-[0_16px_32px_-12px_rgba(90,10,166,0.6)] transition-transform duration-300 hover:scale-105"
        >
          {!open && !reduce && (
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#c3158a]/30 [animation-duration:2.6s]" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "s"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {open ? <X className="size-6" aria-hidden /> : <MessageCircleMore className="size-6" strokeWidth={1.75} aria-hidden />}
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
  if (has(q, ["platform", "accelerator", "fleet", "e-commerce", "ecommerce", "crm", "hrms", "marketplace", "go live", "live"]))
    return [{ label: "See pre-built platforms", href: "#accelerators" }, CONSULT];
  if (has(q, ["team", "hire", "developer", "engineer", "qa", "devops"])) return [{ label: "See dedicated teams", href: "#teams" }, CONSULT];
  if (/\b(app|apps|web|mobile|ai|ml)\b/.test(q) || has(q, ["custom", "machine learning"])) return [{ label: "See custom software", href: "#capabilities" }, CONSULT];
  return [CONSULT];
}

function localReply(text: string): Msg {
  const q = text.toLowerCase();

  if (has(q, ["talk", "contact", "call", "phone", "email", "reach", "speak", "whatsapp", "team"]) && !has(q, ["dedicated", "hire"])) {
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
  if (has(q, ["dedicated", "hire", "developer", "engineer", "qa", "devops", "resource"])) {
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
