import { anchors, ctas } from "@/content/site";
import { webinar } from "@/content/webinar";
import { ExploreCTA } from "../CTAs";
import { Icon } from "../ui/Icon";
import { WebinarForm } from "../webinar/WebinarForm";

export function WebinarSection() {
  return (
    <section id={anchors.webinar} aria-labelledby="webinar-title" className="relative overflow-hidden bg-accent py-20 text-ink sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.35),transparent)]"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {webinar.eyebrow}
          </p>
          <h2 id="webinar-title" className="mt-6 text-5xl leading-[0.95] font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {webinar.title}
          </h2>
          <p className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{webinar.subtitle}</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/90">{webinar.copy}</p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink">In this session</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {webinar.topics.map((t) => (
              <li key={t} className="flex items-center gap-2.5 font-medium">
                <Icon name="check" className="size-4" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink">
            <span className="inline-flex items-center gap-2">
              <Icon name="video" className="size-4" /> {webinar.format}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" className="size-4" /> {webinar.schedule?.label ?? webinar.scheduleFallback}
            </span>
          </div>

          <div className="mt-8 hidden lg:block">
            <ExploreCTA location="webinar_section" label={`Or ${ctas.explore}`} variant="secondary" size="md" />
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-paper p-6 shadow-[0_30px_80px_-30px_rgb(11_12_17/0.45)] sm:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight">{ctas.webinarReserve}</h3>
          <p className="mt-1 text-sm text-muted">Takes less than a minute.</p>
          <div className="mt-6">
            <WebinarForm source="webinar_section" idPrefix="section" />
          </div>
        </div>

        <div className="lg:hidden">
          <ExploreCTA location="webinar_section" label={ctas.explore} variant="secondary" size="md" className="w-full" />
        </div>
      </div>
    </section>
  );
}
