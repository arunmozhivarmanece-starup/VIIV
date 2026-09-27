/**
 * Webinar registration schema + validation, shared by the client form and the
 * API route so both enforce identical rules.
 */

import { degreeOptions, graduationYearOptions, statusOptions } from "@/content/webinar";

export type Registration = {
  name: string;
  mobile: string;
  email: string;
  degree: string;
  graduationYear: string;
  status: string;
  consent: boolean;
};

/** Attribution captured alongside a registration (UTMs, CTA source). */
export type Attribution = {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page?: string;
};

export type RegistrationErrors = Partial<Record<keyof Registration, string>>;

export const emptyRegistration: Registration = {
  name: "",
  mobile: "",
  email: "",
  degree: "",
  graduationYear: "",
  status: "",
  consent: false,
};

/** Normalise an Indian mobile number to 10 digits (strips +91 / 0 / spaces). */
export function normaliseMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRegistration(data: Registration): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const name = data.name.trim();
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 80) errors.name = "Name is too long.";

  if (!/^[6-9]\d{9}$/.test(normaliseMobile(data.mobile)))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address.";

  if (!(degreeOptions as readonly string[]).includes(data.degree)) errors.degree = "Select your degree.";

  if (!(graduationYearOptions as readonly string[]).includes(data.graduationYear))
    errors.graduationYear = "Select your graduation year.";

  if (!(statusOptions as readonly string[]).includes(data.status)) errors.status = "Select your current status.";

  if (data.consent !== true) errors.consent = "Please agree so we can share webinar details with you.";

  return errors;
}

export function readAttribution(source?: string): Attribution {
  if (typeof window === "undefined") return { source };
  const params = new URLSearchParams(window.location.search);
  const pick = (k: string) => params.get(k)?.slice(0, 120) || undefined;
  return {
    source,
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    referrer: document.referrer ? document.referrer.slice(0, 200) : undefined,
    page: window.location.pathname,
  };
}
