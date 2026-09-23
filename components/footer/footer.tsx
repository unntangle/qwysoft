import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaSquareFacebook, FaWhatsapp } from "react-icons/fa6";
import { FooterMark } from "@/components/footer/footer-mark";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { FOOTER_COLUMNS, SITE, STACK } from "@/lib/constants";

// Wall of tech-stack tiles for the contact card: 7 rows that drift sideways in alternating
// directions. Django and AWS are left out because their logos have solid shapes that turn
// into plain blobs when drawn as white silhouettes. Every third tile is blank for rhythm.
const WALL_LOGOS = STACK.filter((s) => !/django|aws/i.test(s.name));
const WALL_ROWS = Array.from({ length: 7 }, (_, r) =>
  Array.from({ length: 10 }, (_, i) => ((i + r) % 3 === 1 ? null : WALL_LOGOS[(i + r * 2) % WALL_LOGOS.length])),
);

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Facebook: FaSquareFacebook,
};

/* ------------------------------------------------------------------
   Closing shell, modelled on Mixpanel's:

   ┌ outer frame (inset from the viewport, big rounded bottom) ──────┐
   │  ivory → peach → lavender → violet atmosphere                    │
   │            Big centred CTA headline + two buttons                │
   │  ┌ inner panel (rounded, violet → near-black) ─────────────────┐ │
   │  │  PLATFORM      PRODUCTS      INDUSTRIES      COMPANY         │ │
   │  │  links ›       links ›       links ›         links ›         │ │
   │  │  logo, socials, ©                     Privacy • Terms • …    │ │
   │  └──────────────────────────────────────────────────────────────┘ │
   └──────────────────────────────────────────────────────────────────┘
------------------------------------------------------------------- */

