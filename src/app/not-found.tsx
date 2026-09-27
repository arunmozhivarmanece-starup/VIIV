import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-paper px-4 text-center">
      <p className="text-sm font-semibold text-accent-ink">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&rsquo;t exist yet.</h1>
      <Link href="/" className={buttonClass("primary", "md", "mt-8")}>
        Back to home
      </Link>
    </main>
  );
}
