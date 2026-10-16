import Image from "next/image";
import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCardsSection } from "@/lib/sections/types";

type LogoWallProps = { section: ContentCardsSection };

/**
 * zuora.com "EMPOWERING 1000+ COMPANIES" strip. Hangs under the Banner Hero
 * panel, so the outer wrappers mirror the hero's widths (95% → 1440 max).
 * Static on the live site: no hover, no motion.
 */
export function LogoWall({ section }: LogoWallProps) {
  const { cslpPrefix, heading, cards } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <div className="mx-auto w-full min-[767px]:w-[95%] min-[1440px]:w-full">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center bg-[var(--zuora-forest)] text-[var(--zuora-white)] min-[767px]:flex-row min-[767px]:rounded-b-[16px]">
          {heading && (
            <div className="flex min-h-[40px] w-[70%] items-center justify-center p-0 min-[767px]:min-h-[70px] min-[767px]:w-[30%] min-[767px]:p-5">
              <p
                className="m-0 text-center font-[family-name:var(--font-founders-grotesk-mono)] text-[14px] leading-[1.2] font-medium min-[767px]:self-center min-[767px]:text-start"
                data-cslp={cslpTag(cslpPrefix, "heading")}
              >
                {heading}
              </p>
            </div>
          )}

          <ul
            className="m-0 mx-auto grid w-full list-none grid-cols-3 items-center p-0 min-[767px]:w-3/4 min-[767px]:grid-cols-6"
            role="list"
          >
            {cards.map((card, i) =>
              card.image ? (
                <li
                  key={`${card.image.url}-${i}`}
                  className="flex items-center justify-center px-2 min-[767px]:px-4"
                >
                  <Image
                    src={card.image.url}
                    alt={card.image.alt}
                    width={card.image.width ?? 226}
                    height={card.image.height ?? 108}
                    unoptimized
                    loading="lazy"
                    className="h-auto max-h-16 max-w-full object-contain"
                    data-cslp={cslpTag(cslpPrefix, `cards.${i}.image`)}
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
