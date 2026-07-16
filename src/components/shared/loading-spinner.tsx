import { BookOpen } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({
  label = "Loading",
}: LoadingSpinnerProps) {
  return (
    <div
      className="flex min-h-48 flex-col items-center justify-center px-6 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative grid size-16 place-items-center">
        <span className="absolute inset-0 rounded-2xl border border-amber-700/30 motion-safe:animate-ping" />
        <span className="relative grid size-13 place-items-center rounded-2xl bg-amber-800 text-amber-50 shadow-[0_12px_30px_rgb(120_53_15_/_0.2)]">
          <BookOpen className="size-6" aria-hidden="true" />
        </span>
      </div>

      <p className="mt-5 font-serif text-xl font-semibold text-stone-800">
        {label}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-amber-700 motion-safe:animate-bounce" />
        <span className="size-1.5 rounded-full bg-amber-700 motion-safe:animate-bounce [animation-delay:150ms]" />
        <span className="size-1.5 rounded-full bg-amber-700 motion-safe:animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
      aria-hidden="true"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <div className="absolute inset-0 motion-safe:animate-pulse bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200" />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-5">
          <div className="h-6 w-3/5 rounded-lg bg-stone-200 motion-safe:animate-pulse" />
          <div className="h-7 w-16 rounded-full bg-amber-100 motion-safe:animate-pulse" />
        </div>
        <div className="space-y-2.5">
          <div className="h-3.5 rounded bg-stone-100 motion-safe:animate-pulse" />
          <div className="h-3.5 w-4/5 rounded bg-stone-100 motion-safe:animate-pulse" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-7 w-20 rounded-full bg-stone-100 motion-safe:animate-pulse" />
          <div className="h-7 w-16 rounded-full bg-stone-100 motion-safe:animate-pulse" />
        </div>
        <div className="h-11 rounded-xl bg-stone-100 motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
