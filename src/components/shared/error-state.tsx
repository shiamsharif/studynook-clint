import { CircleAlert } from "lucide-react";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl bg-red-50 px-6 py-12 text-center text-red-900" role="alert"><CircleAlert className="mb-4 size-8"/><h2 className="font-serif text-2xl font-semibold">Something went astray</h2><p className="mt-2 text-red-800">{message}</p>{onRetry && <button className="btn-secondary mt-6" onClick={onRetry}>Try again</button>}</div>;
}
