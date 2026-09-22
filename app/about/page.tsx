import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, GraduationCap, HeartHandshake, Lightbulb, Mail, MapPin, Sparkles, Users } from "lucide-react";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Kasavu } from "@/components/ui/kasavu";
import { LIFE_PHOTOS, SITE, STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About & Life at QWY",
  description:
    "QWY Software is a technology partner in Technopark, Thiruvananthapuram, helping businesses streamline operations with Odoo ERP, custom software and applied AI. Meet the team and life at QWY.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: Users, title: "Collaboration", body: "Talented people working together, with clients treated as part of the team." },
  { icon: Lightbulb, title: "Innovation", body: "Curiosity about what technology can do for the businesses we serve." },
  { icon: GraduationCap, title: "Continuous learning", body: "New frameworks, new domains and new certifications, every quarter." },
  { icon: HeartHandshake, title: "Ownership", body: "We stay accountable from the first workshop to long after go-live." },
];

const PERKS = [
  "Work on real ERP, AI and product challenges for growing businesses",
  "Mentorship from senior engineers and Odoo consultants",
  "Learning budget and certification support",
  "Celebrations for launches, festivals and each other",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Intro */}
        <section className="grain relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44" aria-labelledby="about-title">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-[10%] top-[20%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,170,120,0.55),transparent_72%)] blur-2xl" />
            <div className="absolute -right-[12%] top-[5%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(150,130,240,0.5),transparent_75%)] blur-2xl" />
          </div>
          <Container>
            <p className="mb-7 inline-flex items-center gap-2.5 text-[0.9375rem] text-ink-soft">
              <span className="kasavu w-8" aria-hidden />
              About QWY Software
            </p>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <h1 id="about-title" className="display display-lg max-w-[13ch] lg:col-span-7">
                A technology partner for growing businesses.
              </h1>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft lg:col-span-5">
                <p>
                  QWY Software helps businesses streamline operations, scale efficiently and drive growth through smart digital
                  solutions. We deliver end-to-end technology services, from Odoo ERP implementation, customisation and
                  integration, to custom software tailored to your unique workflows.
                </p>
                <p>
                  Our dedicated technology teams work as an extension of your business, and our ready-to-deploy pre-built
                  platforms and accelerators help you go live faster without starting from scratch.
                </p>
              </div>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-6 lg:max-w-3xl">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-ink/15 pt-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="display text-[clamp(2.4rem,1.6rem+2.6vw,4rem)] leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-3 max-w-[18ch] text-[0.9375rem] leading-snug text-ink-soft">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Life at QWY */}
        <section id="life" className="bg-paper py-24 sm:py-32" aria-labelledby="life-title">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="kicker mb-6">Life at QWY</p>
                <h2 id="life-title" className="display display-lg max-w-[12ch]">
                  Our people are our brand.
                </h2>
              </div>
              <p className="lede lg:col-span-5">
                At QWY Software, our culture is built on collaboration, innovation and continuous learning. Life at QWY is a
                dynamic environment where talented people work together to build impactful technology, while celebrating
                teamwork, creativity and shared achievements.
              </p>
            </div>

            {LIFE_PHOTOS.length > 0 ? (
              <ul className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4">
                {LIFE_PHOTOS.map((p, i) => (
                  <li
                    key={p.src}
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      i % 6 === 0 && "row-span-2",
                      i % 6 === 3 && "lg:row-span-2",
                    )}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Kasavu className="mt-16 max-w-[160px]" />
            )}

            <ul className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="border-t border-ink/12 pt-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(255,31,107,0.12),rgba(90,10,166,0.14))] text-plum">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Careers */}
        <section id="careers" className="py-24 sm:py-32" aria-labelledby="careers-title">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="kicker mb-6">Careers</p>
                <h2 id="careers-title" className="display display-md max-w-[14ch]">
                  Build what comes next with us.
                </h2>
                <p className="lede mt-6 max-w-[48ch]">
                  We are always looking for engineers, Odoo consultants, QA specialists and designers who care about building
                  things that businesses rely on every day.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`mailto:${SITE.careersEmail}?subject=${encodeURIComponent("Application")}`}>
                    Send your CV
                  </Button>
                  <Button href="#life" variant="secondary" arrow={false}>
                    See life at QWY
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="rounded-[var(--radius-panel)] border border-line bg-white p-8">
                  <p className="flex items-center gap-2 text-[14px] font-semibold">
                    <Sparkles className="size-4 text-plum" aria-hidden /> Why people join QWY
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {PERKS.map((p) => (
                      <li key={p} className="flex gap-3 text-[0.975rem] leading-relaxed text-ink-soft">
                        <Briefcase className="mt-1 size-4 shrink-0 text-mute" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 space-y-2.5 border-t border-line pt-6 text-[14px] text-ink-soft">
                    <p className="flex gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-mute" aria-hidden />
                      {SITE.address.street}, {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                    </p>
                    <p className="flex gap-2.5">
                      <Mail className="mt-0.5 size-4 shrink-0 text-mute" aria-hidden />
                      <a href={`mailto:${SITE.careersEmail}`} className="hover:text-plum">
                        {SITE.careersEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
