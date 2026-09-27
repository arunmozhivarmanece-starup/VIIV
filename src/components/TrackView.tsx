"use client";

import type { ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { useTrackView } from "./useTrackView";

/** Wrapper that lets server components fire a one-time view event. */
export function TrackView({ event, children, className }: { event: AnalyticsEvent; children: ReactNode; className?: string }) {
  const ref = useTrackView<HTMLDivElement>(event, 0.25);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
