"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { salesProcess } from "@/content/program";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const STEP_MS = 2600;

/** Signature visual: the seven-stage sales conversation, animated as a pipeline. */
export function SalesProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = salesProcess.length;

  useEffect(() => {
    if (!inView || !auto || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => clearTimeout(t);
  }, [active, inView, auto, reduce, n]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
    track("curriculum_interaction", { process_step: salesProcess[i].step, via: "sales_process" });
  };

  const progress = (active / (n - 1)) * 100;

  return (
    <div ref={ref} className="mt-20 overflow-hidden rounded-[1.75rem] bg-ink p-6 text-paper sm:p-10 lg:mt-28 lg:p-14">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">The sales conversation</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Seven stages. One complete skill.
          </h3>
        </div>
        <p className="max-w-sm text-muted-dark">
          Full-Stack Sales trains every stage of a real customer conversation — not just the pitch.
        </p>
      </div>

      {/* Desktop horizontal pipeline */}
      <div className="relative mt-12 hidden md:block">
        <div aria-hidden className="absolute top-5 right-[7%] left-[7%] h-0.5 rounded bg-white/10">
          <div className="h-full rounded bg-accent transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <ol className="relative grid grid-cols-7 gap-2">
          {salesProcess.map((s, i) => (
            <li key={s.step} className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => choose(i)}
                aria-current={i === active ? "step" : undefined}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full font-display text-sm font-semibold ring-4 ring-ink transition-colors duration-300",
                    i < active && "bg-accent/80 text-ink",
                    i === active && "scale-110 bg-accent text-ink",
                    i > active && "bg-ink-3 text-muted-dark group-hover:bg-ink-line",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-sm leading-tight font-semibold transition-colors", i === active ? "text-paper" : "text-muted-dark")}>
                  {s.step}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-10 min-h-16 rounded-2xl bg-white/[0.04] px-6 py-5 ring-1 ring-white/10" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-lg"
            >
              <span className="font-semibold text-accent-bright">{salesProcess[active].step}: </span>
              {salesProcess[active].detail}
            </m.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile vertical pipeline — all detail visible, active stage highlighted */}
      <ol className="relative mt-8 space-y-1 md:hidden">
        <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-0.5 bg-white/10" />
        {salesProcess.map((s, i) => (
          <li key={s.step} className="relative flex gap-4 py-2">
            <span
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ring-4 ring-ink transition-colors duration-300",
                i <= active ? "bg-accent text-ink" : "bg-ink-3 text-muted-dark",
              )}
            >
              {i + 1}
            </span>
            <div className="pt-1.5">
              <p className={cn("font-semibold", i === active ? "text-paper" : "text-paper/85")}>{s.step}</p>
              <p className="mt-0.5 text-sm text-muted-dark">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
