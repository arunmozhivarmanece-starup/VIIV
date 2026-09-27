"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { anchors } from "@/content/site";
import { salesModules } from "@/content/program";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";
import { Section, SectionHeading } from "../ui/Section";
import { SalesProcess } from "./SalesProcess";

/**
 * The Full-Stack Sales framework: 8 modules.
 * Desktop — vertical tabs + detail panel. Mobile — accordion.
 */
export function SalesStack() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, via: string) => {
    setActive(i);
    track("curriculum_interaction", { module: salesModules[i].title, via });
  };

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const n = salesModules.length;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next !== null) {
      e.preventDefault();
      select(next, "keyboard");
      tabs.current[next]?.focus();
    }
  };

  const mod = salesModules[active];

  return (
    <Section id={anchors.curriculum} tone="light" labelledBy="curriculum-title">
      <SectionHeading
        id="curriculum-title"
        eyebrow="The Full-Stack Sales framework"
        title="From first conversation to customer conversion — and your career."
        lede="Eight connected modules that take you through the complete modern sales journey, including the technology and career skills around it."
      />

      {/* Desktop tabs */}
      <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-[22rem_1fr]">
        <div role="tablist" aria-orientation="vertical" aria-label="Full-Stack Sales modules" className="flex flex-col gap-1">
          {salesModules.map((s, i) => (
            <button
              key={s.number}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`fss-tab-${i}`}
              aria-selected={i === active}
              aria-controls="fss-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i, "click")}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors",
                i === active ? "bg-ink text-paper" : "text-ink hover:bg-sand",
              )}
            >
              <span className={cn("font-display text-sm font-semibold", i === active ? "text-accent-bright" : "text-muted")}>
                {s.number}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">{s.title}</span>
              <Icon
                name="chevron"
                className={cn("ml-auto size-4 -rotate-90 transition-opacity", i === active ? "opacity-100" : "opacity-0 group-hover:opacity-40")}
              />
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="fss-panel"
          aria-labelledby={`fss-tab-${active}`}
          tabIndex={0}
          className="relative overflow-hidden rounded-[1.75rem] bg-sand p-10 xl:p-12"
        >
          <span
            aria-hidden
            data-n={mod.number}
            className="pointer-events-none absolute -top-6 right-6 font-display text-[10rem] leading-none font-bold tracking-tighter text-ink/[0.05] before:content-[attr(data-n)]"
          />
          <AnimatePresence mode="wait">
            <m.div
              key={mod.number}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-semibold text-accent-ink">
                Module {mod.number} of {String(salesModules.length).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">{mod.title}</h3>
              <p className="mt-3 max-w-lg text-lg text-muted">{mod.summary}</p>
              <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-3">
                {mod.topics.map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3.5 font-medium shadow-card">
                    <Icon name="check" className="size-4 text-accent-ink" />
                    {t}
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
          {/* Module progress rail */}
          <div aria-hidden className="absolute right-10 bottom-10 left-10 flex gap-1.5 xl:right-12 xl:left-12">
            {salesModules.map((s, i) => (
              <span key={s.number} className={cn("h-1 flex-1 rounded-full transition-colors", i <= active ? "bg-accent" : "bg-ink/10")} />
            ))}
          </div>
          <div className="h-10" aria-hidden />
        </div>
      </div>

      {/* Mobile accordion */}
      <ol className="mt-10 space-y-2 lg:hidden">
        {salesModules.map((s, i) => {
          const open = openMobile === i;
          return (
            <li key={s.number} className={cn("rounded-2xl ring-1 transition-colors", open ? "bg-ink text-paper ring-ink" : "bg-white ring-line")}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`fss-m-${i}`}
                  onClick={() => {
                    setOpenMobile(open ? null : i);
                    if (!open) track("curriculum_interaction", { module: s.title, via: "accordion" });
                  }}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left"
                >
                  <span className={cn("font-display text-sm font-semibold", open ? "text-accent-bright" : "text-muted")}>{s.number}</span>
                  <span className="font-display text-lg font-semibold tracking-tight">{s.title}</span>
                  <Icon name="plus" className={cn("ml-auto size-5 transition-transform", open && "rotate-45")} />
                </button>
              </h3>
              <div id={`fss-m-${i}`} hidden={!open} className="px-4 pb-5">
                <p className="text-sm text-muted-dark">{s.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.topics.map((t) => (
                    <li key={t} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <SalesProcess />
    </Section>
  );
}
