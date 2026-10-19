import type { Metadata } from "next";
import { safeNextPath } from "@/lib/auth/sitePassword";

export const metadata: Metadata = {
  title: "Password required",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SitePasswordPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const next = safeNextPath(sp.next);
  const hasError = sp.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--zuora-cloud)] px-4">
      <form
        method="post"
        action="/api/site-password"
        className="w-full max-w-sm rounded-lg bg-[var(--zuora-white)] p-8 shadow-sm"
      >
        <h1 className="mb-2 font-[family-name:var(--font-founders-grotesk)] text-2xl font-medium text-[var(--zuora-forest)]">
          Password required
        </h1>
        <p className="mb-6 text-sm text-[var(--zuora-greys-500)]">
          Enter the password to view this site.
        </p>

        <input type="hidden" name="next" value={next} />
        <label htmlFor="site-password" className="sr-only">
          Password
        </label>
        <input
          id="site-password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? "site-password-error" : undefined}
          className="w-full rounded border border-[var(--zuora-greys-300)] px-3 py-2 text-[var(--zuora-body)] outline-none focus:border-[var(--zuora-focus-blue)]"
        />
        {hasError && (
          <p id="site-password-error" role="alert" className="mt-2 text-sm text-[var(--zuora-clay)]">
            Incorrect password. Try again.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded bg-[var(--zuora-forest)] px-4 py-2 font-medium text-[var(--zuora-white)] hover:opacity-90"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
