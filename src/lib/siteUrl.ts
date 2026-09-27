/**
 * Resolve the public site URL. Tolerates empty / protocol-less values so a
 * blank env var can never break the build. Order: NEXT_PUBLIC_SITE_URL →
 * Vercel production domain → Vercel deployment URL → localhost.
 */
export function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // ignore invalid values and try the next candidate
    }
  }
  return "http://localhost:3000";
}
