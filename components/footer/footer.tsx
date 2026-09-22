import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaSquareFacebook, FaWhatsapp } from "react-icons/fa6";
import { FooterMark } from "@/components/footer/footer-mark";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { FOOTER_COLUMNS, SITE } from "@/lib/constants";

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
      <div className="overflow-hidden rounded-b-[44px] bg-[linear-gradient(180deg,#fbf9f5_0%,#fbf9f5_14%,rgba(251,249,245,0.82)_30%,rgba(251,249,245,0.35)_46%,rgba(251,249,245,0)_62%),linear-gradient(100deg,#ff1f6b_0%,#d0157c_30%,#8e0f9c_62%,#5a0aa6_100%)] px-2 pb-2 sm:px-4 sm:pb-3">
        {/* Closing call to action */}
        <section id="contact" className="px-2 pb-24 pt-28 text-center sm:pb-32 sm:pt-40">
          <h2 id="contact-title" className="display display-lg mx-auto max-w-[16ch] text-ink">
            Accelerate growth with next-gen technology.
          </h2>
          <p className="lede mx-auto mt-6 max-w-[58ch]">
            Ready to transform your business with the right technology? Partner with QWY Software to build scalable ERP
            systems, custom software solutions and intelligent platforms that streamline operations and accelerate digital
            growth.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={mail} size="lg">
              Get a free consultation
            </Button>
            <Button href={SITE.phoneHref} variant="secondary" size="lg" arrow={false}>
              Call now
            </Button>
          </div>
          <ul className="mx-auto mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[14.5px] text-ink-soft">
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-plum">
                <Phone className="size-4" aria-hidden /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-plum">
                <FaWhatsapp className="size-4" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-plum">
                <Mail className="size-4" aria-hidden /> {SITE.email}
              </a>
            </li>
          </ul>
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
