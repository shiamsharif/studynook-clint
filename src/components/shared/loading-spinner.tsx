import { LoaderCircle } from "lucide-react";

export function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-stone-600" role="status"><LoaderCircle className="size-7 animate-spin text-amber-700"/><span className="text-sm font-medium">{label}</span></div>;
}

export function CardSkeleton() {
  return <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white"><div className="aspect-[4/3] animate-pulse bg-stone-200"/><div className="space-y-3 p-5"><div className="h-6 w-2/3 animate-pulse rounded bg-stone-200"/><div className="h-4 animate-pulse rounded bg-stone-100"/><div className="h-4 w-4/5 animate-pulse rounded bg-stone-100"/></div></div>;
}
