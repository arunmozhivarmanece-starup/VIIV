import { graduateReality } from "@/content/careers";
import { Section, SectionHeading } from "../ui/Section";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

export function GraduateReality() {
  return (
    <Section tone="sand" labelledBy="reality-title">
      <SectionHeading
        id="reality-title"
        eyebrow="Sound familiar?"
        title={
          <>
            Degree done.
            <br />
            <span className="text-muted">Career still unclear?</span>
          </>
        }
      />

      <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-4">
        {graduateReality.map((item, i) => (
          <StaggerItem
            as="li"
            key={item.title}
            className="group relative flex flex-col rounded-[var(--radius-card)] bg-paper p-5 shadow-card ring-1 ring-line transition-shadow hover:shadow-lift lg:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-paper">
                <Icon name={item.icon} />
              </span>
              <span aria-hidden className="font-display text-sm font-semibold text-muted">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight lg:mt-10">{item.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-14 lg:mt-20">
        <div className="rounded-[1.75rem] bg-ink p-7 text-paper sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-14">
          <p className="max-w-2xl font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Maybe you don&rsquo;t need another random course.
          </p>
          <p className="mt-4 max-w-md text-lg text-muted-dark lg:mt-0 lg:text-right">
            Maybe you need <span className="font-semibold text-accent-bright">career clarity + practical skills.</span>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
