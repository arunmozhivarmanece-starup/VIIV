"use client";

import { anchors } from "@/content/site";
import { careerPaths } from "@/content/careers";
import { track } from "@/lib/analytics";
import { Icon } from "../ui/Icon";
import { Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";
import { useWebinar } from "../webinar/WebinarProvider";

export function CareerPaths() {
  const { openWebinar } = useWebinar();
  return (
    <Section id={anchors.careers} tone="light" labelledBy="careers-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="careers-title"
          eyebrow="Career paths"
          title="Careers you may not have considered."
          lede="Real roles inside technology companies and growing businesses — built on communication, customer understanding and business thinking."
        />
        <p className="text-sm text-muted lg:max-w-56 lg:text-right">Titles and progression vary by company.</p>
      </div>

      <Stagger
        as="ul"
        className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {careerPaths.map((c, i) => (
          <StaggerItem
            as="li"
            key={c.id}
            className="flex w-[85%] max-w-sm shrink-0 snap-start flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-card ring-1 ring-line transition-shadow hover:shadow-lift sm:w-[60%] lg:w-auto lg:max-w-none"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
              <span aria-hidden className="font-display text-sm font-semibold text-muted">
                0{i + 1}
              </span>
            </div>
            <p className="mt-1 font-medium text-accent-ink">{c.short}</p>

            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">What you do</dt>
                <dd className="mt-1.5 leading-relaxed text-ink/85">{c.whatYouDo}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Skills that matter</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-md bg-sand px-2 py-1 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Typical progression</dt>
                <dd className="mt-2">
                  <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink/80">
                    {c.progression.map((p, j) => (
                      <li key={p} className="inline-flex items-center gap-1.5">
                        {j > 0 && <Icon name="chevron" className="size-3 -rotate-90 text-muted" />}
                        {p}
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                track("career_path_click", { career_path: c.id });
                openWebinar(`career_path_${c.id}`);
              }}
              className="mt-auto inline-flex items-center gap-1.5 pt-6 text-left text-sm font-semibold text-ink underline-offset-4 hover:text-accent-ink hover:underline"
              aria-label={`Learn about ${c.title} careers in the free webinar`}
            >
              Explore this path in the free webinar
              <Icon name="chevron" className="size-4 -rotate-90" />
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
