import { RevealObserver } from "@/components/common/RevealObserver";
import { wpSrcSet } from "@/lib/images/wpSrcSet";
import { cslpTag } from "@/lib/sections/cslp";
import type { FeatureCard, FeatureCardsSection } from "@/lib/sections/types";

type BentoCardsProps = { section: FeatureCardsSection };

const ARROW_PATH =
  "M25.1191 11.9795L19.8691 17.223C19.7049 17.387 19.4822 17.4791 19.25 17.4791C19.0178 17.4791 18.7951 17.387 18.6309 17.223C18.4668 17.0591 18.3745 16.8366 18.3745 16.6047C18.3745 16.3728 18.4668 16.1504 18.6309 15.9864L22.388 12.2351H14C11.4482 12.238 9.0017 13.2517 7.19729 15.0539C5.39288 16.8561 4.37789 19.2996 4.375 21.8483C4.375 22.0801 4.28281 22.3024 4.11872 22.4663C3.95462 22.6302 3.73206 22.7222 3.5 22.7222C3.26794 22.7222 3.04538 22.6302 2.88128 22.4663C2.71719 22.3024 2.625 22.0801 2.625 21.8483C2.62818 18.8361 3.82764 15.9482 5.96018 13.8183C8.09271 11.6884 10.9841 10.4904 14 10.4872H22.388L18.6309 6.73588C18.5496 6.65469 18.4852 6.55829 18.4412 6.4522C18.3972 6.34611 18.3745 6.23241 18.3745 6.11758C18.3745 6.00275 18.3972 5.88904 18.4412 5.78295C18.4852 5.67687 18.5496 5.58047 18.6309 5.49927C18.7951 5.33529 19.0178 5.24316 19.25 5.24316C19.365 5.24316 19.4788 5.26578 19.585 5.30972C19.6913 5.35367 19.7878 5.41808 19.8691 5.49927L25.1191 10.7428C25.2004 10.824 25.265 10.9204 25.309 11.0265C25.353 11.1326 25.3757 11.2463 25.3757 11.3612C25.3757 11.476 25.353 11.5897 25.309 11.6958C25.265 11.8019 25.2004 11.8983 25.1191 11.9795Z";

/**
 * zuora.com `.HomePageContent-requirementsSection`: heading, an "Explore …"
 * bar that grows in when scrolled into view (`RevealObserver`), and a 2-up
 * dashed-border card grid (1-up below 767). Breakpoints match zuora.com;
 * `max-[768px]` is their `max-width: 767px`.
 */
