import { createCookie, redirect } from "@remix-run/node"; // or cloudflare/deno
import { makeAuthRequest } from "@/lib/fetchInterface.server";
import { settings } from "@/lib/settings";
import {User} from "@/types/user.type"
const sessionCookie = createCookie("session_token", {
  expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60,
  path: "/",
  sameSite: "lax",
  secrets: [settings.secret],
  secure: true,
});

export async function emailPassLogin({
  email,
  password,
  redirectTo = "/student",
}: {
  email: string;
  password: string;
  redirectTo?: string;
}): Promise<
  | Response
  | {
      errors: {
        validation?: string;
        auth?: string;
        general?: string;
      };
    }
> {
  try {
    const response = await fetch(`${settings.BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        errors: {
          [response.status === 422 ? "validation" : "auth"]:
            data.detail || data.message || "Login failed",
        },
      };
    }

    if (!data.token || !data.account) {
      return { errors: { general: "Invalid response from server" } };
    }

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionCookie.serialize(data.token),
      },
    });
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

export async function emailPassRegister({
  email,
  firstName,
  lastName,
  password,
  bio,
  links,
  profileImageUrl,
  redirectTo = "/student",
}: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  bio?: string;
  links?: string;
  profileImageUrl?: string;
  redirectTo?: string;
}): Promise<
  | Response
  | {
      errors: {
        email?: string;
        validation?: string;
        general?: string;
      };
    }
> {
  try {
    const response = await fetch(`${settings.BACKEND_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        bio,
        links,
        profile_image_url: profileImageUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        return {
          errors: { email: data.detail || "Registration failed" },
        };
      }
      if (response.status === 422) {
        return { errors: { validation: "Invalid input data" } };
      }
      return { errors: { general: "Registration failed" } };
    }

    if (!data.token || !data.account) {
      return { errors: { general: "Invalid response from server" } };
    }

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionCookie.serialize(data.token),
      },
    });
  } catch (error) {
    return {
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during registration",
      },
    };
  }
}


export async function googleLogin() {
  const response = await fetch(
    `${settings.BACKEND_BASE_URL}/auth/google/authorise`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return {
      errors: {
        general: error.message || "Failed to initiate Google login",
      },
    };
  }

  const data = await response.json();

  if (!data.url) {
    return {
      errors: {
        general: "Invalid response from server",
      },
    };
  }

  return redirect(data.url);
}


export async function handleGoogleCallback(
  request: Request,
  redirectTo: string
) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await sessionCookie.parse(cookieHeader);

  if (!token) {
    return { errors: { general: "No session token found" } };
  }

  try {
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionCookie.serialize(token),
      },
    });
  } catch (error) {
    return {
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during Google callback",
      },
    };
  }
}


export async function getUser(request: Request): Promise<User> {
  const response = await makeAuthRequest("/auth/user", request);
  return response as User;
}


export async function logout(request: Request) {
  await makeAuthRequest("/auth/logout", request, { method: "POST" });

  return redirect("/auth/student", {
    headers: {
      "Set-Cookie":
        "session_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
    },
  });
}


export async function forgotPassword(email: string) {
  try {
    const response = await fetch(
      `${settings.BACKEND_BASE_URL}/auth/forgot-password?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        return { errors: { validation: "Invalid email provided" } };
      }
      return {
        errors: {
          general: data.message || "Failed to process forgot password request",
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
            : "An unexpected error occurred during forgot password request",
      },
    };
  }
}


export async function changePassword(
  request: Request,
  oldPassword: string,
  newPassword: string
) {
  return makeAuthRequest("/auth/change-password", request, {
    method: "POST",
    body: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  });
}


export async function resetPassword(token: string, newPassword: string) {
  try {
    const response = await fetch(
      `${settings.BACKEND_BASE_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        return { errors: { token: "Invalid or expired reset token" } };
      }
      if (response.status === 422) {
        return { errors: { password: "Invalid password format" } };
      }
      return {
        errors: {
          general: data.message || "Failed to reset password",
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
            : "An unexpected error occurred while resetting password",
      },
    };
  }
}


export async function resendEmailVerification(request: Request) {
  return makeAuthRequest("/auth/request-email-verification", request, {
    method: "POST",
  });
}

// type Link = {
//     url: string;
//     link_name: string;
// }

// export type UpdateUserInput = {
//     email?: string;
//     first_name?: string;
//     last_name?: string;
//     bio?: string;
//     image_url?: string;
//     links?: string[];
// }

// export type UserResponse = {
//     id: number;
//     email: string;
//     full_name: string;
//     created_at: string;
//     bio: string;
//     image_url: string;
//     links: Link[];
//     email_verified: boolean;
// }

// export async function updateUser(
//     { headers }: Request,
//     { email, first_name, last_name, bio, image_url, links }: UpdateUserInput
// ){
//     try {
//         const token = await sessionCookie.parse(headers.get("Cookie"));

//         if (!token) {
//             throw new Error('Not authenticated');
//         }

//         const response = await fetch(`${settings.BACKEND_BASE_URL}/auth/user`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email,
//                 first_name,
//                 last_name,
//                 bio,
//                 image_url,
//                 links
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             if (response.status === 401) {
//                 throw new Error('Not authenticated');
//             }
//             if (response.status === 422) {
//                 throw new Error('Invalid input format');
//             }
//             throw new Error(data.message || 'Failed to update user');
//         }

//         return data;
//     } catch (error) {
//         if (error instanceof Error) {
//             throw new Error(error.message);
//         }
//         throw new Error('An unexpected error occurred while updating user');
//     }
// }
