"use client";

import { useEffect, useRef } from "react";
import { webinar } from "@/content/webinar";
import { Icon } from "@/components/ui/Icon";
import { WebinarForm } from "./WebinarForm";

/** Native <dialog> gives focus trapping, Esc-to-close and inert background for free. */
export function WebinarModal({ source, onClose }: { source: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="webinar-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-3xl bg-paper p-0 text-ink shadow-lift sm:m-auto sm:max-w-lg sm:rounded-3xl"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full text-muted hover:bg-sand hover:text-ink"
          aria-label="Close registration form"
        >
          <Icon name="close" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">{webinar.eyebrow}</p>
        <h2 id="webinar-modal-title" className="mt-2 pr-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          {webinar.title}: {webinar.subtitle}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {webinar.format}. {webinar.schedule?.label ?? webinar.scheduleFallback}
        </p>
        <div className="mt-6">
          <WebinarForm source={source} idPrefix="modal" autoFocus />
        </div>
      </div>
    </dialog>
  );
}
