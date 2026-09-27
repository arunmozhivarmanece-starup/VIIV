import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <PlaceholderPage eyebrow="Legal" title="Privacy Policy">
      <p>
        [Placeholder — legal review required.] The full privacy policy for {site.fullBrand} ({site.legalName}) will be
        published here, including how webinar registration details are collected, used and stored.
      </p>
    </PlaceholderPage>
  );
}
