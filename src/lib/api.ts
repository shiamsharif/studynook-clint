import type { ValidationError } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public validationErrors: ValidationError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function errorMessage(status: number) {
  if (status === 401) return "Please log in to continue";
  if (status === 403) return "You do not have permission to do that";
  if (status === 404) return "The requested resource was not found";
  if (status === 409) return "This request conflicts with existing data";
  if (status >= 500) return "Something went wrong on the server. Please try again.";
  return "Your request could not be completed";
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured");

  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      const validationErrors = payload?.errors ?? payload?.validationErrors ?? [];
      if (response.status === 401 && typeof window !== "undefined") window.dispatchEvent(new Event("studynook:unauthorized"));
      throw new ApiError(
        response.status,
        payload?.message ?? payload?.error ?? errorMessage(response.status),
        Array.isArray(validationErrors) ? validationErrors : [],
      );
    }
    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, "Unable to connect to the server");
  }
}

export function unwrap<T>(payload: unknown, keys: string[] = []): T {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of keys) if (record[key] !== undefined) return record[key] as T;
    if (record.data !== undefined) {
      const data = record.data;
      if (data && typeof data === "object") {
        const nested = data as Record<string, unknown>;
        for (const key of keys) if (nested[key] !== undefined) return nested[key] as T;
      }
      return data as T;
    }
  }
  return payload as T;
}
