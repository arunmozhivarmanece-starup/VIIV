import { anchors } from "@/content/site";
import { viivMethod } from "@/content/program";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

export function VIIVMethod() {
  return (
    <Section id={anchors.method} tone="light" labelledBy="method-title">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading id="method-title" eyebrow="How it works" title="The VIIV Method" />
        <Reveal>
          <p className="font-display text-xl leading-snug font-semibold tracking-tight sm:text-2xl lg:text-right">
            Your degree shows what you studied.
            <br />
            <span className="text-accent-ink">Your skills show what you can do.</span>
          </p>
        </Reveal>
      </div>

      <Stagger as="ol" className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-5 lg:gap-0 lg:overflow-hidden lg:rounded-[var(--radius-card)] lg:ring-1 lg:ring-line">
        {viivMethod.map((s, i) => {
          const last = i === viivMethod.length - 1;
          return (
            <StaggerItem
              as="li"
              key={s.stage}
              className={cn(
                "group relative flex gap-5 overflow-hidden rounded-[var(--radius-card)] p-5 ring-1 ring-line lg:flex-col lg:rounded-none lg:p-7 lg:ring-0",
                "lg:border-l lg:border-line lg:first:border-l-0",
                last ? "bg-ink text-paper ring-ink" : "bg-white",
              )}
            >
              <span
                aria-hidden
                data-n={`0${i + 1}`}
                className={cn(
                  "font-display text-5xl leading-none font-bold tracking-tighter before:content-[attr(data-n)] lg:text-7xl",
                  last ? "text-accent" : "text-ink/10 transition-colors group-hover:text-accent",
                )}
              />
              <div className="lg:mt-16">
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight uppercase">{s.stage}</h3>
                <p className={cn("mt-1 font-medium", last ? "text-paper" : "text-ink")}>{s.line}</p>
                <p className={cn("mt-2 text-sm leading-relaxed", last ? "text-muted-dark" : "text-muted")}>{s.detail}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      <p className="mt-6 text-center font-display text-sm font-semibold tracking-[0.2em] text-muted uppercase" aria-hidden>
        Discover → Learn → Practice → Prove → Launch
      </p>
    </Section>
  );
}
