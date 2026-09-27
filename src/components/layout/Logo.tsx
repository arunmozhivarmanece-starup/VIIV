import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 font-display leading-none whitespace-nowrap", className)}>
      <span className="text-[1.6rem] font-bold tracking-[-0.04em]">
        {site.brand}
        <span aria-hidden className="text-accent">.</span>
      </span>
      <span className={cn("text-xs font-medium tracking-wide", dark ? "text-muted-dark" : "text-muted")}>
        {site.brandSuffix}
      </span>
    </span>
  );
}
