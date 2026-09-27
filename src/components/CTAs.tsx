"use client";

import { anchors, ctas } from "@/content/site";
import { track } from "@/lib/analytics";
import { Arrow, buttonClass, type ButtonSize, type ButtonVariant } from "./ui/Button";
import { useWebinar } from "./webinar/WebinarProvider";

/** Primary conversion CTA — opens the webinar registration modal. */
export function WebinarCTA({
  location,
  label = ctas.webinar,
  variant = "primary",
  size = "lg",
  className,
}: {
  location: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const { openWebinar } = useWebinar();
  return (
    <button
      type="button"
      onClick={() => openWebinar(location)}
      className={buttonClass(variant, size, className)}
      aria-haspopup="dialog"
    >
      {label}
      <Arrow />
    </button>
  );
}

/** Secondary CTA — for visitors who already understand the opportunity. */
export function ExploreCTA({
  location,
  href = `#${anchors.fullStackSales}`,
  label = ctas.explore,
  variant = "secondary",
  size = "lg",
  className,
}: {
  location: string;
  href?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => track("full_stack_sales_click", { cta_location: location })}
      className={buttonClass(variant, size, className)}
    >
      {label}
    </a>
  );
}
