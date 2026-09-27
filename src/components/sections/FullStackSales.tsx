import { anchors, ctas } from "@/content/site";
import { program } from "@/content/program";
import { ExploreCTA, WebinarCTA } from "../CTAs";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

/** First major commercial reveal of the flagship program. */
export function FullStackSales() {
  return (
    <section
      id={anchors.fullStackSales}
      aria-labelledby="fss-title"
      className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container-x relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-bright">{program.label}</p>
          <h2 id="fss-title" className="mt-5 font-display text-[3rem] leading-[0.9] min-[400px]:text-[3.4rem] font-bold tracking-[-0.045em] uppercase sm:text-[6rem] lg:text-[9rem]">
            Full-Stack
            <br />
            <span className="text-accent">Sales</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-4xl">{program.headline}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-dark">{program.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ExploreCTA
                location="program_reveal"
                href={`#${anchors.curriculum}`}
                label={ctas.explore}
                variant="primary"
                className="w-full sm:w-auto"
              />
              <WebinarCTA location="program_reveal" label={ctas.webinarShort} variant="secondaryDark" className="w-full sm:w-auto" />
            </div>
          </Reveal>

          <Stagger as="ul" className="grid grid-cols-2 gap-3">
            {program.pillars.map((p, i) => (
              <StaggerItem as="li" key={p.title} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                <span className="font-display text-sm font-semibold text-accent-bright">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-dark">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
