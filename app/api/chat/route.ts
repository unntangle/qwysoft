import { NextResponse } from "next/server";
import { ACCELERATORS, SITE } from "@/lib/constants";

/* ------------------------------------------------------------------
   AI chat endpoint for the site assistant.
   Set ANTHROPIC_API_KEY in the environment (.env.local / hosting
   dashboard) to turn on real AI answers. Without a key it returns 501
   and the widget falls back to its built-in answers.
   Optional: CHAT_MODEL to choose another Claude model.
------------------------------------------------------------------- */

export const runtime = "nodejs";

const MODEL = process.env.CHAT_MODEL ?? "claude-haiku-4-5-20251001";

const SYSTEM = `You are the website assistant for ${SITE.name} (${SITE.url}), an Odoo Silver Partner and software company at Technopark, Thiruvananthapuram, Kerala.

What QWY does:
- Odoo ERP: implementation, customisation, migration, integration, development and support, configured to each business's workflows.
- Custom software: web and mobile applications integrated with ERP platforms like Odoo.
- Applied AI and machine learning: forecasting, process automation, document AI, analytics.
- Dedicated technology teams: solutions engineering, QA (manual and automation), DevOps and cloud (AWS, GCP, Azure), AI/ML engineers who work in the client's sprints.
- Pre-built platforms: ${ACCELERATORS.map((a) => `${a.name} (live in ${a.weeks})`).join("; ")}.
- Industries: manufacturing, retail and e-commerce, healthcare, logistics and delivery, education, hospitality, food and beverage, professional services, trading, construction.

Contact: email ${SITE.email}, phone ${SITE.phone}, WhatsApp ${SITE.whatsappHref}. Careers: ${SITE.careersEmail}.
Address: ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}.

How to answer:
- Be warm, concise and practical: 2 to 4 short sentences, plain text, no markdown headings.
- Only state facts given above. For pricing, timelines of custom projects or anything not listed, say it depends on scope and suggest a free consultation.
- When the visitor shows buying intent, invite them to book a free consultation or share their email/phone so the team can follow up.
- Never invent client names, prices, certifications or statistics.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: "AI not configured" }, { status: 501 });

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Msg) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  // The conversation must start with the visitor
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) return NextResponse.json({ error: "No message" }, { status: 400 });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages }),
    });
    if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    const data = await res.json();
    const reply = (data?.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || "Sorry, I couldn't come up with an answer to that." });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
