"use client";

import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";
import { NavButton } from "../ResourceCards/ResourceCarousel";
import { useCarouselEffect } from "../useCarouselEffect";
import { StatCard } from "./StatCard";

type StatCarouselProps = {
  cards: ContentCard[];
  cslpPrefix: string | null | undefined;
};

/**
 * Mobile slider (zuora.com `.SurveyGrid-wrapper` + `CarouselEffect`): prev
 * button, snap track, next button in one row. Slides keep zuora.com's
 * `flex: 0 0 8%`, so the 260px cards set their width.
 */
export function StatCarousel({ cards, cslpPrefix }: StatCarouselProps) {
  const count = cards.length;
  const { trackRef, slideRef, current, prevDisabled, nextDisabled, onPrev, onNext } =
    useCarouselEffect(count);

  return (
    <div className="relative flex w-full flex-row gap-2 overflow-hidden min-[767px]:hidden">
      {count > 1 && <NavButton label="Previous slide" disabled={prevDisabled} onClick={onPrev} />}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div key={i} ref={slideRef(i)} className="shrink-0 grow-0 basis-[8%] snap-center">
            <StatCard
              card={card}
              cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null}
              active={count > 1 && i === current}
            />
          </div>
        ))}
      </div>
      {count > 1 && (
        <NavButton label="Next slide" direction="next" disabled={nextDisabled} onClick={onNext} />
      )}
    </div>
  );
}
