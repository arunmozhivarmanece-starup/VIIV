"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { discoveryRoles } from "@/content/careers";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Section";

const CYCLE_MS = 4200;

/**
 * Original "role explorer" simulation — a search that reveals what each
 * business role involves. Intentionally shows NO job counts, salaries or
 * company names.
 */
export function HiddenJobMarket() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState({ query: discoveryRoles[0].query, n: discoveryRoles[0].query.length });
  const [auto, setAuto] = useState(true);

  const role = discoveryRoles[active];

  // Auto-cycle through roles while visible (paused after user interaction).
  useEffect(() => {
    if (!inView || !auto || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % discoveryRoles.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, inView, auto, reduce]);

  // Typing effect for the search query (skipped for reduced motion).
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyping({ query: role.query, n: i });
      if (i >= role.query.length) clearInterval(t);
    }, 38);
    return () => clearInterval(t);
  }, [role.query, reduce]);

  const typed = reduce ? role.query.length : typing.query === role.query ? typing.n : 0;
  const done = typed >= role.query.length;

  return (
    <section aria-labelledby="hidden-market-title" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>The hidden job market</Eyebrow>
          <h2
            id="hidden-market-title"
            className="mt-4 text-[2rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            There&rsquo;s a side of the job market many graduates never explore.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Try searching for roles you may never have typed into a job portal. Pick one to see what it involves.
          </p>

          <div role="group" aria-label="Choose a role to explore" className="mt-8 flex flex-wrap gap-2">
            {discoveryRoles.map((r, i) => (
              <button
                key={r.query}
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setAuto(false);
                  setActive(i);
                }}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium ring-1 transition-colors",
                  i === active ? "bg-ink text-paper ring-ink" : "bg-white text-ink ring-line hover:ring-ink/40",
                )}
              >
                {r.query}
              </button>
            ))}
          </div>
        </div>

        {/* Explorer panel */}
        <div ref={ref} className="relative">
          <div className="rounded-[1.75rem] bg-ink p-4 shadow-lift sm:p-6">
            <div className="flex items-center gap-3 rounded-2xl bg-ink-3 px-4 py-3.5 text-paper ring-1 ring-ink-line">
              <Icon name="search" className="text-muted-dark" />
              <span className="font-medium" aria-hidden>
                {role.query.slice(0, typed)}
                <span className={cn("ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-accent", done && "animate-pulse")} />
              </span>
              <span className="sr-only" aria-live="polite">
                Showing: {role.query}
              </span>
              <span className="ml-auto hidden rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-muted-dark sm:inline">
                Role explorer
              </span>
            </div>

            <div className="relative mt-4 min-h-[17rem] sm:min-h-[15rem]">
              <AnimatePresence mode="wait">
                {done && (
                  <m.div
                    key={role.query}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl bg-paper p-5 text-ink sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {["Business side", "Customer-facing", "No coding required"].map((t) => (
                        <span key={t} className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold text-ink/80">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{role.query}</h3>
                    <p className="mt-2 text-muted">{role.focus}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Skills that matter</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {role.skills.map((s) => (
                        <li key={s} className="rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent-ink">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Role progress */}
            <div aria-hidden className="mt-4 flex gap-1.5">
              {discoveryRoles.map((r, i) => (
                <span key={r.query} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className={cn("block h-full rounded-full bg-accent transition-all", i === active ? "w-full" : "w-0")}
                    style={{ transitionDuration: i === active && auto && !reduce ? `${CYCLE_MS}ms` : "300ms" }}
                  />
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Illustrative role explorer. Job availability varies by role, location, experience and market conditions.
          </p>
        </div>
      </div>

      <Reveal className="container-x mt-16 lg:mt-24">
        <p className="mx-auto max-w-4xl text-center font-display text-3xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Technology companies don&rsquo;t <span className="text-accent-ink">only</span> hire developers.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-muted">
          They also need people who can find customers, understand their problems and help them succeed.
        </p>
      </Reveal>
    </section>
  );
}
