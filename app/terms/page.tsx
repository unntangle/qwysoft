import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>This page will hold QWY Software&rsquo;s terms of use. Replace this text with the approved terms before launch.</p>
    </LegalPage>
  );
}
