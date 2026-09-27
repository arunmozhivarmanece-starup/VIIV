/**
 * Brand, navigation and CTA configuration.
 * Everything customer-facing that is likely to change lives in /src/content.
 */

export const site = {
  brand: "VIIV",
  brandSuffix: "by Varman",
  fullBrand: "VIIV by Varman",
  /** Legal / institutional name — shown only in the footer and legal pages. */
  legalName: "Varman Institute of Innovation & Venture Building",
  tagline: "Build Skills. Prove Skills. Launch Your Career.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://viiv.example",
  locale: "en_IN",
  seo: {
    title: "VIIV by Varman — Careers Beyond Coding | Full-Stack Sales Program",
    description:
      "Graduated and still looking for the right job? Discover business careers in tech — Business Development, Sales, Customer Success — and build practical, job-ready skills with VIIV Full-Stack Sales. Join the free career webinar.",
  },
  contact: {
    // Add verified contact details when available. Empty values are not rendered.
    email: "",
    phone: "",
    whatsapp: "",
  },
  social: {
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

/** Section anchors used across navigation, CTAs and analytics. */
export const anchors = {
  careers: "careers",
  whySales: "why-sales",
  fullStackSales: "full-stack-sales",
  curriculum: "curriculum",
  method: "how-it-works",
  founder: "about",
  webinar: "webinar",
  faq: "faq",
} as const;

export const nav = [
  { label: "Careers", href: `#${anchors.careers}` },
  { label: "Why Sales", href: `#${anchors.whySales}` },
  { label: "Full-Stack Sales", href: `#${anchors.fullStackSales}` },
  { label: "How It Works", href: `#${anchors.method}` },
  { label: "About", href: `#${anchors.founder}` },
] as const;

export const ctas = {
  webinar: "Join Free Career Webinar",
  webinarShort: "Join Free Webinar",
  webinarReserve: "Reserve My Free Seat",
  explore: "Explore Full-Stack Sales",
} as const;

export const footer = {
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Careers Beyond Coding", href: `/#${anchors.careers}` },
        { label: "Why Sales", href: `/#${anchors.whySales}` },
        { label: "Full-Stack Sales", href: `/#${anchors.fullStackSales}` },
        { label: "The VIIV Method", href: `/#${anchors.method}` },
      ],
    },
    {
      title: "Get Started",
      links: [
        { label: "Free Career Webinar", href: `/#${anchors.webinar}` },
        { label: "FAQ", href: `/#${anchors.faq}` },
        { label: "About the Founder", href: `/#${anchors.founder}` },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
      ],
    },
  ],
} as const;
