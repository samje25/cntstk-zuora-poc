import { FEATURE_CARDS_FRAGMENT } from "@/lib/contentstack/graphql/fragments/featureCards";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { AssetImage, FeatureCard, FeatureCardsSection } from "../types";

type RawFile = {
  edges?: Array<{
    node?: {
      url?: string | null;
      dimension?: { width?: number | null; height?: number | null } | null;
    } | null;
  } | null> | null;
} | null;

type RawFeatureCards = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  heading?: string | null;
  cta_prefix?: string | null;
  cta_link?: { title?: string | null; href?: string | null } | null;
  cards?: Array<{
    heading?: string | null;
    body?: string | null;
    image_alt?: string | null;
    iconConnection?: RawFile;
    imageConnection?: RawFile;
  } | null> | null;
};

const mapFile = (conn: RawFile | undefined): AssetImage | null => {
  const node = conn?.edges?.[0]?.node;
  return node?.url
    ? {
        url: node.url,
        width: node.dimension?.width ?? null,
        height: node.dimension?.height ?? null,
      }
    : null;
};

const transformFeatureCards = (node: RawSectionNode): FeatureCardsSection => {
  const raw = node as RawFeatureCards;

  return {
    id: raw.system?.uid ?? "feature-cards",
    type: "featureCards",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Bento Cards",
    heading: raw.heading ?? null,
    ctaPrefix: raw.cta_prefix?.trim() || null,
    cta: raw.cta_link?.href
      ? { label: raw.cta_link.title?.trim() ?? "", href: raw.cta_link.href }
      : null,
    cards: (raw.cards ?? []).map(
      (card): FeatureCard => ({
        heading: card?.heading?.trim() || null,
        body: card?.body?.trim() || null,
        icon: mapFile(card?.iconConnection),
        image: mapFile(card?.imageConnection),
        imageAlt: card?.image_alt ?? "",
      })
    ),
  };
};

export const featureCardsDefinition: SectionDefinition = {
  contentstackTypename: "FeatureCards",
  type: "featureCards",
  fragment: FEATURE_CARDS_FRAGMENT,
  fragmentName: "FeatureCardsFields",
  transform: transformFeatureCards,
  render: (section) => <FeatureCards section={section as FeatureCardsSection} />,
};
