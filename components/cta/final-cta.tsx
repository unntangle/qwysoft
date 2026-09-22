import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Kasavu } from "@/components/ui/kasavu";
import { SITE } from "@/lib/constants";

export function FinalCta() {
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Free consultation request")}`;
  return (
    <section id="contact" className="px-3 pb-3 sm:px-4 sm:pb-4" aria-labelledby="contact-title">
      <div data-nav="dark" className="grain relative overflow-hidden rounded-[32px] bg-indigo text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#1d1745_0%,#120c28_100%)]" />
          <div className="grid-night absolute inset-0 [mask-image:radial-gradient(60%_70%_at_50%_40%,black,transparent)]" />
          <div className="animate-drift absolute left-1/2 top-[-30%] h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,152,242,0.55),rgba(115,87,232,0.2)_50%,transparent_75%)] blur-2xl" />
          <div className="absolute bottom-[-40%] left-[10%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(238,118,54,0.25),transparent_70%)] blur-2xl" />
        </div>

        <Container className="relative py-28 text-center sm:py-40">
          <Kasavu className="mx-auto mb-12 max-w-[96px] opacity-80" />
          <h2 id="contact-title" className="display display-lg mx-auto max-w-[15ch]">
            Build the intelligence layer for your business.
          </h2>
          <p className="lede mx-auto mt-7 max-w-[52ch] text-white/65">
            Tell us how your business runs today. In one free session we will map what to connect, what to automate and what
            to build first.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={mail} variant="light" size="lg">
              Get started
            </Button>
            <Button href={SITE.phoneHref} variant="ghost-light" size="lg" arrow={false}>
              Talk to sales
            </Button>
          </div>

          <ul className="mx-auto mt-16 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-[14.5px] text-white/65">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4" aria-hidden /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4" aria-hidden /> {SITE.email}
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
