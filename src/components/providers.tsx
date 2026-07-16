"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}<Toaster richColors position="top-right" closeButton /></AuthProvider>;
}
