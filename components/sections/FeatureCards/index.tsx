import type { FeatureCardsSection } from "@/lib/sections/types";
import { BentoCards } from "./BentoCards";

type FeatureCardsProps = { section: FeatureCardsSection };

export function FeatureCards({ section }: FeatureCardsProps) {
  switch (section.frontEndComponent) {
    case "Bento Cards":
      return <BentoCards section={section} />;
    default:
      return <BentoCards section={section} />;
  }
}
