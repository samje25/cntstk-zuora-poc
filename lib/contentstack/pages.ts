import { connection } from "next/server";
import { contentstackFetch } from "./client";
import { buildFlexiblePageByUrlQuery } from "./graphql/queries/flexiblePage";
import { sectionRegistry } from "@/lib/sections/registry";
import type { RawSectionNode } from "@/lib/sections/config";
import type { Section, SeoEntry, UnknownSection } from "@/lib/sections/types";

type RawImageConnection = {
  edges?: Array<{ node?: { url?: string | null; title?: string | null } | null } | null> | null;
} | null;

type RawSeoNode = {
  system?: { uid: string } | null;
  title?: string | null;
  meta_title?: string | null;
  description?: string | null;
  keywords?: string | null;
  canonical_url?: string | null;
  no_index?: boolean | null;
  no_follow?: boolean | null;
  og_title?: string | null;
  og_description?: string | null;
  og_imageConnection?: RawImageConnection;
  og_type?: string | null;
  twitter_card?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_imageConnection?: RawImageConnection;
  short_answer?: string | null;
  key_takeaways?: string | null;
  primary_entity?: string | null;
  ai_summary?: string | null;
  speakable_selectors?: string | null;
  faqs?: Array<{ question?: string | null; answer?: string | null } | null> | null;
  schema_markup?: string | null;
} | null;

type RawFlexiblePage = {
  system: { uid: string; content_type_uid: string };
  title?: string | null;
  url: string;
  seoConnection?: {
    edges?: Array<{ node?: RawSeoNode } | null> | null;
  } | null;
  sectionsConnection?: {
    edges?: Array<{ node?: RawSectionNode | null } | null> | null;
  } | null;
};

type FlexiblePageResponse = {
  all_flexible_page?: {
    items?: RawFlexiblePage[] | null;
  };
};

export type FlexiblePage = {
  uid: string;
  url: string;
  pageTitle: string | null;
  seo: SeoEntry | null;
  sections: Section[];
};

type FetchOptions = {
  preview?: boolean;
  locale?: string;
  /** Live Preview hash from the `live_preview` query param (set by the SDK). */
  livePreviewHash?: string;
};

const mapImage = (conn: RawImageConnection | undefined): SeoEntry["ogImage"] => {
  const node = conn?.edges?.[0]?.node ?? null;
  return node ? { url: node.url ?? null, title: node.title ?? null } : null;
};

const mapSeo = (node: RawSeoNode): SeoEntry | null => {
  if (!node) return null;
  return {
    uid: node.system?.uid,
    title: node.title ?? null,
    metaTitle: node.meta_title ?? null,
    description: node.description ?? null,
    keywords: node.keywords ?? null,
    canonicalUrl: node.canonical_url ?? null,
    noIndex: node.no_index ?? null,
    noFollow: node.no_follow ?? null,
    ogTitle: node.og_title ?? null,
    ogDescription: node.og_description ?? null,
    ogImage: mapImage(node.og_imageConnection),
    ogType: node.og_type ?? null,
    twitterCard: node.twitter_card ?? null,
    twitterTitle: node.twitter_title ?? null,
    twitterDescription: node.twitter_description ?? null,
    twitterImage: mapImage(node.twitter_imageConnection),
    shortAnswer: node.short_answer ?? null,
    keyTakeaways: node.key_takeaways ?? null,
    primaryEntity: node.primary_entity ?? null,
    aiSummary: node.ai_summary ?? null,
    speakableSelectors: node.speakable_selectors ?? null,
    faqs:
      node.faqs
        ?.filter((f): f is { question?: string | null; answer?: string | null } => !!f)
        .map((f) => ({ question: f.question ?? null, answer: f.answer ?? null })) ?? null,
    schemaMarkup: node.schema_markup ?? null,
  };
};

const mapSections = (page: RawFlexiblePage): Section[] => {
  const nodes = (page.sectionsConnection?.edges ?? [])
    .map((edge) => edge?.node ?? null)
    .filter((node): node is RawSectionNode => node !== null);

  return nodes.map((node, index) => {
    const config = sectionRegistry.find(
      (s) => s.contentstackTypename === node.__typename
    );
    if (!config) {
      return {
        id: `unknown-${index}`,
        type: "unknown",
        raw: node,
      } satisfies UnknownSection;
    }
    return config.transform(node);
  });
};

export const getFlexiblePageByUrl = async (
  url: string,
  options: FetchOptions = {}
): Promise<FlexiblePage | null> => {
  // cacheComponents: always request-time (uncached CMS + live preview), so
  // stop the prerender here instead of starting a fetch it will abort.
  await connection();
  const query = buildFlexiblePageByUrlQuery({
    definitions: sectionRegistry.map((s) => s.fragment).join("\n"),
    spreads: sectionRegistry.map((s) => `...${s.fragmentName}`).join("\n"),
  });

  const requestPage = async (requestedUrl: string) => {
    try {
      const data = await contentstackFetch<FlexiblePageResponse>(
        query,
        { url: requestedUrl, locale: options.locale ?? null },
        { preview: options.preview, livePreviewHash: options.livePreviewHash }
      );
      return data.all_flexible_page?.items?.[0] ?? null;
    } catch (error) {
      console.error(`Failed to fetch page with url "${requestedUrl}":`, error);
      return null;
    }
  };

  let page = await requestPage(url);
  if (!page && url.startsWith("/")) page = await requestPage(url.slice(1));
  else if (!page && !url.startsWith("/")) page = await requestPage(`/${url}`);
  if (!page) return null;

  return {
    uid: page.system.uid,
    url: page.url,
    pageTitle: page.title ?? null,
    seo: mapSeo(page.seoConnection?.edges?.[0]?.node ?? null),
    sections: mapSections(page),
  };
};
