import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";

type EventCardProps = {
  card: ContentCard;
  /** Item-scoped Live Preview base, e.g. `content_cards.blt…en-us.cards.0`. */
  cslp: string | null;
  /** Slider's current card: clay colourway, title/image kept (zuora.com `.is-active`). */
  active?: boolean;
};

const ARROW_PATH =
  "M25.1191 11.9795L19.8691 17.223C19.7049 17.387 19.4822 17.4791 19.25 17.4791C19.0178 17.4791 18.7951 17.387 18.6309 17.223C18.4668 17.0591 18.3745 16.8366 18.3745 16.6047C18.3745 16.3728 18.4668 16.1504 18.6309 15.9864L22.388 12.2351H14C11.4482 12.238 9.0017 13.2517 7.19729 15.0539C5.39288 16.8561 4.37789 19.2996 4.375 21.8483C4.375 22.0801 4.28281 22.3024 4.11872 22.4663C3.95462 22.6302 3.73206 22.7222 3.5 22.7222C3.26794 22.7222 3.04538 22.6302 2.88128 22.4663C2.71719 22.3024 2.625 22.0801 2.625 21.8483C2.62818 18.8361 3.82764 15.9482 5.96018 13.8183C8.09271 11.6884 10.9841 10.4904 14 10.4872H22.388L18.6309 6.73588C18.5496 6.65469 18.4852 6.55829 18.4412 6.4522C18.3972 6.34611 18.3745 6.23241 18.3745 6.11758C18.3745 6.00275 18.3972 5.88904 18.4412 5.78295C18.4852 5.67687 18.5496 5.58047 18.6309 5.49927C18.7951 5.33529 19.0178 5.24316 19.25 5.24316C19.365 5.24316 19.4788 5.26578 19.585 5.30972C19.6913 5.35367 19.7878 5.41808 19.8691 5.49927L25.1191 10.7428C25.2004 10.824 25.265 10.9204 25.309 11.0265C25.353 11.1326 25.3757 11.2463 25.3757 11.3612C25.3757 11.476 25.353 11.5897 25.309 11.6958C25.265 11.8019 25.2004 11.8983 25.1191 11.9795Z";

// Hover and the slider's active state share the clay colourway.
const CLAY =
  "group-data-[active=true]/ecard:border-[color:var(--zuora-cloud)] group-data-[active=true]/ecard:bg-[var(--zuora-clay)] group-data-[active=true]/ecard:text-[var(--zuora-white)] group-[:hover]/ecard:border-[color:var(--zuora-cloud)] group-[:hover]/ecard:bg-[var(--zuora-clay)] group-[:hover]/ecard:text-[var(--zuora-white)]";
const FADE =
  "[transition:background-color_0.5s_ease,color_0.5s_ease,border-color_0.5s_ease,box-shadow_0.5s_ease]";

/**
 * zuora.com `.EventRailCard`: a tab-topped card. On hover it turns clay and
 * swaps the title + image for the description and a CTA button.
 */
