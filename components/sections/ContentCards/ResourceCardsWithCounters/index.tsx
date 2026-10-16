import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCardsSection } from "@/lib/sections/types";
import { StatCard } from "./StatCard";
import { StatCarousel } from "./StatCarousel";

type ResourceCardsWithCountersProps = { section: ContentCardsSection };

/**
 * zuora.com `.HomePageContent-techGapSection`: heading row over a grid of
 * stat cards (4-up ≥1024, 3-up 1024–1300, 2-up 767–1023), slider below 767.
 * Breakpoints match zuora.com; `max-[1301px]` is their `max-width: 1300px`.
 */
export function ResourceCardsWithCounters({ section }: ResourceCardsWithCountersProps) {
  const { cslpPrefix, heading, description, backgroundImage, cards } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        className="relative mx-[10px] border border-b-[10px] border-[color:var(--zuora-silver)] border-b-[color:var(--zuora-forest)] bg-cover bg-center bg-no-repeat text-base leading-6 text-[var(--zuora-body)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[767px]:mx-5"
        style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
        data-cslp={cslpTag(cslpPrefix, "background_image")}
      >
        <div className="flex w-full flex-col items-center justify-center gap-6 px-6 pt-16 pb-8 min-[767px]:flex-row min-[767px]:px-10 min-[767px]:pt-24 min-[767px]:pb-12 min-[1024px]:px-12 min-[1024px]:pt-20">
          <div className="w-full self-start min-[767px]:w-1/2">
            {heading && (
              <h2
                className="m-0 w-full font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-[40px] min-[1024px]:w-[85%]"
                data-cslp={cslpTag(cslpPrefix, "heading")}
              >
                {heading}
              </h2>
            )}
          </div>
          {description && (
            <div
              className="w-full self-start min-[767px]:w-1/2 [&_p]:mt-0 [&_p]:mb-[14.4px] [&_p]:w-full [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal min-[767px]:[&_p]:w-[90%]"
              data-cslp={cslpTag(cslpPrefix, "description")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 place-items-center justify-center gap-5 px-2 pb-10 min-[767px]:grid-cols-[repeat(2,290px)] min-[767px]:px-10 min-[767px]:pb-20 min-[1024px]:grid-cols-[repeat(4,290px)] min-[1024px]:gap-[30px] min-[1024px]:px-16 min-[1024px]:pb-24 min-[1024px]:max-[1301px]:grid-cols-[repeat(3,290px)]!">
          <StatCarousel cards={cards} cslpPrefix={cslpPrefix} />
          {cards.map((card, i) => (
            <div key={i} className="hidden min-[767px]:flex">
              <StatCard card={card} cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
