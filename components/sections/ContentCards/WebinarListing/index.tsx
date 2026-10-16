import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCardsSection } from "@/lib/sections/types";
import { EventCard } from "./EventCard";
import { EventCarousel } from "./EventCarousel";

type WebinarListingProps = { section: ContentCardsSection };

// zuora.com `.EventRailGrid-count-N` desktop columns (≥1072px).
const DESKTOP_COLUMNS: Record<number, string> = {
  1: "min-[1072px]:grid-cols-[minmax(336px,1fr)]",
  2: "min-[1072px]:grid-cols-[repeat(2,minmax(336px,1fr))]",
  3: "min-[1072px]:grid-cols-[repeat(3,minmax(336px,1fr))]",
};

/**
 * zuora.com `.HomePageContent-footerSection` + `.EventRailGrid`: heading, then
 * up to three event cards in a grid from 1072px, a slider below (and at every
 * width when there are more than three).
 */
export function WebinarListing({ section }: WebinarListingProps) {
  const { cslpPrefix, heading, description, cards } = section;
  const gridOnDesktop = cards.length > 0 && cards.length <= 3;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section className="mx-auto mb-16 flex min-h-[500px] max-w-[1200px] flex-col items-center gap-10 text-base leading-6 text-[var(--zuora-body)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[767px]:mb-20 min-[1024px]:mb-[120px]">
        <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-[10px] min-[767px]:w-[500px]">
          {heading && (
            <h2
              className="m-0 text-center font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-[48px]"
              data-cslp={cslpTag(cslpPrefix, "heading")}
            >
              {heading}
            </h2>
          )}
          {description && (
            <div
              className="text-center [&_p]:m-0 [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-[1.5] [&_p]:font-medium"
              data-cslp={cslpTag(cslpPrefix, "description")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div
          className={`grid w-full max-w-full grid-cols-1 place-items-center justify-center justify-items-center gap-6 px-2 pb-10 ${
            gridOnDesktop ? DESKTOP_COLUMNS[cards.length] : ""
          }`}
        >
          <EventCarousel cards={cards} cslpPrefix={cslpPrefix} hideOnDesktop={gridOnDesktop} />
          {gridOnDesktop &&
            cards.map((card, i) => (
              <div key={i} className="hidden w-full min-[1072px]:block">
                <EventCard card={card} cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
