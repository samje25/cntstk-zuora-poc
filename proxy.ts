import { NextResponse, type NextRequest } from "next/server";
import {
  SITE_PASSWORD_COOKIE,
  SITE_PASSWORD_PATH,
  digestPassword,
  sitePassword,
} from "@/lib/auth/sitePassword";

/** Front-end password gate — see lib/auth/sitePassword.ts. */
export async function proxy(request: NextRequest) {
  const password = sitePassword();
  if (!password) return NextResponse.next();

  const cookie = request.cookies.get(SITE_PASSWORD_COOKIE)?.value;
  if (cookie && cookie === (await digestPassword(password))) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL(SITE_PASSWORD_PATH, request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Everything except Next internals, the login page + its handler, and
    // files with an extension (public/ assets, fonts, favicon).
    "/((?!_next/static|_next/image|site-password|api/site-password|.*\\.[\\w]+$).*)",
  ],
};
