"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { transformation } from "@/content/program";
import { cn } from "@/lib/cn";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Section";

const SUMMARY = ["Degree", "Skills", "Proof", "Career"];

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return desktop;
}

/**
 * Signature brand visual. Desktop: pinned, scroll-driven progression through
 * each stage. Mobile / reduced motion: a static vertical timeline.
 */
export function CareerTransformation() {
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const scrollDriven = desktop && !reduce;

  return (
    <section aria-labelledby="transform-title" className="bg-ink-2 text-paper">
      {scrollDriven ? <Pinned /> : <Static />}
    </section>
  );
}

function Heading() {
  return (
    <>
      <Eyebrow dark>The VIIV transformation</Eyebrow>
      <h2 id="transform-title" className="mt-4 text-[2rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl">
        Your degree got you here.
        <br />
        <span className="text-accent-bright">Your skills take you forward.</span>
      </h2>
    </>
  );
}

function Summary({ className }: { className?: string }) {
  return (
    <p className={cn("font-display text-xl font-semibold tracking-tight sm:text-2xl", className)}>
      {SUMMARY.map((w, i) => (
        <span key={w}>
          {i > 0 && <span className="mx-2 text-accent-bright sm:mx-3">→</span>}
          {w}
        </span>
      ))}
    </p>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = transformation.length;
  const fill = useTransform(scrollYProgress, [0.05, 0.92], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(((v - 0.05) / 0.87) * n))));
  });

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-x grid w-full grid-cols-[1fr_1.1fr] items-center gap-16">
          <div>
            <Heading />
            <Summary className="mt-10 text-muted-dark" />
          </div>

          <div className="relative">
            <div aria-hidden className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded bg-white/10">
              <m.div className="w-full rounded bg-accent" style={{ height: fill }} />
            </div>
            <ol className="space-y-1">
              {transformation.map((s, i) => {
                const state = i < active ? "past" : i === active ? "active" : "future";
                return (
                  <li key={s.stage} className="relative flex items-center gap-6 py-1.5" aria-current={state === "active" ? "step" : undefined}>
                    <span
                      className={cn(
                        "relative z-10 size-6 shrink-0 rounded-full ring-4 ring-ink-2 transition-colors duration-300",
                        state === "future" ? "bg-ink-line" : "bg-accent",
                      )}
                    />
                    <div className="transition-all duration-500" style={{ opacity: state === "future" ? 0.5 : state === "past" ? 0.7 : 1 }}>
                      <p
                        className={cn(
                          "font-display font-semibold tracking-tight uppercase transition-[font-size] duration-500",
                          state === "active" ? "text-4xl xl:text-5xl" : "text-xl",
                          state === "active" && i === n - 1 && "text-accent-bright",
                        )}
                      >
                        {s.stage}
                      </p>
                      <p className={cn("text-muted-dark transition-all duration-500", state === "active" ? "mt-1 max-h-10 opacity-100" : "max-h-0 overflow-hidden opacity-0")}>
                        {s.line}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Static() {
  return (
    <div className="container-x py-20 sm:py-24">
      <Heading />
      <ol className="relative mt-10 space-y-2">
        <span aria-hidden className="absolute top-4 bottom-4 left-[11px] w-0.5 bg-gradient-to-b from-white/15 to-accent" />
        {transformation.map((s, i) => (
          <Reveal as="li" key={s.stage} className="relative flex gap-5 py-2">
            <span
              className={cn(
                "relative z-10 mt-1 size-6 shrink-0 rounded-full ring-4 ring-ink-2",
                i === transformation.length - 1 ? "bg-accent" : "bg-ink-line",
              )}
            />
            <div>
              <p className={cn("font-display text-xl font-semibold tracking-tight uppercase", i === transformation.length - 1 && "text-accent-bright")}>
                {s.stage}
              </p>
              <p className="text-sm text-muted-dark">{s.line}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Summary className="mt-10 border-t border-ink-line pt-8" />
    </div>
  );
}
