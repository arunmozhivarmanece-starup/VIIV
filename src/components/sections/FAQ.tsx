"use client";

import { anchors } from "@/content/site";
import { faqs } from "@/content/faqs";
import { track } from "@/lib/analytics";
import { Icon } from "../ui/Icon";
import { Section, SectionHeading } from "../ui/Section";

export function FAQ() {
  return (
    <Section id={anchors.faq} tone="light" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, answered honestly."
          lede="Still unsure? The free webinar is the best place to ask anything else."
        />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) track("faq_interaction", { question: f.q, index: i });
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-sand transition-transform group-open:rotate-45">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="-mt-1 pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
