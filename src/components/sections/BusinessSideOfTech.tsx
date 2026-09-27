import { businessFunctions } from "@/content/careers";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

/** Positions (percent) for the 7 functions orbiting the company hub on desktop. */
const orbit = Array.from({ length: 7 }, (_, i) => {
  const angle = (-90 + (360 / 7) * i) * (Math.PI / 180);
  return { x: 50 + Math.cos(angle) * 40, y: 50 + Math.sin(angle) * 40 };
});

export function BusinessSideOfTech() {
  return (
    <Section tone="dark" labelledBy="bsot-title" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="bsot-title"
            dark
            eyebrow="The business side of tech"
            title={
              <>
                You don&rsquo;t have to become a developer{" "}
                <span className="text-accent-bright">to build a career in tech.</span>
              </>
            }
            lede="Every growing company runs on two engines: one that builds the product, and one that brings in and keeps customers. The second engine is where business careers live."
          />
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-dark">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2.5 rounded-full bg-accent" /> Business &amp; revenue roles
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2.5 rounded-full bg-white/30" /> Other functions
            </span>
          </div>
        </div>

        {/* Desktop hub-and-spoke */}
        <Reveal className="relative mx-auto hidden aspect-square w-full max-w-[34rem] md:block">
          <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.3" />
            {orbit.map((p, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={businessFunctions[i].highlight ? "var(--color-accent)" : "white"}
                strokeOpacity={businessFunctions[i].highlight ? 0.55 : 0.15}
                strokeWidth="0.35"
                strokeDasharray="1.2 1.2"
                className="animate-dash motion-reduce:animate-none"
              />
            ))}
          </svg>
          <div className="absolute top-1/2 left-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-paper text-center text-ink shadow-[0_0_0_12px_rgb(255_255_255/0.04)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">A growing</span>
            <span className="font-display text-xl font-semibold tracking-tight">Company</span>
          </div>
          <ul>
            {businessFunctions.map((f, i) => (
              <li
                key={f.name}
                className={cn(
                  "absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 text-center ring-1",
                  f.highlight ? "bg-ink-2 ring-accent/50" : "bg-ink-2/80 ring-white/10",
                )}
                style={{ left: `${orbit[i].x}%`, top: `${orbit[i].y}%` }}
              >
                <p className={cn("text-[11px] font-semibold uppercase tracking-[0.12em]", f.highlight ? "text-accent-bright" : "text-paper/70")}>
                  {f.name}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-dark">{f.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Mobile stacked ecosystem */}
        <div className="md:hidden">
          <div className="mx-auto flex w-fit flex-col items-center rounded-full bg-paper px-6 py-3 text-ink">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">A growing</span>
            <span className="font-display text-lg font-semibold">Company</span>
          </div>
          <div aria-hidden className="mx-auto h-6 w-px bg-white/20" />
          <Stagger as="ul" className="grid grid-cols-2 gap-2.5">
            {businessFunctions.map((f, i) => (
              <StaggerItem
                as="li"
                key={f.name}
                className={cn(
                  "rounded-2xl p-3.5 ring-1",
                  f.highlight ? "bg-ink-2 ring-accent/50" : "bg-ink-2/70 ring-white/10",
                  i === businessFunctions.length - 1 && "col-span-2",
                )}
              >
                <p className={cn("text-[11px] font-semibold uppercase tracking-[0.1em]", f.highlight ? "text-accent-bright" : "text-paper/70")}>
                  {f.name}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-muted-dark">{f.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
