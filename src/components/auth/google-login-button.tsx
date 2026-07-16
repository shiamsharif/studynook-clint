"use client";

import { useAuth } from "@/providers/auth-provider";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
}

interface GoogleIdentityApi {
  initialize: (config: GoogleIdConfiguration) => void;
  renderButton: (
    element: HTMLElement,
    options: Record<string, unknown>,
  ) => void;
}

interface GoogleLoginButtonProps {
  onSuccess: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleIdentityApi;
      };
    };
  }
}

const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";

export function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  const container = useRef<HTMLDivElement>(null);
  const { googleLogin } = useAuth();

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const render = () => {
      if (!window.google || !container.current) return;

      // Google appends its iframe, so clear a previous render before adding it.
      container.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          try {
            await googleLogin(credential);
            toast.success("Welcome to StudyNook");
            onSuccess();
          } catch (error) {
            toast.error(
              error instanceof Error ? error.message : "Google login failed",
            );
          }
        },
      });
      window.google.accounts.id.renderButton(container.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 340,
        text: "continue_with",
      });
    };

    // Reuse the shared GIS script when another auth view loaded it first.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_SCRIPT_URL}"]`,
    );

    if (existing) {
      if (window.google) {
        render();
      } else {
        existing.addEventListener("load", render, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [googleLogin, onSuccess]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return (
      <p className="text-center text-xs text-stone-500">
        Google login is unavailable until a client ID is configured.
      </p>
    );
  }

  return <div ref={container} className="flex min-h-11 justify-center" />;
}
