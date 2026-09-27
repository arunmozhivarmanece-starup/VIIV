import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms of Use", robots: { index: false } };

export default function TermsPage() {
  return (
    <PlaceholderPage eyebrow="Legal" title="Terms of Use">
      <p>
        [Placeholder — legal review required.] Terms of use for {site.fullBrand} ({site.legalName}) will be published
        here.
      </p>
    </PlaceholderPage>
  );
}
