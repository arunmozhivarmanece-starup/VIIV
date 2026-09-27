import { anchors, ctas } from "@/content/site";
import { heroRoles } from "@/content/careers";
import { ExploreCTA, WebinarCTA } from "../CTAs";
import { CareerEcosystem } from "./CareerEcosystem";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-paper pt-24 pb-16 sm:pt-28 lg:flex lg:min-h-[min(100svh,56rem)] lg:items-center lg:pt-28 lg:pb-20"
    >
      {/* Quiet background structure */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-20%] size-[46rem] rounded-full bg-[radial-gradient(closest-side,var(--color-accent-soft),transparent)] opacity-80 lg:right-[-8%]"
      />
      <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold min-[400px]:px-3 min-[400px]:text-[13px] text-ink shadow-card ring-1 ring-line">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            Built for Final-Year Students &amp; Recent Graduates
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]"
          >
            Graduated.
            <br />
            <span className="text-muted">Still looking for the</span> right&nbsp;job?
          </h1>

          <p className="mt-5 font-display text-xl leading-snug font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            Your career options are <span className="text-accent-ink">bigger than you think.</span>
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Discover careers on the business side of technology — and build the practical skills companies look for.
          </p>

          <div id="hero-cta" className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WebinarCTA location="hero" label={ctas.webinar} className="w-full sm:w-auto" />
            <ExploreCTA location="hero" href={`#${anchors.fullStackSales}`} className="w-full sm:w-auto" />
          </div>

          <ul aria-label="Career paths" className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-[13px] text-muted sm:mt-6 sm:text-sm">
            {["Business Development", "Sales", "Customer Success", "Account Management"].map((r, i) => (
              <li key={r} className="whitespace-nowrap">
                {i > 0 && <span aria-hidden className="mr-2">•</span>}
                {r}
              </li>
            ))}
          </ul>
        </div>

        <CareerEcosystem roles={heroRoles} />
      </div>
    </section>
  );
}
