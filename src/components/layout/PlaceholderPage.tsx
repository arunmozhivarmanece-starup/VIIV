import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "../ui/Button";
import { Logo } from "./Logo";

/** Clean holding page for secondary routes that are not yet designed. */
export function PlaceholderPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="min-h-svh bg-paper">
      <div className="container-x flex min-h-svh flex-col py-8">
        <Link href="/" className="w-fit">
          <Logo />
        </Link>
        <div className="my-auto max-w-2xl py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-5 space-y-4 text-lg text-muted">{children}</div>
          <Link href="/" className={buttonClass("primary", "lg", "mt-10")}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
