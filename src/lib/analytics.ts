/**
 * Provider-agnostic analytics.
 *
 * Components call `track(event, params)`. Events are pushed to `window.dataLayer`
 * (GTM-compatible) and forwarded to GA4 / Meta Pixel when their scripts are loaded
 * (see components/Analytics.tsx). No credentials live in code — IDs come from env.
 */

export type AnalyticsEvent =
  | "webinar_cta_click"
  | "full_stack_sales_click"
  | "career_path_click"
  | "why_sales_view"
  | "curriculum_interaction"
  | "webinar_form_start"
  | "webinar_form_submit"
  | "founder_section_view"
  | "faq_interaction";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Gtag = (command: "event", name: string, params?: AnalyticsParams) => void;
type Fbq = (command: "track" | "trackCustom", name: string, params?: AnalyticsParams) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/** Meta standard events for conversions that matter to ad optimisation. */
const metaStandardEvents: Partial<Record<AnalyticsEvent, string>> = {
  webinar_form_submit: "Lead",
  webinar_cta_click: "ViewContent",
};

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });

  window.gtag?.("event", event, params);

  if (window.fbq) {
    const standard = metaStandardEvents[event];
    if (standard) window.fbq("track", standard, params);
    else window.fbq("trackCustom", event, params);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
