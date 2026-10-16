"use client";

import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";
import { NavButton } from "../ResourceCards/ResourceCarousel";
import { useCarouselEffect } from "../useCarouselEffect";
import { EventCard } from "./EventCard";

type EventCarouselProps = {
  cards: ContentCard[];
  cslpPrefix: string | null | undefined;
  /** Hide from 1072px up, where the static grid takes over (≤3 cards). */
  hideOnDesktop: boolean;
};

/**
 * zuora.com `.EventRailGrid-wrapper`: [prev | snap track | next] in a 3-column
 * grid, driven by the shared `CarouselEffect` port.
 */
export function EventCarousel({ cards, cslpPrefix, hideOnDesktop }: EventCarouselProps) {
  const count = cards.length;
  const { trackRef, slideRef, current, prevDisabled, nextDisabled, onPrev, onNext } =
    useCarouselEffect(count);

  return (
    <div
      className={`relative grid w-full max-w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 ${
        hideOnDesktop ? "min-[1072px]:hidden" : ""
      }`}
    >
      <NavButton label="Previous slide" disabled={prevDisabled} onClick={onPrev} />
      <div
        ref={trackRef}
        className="flex max-w-full min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto py-5 [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div key={i} ref={slideRef(i)} className="flex-none snap-center">
            <EventCard
              card={card}
              cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null}
              active={count > 1 && i === current}
            />
          </div>
        ))}
      </div>
      <NavButton label="Next slide" direction="next" disabled={nextDisabled} onClick={onNext} />
    </div>
  );
}
