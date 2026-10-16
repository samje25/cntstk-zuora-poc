import { TABS_AND_PILLS_FRAGMENT } from "@/lib/contentstack/graphql/fragments/tabsAndPills";
import { TabsAndPills } from "@/components/sections/TabsAndPills";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type {
  AssetImage,
  OverlapLayout,
  ScrollingTab,
  TabsAndPillsSection,
} from "../types";

type RawFile = {
  edges?: Array<{
    node?: {
      url?: string | null;
      dimension?: { width?: number | null; height?: number | null } | null;
    } | null;
  } | null> | null;
} | null;

type RawLink = { title?: string | null; href?: string | null } | null;

type RawTabsAndPills = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  heading?: string | null;
  description?: string | null;
  nav_iconConnection?: RawFile;
  cta_link?: RawLink;
  disable_autoplay?: boolean | null;
  tabs?: Array<{
    tab_label?: string | null;
    anchor_id?: string | null;
    tab_summary?: string | null;
    heading?: string | null;
    body?: string | null;
    partner_logo_alt?: string | null;
    partner_stat?: string | null;
    partner_link?: RawLink;
    cta_prefix?: string | null;
    cta_link?: RawLink;
    overlap_layout?: string | null;
    image_alt?: string | null;
    tab_iconConnection?: RawFile;
    partner_logoConnection?: RawFile;
    background_imageConnection?: RawFile;
    imageConnection?: RawFile;
    overlap_imageConnection?: RawFile;
  } | null> | null;
};

const OVERLAP_LAYOUTS: OverlapLayout[] = [
  "Top band",
  "Bottom right compact",
  "Bottom wide",
  "Bottom right",
  "Top right compact",
];

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

const mapLink = (link: RawLink | undefined): { label: string; href: string } | null =>
  link?.href ? { label: link.title?.trim() ?? "", href: link.href } : null;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const transformTabsAndPills = (node: RawSectionNode): TabsAndPillsSection => {
  const raw = node as RawTabsAndPills;

  return {
    id: raw.system?.uid ?? "tabs-and-pills",
    type: "tabsAndPills",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Scrolling Tabs",
    heading: raw.heading ?? null,
    description: raw.description?.trim() || null,
    navIcon: mapFile(raw.nav_iconConnection),
    ctaLink: mapLink(raw.cta_link),
    disableAutoplay: raw.disable_autoplay === true,
    tabs: (raw.tabs ?? []).map((tab, i): ScrollingTab => {
      const label = tab?.tab_label?.trim() || `Tab ${i + 1}`;
      const logo = mapFile(tab?.partner_logoConnection);
      const layout = tab?.overlap_layout as OverlapLayout | undefined;
      return {
        label,
        anchorId: tab?.anchor_id?.trim() || `tab-${slugify(label)}`,
        icon: mapFile(tab?.tab_iconConnection),
        summary: tab?.tab_summary?.trim() || null,
        heading: tab?.heading ?? null,
        body: tab?.body?.trim() || null,
        partnerLogo: logo ? { ...logo, alt: tab?.partner_logo_alt ?? "" } : null,
        partnerStat: tab?.partner_stat?.trim() || null,
        partnerLink: mapLink(tab?.partner_link),
        ctaPrefix: tab?.cta_prefix?.trim() || null,
        cta: mapLink(tab?.cta_link),
        backgroundImage: mapFile(tab?.background_imageConnection),
        image: mapFile(tab?.imageConnection),
        imageAlt: tab?.image_alt ?? "",
        overlapImage: mapFile(tab?.overlap_imageConnection),
        overlapLayout: layout && OVERLAP_LAYOUTS.includes(layout) ? layout : "Bottom right",
      };
    }),
  };
};

export const tabsAndPillsDefinition: SectionDefinition = {
  contentstackTypename: "TabsAndPills",
  type: "tabsAndPills",
  fragment: TABS_AND_PILLS_FRAGMENT,
  fragmentName: "TabsAndPillsFields",
  transform: transformTabsAndPills,
  render: (section) => <TabsAndPills section={section as TabsAndPillsSection} />,
};
