import Image from "next/image";
import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";

type ResourceCardProps = {
  card: ContentCard;
  /** Item-scoped Live Preview base, e.g. `content_cards.blt…en-us.cards.0`. */
  cslp: string | null;
  /** Slider's current card: same look as hover (zuora.com `.is-active`). */
  active?: boolean;
};

// Plain `:hover` (no hover media query) to match zuora.com on touch devices too.
const ACTIVE_ICON =
  "group-[:hover]/card:bg-[var(--zuora-forest)] group-data-[active=true]/card:bg-[var(--zuora-forest)]";
const ACTIVE_PATH =
  "group-[:hover]/card:fill-[var(--zuora-white)] group-data-[active=true]/card:fill-[var(--zuora-white)]";

/** zuora.com `.RankingCard`. */
export function ResourceCard({ card, cslp, active = false }: ResourceCardProps) {
  return (
    <a
      href={card.href ?? undefined}
      data-active={active}
      data-cslp={cslpTag(cslp, "link")}
      className="group/card relative my-1 flex min-h-[220px] w-full flex-col justify-between rounded-[8px] bg-[var(--zuora-white)] p-3 shadow-[0_1px_4px_0_var(--zuora-silver)] [transition:box-shadow_0.25s] data-[active=true]:cursor-pointer data-[active=true]:shadow-[0_1px_24px_0_var(--zuora-silver)] min-[767px]:min-h-[176px] [&:hover]:cursor-pointer [&:hover]:shadow-[0_1px_24px_0_var(--zuora-silver)]"
    >
      {card.body && (
        <pre
          className="my-4 font-[family-name:var(--font-ibm-plex-serif)] text-base leading-6 font-normal whitespace-pre-wrap text-[var(--zuora-black)]"
          data-cslp={cslpTag(cslp, "body")}
          dangerouslySetInnerHTML={{ __html: card.body }}
        />
      )}

      {card.image && (
        <figure className="m-0 flex h-[44px] w-[170px] items-center">
          <Image
            src={card.image.url}
            alt={card.image.alt}
            width={card.image.width ?? 170}
            height={card.image.height ?? 44}
            unoptimized
            aria-hidden="true"
            className="h-full w-full object-contain object-left"
            data-cslp={cslpTag(cslp, "image")}
          />
        </figure>
      )}

      <div
        className={`absolute right-0 bottom-0 flex h-[45px] w-[45px] flex-col items-center justify-center rounded-tl-[8px] rounded-br-[8px] border-t border-l border-[var(--zuora-silver)] [transition:background-color_0.25s] ${ACTIVE_ICON}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            className={`fill-[var(--zuora-black)] [transition:fill_0.25s] ${ACTIVE_PATH}`}
            d="M25.1191 11.9941L19.8691 17.2441C19.7049 17.4082 19.4822 17.5005 19.25 17.5005C19.0178 17.5005 18.7951 17.4082 18.6309 17.2441C18.4668 17.0799 18.3745 16.8572 18.3745 16.625C18.3745 16.3928 18.4668 16.1701 18.6309 16.0059L22.388 12.25H14C11.4482 12.2529 9.0017 13.2679 7.19729 15.0723C5.39288 16.8767 4.37789 19.3232 4.375 21.875C4.375 22.1071 4.28281 22.3296 4.11872 22.4937C3.95462 22.6578 3.73206 22.75 3.5 22.75C3.26794 22.75 3.04538 22.6578 2.88128 22.4937C2.71719 22.3296 2.625 22.1071 2.625 21.875C2.62818 18.8591 3.82764 15.9677 5.96018 13.8352C8.09271 11.7026 10.9841 10.5032 14 10.5H22.388L18.6309 6.74406C18.5496 6.66276 18.4852 6.56625 18.4412 6.46003C18.3972 6.35381 18.3745 6.23997 18.3745 6.125C18.3745 6.01003 18.3972 5.89618 18.4412 5.78996C18.4852 5.68374 18.5496 5.58723 18.6309 5.50594C18.7951 5.34175 19.0178 5.24951 19.25 5.24951C19.365 5.24951 19.4788 5.27216 19.585 5.31615C19.6913 5.36015 19.7878 5.42464 19.8691 5.50594L25.1191 10.7559C25.2004 10.8372 25.265 10.9337 25.309 11.0399C25.353 11.1461 25.3757 11.26 25.3757 11.375C25.3757 11.49 25.353 11.6038 25.309 11.7101C25.265 11.8163 25.2004 11.9128 25.1191 11.9941Z"
          />
        </svg>
      </div>
    </a>
  );
}
