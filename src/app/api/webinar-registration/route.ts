import { NextResponse } from "next/server";
import { validateRegistration, normaliseMobile, type Attribution, type Registration } from "@/lib/registration";

/**
 * Webinar registration endpoint.
 *
 * Validates server-side with the same rules as the client, then forwards to
 * WEBINAR_WEBHOOK_URL (CRM / WhatsApp / email automation) when configured.
 * Integrations are intentionally left as a single webhook hand-off so any
 * provider can be plugged in without changing the UI.
 */
export async function POST(request: Request) {
  let body: { registration?: Partial<Registration>; attribution?: Attribution; hp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → almost certainly a bot. Respond as success, store nothing.
  if (body.hp) return NextResponse.json({ ok: true });

  const r = body.registration ?? {};
  const registration: Registration = {
    name: String(r.name ?? "").trim().slice(0, 80),
    mobile: normaliseMobile(String(r.mobile ?? "")),
    email: String(r.email ?? "").trim().slice(0, 120),
    degree: String(r.degree ?? ""),
    graduationYear: String(r.graduationYear ?? ""),
    status: String(r.status ?? ""),
    consent: r.consent === true,
  };

  const errors = validateRegistration(registration);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const a = body.attribution ?? {};
  const attribution: Attribution = Object.fromEntries(
    Object.entries(a)
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, (v as string).slice(0, 200)]),
  );

  const payload = {
    type: "webinar_registration",
    receivedAt: new Date().toISOString(),
    registration,
    attribution,
  };

  const webhook = process.env.WEBINAR_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[webinar-registration] forwarding failed", err);
      return NextResponse.json({ ok: false, error: "forwarding_failed" }, { status: 502 });
    }
  } else {
    // No integration configured yet — log without personal data.
    console.info("[webinar-registration] received (no WEBINAR_WEBHOOK_URL configured)", {
      degree: registration.degree,
      graduationYear: registration.graduationYear,
      status: registration.status,
      source: attribution.source,
    });
  }

  return NextResponse.json({ ok: true });
}
