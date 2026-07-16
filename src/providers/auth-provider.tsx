"use client";

import { authService, type LoginInput } from "@/services/auth";
import type { User } from "@/types/api";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<User>;
  googleLogin: (credential: string) => Promise<User>;
  logout: () => Promise<void>;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authService.me().then((value) => active && setUser(value)).catch(() => active && setUser(null)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);
  useEffect(() => { const clear = () => setUser(null); window.addEventListener("studynook:unauthorized", clear); return () => window.removeEventListener("studynook:unauthorized", clear); }, []);

  const login = useCallback(async (input: LoginInput) => { const value = await authService.login(input); setUser(value); return value; }, []);
  const googleLogin = useCallback(async (credential: string) => { const value = await authService.googleLogin(credential); setUser(value); return value; }, []);
  const logout = useCallback(async () => { try { await authService.logout(); } finally { setUser(null); } }, []);
  const clearUser = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({ user, loading, login, googleLogin, logout, clearUser }), [user, loading, login, googleLogin, logout, clearUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
