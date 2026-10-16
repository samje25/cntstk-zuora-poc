import { HEADER_FRAGMENT } from "@/lib/contentstack/graphql/fragments/header";
import { Header } from "@/components/sections/Header";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { HeaderCta, HeaderLink, HeaderSection } from "../types";

type RawLink = { title?: string | null; href?: string | null } | null;

type RawFile = {
  edges?: Array<{
    node?: { url?: string | null; title?: string | null } | null;
  } | null> | null;
} | null;

type RawHeader = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  logoConnection?: RawFile;
  logo_link?: RawLink;
  nav_items?: Array<{
    label?: string | null;
    columns?: number | null;
    groups?: Array<{
      kicker?: string | null;
      hide_kicker?: boolean | null;
      columns?: number | null;
      links?: Array<{
        link?: RawLink;
        description?: string | null;
        iconConnection?: RawFile;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  login?: RawLink;
  ctas?: Array<{ link?: RawLink; style?: string | null } | null> | null;
};

const transformHeader = (node: RawSectionNode): HeaderSection => {
  const raw = node as RawHeader;
  const logo = raw.logoConnection?.edges?.[0]?.node;

  return {
    id: raw.system?.uid ?? "header",
    type: "header",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Default",
    logo: logo?.url ? { url: logo.url, alt: raw.logo_link?.title?.trim() || "Logo" } : null,
    logoHref: raw.logo_link?.href || "/",
    navItems: (raw.nav_items ?? []).map((item) => ({
      label: item?.label?.trim() ?? "",
      columns: item?.columns || 1,
      groups: (item?.groups ?? []).map((group) => ({
        kicker: group?.hide_kicker ? null : group?.kicker?.trim() || null,
        columns: group?.columns || 2,
        links: (group?.links ?? [])
          .filter((l) => l?.link?.href)
          .map(
            (l): HeaderLink => ({
              label: l?.link?.title?.trim() ?? "",
              href: l?.link?.href ?? "",
              description: l?.description?.trim() || null,
              icon: l?.iconConnection?.edges?.[0]?.node?.url ?? null,
            })
          ),
      })),
    })),
    login: raw.login?.href
      ? { label: raw.login.title?.trim() ?? "", href: raw.login.href }
      : null,
    ctas: (raw.ctas ?? [])
      .filter((c) => c?.link?.href)
      .map(
        (c): HeaderCta => ({
          label: c?.link?.title?.trim() ?? "",
          href: c?.link?.href ?? "",
          style: c?.style === "Light" ? "Light" : "Dark",
        })
      ),
  };
};

export const headerDefinition: SectionDefinition = {
  contentstackTypename: "Header",
  type: "header",
  fragment: HEADER_FRAGMENT,
  fragmentName: "HeaderFields",
  transform: transformHeader,
  render: (section) => <Header section={section as HeaderSection} />,
  // Sticky: must pin against the page, not a per-section wrapper.
  unwrapped: true,
};
