import { careerReadiness } from "@/content/program";
import { Icon } from "../ui/Icon";
import { Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

export function CareerReadiness() {
  return (
    <Section tone="light" labelledBy="readiness-title">
      <SectionHeading
        id="readiness-title"
        eyebrow="Career readiness"
        title="Learning the skill is only part of the journey."
        lede="Full-Stack Sales also helps you present yourself, prepare for interviews and approach your job search with a plan."
      />

      <Stagger as="ol" className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
        {careerReadiness.map((stage, i) => (
          <StaggerItem
            as="li"
            key={stage.stage}
            className="relative rounded-[var(--radius-card)] bg-white p-6 shadow-card ring-1 ring-line"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-ink">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{stage.stage}</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {stage.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] text-ink/85">
                  <Icon name="check" className="size-4 text-accent-ink" />
                  {item}
                </li>
              ))}
            </ul>
            {i < careerReadiness.length - 1 && (
              <Icon
                name="chevron"
                className="absolute top-1/2 -right-3.5 z-10 hidden size-5 -translate-y-1/2 -rotate-90 rounded-full bg-paper text-muted lg:block"
              />
            )}
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-8 flex items-start gap-2 text-sm text-muted">
        <Icon name="shield" className="mt-0.5 size-4" />
        VIIV does not promise placement. We focus on helping you become prepared for the opportunities you pursue.
      </p>
    </Section>
  );
}