export function EventCard({ card, cslp, active = false }: EventCardProps) {
  return (
    <a
      href={card.href ?? undefined}
      data-active={active}
      className="group/ecard relative flex min-h-[348px] w-[300px] cursor-pointer flex-col gap-0 text-[var(--zuora-black)] min-[767px]:min-h-[387px] min-[767px]:w-[356px]"
    >
      <div
        className={`absolute top-0 left-0 z-[1] box-border flex h-[42px] w-[259px] flex-row items-center gap-2 rounded-t-[8px] border border-r-0 border-b-0 border-[color:var(--zuora-silver)] bg-[var(--zuora-white)] pt-5 pl-4 text-[var(--zuora-greys-500)] ${FADE} ${CLAY} min-[767px]:w-[316px]`}
      >
        {card.eyebrowIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.eyebrowIcon.url}
            alt=""
            width={card.eyebrowIcon.width ?? undefined}
            height={card.eyebrowIcon.height ?? undefined}
            loading="lazy"
            decoding="async"
            className="[transition:filter_0.5s_ease] group-data-[active=true]/ecard:[filter:brightness(0)_invert(1)] group-[:hover]/ecard:[filter:brightness(0)_invert(1)]"
          />
        )}
        {card.eyebrow && (
          <span
            className="m-0 text-center font-[family-name:var(--font-founders-grotesk-mono)] text-[12px] leading-[1.5] font-medium uppercase"
            data-cslp={cslpTag(cslp, "eyebrow")}
          >
            {card.eyebrow}
          </span>
        )}
        <div className="absolute right-[-6px] bottom-0 h-[6px] w-[10px] rounded-[40px] [transition:background-color_0.5s_ease] group-data-[active=true]/ecard:bg-[var(--zuora-clay)] group-[:hover]/ecard:bg-[var(--zuora-clay)]" />
      </div>

      <div
        className={`mt-[41px] flex h-[352px] w-full flex-col justify-between gap-[10px] rounded-[0_8px_8px_8px] border border-t-0 border-[color:var(--zuora-silver)] bg-[var(--zuora-white)] px-5 py-[10px] shadow-[0_3px_4px_0_var(--zuora-silver)] ${FADE} ${CLAY} group-data-[active=true]/ecard:shadow-[0_3px_4px_0_rgba(0,0,0,0.1)] group-[:hover]/ecard:shadow-[0_3px_4px_0_rgba(0,0,0,0.1)]`}
      >
        {card.heading && (
          <h3
            className="m-0 font-[family-name:var(--font-founders-grotesk)] text-[30px] leading-[1.1] font-medium [transition:display_0.5s_ease] group-[:hover]/ecard:hidden"
            data-cslp={cslpTag(cslp, "heading")}
          >
            {card.heading}
          </h3>
        )}
        {card.image && (
          <figure className="m-0 flex w-full justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.url}
              alt={card.image.alt}
              width={card.image.width ?? undefined}
              height={card.image.height ?? undefined}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain [transition:display_0.5s_ease] group-[:hover]/ecard:hidden"
              data-cslp={cslpTag(cslp, "image")}
            />
          </figure>
        )}
        <div className="hidden h-full flex-col justify-between [transition:display_0.5s_ease] group-[:hover]/ecard:flex">
          {card.body && (
            <p
              className="font-[family-name:var(--font-ibm-plex-serif)] text-[14px] leading-[1.5] font-normal"
              data-cslp={cslpTag(cslp, "body")}
              dangerouslySetInnerHTML={{ __html: card.body }}
            />
          )}
          {card.linkLabel && (
            <div className="mx-auto">
              <span
                className="flex h-fit w-fit items-center justify-center gap-x-2 rounded-[50px] border-2 border-[color:var(--zuora-black)] bg-[var(--zuora-black)] px-4 py-[10px] font-[family-name:var(--font-founders-grotesk)] text-base leading-[21px] font-medium text-[var(--zuora-white)] [transition:all_0.3s_ease] [&:hover]:bg-transparent [&:hover]:text-[var(--zuora-black)]"
                data-cslp={cslpTag(cslp, "link")}
              >
                {card.linkLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-[6px] right-[6px] z-[2] flex h-[35px] w-[35px] flex-row items-center justify-center rounded-[0_8px_0_8px] border border-t-0 border-r-0 border-[color:var(--zuora-silver)] bg-transparent p-2 [transition:background-color_0.5s_ease] group-data-[active=true]/ecard:bg-[var(--zuora-forest)] group-[:hover]/ecard:bg-[var(--zuora-forest)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d={ARROW_PATH}
            className="fill-[var(--zuora-black)] [transition:fill_0.5s_ease] group-data-[active=true]/ecard:fill-[var(--zuora-white)] group-[:hover]/ecard:fill-[var(--zuora-white)]"
          />
        </svg>
      </div>
    </a>
  );
}
