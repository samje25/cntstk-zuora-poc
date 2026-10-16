import { BANNER_FRAGMENT } from "@/lib/contentstack/graphql/fragments/banner";
import { Banner } from "@/components/sections/Banner";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { BannerCta, BannerSection } from "../types";

type RawConnection<T> = { edges?: Array<{ node?: T | null } | null> | null } | null;

type RawBanner = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  heading?: string | null;
  ctas?: Array<{
    link?: { title?: string | null; href?: string | null } | null;
    style?: string | null;
  } | null> | null;
  desktop_videoConnection?: RawConnection<{ url?: string | null; content_type?: string | null }>;
  mobile_imageConnection?: RawConnection<{
    url?: string | null;
    title?: string | null;
    dimension?: { width?: number | null; height?: number | null } | null;
  }>;
};

const firstNode = <T,>(conn: RawConnection<T> | undefined): T | null =>
  conn?.edges?.[0]?.node ?? null;

const transformBanner = (node: RawSectionNode): BannerSection => {
  const raw = node as RawBanner;
  const video = firstNode(raw.desktop_videoConnection);
  const image = firstNode(raw.mobile_imageConnection);

  return {
    id: raw.system?.uid ?? "banner",
    type: "banner",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Banner Hero",
    heading: raw.heading ?? null,
    ctas: (raw.ctas ?? []).flatMap((cta): BannerCta[] =>
      cta?.link?.title && cta.link.href
        ? [{
            label: cta.link.title,
            href: cta.link.href,
            style: cta.style === "Teal" ? "Teal" : "White",
          }]
        : []
    ),
    desktopVideo: video?.url
      ? { url: video.url, contentType: video.content_type ?? null }
      : null,
    mobileImage: image?.url
      ? {
          url: image.url,
          title: image.title ?? null,
          width: image.dimension?.width ?? null,
          height: image.dimension?.height ?? null,
        }
      : null,
  };
};

export const bannerDefinition: SectionDefinition = {
  contentstackTypename: "Banner",
  type: "banner",
  fragment: BANNER_FRAGMENT,
  fragmentName: "BannerFields",
  transform: transformBanner,
  render: (section) => <Banner section={section as BannerSection} />,
};
