"use client";

import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useAuth } from "@/providers/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`); }, [loading, user, pathname, router]);
  if (loading || !user) return <LoadingSpinner label="Checking your account…"/>;
  return children;
}
