"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NAV, type NavGroup } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Switch to a dark bar while a dark section sits under the navbar.
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const under = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest("header"));
      setDark(Boolean(under?.closest("[data-nav='dark']")));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative transition-[background-color,box-shadow,backdrop-filter] duration-500",
          open
            ? "bg-ivory/95 shadow-[0_1px_0_rgba(23,19,31,0.06)] backdrop-blur-xl"
            : scrolled && dark
              ? "nav-dark bg-night/70 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150"
              : scrolled
                ? "bg-ivory/80 shadow-[0_1px_0_rgba(23,19,31,0.06)] backdrop-blur-xl backdrop-saturate-150"
                : "bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex max-w-[1320px] items-center px-5 transition-[height] duration-500 sm:px-8 lg:px-12",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <div className="mr-10 flex shrink-0 items-center gap-4">
            <Link href="/" aria-label="QWY Software home" className="flex items-center" onClick={onLogoClick}>
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
              className={cn(
                "hidden shrink-0 items-center rounded-md transition-colors sm:flex",
                scrolled && dark && !open ? "bg-white px-1.5 py-1" : "",
              )}
            >
              {/* odoo-logo-header.webp has wide padding; crop to the artwork (≈19–82% × 33.5–66%) */}
              <span className="block shrink-0 overflow-hidden" style={{ width: 100, height: 48 }}>
                <Image
                  src="/brand/odoo-logo-header.webp"
                  alt="Odoo Silver Partner"
                  width={1140}
                  height={1060}
                  sizes="150px"
                  priority
                  className={cn("block max-w-none", !(scrolled && dark && !open) && "mix-blend-multiply")}
                  style={{ width: 146, height: 136, marginTop: -43.5, marginLeft: -23.5 }}
                />
              </span>
            </motion.a>
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((g) => (
              <li key={g.label} onMouseEnter={() => (g.columns ? openMenu(g.label) : setOpen(null))}>
                {g.columns ? (
                  // Dropdown menus open on hover (and keyboard focus); the label itself is not clickable
                  <button
                    type="button"
                    aria-expanded={open === g.label}
                    aria-haspopup="true"
                    onFocus={() => openMenu(g.label)}
                    data-active={open === g.label}
                    className="nav-hover flex cursor-default items-center gap-1 rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80 transition-colors"
                  >
                    <span className="nav-text">{g.label}</span>
                    <ChevronDown
                      className={cn("size-3.5 transition-transform duration-300", open === g.label && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                ) : g.label === "Home" ? (
                  <Link
                    href={to(g.href ?? "/")}
                    data-active={pathname === "/"}
                    className="nav-hover rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80 transition-colors"
                  >
                    <span className="nav-text">{g.label}</span>
                  </Link>
                ) : (
                  // Every other top-level item is a plain label for now
                  <span className="nav-hover nav-label cursor-default rounded-lg px-3 py-2 text-[0.9375rem] text-ink/80">
                    <span className="nav-text">{g.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Button href="#contact" size="sm" className="h-10 px-4">
              Get in touch
            </Button>
          </div>

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

        <AnimatePresence>
          {active?.columns && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-x-0 top-full hidden px-12 pt-2 lg:block"
              onMouseEnter={() => openMenu(active.label)}
            >
              <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[28px] border border-line/80 bg-ivory/[0.97] shadow-[0_40px_80px_-30px_rgba(23,19,31,0.35),0_12px_24px_-12px_rgba(23,19,31,0.12)] backdrop-blur-xl">
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

function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <motion.div
      key={group.label}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease, delay: 0.05 }}
      className="grid grid-cols-12 gap-8 px-10 pb-10 pt-9"
    >
      <p className="display col-span-3 text-[1.7rem] leading-[1.1] text-ink/90">{group.label}</p>
      <div className={cn("grid gap-10", group.feature ? "col-span-6" : "col-span-9", group.columns!.length > 1 && "grid-cols-2")}>
        {group.columns!.map((col) => (
          <div key={col.heading}>
            <p className="mb-4 text-[13px] text-mute">{col.heading}</p>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={to(l.href)}
                    onClick={onNavigate}
                    className="group -mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-white"
                  >
                    <span className="flex items-center gap-1.5 text-[15px] font-medium text-ink">
                      {l.label}
                      <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    {l.description && <span className="mt-0.5 block text-[13.5px] text-mute">{l.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {group.feature && (
        <Link
          href={to(group.feature.href)}
          onClick={onNavigate}
          className="group relative col-span-3 flex flex-col overflow-hidden rounded-2xl bg-indigo p-6 text-white"
        >
          <div className="absolute -right-10 -top-16 size-48 rounded-full bg-violet/50 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -left-10 size-40 rounded-full bg-saffron/30 blur-3xl" aria-hidden />
          <p className="relative text-[15px] font-medium">{group.feature.title}</p>
          <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/65">{group.feature.body}</p>
          <p className="relative mt-6 flex items-center gap-1.5 text-[13.5px] font-medium">
            {group.feature.cta}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </p>
          {group.feature.image && (
            <div className="relative mt-auto pt-7">
              <span className="block w-fit rounded-2xl bg-white p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-0.5">
                <Image
                  src={group.feature.image.src}
                  alt={group.feature.image.alt}
                  width={group.feature.image.width}
                  height={group.feature.image.height}
                  sizes="120px"
                  className="h-auto w-[96px]"
                />
              </span>
            </div>
          )}
        </Link>
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