export function BentoCards({ section }: BentoCardsProps) {
  const { cslpPrefix, heading, ctaPrefix, cta, cards } = section;
  const rootId = `bento-cards-${section.id}`;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        id={rootId}
        className="mx-auto my-20 flex max-w-[1360px] flex-col gap-0 rounded-t-[10px] text-base leading-6 text-[var(--zuora-body)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[767px]:my-24 min-[767px]:border min-[767px]:border-[color:var(--zuora-silver)] min-[1024px]:my-40"
      >
        <div className="p-6 min-[767px]:px-6 min-[767px]:py-8 min-[1024px]:px-24">
          {heading && (
            <h2
              className="m-0 w-full text-center font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:w-[65%] min-[767px]:text-start min-[767px]:text-[48px] min-[1024px]:text-[40px]"
              data-cslp={cslpTag(cslpPrefix, "heading")}
            >
              {heading}
            </h2>
          )}
        </div>

        {cta && (
          <div data-reveal="" className="group/cta flex h-[50px] w-full max-w-full flex-row overflow-hidden max-[768px]:gap-2">
            <div
              className={[
                "flex max-w-1/2 shrink-0 grow basis-1/2 justify-center rounded-r-[50px] border border-l-0 border-[color:var(--zuora-silver)] [transition:flex-basis_1s_ease,max-width_1s_ease]",
                "min-[767px]:group-data-[view=true]/cta:max-w-[60%] min-[767px]:group-data-[view=true]/cta:grow-0 min-[767px]:group-data-[view=true]/cta:basis-[60%]",
                "min-[1024px]:group-data-[view=true]/cta:max-w-[75%] min-[1024px]:group-data-[view=true]/cta:basis-[75%]",
                "max-[768px]:max-w-[20%] max-[768px]:grow-0 max-[768px]:basis-[20%]",
              ].join(" ")}
            />
            <a
              href={cta.href}
              className={[
                "group/ctab flex max-w-1/2 shrink-0 grow basis-1/2 cursor-pointer flex-row items-center justify-end gap-2 overflow-hidden rounded-l-[50px] bg-[var(--zuora-forest)] pr-2 [container-type:inline-size] [transition:flex-basis_1s_ease,max-width_1s_ease,transform_1s_ease,background_1s_ease] [&:hover]:bg-[var(--zuora-teal)]",
                "min-[767px]:group-data-[view=true]/cta:max-w-[40%] min-[767px]:group-data-[view=true]/cta:grow-0 min-[767px]:group-data-[view=true]/cta:basis-[40%]",
                "min-[1024px]:group-data-[view=true]/cta:max-w-[25%] min-[1024px]:group-data-[view=true]/cta:basis-[25%]",
                "max-[768px]:max-w-[60%] max-[768px]:grow-0 max-[768px]:basis-[60%] max-[768px]:justify-center max-[768px]:rounded-[50px] max-[768px]:pr-0",
              ].join(" ")}
            >
              <div className="flex flex-row items-center whitespace-nowrap [transform:translateX(calc(-100cqw_+_105%))] [transition:transform_1s_ease] group-data-[view=true]/cta:justify-end group-data-[view=true]/cta:[transform:translateX(0)] max-[768px]:[transform:none] max-[768px]:group-data-[view=true]/cta:[transform:none]">
                <p
                  className="m-0 text-start font-[family-name:var(--font-founders-grotesk)] text-base leading-none font-medium text-[var(--zuora-white)] [transition:color_0.5s_ease] group-[:hover]/ctab:text-[var(--zuora-black)] min-[767px]:text-center"
                  data-cslp={cslpTag(cslpPrefix, "cta_link")}
                >
                  {ctaPrefix}{" "}
                  <span className="pl-1 text-[var(--zuora-teal)] [transition:color_0.5s_ease] group-[:hover]/ctab:text-[var(--zuora-black)]">
                    {" "}
                    {cta.label}{" "}
                  </span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                  className="ml-1 min-[767px]:ml-3"
                >
                  <path
                    d={ARROW_PATH}
                    className="fill-[var(--zuora-white)] [transition:fill_0.5s_ease] group-[:hover]/ctab:fill-[var(--zuora-black)]"
                  />
                </svg>
              </div>
            </a>
            <div className="hidden justify-center max-[768px]:flex max-[768px]:max-w-[20%] max-[768px]:shrink-0 max-[768px]:grow-0 max-[768px]:basis-[20%] max-[768px]:rounded-l-[50px] max-[768px]:border max-[768px]:border-[color:var(--zuora-silver)]" />
          </div>
        )}

        <div className="mx-auto grid w-full grid-cols-1 px-[10px] min-[767px]:grid-cols-2 min-[767px]:px-8 min-[1024px]:px-[50px]">
          {cards.map((card, i) => (
            <BentoCard key={i} card={card} cslp={cslpTag(cslpPrefix, `cards.${i}`) ?? null} />
          ))}
        </div>

        <RevealObserver rootId={rootId} />
      </section>
    </div>
  );
}

type BentoCardProps = { card: FeatureCard; cslp: string | null };

/** zuora.com `.RequirementCard`. */
function BentoCard({ card, cslp }: BentoCardProps) {
  // zuora.com nests the copy as <p><p>…</p></p>, which parses to an empty <p>
  // either side of the paragraphs; they're flex items, so they add gaps.
  const body = card.body ? `<p></p>${card.body}<p></p>` : null;

  return (
    <div className="p-6 min-[767px]:border-x min-[767px]:border-b min-[767px]:border-dashed min-[767px]:border-[color:var(--zuora-silver)] min-[767px]:p-8 min-[1024px]:p-10">
      <div className="relative flex h-full flex-col justify-between gap-2">
        {card.icon && (
          <div className="absolute top-0 flex h-10 w-10 items-center justify-center rounded-[8px] border border-[color:var(--zuora-silver)] bg-transparent p-2 [transition:background-color_0.25s_ease] max-[768px]:left-0 min-[767px]:right-0 min-[1024px]:h-[50px] min-[1024px]:w-[50px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.icon.url}
              alt=""
              width={card.icon.width ?? undefined}
              height={card.icon.height ?? undefined}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              className="mt-auto block"
              data-cslp={cslpTag(cslp, "icon")}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {card.heading && (
            <h3
              className="my-0 pt-14 font-[family-name:var(--font-founders-grotesk)] text-[28px] leading-[1.07] font-medium min-[767px]:pt-0 min-[767px]:text-[20px]"
              data-cslp={cslpTag(cslp, "heading")}
            >
              {card.heading}
            </h3>
          )}
          {body && (
            <div
              className="contents [&_p]:my-0 [&_p]:w-[80%] [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal"
              data-cslp={cslpTag(cslp, "body")}
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
        {card.image && (
          // Inline + baseline image like zuora.com (adds its 6px line gap).
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.url}
              srcSet={wpSrcSet(card.image)}
              alt={card.imageAlt}
              width={card.image.width ?? undefined}
              height={card.image.height ?? undefined}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              className="inline align-baseline"
              data-cslp={cslpTag(cslp, "image")}
            />
          </figure>
        )}
      </div>
    </div>
  );
}
