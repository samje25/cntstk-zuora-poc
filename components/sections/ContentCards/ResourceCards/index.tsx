import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCardsSection } from "@/lib/sections/types";
import { ResourceCard } from "./ResourceCard";
import { ResourceCarousel } from "./ResourceCarousel";

type ResourceCardsProps = { section: ContentCardsSection };

/**
 * zuora.com `.RankingGrid`: 4-up grid (2-up 767–1023), mobile slider below 767.
 * Outer wrappers mirror the Banner Hero widths so it lines up under the hero.
 */
export function ResourceCards({ section }: ResourceCardsProps) {
  const { cslpPrefix, cards } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <div className="mx-auto w-full min-[767px]:w-[95%] min-[1440px]:w-full">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 justify-items-center gap-5 px-[5px] py-[34px] min-[767px]:grid-cols-2 min-[1024px]:grid-cols-4">
          <ResourceCarousel cards={cards} cslpPrefix={cslpPrefix} />

          {cards.map((card, i) => (
            <div key={i} className="hidden min-h-[176px] min-[767px]:flex">
              <ResourceCard card={card} cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
