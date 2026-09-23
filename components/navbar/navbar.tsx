"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { NAV, RESOURCES, type NavGroup } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Newest blog post, featured in the dropdowns
const LATEST = RESOURCES[0];

/** Section anchors (#solutions) live on the homepage; make them work from any page. */
const to = (href: string) => (href.startsWith("#") ? `/${href}` : href);

// Only reset once per page load, even if the navbar re-mounts on client navigation
let reloadHandled = false;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // Smart header: tucks away while scrolling down, glides back on any scroll up
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  // Scroll progress for the gradient line along the bottom of the bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  // Cursor spotlight that glides along the bar
  const spotX = useMotionValue(0);
  const spotOn = useMotionValue(0);
  const spotXs = useSpring(spotX, { stiffness: 260, damping: 36 });
  const spotOns = useSpring(spotOn, { stiffness: 180, damping: 30 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Switch to a dark bar while a dark section sits under the navbar.
    // Checked at most once per animation frame, and state only changes when the answer does,
    // so scrolling never queues extra layout work or re-renders.
    let frame = 0;
    let lastY = window.scrollY;
    const check = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const under = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest("header"));
      setDark(Boolean(under?.closest("[data-nav='dark']")));
      // Hide when reading downwards, show on any upward scroll (small deltas are ignored)
      if (y < 160) setHidden(false);
      else if (y > lastY + 6) setHidden(true);
      else if (y < lastY - 6) setHidden(false);
      if (Math.abs(y - lastY) > 6) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // On refresh, always start from the top with the header in view, instead of
    // the browser restoring the old scroll position or jumping to a leftover #hash.
    if (reloadHandled) return;
    reloadHandled = true;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type !== "reload") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Logo: on the homepage, glide back to the top and clear any #section from the URL
  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobile(false);
    setOpen(null);
    if (window.location.pathname !== "/") return; // let the link navigate home
    e.preventDefault();
    if (window.location.hash) history.replaceState(null, "", "/");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = NAV.find((g) => g.label === open);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open && !mobile && "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "relative transition-[background-color,box-shadow] duration-500",
          open
            ? "bg-ivory/95 shadow-[0_1px_0_rgba(23,19,31,0.06)] backdrop-blur-md"
            : scrolled && dark
              ? "nav-dark bg-night/80 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
              : scrolled
                ? "bg-ivory/85 shadow-[0_1px_0_rgba(23,19,31,0.06)] backdrop-blur-md"
                : "bg-transparent",
        )}
        onMouseLeave={scheduleClose}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          spotX.set(e.clientX - r.left);
          spotOn.set(1);
        }}
        onPointerLeave={() => spotOn.set(0)}
      >
        {/* Cursor spotlight: a soft brand glow that follows the mouse along the bar */}
        <motion.span
          aria-hidden
          className="nav-spot pointer-events-none absolute left-0 top-0 hidden h-full w-[440px] -translate-x-1/2 lg:block"
          style={{ x: spotXs, opacity: spotOns }}
        />
        <nav
          aria-label="Main"
          className={cn(
            "relative mx-auto flex max-w-[1320px] items-center px-5 transition-[height] duration-500 sm:px-8 lg:px-12",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <div className="mr-10 flex shrink-0 items-center gap-4">
            <Link href="/" aria-label="QWY Software home" className="logo-wiggle flex items-center" onClick={onLogoClick}>
              <Logo tone={scrolled && dark && !open ? "white" : "color"} height={scrolled ? 26 : 30} priority />
            </Link>
            {/* On load: the divider draws down, then the Odoo badge slides out from behind it, left to right */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, ease, delay: 0.15 }}
              className={cn(
                "hidden h-8 w-px origin-center sm:block",
                scrolled && dark && !open ? "bg-white/25" : "bg-line-strong",
              )}
            />
            <motion.a
              initial={{ clipPath: "inset(0 100% 0 0)", x: -18, opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1, transitionEnd: { clipPath: "none" } }}
              transition={{ duration: 0.8, ease, delay: 0.5 }}
              href="https://www.odoo.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              title="Odoo Silver Partner"
              className="hidden shrink-0 items-center sm:flex"
            >
              {/* odoo-logo-header.webp has wide padding; crop to the artwork (≈19–82% × 33.5–66%).
                  Over dark sections it shows as a white silhouette, with no white box behind it. */}
              <span className="block shrink-0 overflow-hidden" style={{ width: 100, height: 48 }}>
                <Image
                  src="/brand/odoo-logo-header.webp"
                  alt="Odoo Silver Partner"
                  width={1140}
                  height={1060}
                  sizes="150px"
                  priority
                  className={cn(
                    "block max-w-none",
                    scrolled && dark && !open ? "brightness-0 invert" : "mix-blend-multiply",
                  )}
                  style={{ width: 146, height: 136, marginTop: -43.5, marginLeft: -23.5 }}
                />
              </span>
            </motion.a>
          </div>

          <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
            {NAV.map((g, i) => (
              <motion.li
                key={g.label}
                className="relative"
                // Entrance: items drop in one by one after the logo
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.35 + i * 0.07 }}
                onMouseEnter={() => {
                  setHovered(g.label);
                  if (g.columns) openMenu(g.label);
                  else setOpen(null);
                }}
              >
                {/* Hover highlight: one soft pill that glides between items */}
                {hovered === g.label && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    aria-hidden
                    className="nav-pill absolute inset-0 rounded-lg bg-ink/[0.05]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {g.columns ? (
                  // Dropdown menus open on hover (and keyboard focus); the label itself is not clickable
                  <button
                    type="button"
                    aria-expanded={open === g.label}
                    aria-haspopup="true"
                    onFocus={() => openMenu(g.label)}
                    data-active={open === g.label}
                    className="nav-hover relative flex cursor-default items-center gap-1 rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80 transition-colors"
                  >
                    <RollText text={g.label} />
                    <ChevronDown
                      className={cn("size-3.5 transition-transform duration-300", open === g.label && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                ) : g.label === "Home" ? (
                  <Link
                    href={to(g.href ?? "/")}
                    data-active={pathname === "/"}
                    className="nav-hover relative block rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80 transition-colors"
                  >
                    <RollText text={g.label} />
                  </Link>
                ) : (
                  // Every other top-level item is a plain label for now
                  <span className="nav-hover nav-label relative block cursor-default rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80">
                    <RollText text={g.label} />
                  </span>
                )}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="ml-auto hidden items-center gap-3 lg:flex"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.35 + NAV.length * 0.07 }}
          >
            <Magnetic>
              <Button href="#contact" size="sm" className="btn-sheen h-10 px-4">
                Get in touch
              </Button>
            </Magnetic>
          </motion.div>

          <button
            type="button"
            className="ml-auto grid size-10 place-items-center rounded-lg text-ink lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {/* Scroll progress: a thin brand-gradient line along the bottom of the bar */}
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#ff1f6b,#c3158a_50%,#8f5cff)] transition-opacity duration-500",
            scrolled && !open ? "opacity-100" : "opacity-0",
          )}
          style={{ scaleX: progress }}
        />

        <AnimatePresence>
          {active?.columns && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
              // The full-width layer ignores the pointer, so only the visible card keeps the menu open;
              // moving off the card anywhere (sides, below, into the page) closes it
              className="pointer-events-none absolute inset-x-0 top-full hidden px-12 pt-2 lg:block"
            >
              <div
                className="pointer-events-auto mx-auto max-w-[1080px] overflow-hidden rounded-[28px] border border-line/80 bg-ivory/[0.97] shadow-[0_40px_80px_-30px_rgba(23,19,31,0.35),0_12px_24px_-12px_rgba(23,19,31,0.12)] backdrop-blur-xl"
                onMouseEnter={() => openMenu(active.label)}
                onMouseLeave={scheduleClose}
              >
                <MegaPanel group={active} onNavigate={() => setOpen(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ivory lg:hidden"
          >
            <MobileMenu onNavigate={() => setMobile(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Creative navbar pieces ---------- */

// Arrow shape used as a mask, so the arrow can be filled with the brand gradient
const ARROW_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E";
const ARROW_MASK: React.CSSProperties = {
  WebkitMask: `url("${ARROW_SVG}") center / contain no-repeat`,
  mask: `url("${ARROW_SVG}") center / contain no-repeat`,
};

/** Menu label that rolls up letter by letter on hover, revealing a brand-gradient copy (styles: .roll* in globals.css) */
function RollText({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <span className="roll" style={{ "--n": chars.length } as React.CSSProperties}>
      <span className="sr-only">{text}</span>
      {chars.map((ch, i) => {
        const c = ch === " " ? "\u00a0" : ch;
        return (
          <span key={i} className="roll-ch" style={{ "--i": i } as React.CSSProperties} aria-hidden>
            <span className="roll-top">{c}</span>
            <span className="roll-bot">{c}</span>
          </span>
        );
      })}
    </span>
  );
}

/* Dropdown panel in three columns:
   1. Featured insight: the newest blog, filling the whole column on a tinted panel
   2. The menu itself: title, intro and link rows (first link highlighted)
   3. The feature card (Odoo Silver Partner / Our products) */
function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const f = group.feature;
  return (
    <motion.div
      key={group.label}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease, delay: 0.05 }}
      className="grid grid-cols-12 overflow-hidden rounded-[inherit]"
    >
      {/* 1. Featured insight, filling the column */}
      <div className="col-span-3 flex flex-col bg-[radial-gradient(120%_70%_at_0%_0%,rgba(124,196,240,0.2),transparent_60%),linear-gradient(165deg,#0b2542_0%,#11375d_55%,#174b78_100%)] px-7 pb-8 pt-7 text-white">
        <p className="display text-[1.35rem] leading-tight text-white">Featured insight</p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.1 }}
          className="mt-5 flex flex-1 flex-col"
        >
          <Link href={to(LATEST.href ?? "#resources")} onClick={onNavigate} className="group/ins flex flex-1 flex-col">
            <span className="relative block aspect-[16/9] overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
              <Image
                src={LATEST.image}
                alt={LATEST.title}
                fill
                sizes="380px"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/ins:scale-[1.04]"
              />
            </span>
            <span className="mt-4 block text-[14.5px] font-medium leading-snug text-white">{LATEST.title}</span>
            <span className="mt-1 block text-[12.5px] text-white/55">{LATEST.read}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-[#a9d8f7]">
              <span className="underline decoration-[#a9d8f7]/45 underline-offset-4 transition-colors group-hover/ins:decoration-[#a9d8f7]">
                Read full blog
              </span>
              <ArrowRight className="size-3.5 transition-transform group-hover/ins:translate-x-1" aria-hidden />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* 2. The menu: title, intro and links */}
      <div className={cn("flex flex-col px-9 pb-8 pt-7", f ? "col-span-6" : "col-span-9")}>
        <p className="display text-[1.5rem] leading-[1.1] text-ink/90">{group.label}</p>
        {/* Brand-gradient underline that draws in when the dropdown opens */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-3 block h-px w-14 origin-left rounded-full bg-[linear-gradient(90deg,#ff1f6b,#c3158a,#8f5cff)]"
        />
        {group.intro && <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-soft">{group.intro}</p>}

        <div className={cn("mt-6 grid gap-6", group.columns!.length > 1 && "grid-cols-[1.4fr_1fr]")}>
          {group.columns!.map((col, ci) => (
            <div key={col.heading} className={cn(ci > 0 && "border-l border-line pl-6")}>
              <p className="mb-2 text-[12px] text-mute">{col.heading}</p>
              <ul
                className={cn(
                  group.columns!.length === 1 && col.links.length > 3 ? "grid grid-cols-2 gap-x-3 gap-y-0.5" : "space-y-0.5",
                )}
              >
                {col.links.map((l, li) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: 0.08 + (ci * 5 + li) * 0.035 }}
                  >
                    <Link
                      href={to(l.href)}
                      onClick={onNavigate}
                      className="group -mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-white"
                    >
                      <span className="flex items-center gap-1.5 text-[15px] font-medium text-ink">
                        {l.label}
                        {/* Brand-gradient arrow that slides in on hover */}
                        <span
                          aria-hidden
                          className="size-3.5 shrink-0 -translate-x-1 bg-[linear-gradient(90deg,#ff1f6b,#c3158a,#8f5cff)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          style={ARROW_MASK}
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Feature card */}
      {f && (
        <div className="col-span-3 py-7 pr-7">
          <Link
            href={to(f.href)}
            onClick={onNavigate}
            className={cn(
              "group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center text-white",
              // The Odoo partner card takes the "Silver Partner" blue; other feature cards stay indigo
              f.image ? "bg-[linear-gradient(160deg,#2a86c0_0%,#17639a_50%,#0c4570_100%)]" : "bg-indigo",
            )}
          >
            <div
              aria-hidden
              className={cn("absolute -right-10 -top-16 size-48 rounded-full blur-3xl", f.image ? "bg-[#7cc4f0]/40" : "bg-violet/50")}
            />
            <div
              aria-hidden
              className={cn("absolute -bottom-16 -left-10 size-40 rounded-full blur-3xl", f.image ? "bg-[#3fd0e0]/25" : "bg-saffron/30")}
            />
            {/* Odoo partner badge in white, no box (inverted and screen-blended) */}
            {f.image && (
              <Image
                src={f.image.src}
                alt={f.image.alt}
                width={f.image.width}
                height={f.image.height}
                sizes="140px"
                className="relative mb-6 h-auto w-[118px] mix-blend-screen transition-transform duration-300 [filter:grayscale(1)_invert(1)_contrast(1.35)_brightness(1.15)] group-hover:-translate-y-0.5"
              />
            )}
            <p className="relative text-[15px] font-medium">{f.title}</p>
            <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/70">{f.body}</p>
            <p className="relative mt-5 flex items-center justify-center gap-1.5 text-[13.5px] font-medium">
              <span className="underline decoration-white/50 underline-offset-4 transition-colors group-hover:decoration-white">
                {f.cta}
              </span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </p>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-4 sm:px-8">
      <ul className="divide-y divide-line">
        {NAV.map((g) => (
          <li key={g.label}>
            {g.columns ? (
              <>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left"
                  aria-expanded={expanded === g.label}
                  onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                >
                  <span className="display text-[1.75rem]">{g.label}</span>
                  <ChevronDown className={cn("size-5 transition-transform", expanded === g.label && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {expanded === g.label && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      {g.columns.flatMap((c) => c.links).map((l) => (
                        <li key={l.label}>
                          <Link href={to(l.href)} onClick={onNavigate} className="block py-2.5 pl-1 text-[15px] text-ink-soft">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            ) : g.label === "Home" ? (
              <Link href={to(g.href ?? "/")} onClick={onNavigate} className="block py-4">
                <span className="display text-[1.75rem]">{g.label}</span>
              </Link>
            ) : (
              <span className="block py-4">
                <span className="display text-[1.75rem] text-ink/70">{g.label}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto grid gap-3 pt-10">
        <Button href="#contact" size="lg" className="w-full" onClick={onNavigate}>
          Get in touch
        </Button>
        <p className="text-center text-[13px] text-mute">
          <span className="font-semibold text-[#875a7b]">odoo</span> Silver Partner
        </p>
      </div>
    </div>
  );
}
