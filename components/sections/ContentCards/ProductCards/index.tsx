import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard, ContentCardsSection } from "@/lib/sections/types";

type ProductCardsProps = { section: ContentCardsSection };

/** zuora.com tile arrow (shared with the Resource Cards corner icon). */
const ARROW_PATH =
  "M25.1191 11.9941L19.8691 17.2441C19.7049 17.4082 19.4822 17.5005 19.25 17.5005C19.0178 17.5005 18.7951 17.4082 18.6309 17.2441C18.4668 17.0799 18.3745 16.8572 18.3745 16.625C18.3745 16.3928 18.4668 16.1701 18.6309 16.0059L22.388 12.25H14C11.4482 12.2529 9.0017 13.2679 7.19729 15.0723C5.39288 16.8767 4.37789 19.3232 4.375 21.875C4.375 22.1071 4.28281 22.3296 4.11872 22.4937C3.95462 22.6578 3.73206 22.75 3.5 22.75C3.26794 22.75 3.04538 22.6578 2.88128 22.4937C2.71719 22.3296 2.625 22.1071 2.625 21.875C2.62818 18.8591 3.82764 15.9677 5.96018 13.8352C8.09271 11.7026 10.9841 10.5032 14 10.5H22.388L18.6309 6.74406C18.5496 6.66276 18.4852 6.56625 18.4412 6.46003C18.3972 6.35381 18.3745 6.23997 18.3745 6.125C18.3745 6.01003 18.3972 5.89618 18.4412 5.78996C18.4852 5.68374 18.5496 5.58723 18.6309 5.50594C18.7951 5.34175 19.0178 5.24951 19.25 5.24951C19.365 5.24951 19.4788 5.27216 19.585 5.31615C19.6913 5.36015 19.7878 5.42464 19.8691 5.50594L25.1191 10.7559C25.2004 10.8372 25.265 10.9337 25.309 11.0399C25.353 11.1461 25.3757 11.26 25.3757 11.375C25.3757 11.49 25.353 11.6038 25.309 11.7101C25.265 11.8163 25.2004 11.9128 25.1191 11.9941Z";

/**
 * zuora.com `.HomePageContent-productsSection`: a white panel (forest heading
 * band + 1/2/3-column product tiles) centred on a background graphic. Tiles
 * lift with a shadow on hover and the corner tab turns forest green. CSS only.
 */
export function ProductCards({ section }: ProductCardsProps) {
  const { cslpPrefix, heading, description, backgroundImage, cards } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        className="my-[60px] flex min-h-[740px] w-full items-center justify-center bg-cover bg-center bg-no-repeat text-base leading-6 text-[var(--zuora-body)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[1024px]:bg-contain"
        style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
        data-cslp={cslpTag(cslpPrefix, "background_image")}
      >
        <div className="flex min-h-[626px] w-full max-w-[1200px] flex-col rounded-[8px] border-[0.5px] border-[color:var(--zuora-silver)] bg-[var(--zuora-white)]">
          <div className="flex w-full flex-col items-center justify-center gap-6 rounded-t-[8px] bg-[var(--zuora-forest)] px-6 pt-16 pb-8 text-[var(--zuora-white)] min-[767px]:flex-row min-[767px]:px-10 min-[767px]:pt-24 min-[767px]:pb-12 min-[1024px]:px-12 min-[1024px]:pt-20">
            <div className="w-full self-start min-[767px]:w-1/2">
              {heading && (
                <h2
                  className="m-0 w-full text-center font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-start min-[1024px]:w-[95%] min-[1024px]:text-[48px]"
                  data-cslp={cslpTag(cslpPrefix, "heading")}
                >
                  {heading}
                </h2>
              )}
            </div>
            {description && (
              <div
                className="w-full self-start min-[767px]:w-1/2 [&_p]:mt-0 [&_p]:mb-[14.4px] [&_p]:w-full [&_p]:text-center [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal min-[767px]:[&_p]:w-[90%] min-[767px]:[&_p]:text-start"
                data-cslp={cslpTag(cslpPrefix, "description")}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          <div className="mx-auto grid w-[95%] grid-cols-1 min-[767px]:grid-cols-2 min-[1024px]:w-full min-[1024px]:grid-cols-3">
            {cards.map((card, i) => (
              <ProductTile key={i} card={card} cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

type ProductTileProps = { card: ContentCard; cslp: string | null };

/** zuora.com `.ProductTile`. */
function ProductTile({ card, cslp }: ProductTileProps) {
  const className =
    "group/tile relative flex min-h-[200px] cursor-pointer flex-row gap-4 border-[0.5px] border-[color:var(--zuora-silver)] p-[30px] text-[var(--zuora-black)] [&:hover]:shadow-[0_4px_24px_0_var(--zuora-silver)]";

  const children = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[color:var(--zuora-cloud)] p-2 shadow-[0_1px_4px_0_var(--zuora-silver)]">
        {card.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image.url}
            alt={card.image.alt}
            width={card.image.width ?? undefined}
            height={card.image.height ?? undefined}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="mt-auto"
            data-cslp={cslpTag(cslp, "image")}
          />
        )}
      </div>
      <div className="flex w-[70%] flex-col gap-2">
        {card.heading && (
          <h3
            className="my-0 font-[family-name:var(--font-founders-grotesk)] text-[20px] leading-none font-medium"
            data-cslp={cslpTag(cslp, "heading")}
          >
            {card.heading}
          </h3>
        )}
        {card.body && (
          <p
            className="m-0 font-[family-name:var(--font-ibm-plex-serif)] text-[14px] leading-[1.5] font-normal"
            data-cslp={cslpTag(cslp, "body")}
            dangerouslySetInnerHTML={{ __html: card.body }}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 flex h-12 w-12 flex-col items-center justify-center rounded-tl-[8px] border-t border-l border-[color:var(--zuora-silver)] [transition:background-color_0.4s_ease] group-[:hover]/tile:bg-[var(--zuora-forest)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d={ARROW_PATH}
            className="fill-[var(--zuora-black)] [transition:fill_0.4s_ease] group-[:hover]/tile:fill-[var(--zuora-white)]"
          />
        </svg>
      </div>
    </>
  );

  return card.href ? (
    <a href={card.href} className={className} data-cslp={cslpTag(cslp, "link")}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}
