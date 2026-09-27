import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "sand" | "dark" | "ink2";

const toneClass: Record<Tone, string> = {
  light: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  dark: "bg-ink text-paper",
  ink2: "bg-ink-2 text-paper",
};

export function Section({
  id,
  tone = "light",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={cn("relative py-20 sm:py-24 lg:py-32", toneClass[tone], className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        dark ? "text-accent-bright" : "text-accent-ink",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", dark ? "bg-accent-bright" : "bg-accent-ink")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  dark,
  align = "left",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="mt-4 text-[2rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-5 text-lg leading-relaxed sm:text-xl", dark ? "text-muted-dark" : "text-muted")}>
          {lede}
        </p>
      )}
    </div>
  );
}
