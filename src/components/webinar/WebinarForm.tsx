"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ctas } from "@/content/site";
import { degreeOptions, graduationYearOptions, statusOptions, webinar } from "@/content/webinar";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  emptyRegistration,
  normaliseMobile,
  readAttribution,
  validateRegistration,
  type Registration,
  type RegistrationErrors,
} from "@/lib/registration";
import { Arrow, buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "mt-1.5 block w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/40";

export function WebinarForm({
  source,
  idPrefix,
  autoFocus,
  dark,
}: {
  source: string;
  idPrefix: string;
  autoFocus?: boolean;
  dark?: boolean;
}) {
  const uid = useId();
  const id = (name: string) => `${idPrefix}-${uid}-${name}`;
  const [data, setData] = useState<Registration>(emptyRegistration);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  function update<K extends keyof Registration>(key: K, value: Registration[K]) {
    if (!started.current) {
      started.current = true;
      track("webinar_form_start", { form_location: source });
    }
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateRegistration(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/webinar-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration: { ...data, mobile: normaliseMobile(data.mobile), email: data.email.trim(), name: data.name.trim() },
          attribution: readAttribution(source),
          hp: honeypot.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      track("webinar_form_submit", {
        form_location: source,
        degree: data.degree,
        graduation_year: data.graduationYear,
        current_status: data.status,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const labelClass = cn("block text-sm font-medium", dark ? "text-paper" : "text-ink");
  const errorClass = "mt-1.5 text-sm font-medium text-[#b42318]";
  const border = (key: keyof Registration) => (errors[key] ? "border-[#b42318]" : "border-line");

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className={cn("rounded-2xl p-6 text-center", dark ? "bg-white/5" : "bg-sand")}>
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-ink">
          <Icon name="check" className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold">{webinar.success.title}</h3>
        <p className={cn("mt-2", dark ? "text-muted-dark" : "text-muted")}>{webinar.success.body}</p>
      </div>
    );
  }

  const describedBy = (key: keyof Registration) => (errors[key] ? id(`${key}-error`) : undefined);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-4" aria-describedby={id("note")}>
      {/* Spam honeypot — invisible to people and assistive tech */}
      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div>
        <label htmlFor={id("name")} className={labelClass}>
          Full name
        </label>
        <input
          id={id("name")}
          name="name"
          autoComplete="name"
          autoFocus={autoFocus}
          className={cn(fieldBase, "h-12", border("name"))}
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          required
        />
        {errors.name && <p id={id("name-error")} className={errorClass}>{errors.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("mobile")} className={labelClass}>
            Mobile number
          </label>
          <div className="relative">
            <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 mt-[3px] -translate-y-1/2 text-base text-muted">
              +91
            </span>
            <input
              id={id("mobile")}
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={14}
              className={cn(fieldBase, "h-12 pl-13", border("mobile"))}
              value={data.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              aria-invalid={!!errors.mobile}
              aria-describedby={describedBy("mobile")}
              required
            />
          </div>
          {errors.mobile && <p id={id("mobile-error")} className={errorClass}>{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={cn(fieldBase, "h-12", border("email"))}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            required
          />
          {errors.email && <p id={id("email-error")} className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor={id("degree")} className={labelClass}>
            Degree
          </label>
          <select
            id={id("degree")}
            name="degree"
            className={cn(fieldBase, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23595c68%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10", border("degree"))}
            value={data.degree}
            onChange={(e) => update("degree", e.target.value)}
            aria-invalid={!!errors.degree}
            aria-describedby={describedBy("degree")}
            required
          >
            <option value="" disabled>
              Select degree
            </option>
            {degreeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {errors.degree && <p id={id("degree-error")} className={errorClass}>{errors.degree}</p>}
        </div>
        <div>
          <label htmlFor={id("graduationYear")} className={labelClass}>
            Graduation year
          </label>
          <select
            id={id("graduationYear")}
            name="graduationYear"
            className={cn(fieldBase, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23595c68%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10", border("graduationYear"))}
            value={data.graduationYear}
            onChange={(e) => update("graduationYear", e.target.value)}
            aria-invalid={!!errors.graduationYear}
            aria-describedby={describedBy("graduationYear")}
            required
          >
            <option value="" disabled>
              Select year
            </option>
            {graduationYearOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {errors.graduationYear && (
            <p id={id("graduationYear-error")} className={errorClass}>{errors.graduationYear}</p>
          )}
        </div>
      </div>

      <fieldset aria-describedby={describedBy("status")}>
        <legend className={labelClass}>Current status</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {statusOptions.map((o) => {
            const checked = data.status === o;
            return (
              <label
                key={o}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm leading-tight transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                  checked
                    ? "border-ink bg-ink text-paper"
                    : cn(dark ? "border-white/15 text-paper hover:border-white/40" : "border-line bg-white hover:border-ink/40", errors.status && "border-[#b42318]"),
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value={o}
                  checked={checked}
                  onChange={() => update("status", o)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    checked ? "border-accent bg-accent" : "border-current opacity-50",
                  )}
                >
                  {checked && <span className="size-1.5 rounded-full bg-ink" />}
                </span>
                {o}
              </label>
            );
          })}
        </div>
        {errors.status && <p id={id("status-error")} className={errorClass}>{errors.status}</p>}
      </fieldset>

      <div>
        <label className={cn("flex items-start gap-3 text-sm leading-snug", dark ? "text-muted-dark" : "text-muted")}>
          <input
            type="checkbox"
            name="consent"
            checked={data.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[#ff6b1a]"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
          />
          <span>
            I agree to be contacted by VIIV by Varman about this webinar and related programs. See our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-accent-ink">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && <p id={id("consent-error")} className={errorClass}>{errors.consent}</p>}
      </div>

      <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "lg", "w-full")}>
        {status === "submitting" ? "Reserving your seat…" : ctas.webinarReserve}
        {status !== "submitting" && <Arrow />}
      </button>

      <div aria-live="assertive">
        {status === "error" && (
          <p className={errorClass}>
            Something went wrong and your registration was not saved. Please check your connection and try again.
          </p>
        )}
      </div>
      <p id={id("note")} className={cn("text-center text-xs", dark ? "text-muted-dark" : "text-muted")}>
        Free to attend. No payment required.
      </p>
    </form>
  );
}
