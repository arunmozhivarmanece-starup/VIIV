import { anchors } from "@/content/site";
import { founder } from "@/content/founder";
import { media, showPlaceholders } from "@/content/media";
import { TrackView } from "../TrackView";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Section";

export function FounderSection() {
  const placeholders = founder.verifiedAchievements.length === 0 && showPlaceholders;
  return (
    <section id={anchors.founder} aria-labelledby="founder-title" className="bg-paper py-20 sm:py-24 lg:py-32">
      <TrackView event="founder_section_view" className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <Photo
                media={media.founder}
                tone="dark"
                captionTop
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="aspect-[4/5] rounded-[1.75rem] shadow-lift"
              />
              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-line sm:left-auto sm:w-72">
                <p className="font-display text-lg font-semibold tracking-tight">{founder.name}</p>
                <p className="text-sm text-muted">{founder.title}</p>
              </div>
            </div>
          </Reveal>

          <div className="pt-6 lg:pt-0">
            <Eyebrow>About VIIV</Eyebrow>
            <h2 id="founder-title" className="mt-4 text-[2rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl">
              {founder.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{founder.summary}</p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Sales &amp; business experience at</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {founder.experience.map((co) => (
                  <li key={co} className="rounded-full bg-sand px-4 py-2 font-display text-base font-semibold tracking-tight">
                    {co}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="mt-10 border-l-2 border-accent pl-6">
              <blockquote className="font-display text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">— {founder.name}</figcaption>
            </figure>

            {founder.verifiedAchievements.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {founder.verifiedAchievements.map((a) => (
                  <div key={a.label} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                    <dt className="text-xs text-muted">{a.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">{a.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {placeholders && (
              <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Placeholders for verified achievements">
                {Array.from({ length: founder.achievementPlaceholders }, (_, i) => (
                  <li key={i} className="rounded-2xl border border-dashed border-ink/25 p-4 text-xs leading-snug text-muted">
                    <span className="font-semibold text-ink/70">[Placeholder]</span> Verified achievement {i + 1} — add in
                    <code className="ml-1 rounded bg-sand px-1">content/founder.ts</code>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </TrackView>
    </section>
  );
}
