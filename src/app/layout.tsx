import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { Providers } from "@/components/Providers";
import { site } from "@/content/site";
import "./globals.css";

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.fullBrand}`,
  },
  description: site.seo.description,
  applicationName: site.fullBrand,
  keywords: [
    "sales career",
    "business development career",
    "sales jobs for freshers",
    "non-coding careers in tech",
    "jobs after graduation",
    "career options after engineering",
    "Full-Stack Sales",
    "sales training India",
    "customer success career",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.fullBrand,
    title: "Graduated. Still looking for the right job? | VIIV by Varman",
    description:
      "Discover business careers beyond coding and build practical sales skills with VIIV Full-Stack Sales. Join the free career webinar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers Beyond Coding | VIIV by Varman",
    description: "Build skills. Prove skills. Launch your career. Join the free career webinar.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${bricolage.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
