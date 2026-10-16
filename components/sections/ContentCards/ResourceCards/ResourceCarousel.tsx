"use client";

import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";
import { useCarouselEffect } from "../useCarouselEffect";
import { ResourceCard } from "./ResourceCard";

type ResourceCarouselProps = {
  cards: ContentCard[];
  cslpPrefix: string | null | undefined;
};

/** Mobile slider (zuora.com `CarouselEffect`, see `useCarouselEffect`). */
export function ResourceCarousel({ cards, cslpPrefix }: ResourceCarouselProps) {
  const count = cards.length;
  const { trackRef, slideRef, current, prevDisabled, nextDisabled, onPrev, onNext } =
    useCarouselEffect(count);

  return (
    <div className="relative col-span-full w-full overflow-hidden min-[767px]:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pl-10 [scroll-behavior:smooth] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div key={i} ref={slideRef(i)} className="shrink-0 grow-0 basis-[85%] snap-center">
            <ResourceCard
              card={card}
              cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null}
              active={count > 1 && i === current}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          <NavButton label="Previous slide" disabled={prevDisabled} onClick={onPrev} />
          <NavButton label="Next slide" direction="next" disabled={nextDisabled} onClick={onNext} />
        </div>
      )}
    </div>
  );
}

type NavButtonProps = {
  label: string;
  direction?: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

// zuora.com `.RankingGrid-navBtn`: grey circle-arrow, teal on hover/focus.
export function NavButton({ label, direction = "prev", disabled, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0 [transition:0.3s] focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 [&:focus_path]:fill-[var(--zuora-teal)] [&:hover_path]:fill-[var(--zuora-teal)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={`h-6 w-6 ${direction === "next" ? "rotate-180" : ""}`}
      >
        <path
          className="fill-[var(--zuora-slate)] [transition:fill_0.3s]"
          d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM9.75 18C8.11831 18 6.52326 17.5161 5.16655 16.6096C3.80984 15.7031 2.75242 14.4146 2.128 12.9071C1.50358 11.3996 1.3402 9.74085 1.65853 8.1405C1.97685 6.54016 2.76259 5.07015 3.91637 3.91637C5.07016 2.76259 6.54017 1.97685 8.14051 1.65852C9.74085 1.34019 11.3997 1.50357 12.9071 2.12799C14.4146 2.75242 15.7031 3.80984 16.6096 5.16655C17.5161 6.52325 18 8.1183 18 9.75C17.9975 11.9373 17.1275 14.0343 15.5809 15.5809C14.0343 17.1275 11.9373 17.9975 9.75 18ZM14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H7.81032L9.53063 12.2194C9.60031 12.2891 9.65559 12.3718 9.6933 12.4628C9.73101 12.5539 9.75042 12.6515 9.75042 12.75C9.75042 12.8485 9.73101 12.9461 9.6933 13.0372C9.65559 13.1282 9.60031 13.2109 9.53063 13.2806C9.46095 13.3503 9.37822 13.4056 9.28718 13.4433C9.19613 13.481 9.09855 13.5004 9 13.5004C8.90146 13.5004 8.80388 13.481 8.71283 13.4433C8.62179 13.4056 8.53906 13.3503 8.46938 13.2806L5.46938 10.2806C5.39965 10.211 5.34433 10.1283 5.30658 10.0372C5.26884 9.94616 5.24941 9.84856 5.24941 9.75C5.24941 9.65144 5.26884 9.55384 5.30658 9.4628C5.34433 9.37175 5.39965 9.28903 5.46938 9.21937L8.46938 6.21937C8.61011 6.07864 8.80098 5.99958 9 5.99958C9.19903 5.99958 9.3899 6.07864 9.53063 6.21937C9.67136 6.36011 9.75042 6.55098 9.75042 6.75C9.75042 6.94902 9.67136 7.13989 9.53063 7.28063L7.81032 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75Z"
        />
      </svg>
    </button>
  );
}
