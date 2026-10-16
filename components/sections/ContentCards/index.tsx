import type { ContentCardsSection } from "@/lib/sections/types";
import { LogoWall } from "./LogoWall";
import { ProductCards } from "./ProductCards";
import { ResourceCards } from "./ResourceCards";
import { ResourceCardsWithCounters } from "./ResourceCardsWithCounters";
import { WebinarListing } from "./WebinarListing";

type ContentCardsProps = { section: ContentCardsSection };

export function ContentCards({ section }: ContentCardsProps) {
  switch (section.frontEndComponent) {
    case "Logo Wall":
      return <LogoWall section={section} />;
    case "Resource Cards":
      return <ResourceCards section={section} />;
    case "Resource Cards with Counters":
      return <ResourceCardsWithCounters section={section} />;
    case "Product Cards":
      return <ProductCards section={section} />;
    case "Webinar Listing":
      return <WebinarListing section={section} />;
    default:
      return <LogoWall section={section} />;
  }
}
