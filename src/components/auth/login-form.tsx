"use client";

import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { useAuth } from "@/providers/auth-provider";
import { ApiError } from "@/lib/api";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const { login } = useAuth(); const router = useRouter(); const params = useSearchParams();
  const destination = params.get("redirect")?.startsWith("/") ? params.get("redirect")! : "/";
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState("");
  const goNext = useCallback(() => router.replace(destination), [router, destination]);
  async function submit(event: React.FormEvent) { event.preventDefault(); setSubmitting(true); setError(""); try { await login({ email: email.trim(), password }); toast.success("Welcome back!"); goNext(); } catch (value) { const message = value instanceof ApiError ? value.message : "Login failed. Please try again."; setError(message); toast.error(message); } finally { setSubmitting(false); } }
  return <section className="page-section"><div className="container-shell grid items-center gap-12 lg:grid-cols-2"><div className="hidden lg:block"><p className="eyebrow">Welcome back</p><h1 className="page-title mt-4">Return to your <em className="text-amber-800">quiet corner.</em></h1><p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">Sign in to manage your rooms, review reservations, and book your next focused session.</p></div><div className="mx-auto w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8"><span className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-800"><LockKeyhole/></span><h2 className="mt-5 font-serif text-3xl font-semibold">Sign in</h2><p className="mt-1 text-sm text-stone-500">Use your StudyNook account to continue.</p>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}<form onSubmit={submit} className="mt-6 space-y-5"><label><span className="field-label">Email</span><input type="email" autoComplete="email" className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"/></label><label><span className="field-label">Password</span><input type="password" autoComplete="current-password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Your password"/></label><button disabled={submitting} className="btn-primary w-full">{submitting && <LoaderCircle className="size-4 animate-spin"/>}{submitting ? "Signing in…" : "Sign in"}</button></form><div className="my-6 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200"/>OR<span className="h-px flex-1 bg-stone-200"/></div><GoogleLoginButton onSuccess={goNext}/><p className="mt-6 text-center text-sm text-stone-500">New to StudyNook? <Link href="/register" className="font-bold text-amber-800">Create an account</Link></p></div></div></section>;
}
