import { createCookie, redirect } from "@remix-run/node";
import { settings } from "@/lib/settings";

export type ApiResponse<T> = {
  data?: T;
  errors?: Record<string, string>;
} | Response;

const sessionCookie = createCookie("session_token", {
  expires: new Date(Date.now() + 2_592_000_000), // 30 days in milliseconds
  httpOnly: true,
  maxAge: 2_592_000, // 30 days in seconds
  path: "/",
  sameSite: "lax",
  secrets: [settings.secret],
  secure: true,
});

// Core authenticated request helper
export async function makeAuthRequest<T>(
  endpoint: string,
  request: Request,
  options: { method?: string; body?: any } = {}
): Promise<ApiResponse<T> | Response> {
  const token = await sessionCookie.parse(request.headers.get("Cookie"));

  if (!token) {
    return redirect("/auth/student", {
      headers: {
        "Set-Cookie":
          "session_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
      },
    });
  }

  try {
    const response = await fetch(`${settings.BACKEND_BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    });

    const data = await response.json();

    if (response.status === 401) {
      return redirect("/auth/student", {
        headers: {
          "Set-Cookie":
            "session_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
        },
      });
    }

    if (!response.ok) {
      return {
        errors: {
          [response.status === 422 ? "validation" : "general"]:
            data.detail || data.message || "An error occurred",
        },
      };
    }

    return { data };
  } catch (error) {
    return {
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
    };
  }
}