"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

const WebinarModal = dynamic(() => import("./WebinarModal").then((mod) => mod.WebinarModal), { ssr: false });

type WebinarContextValue = {
  /** Opens the registration modal. `source` identifies the CTA for attribution. */
  openWebinar: (source: string) => void;
};

const WebinarContext = createContext<WebinarContextValue | null>(null);

export function WebinarProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);

  const openWebinar = useCallback((cta: string) => {
    track("webinar_cta_click", { cta_location: cta });
    setSource(cta);
  }, []);

  const value = useMemo(() => ({ openWebinar }), [openWebinar]);

  return (
    <WebinarContext.Provider value={value}>
      {children}
      {source !== null && <WebinarModal source={source} onClose={() => setSource(null)} />}
    </WebinarContext.Provider>
  );
}

export function useWebinar() {
  const ctx = useContext(WebinarContext);
  if (!ctx) throw new Error("useWebinar must be used inside <WebinarProvider>");
  return ctx;
}
