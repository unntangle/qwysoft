import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>This page will hold QWY Software&rsquo;s privacy policy. Replace this text with the approved policy before launch.</p>
      <p>For privacy questions, write to reachus@qwysoft.com.</p>
    </LegalPage>
  );
}
