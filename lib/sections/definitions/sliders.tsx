import { SLIDERS_FRAGMENT } from "@/lib/contentstack/graphql/fragments/sliders";
import { Sliders } from "@/components/sections/Sliders";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { Slide, SlidersSection } from "../types";

type RawSliders = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  heading?: string | null;
  slides?: Array<{
    quote?: string | null;
    speaker?: string | null;
    image_alt?: string | null;
    link?: { title?: string | null; href?: string | null } | null;
    imageConnection?: {
      edges?: Array<{
        node?: {
          url?: string | null;
          dimension?: { width?: number | null; height?: number | null } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null> | null;
};

const transformSliders = (node: RawSectionNode): SlidersSection => {
  const raw = node as RawSliders;

  return {
    id: raw.system?.uid ?? "sliders",
    type: "sliders",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Testimonial Slider",
    heading: raw.heading ?? null,
    slides: (raw.slides ?? []).map((slide): Slide => {
      const image = slide?.imageConnection?.edges?.[0]?.node ?? null;
      return {
        quote: slide?.quote?.trim() || null,
        speaker: slide?.speaker?.trim() || null,
        image: image?.url
          ? {
              url: image.url,
              alt: slide?.image_alt ?? "",
              width: image.dimension?.width ?? null,
              height: image.dimension?.height ?? null,
            }
          : null,
        link: slide?.link?.href
          ? { label: slide.link.title?.trim() || null, href: slide.link.href }
          : null,
      };
    }),
  };
};

export const slidersDefinition: SectionDefinition = {
  contentstackTypename: "Sliders",
  type: "sliders",
  fragment: SLIDERS_FRAGMENT,
  fragmentName: "SlidersFields",
  transform: transformSliders,
  render: (section) => <Sliders section={section as SlidersSection} />,
};
