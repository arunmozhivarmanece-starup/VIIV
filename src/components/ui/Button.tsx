import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "secondaryDark" | "ghostDark";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink shadow-[0_8px_24px_-10px_rgb(255_107_26/0.7)] hover:bg-[#ff7d35]",
  secondary: "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:bg-ink hover:text-paper",
  secondaryDark: "bg-transparent text-paper ring-1 ring-inset ring-white/25 hover:bg-paper hover:text-ink",
  ghostDark: "bg-white/5 text-paper hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "lg", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={cn("size-4 transition-transform duration-200 group-hover:translate-x-0.5", className)}
    >
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant; size?: ButtonSize; children: ReactNode }) {
  return (
    <button type="button" className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
