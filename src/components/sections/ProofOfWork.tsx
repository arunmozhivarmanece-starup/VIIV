import { proofOfWork } from "@/content/program";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

const kindIcon: Record<string, string> = {
  Portfolio: "briefcase",
  Recording: "video",
  Assessment: "check",
  Project: "file",
  Profile: "users",
  Readiness: "target",
};

export function ProofOfWork() {
  return (
    <Section tone="dark" labelledBy="proof-title">
      <SectionHeading
        id="proof-title"
        dark
        eyebrow="Proof of work"
        title={
          <>
            Don&rsquo;t just collect certificates.
            <br />
            <span className="text-accent-bright">Build proof.</span>
          </>
        }
        lede="Through the program you create work you can show — evidence of how you think, communicate and sell."
      />

      <Stagger as="ul" className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
        {proofOfWork.map((p, i) => (
          <StaggerItem
            as="li"
            key={p.title}
            className={cn(
              "group relative flex items-center gap-4 rounded-2xl bg-ink-2 p-5 ring-1 ring-white/10 transition-colors hover:ring-accent/50",
              i === 0 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-bright ring-1 ring-white/10">
              <Icon name={kindIcon[p.kind]} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-dark">{p.kind}</p>
              <h3 className="mt-0.5 font-sans text-base font-semibold">{p.title}</h3>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-14 flex flex-col gap-2 border-t border-ink-line pt-10 lg:mt-20 lg:flex-row lg:items-baseline lg:justify-between">
        <p className="font-display text-2xl font-semibold tracking-tight text-muted-dark sm:text-3xl">
          Don&rsquo;t just tell recruiters what you know.
        </p>
        <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Show what you can do.</p>
      </Reveal>
    </Section>
  );
}