export function Footer() {
  const year = new Date().getFullYear();
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Free consultation request")}`;

  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3" aria-labelledby="contact-title">
      <div className="overflow-hidden rounded-b-[44px] bg-[linear-gradient(180deg,#fbf9f5_0%,#fbf9f5_22%,rgba(251,249,245,0.82)_36%,rgba(251,249,245,0.6)_50%,rgba(251,249,245,0.42)_64%,rgba(251,249,245,0.3)_100%),linear-gradient(100deg,#ff1f6b_0%,#d0157c_30%,#8e0f9c_62%,#5a0aa6_100%)] px-2 pb-2 sm:px-4 sm:pb-3">
        {/* Closing call to action: dark card, copy on the left, tech-stack wall with a glowing QWY orb on the right */}
        <section id="contact" className="px-1 pb-24 pt-16 sm:px-2 sm:pb-32 sm:pt-24">
          <div
            data-nav="dark"
            className="grain relative overflow-hidden rounded-[32px] bg-[#2a0a22] text-white ring-1 ring-white/10 shadow-[0_40px_90px_-40px_rgba(42,10,34,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            {/* Solid deep wine, lit only by a faint glow behind the orb and a soft vignette at the edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_75%_50%,rgba(224,64,143,0.14),transparent_70%),radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.35)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,201,143,0.55),transparent)]"
            />
            <div className="relative grid lg:grid-cols-2">
              {/* Copy */}
              <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-24">
                <span className="w-fit rounded-full border border-[#e9c98f]/40 bg-[#e9c98f]/10 px-3.5 py-1 text-[13px] tracking-[0.02em] text-[#f1dcb4]">
                  Let&rsquo;s talk
                </span>
                <h2 id="contact-title" className="display display-sm mt-6 max-w-[16ch] text-white">
                  Accelerate growth with{" "}
                  <span className="bg-[linear-gradient(95deg,#f3d9a8_0%,#ff9ec4_45%,#c9b3ff_100%)] bg-clip-text text-transparent">
                    next-gen technology.
                  </span>
                </h2>
                <p className="mt-5 max-w-[40ch] text-[1.125rem] leading-relaxed text-white/72">
                  Odoo ERP, custom software and AI, built by one team. Talk to us and leave with a clear plan for what to
                  build first.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={mail} variant="light" size="lg">
                    Get a free consultation
                  </Button>
                  <Button href={SITE.phoneHref} variant="ghost-light" size="lg" arrow={false}>
                    Call now
                  </Button>
                </div>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/60">
                  <li>
                    <a href={SITE.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Phone className="size-4" aria-hidden /> {SITE.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                      <FaWhatsapp className="size-4" aria-hidden /> WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Mail className="size-4" aria-hidden /> {SITE.email}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tech-stack wall with the QWY orb */}
              <div aria-hidden className="relative hidden min-h-[520px] lg:block">
                <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden [mask-image:radial-gradient(60%_60%_at_50%_50%,black_35%,transparent_85%)]">
                  {WALL_ROWS.map((row, r) => (
                    <div
                      key={r}
                      className={`flex w-max ${r % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
                      style={{ animationDuration: `${70 + r * 6}s` }}
                    >
                      {[0, 1].map((copy) => (
                        <ul key={copy} className="flex shrink-0 gap-3 pr-3">
                          {row.map((t, i) => (
                            <li
                              key={i}
                              className="grid size-16 place-items-center rounded-xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                            >
                              {t && (
                                <Image
                                  src={t.logo}
                                  alt=""
                                  width={80}
                                  height={40}
                                  className="h-6 w-10 object-contain opacity-45 brightness-0 invert"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Orb */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,51,150,0.3),rgba(138,20,102,0.15)_60%,transparent)] blur-xl" />
                  <span className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e9c98f]/20 bg-white/[0.03] backdrop-blur-[2px]" />
                  <span className="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm" />
                  <span className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#e9c98f]/25 [animation-duration:3.6s]" />
                  <div className="relative grid size-[210px] place-items-center rounded-full bg-[radial-gradient(90%_70%_at_50%_0%,#ffe2ec_0%,#e0408f_26%,#8a1466_60%,#2a0a22_100%)] shadow-[0_0_70px_12px_rgba(214,51,150,0.35),inset_0_-30px_60px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(233,201,143,0.25)]">
                    {/* Just the qwy mark, using the same masked mark as the footer's closing logo */}
                    <FooterMark tone="white" className="w-[150px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing statement between the contact card and the footer panel */}
          <div className="mx-auto mt-24 max-w-3xl px-4 text-center sm:mt-32">
            <h2 className="display display-sm text-ink">
              Build the systems your
              <br className="hidden sm:block" /> business runs on, with one partner.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={mail}>Book a consultation</Button>
              <Button href="/#core-services" variant="secondary">
                See what we build
              </Button>
            </div>
          </div>
        </section>

        {/* Inner dark panel */}
        <div
          data-nav="dark"
          className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,rgba(18,4,40,0)_0%,rgba(18,4,40,0.35)_45%,rgba(14,3,32,0.7)_100%),linear-gradient(100deg,#e8175f_0%,#b8127f_32%,#7a0d9e_65%,#4a0896_100%)] text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[10%] -top-[25%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(255,31,107,0.35),transparent)] blur-2xl"
          />
          <div className="relative px-6 pb-10 pt-16 sm:px-10 sm:pt-20 lg:px-[52px]">
            <h2 className="sr-only">Site links</h2>
            <nav aria-label="Footer" className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {FOOTER_COLUMNS.map((column, ci) => (
                <div key={ci} className="space-y-14">
                  {column.map((group) => (
                    <div key={group.heading}>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/60">{group.heading}</p>
                      <ul className="mt-6 space-y-4">
                        {group.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href.startsWith("#") && l.href !== "#contact" ? `/${l.href}` : l.href}
                              className="group inline-flex items-center gap-1 text-[15.5px] text-white transition-colors hover:text-lavender"
                            >
                              {l.label}
                              <ChevronRight
                                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                strokeWidth={2}
                                aria-hidden
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </nav>

            {/* Contact + socials, above the divider */}
            <div className="mt-20 flex flex-col gap-10 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <address className="flex flex-col items-start gap-3 text-[14px] not-italic text-white/70">
              <Logo tone="white" height={36} className="mb-3" />
              <p className="mb-2 max-w-[62ch] text-[15px] leading-relaxed text-white/85">
                We deliver innovative solutions in hyperlocal delivery, fleet management and tailored software development,
                empowering businesses to thrive.
              </p>
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/45" aria-hidden />
                <span>
                  {SITE.address.street}, {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </p>
              <p className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-white/45" aria-hidden />
                <a href={SITE.phoneHref} className="hover:text-white">
                  {SITE.phone}
                </a>
              </p>
              <p className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/45" aria-hidden />
                <span>
                  <a href={`mailto:${SITE.email}`} className="hover:text-white">
                    {SITE.email}
                  </a>
                  {" | "}
                  <a href={`mailto:${SITE.careersEmail}`} className="hover:text-white">
                    {SITE.careersEmail}
                  </a>
                </span>
              </p>
            </address>

              <div className="flex items-end gap-6 sm:gap-8">
                <a
                  href="https://www.odoo.com/partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 opacity-95 transition-opacity duration-300 hover:opacity-100"
                  title="Odoo Silver Partner"
                >
                  <Image
                    src="/brand/odoo-white.webp"
                    alt="Odoo Silver Partner"
                    width={1140}
                    height={1060}
                    sizes="100px"
                    className="h-auto w-[84px] sm:w-[100px]"
                  />
                </a>
              <div>
                <p className="text-[14px] text-white/60">Find us at</p>
                <ul className="mt-3 flex items-center gap-4">
                  {SITE.social.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label];
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="block text-white/70 transition-colors hover:text-white"
                        >
                          {Icon ? <Icon className="size-6" aria-hidden /> : s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-[14px] text-white/85">©{year} QWY Software. All rights reserved</p>
              </div>
              </div>
            </div>
          </div>

          {/* Sarvam-style closing mark, cropped by the bottom edge of this panel */}
          <FooterMark className="relative mx-auto mt-2 w-[70%] max-w-[720px] select-none pb-8 sm:w-[56%]" />
        </div>
      </div>
    </footer>
  );
}
