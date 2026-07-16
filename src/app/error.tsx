"use client";
import { ErrorState } from "@/components/shared/error-state";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="page-section"><div className="container-shell"><ErrorState message="Something unexpected happened. Please try the page again." onRetry={reset}/></div></section>; }
