import { ctas } from "@/content/site";
import { ExploreCTA, WebinarCTA } from "../CTAs";
import { Reveal } from "../ui/Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 left-1/2 size-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_107_26/0.22),transparent)]"
      />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 id="final-title" className="mx-auto max-w-4xl text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Your degree is done.
            <br />
            <span className="text-accent">Now build what comes next.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 font-display text-sm font-semibold tracking-[0.2em] text-muted-dark uppercase sm:text-base">
            {["Skills.", "Confidence.", "Proof.", "Career readiness."].map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <WebinarCTA location="final_cta" label={ctas.webinar} className="w-full sm:w-auto" />
          <ExploreCTA location="final_cta" variant="secondaryDark" className="w-full sm:w-auto" />
        </Reveal>
        <p className="mt-10 font-display text-sm font-semibold tracking-[0.3em] text-muted-dark uppercase">
          Discover · Learn · Practice · Prove · Launch
        </p>
      </div>
    </section>
  );
}
