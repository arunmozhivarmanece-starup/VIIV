import { skillGap } from "@/content/program";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

export function SkillGap() {
  return (
    <Section tone="light" labelledBy="gap-title">
      <SectionHeading
        id="gap-title"
        eyebrow="The skill gap"
        align="center"
        title={
          <>
            Opportunities exist.
            <br />
            <span className="text-muted">But are you ready for them?</span>
          </>
        }
      />

      <div className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[1fr_auto_1.4fr] lg:items-stretch lg:gap-6">
        <Reveal className="rounded-[var(--radius-card)] bg-sand p-6 sm:p-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">College often measures</h3>
          <ul className="mt-5 space-y-3">
            {skillGap.college.map((s) => (
              <li key={s} className="flex items-center gap-3 font-display text-xl font-semibold text-ink/70 sm:text-2xl">
                <span aria-hidden className="size-1.5 rounded-full bg-ink/40" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div aria-hidden className="flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
            vs
          </span>
        </div>

        <Reveal delay={0.1} className="rounded-[var(--radius-card)] bg-ink p-6 text-paper sm:p-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">The workplace also expects</h3>
          <Stagger as="ul" className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {skillGap.workplace.map((s) => (
              <StaggerItem as="li" key={s} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-medium ring-1 ring-white/10">
                <Icon name="check" className="size-4 text-accent-bright" />
                {s}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>

      <Reveal className="mt-12 text-center lg:mt-16">
        <p className="mx-auto max-w-3xl font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
          This is the gap <span className="text-accent-ink">VIIV Full-Stack Sales</span> is designed to address.
        </p>
      </Reveal>
    </Section>
  );
}
