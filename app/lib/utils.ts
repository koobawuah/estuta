import { User } from "@/types/user.type";
import { UIMatch, useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { toast } from "sonner";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data as Record<string, unknown>;
}

function isUser(user: unknown): user is User {
  return (
    user != null &&
    typeof user === "object" &&
    "email" in user &&
    typeof user.email === "string"
  );
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const copyShareableLink = (
  linkBtn: React.MutableRefObject<HTMLButtonElement | null>
) => {
  linkBtn.current?.addEventListener("click", () => {
    // Get the text content of the button
    const buttonText = linkBtn.current?.textContent;

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard
      .writeText(buttonText as string)
      .then(() => {
        // Optionally, notify the user that the text has been copied
        toast(`Text copied to clipboard: ${buttonText as string}`);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  });
  return () =>
    linkBtn.current?.removeEventListener("click", copyShareableLink(linkBtn));
};

export const getBreadcrumbs = (matches: UIMatch[]) => {
  return matches.filter((match) => match.handle);
};
