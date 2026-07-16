import { api, unwrap } from "@/lib/api";
import type { ApiEnvelope, User } from "@/types/api";

export interface RegisterInput { name: string; email: string; photoURL: string; password: string }
export interface LoginInput { email: string; password: string }

export const authService = {
  async me() { return unwrap<User>(await api<ApiEnvelope<User>>("/api/auth/me"), ["user"]); },
  async register(input: RegisterInput) { return api<ApiEnvelope<User>>("/api/auth/register", { method: "POST", body: JSON.stringify(input) }); },
  async login(input: LoginInput) { return unwrap<User>(await api<ApiEnvelope<User>>("/api/auth/login", { method: "POST", body: JSON.stringify(input) }), ["user"]); },
  async googleLogin(credential: string) { return unwrap<User>(await api<ApiEnvelope<User>>("/api/auth/google-login", { method: "POST", body: JSON.stringify({ credential }) }), ["user"]); },
  async logout() { await api("/api/auth/logout", { method: "POST" }); },
};
