"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires `event` once when the element is at least `threshold` visible. */
export function useTrackView<T extends HTMLElement>(event: AnalyticsEvent, threshold = 0.4) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track(event);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event, threshold]);
  return ref;
}
