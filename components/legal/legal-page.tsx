import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

/** Minimal shell for legal pages. REPLACE the body with counsel-approved text. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Link href="/" aria-label="QWY Software home">
          <Logo />
        </Link>
        <h1 className="display display-md mt-20">{title}</h1>
        <div className="mt-10 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">{children}</div>
      </Container>
    </main>
  );
}
