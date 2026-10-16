import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFlexiblePageByUrl } from "@/lib/contentstack/pages";
import { SectionsRenderer } from "@/lib/sections/SectionsRenderer";
import { splitLocaleFromSlug } from "@/lib/i18n/locale";
import type { SeoEntry } from "@/lib/sections/types";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const urlPathFrom = (segments: string[]) =>
  segments.length ? `/${segments.join("/")}` : "/";

/**
 * Live Preview: the Contentstack SDK loads the site inside the entry editor
 * with `?live_preview=<hash>`. When present, fetch draft content from the
 * preview host instead of the published delivery API.
 */
const livePreviewFrom = (
  sp: Record<string, string | string[] | undefined>
) => {
  const hash = typeof sp.live_preview === "string" ? sp.live_preview : undefined;
  return { preview: !!hash, livePreviewHash: hash };
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { locale, rest } = splitLocaleFromSlug(slug);
  const { preview, livePreviewHash } = livePreviewFrom(await searchParams);
  const page = await getFlexiblePageByUrl(urlPathFrom(rest), {
    locale: locale.contentstackCode,
    preview,
    livePreviewHash,
  });
  if (!page) return {};

  const seo = page.seo;
  const title = seo?.metaTitle ?? seo?.title ?? page.pageTitle ?? undefined;
  const description = seo?.description ?? undefined;
  const ogTitle = seo?.ogTitle ?? title;
  const ogDescription = seo?.ogDescription ?? description;
  const ogImage = seo?.ogImage?.url ?? null;
  const twitterImage = seo?.twitterImage?.url ?? ogImage;

  const keywords = seo?.keywords
    ? seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    openGraph:
      ogTitle || ogDescription || ogImage
        ? {
            title: ogTitle,
            description: ogDescription,
            type:
              (seo?.ogType as "website" | "article" | "profile") ?? "website",
            images: ogImage ? [{ url: ogImage }] : undefined,
          }
        : undefined,
    twitter:
      seo?.twitterCard || seo?.twitterTitle || twitterImage
        ? {
            card:
              (seo?.twitterCard as "summary" | "summary_large_image") ??
              "summary_large_image",
            title: seo?.twitterTitle ?? ogTitle,
            description: seo?.twitterDescription ?? ogDescription,
            images: twitterImage ? [twitterImage] : undefined,
          }
        : undefined,
    robots:
      seo?.noIndex || seo?.noFollow
        ? { index: !seo.noIndex, follow: !seo.noFollow }
        : undefined,
  };
};

/**
 * Builds the JSON-LD graph for AEO: a WebPage (+ SpeakableSpecification when
 * selectors are set), a FAQPage from the `faqs` group, and any raw
 * `schema_markup` string injected verbatim. One script string per node.
 */
const buildJsonLd = (seo: SeoEntry | null): string[] => {
  if (!seo) return [];
  const scripts: string[] = [];

  const speakable = seo.speakableSelectors
    ? seo.speakableSelectors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  if (speakable.length || seo.primaryEntity || seo.shortAnswer) {
    scripts.push(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        ...(seo.metaTitle || seo.title
          ? { name: seo.metaTitle ?? seo.title }
          : {}),
        ...(seo.description ? { description: seo.description } : {}),
        ...(seo.primaryEntity ? { about: seo.primaryEntity } : {}),
        ...(seo.shortAnswer ? { abstract: seo.shortAnswer } : {}),
        ...(speakable.length
          ? {
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: speakable,
              },
            }
          : {}),
      })
    );
  }

  const faqs = (seo.faqs ?? []).filter((f) => f.question && f.answer);
  if (faqs.length) {
    scripts.push(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      })
    );
  }

  if (seo.schemaMarkup && seo.schemaMarkup.trim()) {
    scripts.push(seo.schemaMarkup.trim());
  }

  return scripts;
};

export default async function FlexiblePageRoute({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { locale, rest } = splitLocaleFromSlug(slug);
  const { preview, livePreviewHash } = livePreviewFrom(await searchParams);
  const page = await getFlexiblePageByUrl(urlPathFrom(rest), {
    locale: locale.contentstackCode,
    preview,
    livePreviewHash,
  });
  if (!page) notFound();

  const jsonLd = buildJsonLd(page.seo);

  return (
    <main lang={locale.htmlLang}>
      {jsonLd.map((script, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}
      <SectionsRenderer sections={page.sections} />
    </main>
  );
}
