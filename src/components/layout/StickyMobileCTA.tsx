"use client";

import { useEffect, useState } from "react";
import { anchors, ctas } from "@/content/site";
import { cn } from "@/lib/cn";
import { WebinarCTA } from "../CTAs";

/**
 * Persistent mobile CTA. Appears once the hero CTA has scrolled away and hides
 * while the webinar section or footer is on screen, so it never duplicates a
 * visible CTA or covers the form. The page reserves bottom padding for it.
 */
export function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const targets = [document.getElementById(anchors.webinar), document.getElementById("site-footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();

    const heroObserver = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    if (hero) heroObserver.observe(hero);

    const blockObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => blockObserver.observe(t));

    return () => {
      heroObserver.disconnect();
      blockObserver.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <WebinarCTA location="sticky_mobile" label={ctas.webinarShort} size="md" className="h-12 w-full text-base" />
    </div>
  );
}
