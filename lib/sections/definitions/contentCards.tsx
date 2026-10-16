import { CONTENT_CARDS_FRAGMENT } from "@/lib/contentstack/graphql/fragments/contentCards";
import { ContentCards } from "@/components/sections/ContentCards";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { ContentCard, ContentCardsSection } from "../types";

type RawImageNode = {
  url?: string | null;
  dimension?: { width?: number | null; height?: number | null } | null;
};

type RawContentCards = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  heading?: string | null;
  description?: string | null;
  background_imageConnection?: { edges?: Array<{ node?: { url?: string | null } | null } | null> | null } | null;
  cards?: Array<{
    eyebrow?: string | null;
    eyebrow_iconConnection?: { edges?: Array<{ node?: RawImageNode | null } | null> | null } | null;
    heading?: string | null;
    body?: string | null;
    link?: { title?: string | null; href?: string | null } | null;
    image_alt?: string | null;
    imageConnection?: { edges?: Array<{ node?: RawImageNode | null } | null> | null } | null;
  } | null> | null;
};

// RTE wraps copy in <p>; cards render it inline inside a pre-wrap block.
const unwrapParagraphs = (html: string | null | undefined): string | null => {
  const trimmed = html?.trim();
  if (!trimmed) return null;
  return trimmed
    .replace(/<\/p>\s*<p[^>]*>/g, "\n")
    .replace(/^<p[^>]*>/, "")
    .replace(/<\/p>$/, "");
};

const transformContentCards = (node: RawSectionNode): ContentCardsSection => {
  const raw = node as RawContentCards;

  return {
    id: raw.system?.uid ?? "content-cards",
    type: "contentCards",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Logo Wall",
    heading: raw.heading ?? null,
    description: raw.description?.trim() || null,
    backgroundImage: raw.background_imageConnection?.edges?.[0]?.node?.url ?? null,
    cards: (raw.cards ?? []).map((card): ContentCard => {
      const image = card?.imageConnection?.edges?.[0]?.node ?? null;
      const eyebrowIcon = card?.eyebrow_iconConnection?.edges?.[0]?.node ?? null;
      return {
        eyebrow: card?.eyebrow?.trim() || null,
        eyebrowIcon: eyebrowIcon?.url
          ? {
              url: eyebrowIcon.url,
              width: eyebrowIcon.dimension?.width ?? null,
              height: eyebrowIcon.dimension?.height ?? null,
            }
          : null,
        heading: card?.heading?.trim() || null,
        body: unwrapParagraphs(card?.body),
        href: card?.link?.href || null,
        linkLabel: card?.link?.title?.trim() || null,
        image: image?.url
          ? {
              url: image.url,
              alt: card?.image_alt ?? "",
              width: image.dimension?.width ?? null,
              height: image.dimension?.height ?? null,
            }
          : null,
      };
    }),
  };
};

export const contentCardsDefinition: SectionDefinition = {
  contentstackTypename: "ContentCards",
  type: "contentCards",
  fragment: CONTENT_CARDS_FRAGMENT,
  fragmentName: "ContentCardsFields",
  transform: transformContentCards,
  render: (section) => <ContentCards section={section as ContentCardsSection} />,
};
