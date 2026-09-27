/**
 * Free Career Webinar configuration.
 * Set `schedule` once a date is confirmed; until then the UI says details are
 * shared after registration (and no Event structured data is emitted).
 */

export const webinar = {
  eyebrow: "Free Career Masterclass",
  title: "The Hidden Job Market",
  subtitle: "Careers Beyond Coding",
  copy: "Before choosing another course, understand the career opportunities available on the business side of technology.",
  topics: [
    "Business Development",
    "Sales",
    "Customer Success",
    "Account Management",
    "How revenue teams work",
    "Skills companies look for",
    "How fresh graduates can prepare",
  ],
  format: "Live online session · Free",
  schedule: null as null | { startISO: string; durationMinutes: number; label: string },
  scheduleFallback: "Next session date and joining details are shared after you register.",
  success: {
    title: "You're Registered.",
    body: "We've received your registration. Webinar details will be shared using the contact information you provided.",
  },
};

export const degreeOptions = [
  "B.E / B.Tech",
  "B.Com",
  "BBA / BBM",
  "BCA",
  "B.Sc",
  "BA",
  "MBA / PGDM",
  "M.Com / M.Sc / MA",
  "Other",
] as const;

export const graduationYearOptions = ["2023 or earlier", "2024", "2025", "2026", "2027", "2028"] as const;

export const statusOptions = [
  "Final-Year Student",
  "Looking for Job",
  "Currently Working",
  "Career Switch",
] as const;
