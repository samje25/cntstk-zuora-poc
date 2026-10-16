import { FOOTER_FRAGMENT } from "@/lib/contentstack/graphql/fragments/footer";
import { Footer } from "@/components/sections/Footer";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { FooterLink, FooterSection } from "../types";

type RawLink = { title?: string | null; href?: string | null } | null;

type RawFile = {
  edges?: Array<{ node?: { url?: string | null } | null } | null> | null;
} | null;

type RawFooter = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  region_label?: string | null;
  regions?: Array<{
    label?: string | null;
    locale_code?: string | null;
    flagConnection?: RawFile;
  } | null> | null;
  newsletter_text?: string | null;
  email_placeholder?: string | null;
  submit_label?: string | null;
  error_message?: string | null;
  error_detail?: string | null;
  success_title?: string | null;
  success_message?: string | null;
  social_heading?: string | null;
  social_links?: Array<{ link?: RawLink; iconConnection?: RawFile } | null> | null;
  columns?: Array<{
    heading?: string | null;
    desktop_order?: number | null;
    groups?: Array<{
      kicker?: string | null;
      links?: Array<{ link?: RawLink } | null> | null;
    } | null> | null;
  } | null> | null;
  copyright?: string | null;
  legal_links?: Array<{ link?: RawLink } | null> | null;
  cookie_label?: string | null;
  background_logoConnection?: RawFile;
};

const fileUrl = (conn: RawFile | undefined) => conn?.edges?.[0]?.node?.url ?? null;

const mapLink = (link: RawLink | undefined): FooterLink | null =>
  link?.href ? { label: link.title?.trim() ?? "", href: link.href } : null;

const isLink = (link: FooterLink | null): link is FooterLink => link !== null;

// RTE wraps the line in <p>; the footer renders it inside its own <p>.
const unwrapParagraph = (html: string | null | undefined): string | null => {
  const trimmed = html?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/^<p[^>]*>/, "").replace(/<\/p>$/, "");
};

const transformFooter = (node: RawSectionNode): FooterSection => {
  const raw = node as RawFooter;
  // "en-us" → "en": the region matching the entry's locale is the current one.
  const currentLocale = raw.system?.locale?.split("-")[0] ?? "en";

  return {
    id: raw.system?.uid ?? "footer",
    type: "footer",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Default",
    regionLabel: raw.region_label?.trim() || null,
    regions: (raw.regions ?? []).map((region) => ({
      label: region?.label?.trim() ?? "",
      localeCode: region?.locale_code?.trim() ?? "",
      flag: fileUrl(region?.flagConnection),
      current: region?.locale_code?.trim() === currentLocale,
    })),
    newsletterHtml: unwrapParagraph(raw.newsletter_text),
    emailPlaceholder: raw.email_placeholder?.trim() ?? "",
    submitLabel: raw.submit_label?.trim() ?? "",
    errorMessage: raw.error_message?.trim() ?? "",
    errorDetail: raw.error_detail?.trim() ?? "",
    successTitle: raw.success_title?.trim() ?? "",
    successMessage: raw.success_message?.trim() ?? "",
    socialHeading: raw.social_heading?.trim() || null,
    socialLinks: (raw.social_links ?? [])
      .map((item) => {
        const link = mapLink(item?.link);
        return link ? { ...link, icon: fileUrl(item?.iconConnection) } : null;
      })
      .filter((item) => item !== null),
    columns: (raw.columns ?? []).map((column, i) => ({
      heading: column?.heading?.trim() ?? "",
      desktopOrder: column?.desktop_order ?? i + 1,
      groups: (column?.groups ?? []).map((group) => ({
        kicker: group?.kicker?.trim() || null,
        links: (group?.links ?? []).map((l) => mapLink(l?.link)).filter(isLink),
      })),
    })),
    copyright: raw.copyright?.trim() || null,
    legalLinks: (raw.legal_links ?? []).map((l) => mapLink(l?.link)).filter(isLink),
    cookieLabel: raw.cookie_label?.trim() || null,
    backgroundLogo: fileUrl(raw.background_logoConnection),
  };
};

export const footerDefinition: SectionDefinition = {
  contentstackTypename: "Footer",
  type: "footer",
  fragment: FOOTER_FRAGMENT,
  fragmentName: "FooterFields",
  transform: transformFooter,
  render: (section) => <Footer section={section as FooterSection} />,
};
