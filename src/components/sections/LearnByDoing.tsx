import { media } from "@/content/media";
import { learnByDoing } from "@/content/program";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

const activityIcons = ["users", "phone", "search", "target", "shield", "handshake", "database", "spark", "file", "mic"];

export function LearnByDoing() {
  const [a, b, c] = media.learnByDoing;
  return (
    <Section tone="sand" labelledBy="lbd-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="lbd-title"
            eyebrow="Learn by doing"
            title={
              <>
                Sales cannot be learned just by watching videos.
              </>
            }
            lede={<span className="font-semibold text-ink">You learn sales by doing sales.</span>}
          />

          <Stagger as="ul" className="mt-8 grid grid-cols-2 gap-2 sm:gap-2.5">
            {learnByDoing.activities.map((act, i) => (
              <StaggerItem
                as="li"
                key={act}
                className="flex items-center gap-2.5 rounded-xl bg-paper px-3 py-3 text-sm font-medium ring-1 ring-line sm:px-4"
              >
                <Icon name={activityIcons[i]} className="size-4 text-accent-ink" />
                {act}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="grid grid-cols-2 gap-3 sm:gap-4">
          <Photo media={a} sizes="(min-width: 1024px) 18rem, 50vw" className="col-span-2 aspect-[16/10] rounded-[1.5rem]" />
          <Photo media={b} tone="cool" sizes="(min-width: 1024px) 14rem, 50vw" className="aspect-[4/5] rounded-[1.5rem]" />
          <Photo media={c} tone="dark" sizes="(min-width: 1024px) 14rem, 50vw" className="aspect-[4/5] rounded-[1.5rem]" />
        </Reveal>
      </div>

      {/* Practice loop */}
      <Reveal className="mt-16 lg:mt-20">
        <div className="rounded-[1.75rem] bg-ink p-6 text-paper sm:p-8 lg:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-dark">How every skill is built</p>
          <ol className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-center sm:gap-0">
            {learnByDoing.loop.map((step, i) => (
              <li key={step} className="flex items-center sm:gap-0">
                <span className="flex w-full items-center justify-center rounded-full bg-white/5 px-5 py-3 font-display text-lg font-semibold tracking-tight ring-1 ring-white/10 sm:w-auto sm:px-7 sm:text-xl">
                  {i === learnByDoing.loop.length - 1 && <Icon name="loop" className="mr-2 size-4 text-accent-bright" />}
                  {step}
                </span>
                {i < learnByDoing.loop.length - 1 && (
                  <Icon name="chevron" className="mx-2 hidden size-5 -rotate-90 text-accent-bright sm:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
