import { anchors } from "@/content/site";
import { whySales } from "@/content/program";
import { cn } from "@/lib/cn";
import { TrackView } from "../TrackView";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

export function WhySales() {
  return (
    <Section id={anchors.whySales} tone="sand" labelledBy="why-sales-title" className="overflow-hidden">
      <TrackView event="why_sales_view">
        <SectionHeading
          id="why-sales-title"
          eyebrow="Why sales"
          title={
            <>
              Why learn sales?
              <br />
              <span className="text-accent-ink">Because every business needs customers.</span>
            </>
          }
          lede="A great product doesn't grow a business on its own. Someone has to turn interest into conversations, and conversations into customers."
        />

        {/* Value chain */}
        <Stagger as="ol" className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:gap-0">
          {whySales.flow.map((step, i) => {
            const last = i === whySales.flow.length - 1;
            const salesZone = i >= 2;
            return (
              <StaggerItem as="li" key={step} className="relative flex items-center lg:flex-col lg:items-stretch">
                <div
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-4 lg:mx-1 lg:w-auto lg:flex-col lg:items-start lg:py-6",
                    last ? "bg-accent text-ink" : salesZone ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-line",
                  )}
                >
                  <span className={cn("font-display text-sm font-semibold", last ? "text-ink/80" : salesZone ? "text-muted-dark" : "text-muted")}>
                    0{i + 1}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-tight lg:text-xl">{step}</span>
                </div>
                {!last && (
                  <Icon
                    name="chevron"
                    className="absolute -bottom-3.5 left-7 z-10 size-5 text-muted sm:hidden lg:top-1/2 lg:-right-2.5 lg:bottom-auto lg:left-auto lg:block lg:-translate-y-1/2 lg:-rotate-90"
                  />
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
        <p className="mt-4 text-sm text-muted">
          <span className="inline-block size-2.5 translate-y-px rounded-full bg-ink" /> Where sales and business
          development work: turning opportunity into revenue.
        </p>

        {/* Intersection + industries */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative mx-auto grid aspect-square w-full max-w-sm grid-cols-2 gap-2">
              {whySales.intersection.map((w, i) => (
                <div
                  key={w}
                  className={cn(
                    "flex items-center justify-center rounded-full font-display text-base font-semibold tracking-tight ring-1 ring-ink/10 sm:text-lg",
                    i === 3 ? "bg-accent-soft" : "bg-paper",
                  )}
                >
                  {w}
                </div>
              ))}
              <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-paper shadow-lift sm:size-28 sm:text-xl">
                Sales
              </div>
            </div>
          </Reveal>
          <div>
            <p className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
              Sales sits at the intersection of people, business, communication and revenue.
            </p>
            <p className="mt-4 text-muted">
              That is why the skill travels across industries — the product changes, the customer conversation doesn&rsquo;t.
            </p>
            <ul aria-label="Industries where sales skills apply" className="mt-6 flex flex-wrap gap-2">
              {whySales.industries.map((ind) => (
                <li key={ind} className="rounded-full bg-paper px-3.5 py-2 text-sm font-medium ring-1 ring-line">
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-16 border-t border-ink/10 pt-12 lg:mt-24">
          <p className="max-w-4xl font-display text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-muted">Industries change. Products change.</span> The ability to understand customers
            and communicate value remains powerful.
          </p>
        </Reveal>
      </TrackView>
    </Section>
  );
}
