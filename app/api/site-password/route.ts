import { NextResponse, type NextRequest } from "next/server";
import {
  SITE_PASSWORD_COOKIE,
  SITE_PASSWORD_PATH,
  cookieOptions,
  digestPassword,
  safeNextPath,
  sitePassword,
} from "@/lib/auth/sitePassword";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const next = safeNextPath(form.get("next"));
  const password = sitePassword();
  const submitted = form.get("password");

  if (!password || (typeof submitted === "string" && submitted === password)) {
    const res = NextResponse.redirect(new URL(next, request.url), 303);
    if (password) {
      res.cookies.set(
        SITE_PASSWORD_COOKIE,
        await digestPassword(password),
        cookieOptions(request.nextUrl)
      );
    }
    return res;
  }

  const retry = new URL(SITE_PASSWORD_PATH, request.url);
  retry.searchParams.set("next", next);
  retry.searchParams.set("error", "1");
  return NextResponse.redirect(retry, 303);
}
