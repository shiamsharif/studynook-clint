import { BookOpen } from "lucide-react";
import Link from "next/link";

export function EmptyState({ title, description, action, href }: { title: string; description?: string; action?: string; href?: string }) {
  return <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white/70 px-6 py-14 text-center"><span className="mb-5 rounded-2xl bg-amber-100 p-4 text-amber-800"><BookOpen className="size-7"/></span><h2 className="font-serif text-2xl font-semibold text-stone-900">{title}</h2>{description && <p className="mt-2 text-stone-600">{description}</p>}{action && href && <Link className="btn-primary mt-6" href={href}>{action}</Link>}</div>;
}
