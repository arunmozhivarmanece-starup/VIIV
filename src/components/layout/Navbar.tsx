"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ctas, nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { WebinarCTA } from "../CTAs";
import { Icon } from "../ui/Icon";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="rounded-md">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WebinarCTA location="navbar" label={ctas.webinarShort} size="md" />
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <div className="container-x flex h-full flex-col py-6">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-3 py-4 font-display text-2xl font-semibold tracking-tight hover:bg-sand"
                >
                  {item.label}
                  <Icon name="chevron" className="-rotate-90 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="text-sm text-muted">Not sure where to start? Begin with the free webinar.</p>
            <div onClick={() => setOpen(false)}>
              <WebinarCTA location="mobile_menu" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
