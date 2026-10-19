/**
 * Front-end password gate. When `SITE_PASSWORD` is set, `proxy.ts` sends any
 * visitor without a valid cookie to `/site-password`. Leave it unset to turn
 * the gate off (e.g. on production).
 *
 * The cookie holds a SHA-256 digest of the password, never the password
 * itself — changing `SITE_PASSWORD` logs everyone out.
 */
export const SITE_PASSWORD_COOKIE = "site_access";
export const SITE_PASSWORD_PATH = "/site-password";

export const sitePassword = () => process.env.SITE_PASSWORD || undefined;

export const digestPassword = async (password: string) => {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`zuora-site:${password}`)
  );
  return Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
};

/** Only same-site relative paths, so `?next=` can't redirect off-site. */
export const safeNextPath = (next: unknown) =>
  typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/";

/**
 * SameSite=None lets the cookie work inside Contentstack's cross-origin
 * Live Preview iframe; browsers only accept that on a Secure cookie, so plain
 * http (local dev over an IP, etc.) falls back to Lax.
 */
export const cookieOptions = (url: URL) => {
  const secure =
    url.protocol === "https:" || url.hostname === "localhost";
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? ("none" as const) : ("lax" as const),
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
};
