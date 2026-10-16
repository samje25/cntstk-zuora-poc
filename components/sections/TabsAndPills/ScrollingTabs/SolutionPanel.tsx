import Image from "next/image";
import { wpSrcSet } from "@/lib/images/wpSrcSet";
import { cslpTag } from "@/lib/sections/cslp";
import type { OverlapLayout, ScrollingTab } from "@/lib/sections/types";

type SolutionPanelProps = {
  tab: ScrollingTab;
  /** Item-scoped Live Preview base, e.g. `tabs_and_pills.blt…en-us.tabs.0`. */
  cslp: string | null;
};

// zuora.com positions each overlap image per card id; exposed as named presets.
const OVERLAP_POSITION: Record<OverlapLayout, string> = {
  "Top band":
    "top-[41%] right-[-6%] w-full min-[1024px]:top-[41%] min-[1024px]:right-[-8%] min-[1024px]:max-w-[520px]",
  "Bottom right compact":
    "right-[-5%] bottom-[3%] max-w-[80%] min-[767px]:bottom-[5%] min-[767px]:max-w-[320px] min-[1024px]:right-[-8%] min-[1024px]:bottom-[3%] min-[1024px]:max-w-[395px]",
  "Bottom wide":
    "right-[-5%] bottom-[3%] max-w-full min-[1024px]:right-[-7%] min-[1024px]:bottom-[5%] min-[1024px]:max-w-[630px]",
  "Bottom right":
    "right-[-6%] bottom-[3%] max-w-[80%] min-[1024px]:right-[-8%] min-[1024px]:max-w-[444px]",
  "Top right compact":
    "top-[41%] right-[-7%] max-w-[80%] min-[767px]:right-[-8%] min-[1024px]:top-[40%] min-[1024px]:right-[-7%] min-[1024px]:max-w-[344px]",
};

/** zuora.com `.ZuoraSolutionsCard` (arrow paths shared with the live site). */
const ARROW_PATH =
  "M25.1191 11.9795L19.8691 17.223C19.7049 17.387 19.4822 17.4791 19.25 17.4791C19.0178 17.4791 18.7951 17.387 18.6309 17.223C18.4668 17.0591 18.3745 16.8366 18.3745 16.6047C18.3745 16.3728 18.4668 16.1504 18.6309 15.9864L22.388 12.2351H14C11.4482 12.238 9.0017 13.2517 7.19729 15.0539C5.39288 16.8561 4.37789 19.2996 4.375 21.8483C4.375 22.0801 4.28281 22.3024 4.11872 22.4663C3.95462 22.6302 3.73206 22.7222 3.5 22.7222C3.26794 22.7222 3.04538 22.6302 2.88128 22.4663C2.71719 22.3024 2.625 22.0801 2.625 21.8483C2.62818 18.8361 3.82764 15.9482 5.96018 13.8183C8.09271 11.6884 10.9841 10.4904 14 10.4872H22.388L18.6309 6.73588C18.5496 6.65469 18.4852 6.55829 18.4412 6.4522C18.3972 6.34611 18.3745 6.23241 18.3745 6.11758C18.3745 6.00275 18.3972 5.88904 18.4412 5.78295C18.4852 5.67687 18.5496 5.58047 18.6309 5.49927C18.7951 5.33529 19.0178 5.24316 19.25 5.24316C19.365 5.24316 19.4788 5.26578 19.585 5.30972C19.6913 5.35367 19.7878 5.41808 19.8691 5.49927L25.1191 10.7428C25.2004 10.824 25.265 10.9204 25.309 11.0265C25.353 11.1326 25.3757 11.2463 25.3757 11.3612C25.3757 11.476 25.353 11.5897 25.309 11.6958C25.265 11.8019 25.2004 11.8983 25.1191 11.9795Z";

export function SolutionPanel({ tab, cslp }: SolutionPanelProps) {
  return (
    <div
      id={tab.anchorId}
      data-reveal=""
      data-card=""
      className="group/card flex scroll-mt-[var(--site-header-offset)] flex-col border-t border-[color:var(--zuora-silver)] [--z-partner-cta-width:40px]"
    >
      <div className="flex flex-col min-[767px]:flex-row">
        {/* Copy + partner proof */}
        <div className="flex w-full flex-col justify-between min-[767px]:w-1/2 min-[1024px]:w-2/5">
          <div className="flex flex-col justify-center gap-5 px-5 py-12 min-[767px]:px-[30px] min-[767px]:py-20 min-[1024px]:px-[60px]">
            {tab.icon && (
              <div className="flex h-10 w-10 justify-center rounded-[2px] bg-[var(--zuora-cloud)] p-2">
                <Image
                  src={tab.icon.url}
                  alt=""
                  width={tab.icon.width ?? 24}
                  height={tab.icon.height ?? 24}
                  unoptimized
                  className="h-6 w-6 [filter:brightness(0)_saturate(100%)]"
                />
              </div>
            )}
            {tab.heading && (
              <h3
                className="m-0 font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-[40px]"
                data-cslp={cslpTag(cslp, "heading")}
              >
                {tab.heading}
              </h3>
            )}
            {tab.body && (
              <div
                className="[&_p]:m-0 [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal"
                data-cslp={cslpTag(cslp, "body")}
                dangerouslySetInnerHTML={{ __html: tab.body }}
              />
            )}
          </div>

          {(tab.partnerLogo || tab.partnerStat || tab.partnerLink) && (
            <div className="group/partners flex min-h-[170px] w-full flex-col border-t border-[color:var(--zuora-silver)]">
              <div className="flex min-h-[140px]">
                <div className="min-h-full w-10 max-w-10 border-r border-[color:var(--zuora-silver)]" />
                <div className="flex grow flex-col min-[1024px]:flex-row">
                  {tab.partnerLogo && (
                    <figure className="m-0 flex justify-start border-b border-[color:var(--zuora-silver)] px-5 py-[25px] min-[1024px]:justify-center min-[1024px]:border-b-0">
                      <Image
                        src={tab.partnerLogo.url}
                        alt={tab.partnerLogo.alt}
                        width={tab.partnerLogo.width ?? 150}
                        height={tab.partnerLogo.height ?? 40}
                        unoptimized
                        loading="lazy"
                        className="w-[150px] object-contain"
                        data-cslp={cslpTag(cslp, "partner_logo")}
                      />
                    </figure>
                  )}
                  {tab.partnerStat && (
                    <div
                      className="flex items-center px-5 py-[10px] min-[1024px]:border-l min-[1024px]:border-[color:var(--zuora-silver)] [&_p]:m-0 [&_p]:font-[family-name:var(--font-founders-grotesk)] [&_p]:text-[24px] [&_p]:leading-[1.2] [&_p]:font-normal"
                      data-cslp={cslpTag(cslp, "partner_stat")}
                      dangerouslySetInnerHTML={{ __html: tab.partnerStat }}
                    />
                  )}
                </div>
                {tab.partnerLink && (
                  <a
                    href={tab.partnerLink.href}
                    aria-label={tab.partnerLink.label || undefined}
                    className="relative flex min-w-[var(--z-partner-cta-width)] cursor-pointer items-center justify-center overflow-hidden border-b border-l border-[color:var(--zuora-silver)] bg-[var(--zuora-cloud)] [transition:background_0.5s_ease] group-[:hover]/partners:bg-[var(--zuora-forest)]"
                  >
                    <div className="relative right-0 [transition:right_0.5s_ease] group-[:hover]/partners:right-[-70px]">
                      {/* Inline + baseline like zuora.com (sets the 34px line box). */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        aria-hidden="true"
                        className="inline align-baseline"
                      >
                        <path d={ARROW_PATH} fill="black" />
                      </svg>
                    </div>
                    <div className="invisible absolute top-0 left-[-40%] flex h-full w-[var(--z-partner-cta-width)] items-center justify-center opacity-0 [transition:left_0.5s_ease,opacity_0.5s_ease,visibility_0.5s_ease] group-[:hover]/partners:visible group-[:hover]/partners:left-0 group-[:hover]/partners:opacity-100">
                      <div className="flex h-full w-full items-center justify-center [transform:rotate(90deg)]">
                        <p
                          className="m-0 p-0 font-[family-name:var(--font-founders-grotesk)] text-base font-medium whitespace-nowrap text-[var(--zuora-white)]"
                          data-cslp={cslpTag(cslp, "partner_link")}
                        >
                          {tab.partnerLink.label}
                        </p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
              <div className="mr-[var(--z-partner-cta-width)] min-h-5 border-r border-[color:var(--zuora-silver)] min-[767px]:min-h-[30px]">
                <Image
                  src="/images/solutions-card-vector.webp"
                  alt=""
                  width={538}
                  height={29}
                  unoptimized
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Image collage */}
        <div
          className="flex w-full items-end justify-center border-l border-[color:var(--zuora-silver)] bg-cover bg-center bg-no-repeat px-5 pt-[30px] min-[767px]:w-1/2 min-[767px]:items-center min-[1024px]:w-3/5 min-[1024px]:items-end"
          style={
            tab.backgroundImage
              ? { backgroundImage: `url('${tab.backgroundImage.url}')` }
              : undefined
          }
          data-cslp={cslpTag(cslp, "background_image")}
        >
          <div className="relative flex items-end justify-center">
            {tab.image && (
              // Plain <img>: next/image can't take a hand-built srcSet.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tab.image.url}
                srcSet={wpSrcSet(tab.image)}
                alt=""
                width={tab.image.width ?? undefined}
                height={tab.image.height ?? undefined}
                loading="lazy"
                decoding="async"
                className="h-auto w-full max-w-full min-[1024px]:max-w-[580px]"
                data-cslp={cslpTag(cslp, "image")}
              />
            )}
            {tab.overlapImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tab.overlapImage.url}
                srcSet={wpSrcSet(tab.overlapImage)}
                alt=""
                width={tab.overlapImage.width ?? undefined}
                height={tab.overlapImage.height ?? undefined}
                loading="lazy"
                decoding="async"
                className={`absolute [transform:translate(-40px,-40px)] [transition:transform_0.75s_ease-out] group-data-[view=true]/card:[transform:translate(0)] ${OVERLAP_POSITION[tab.overlapLayout]}`}
                data-cslp={cslpTag(cslp, "overlap_image")}
              />
            )}
          </div>
        </div>
      </div>

      {/* "Explore …" bar: grows in when scrolled into view */}
      {tab.cta && (
        <div data-reveal="" className="group/cta flex h-[50px] flex-row overflow-hidden">
          <a
            href={tab.cta.href}
            className={[
              "group/ctab flex max-w-1/2 shrink-0 grow basis-1/2 cursor-pointer flex-row items-center gap-2 overflow-hidden rounded-r-[50px] bg-[var(--zuora-forest)] pl-5 [container-type:inline-size] [transition:flex-basis_1s_ease,max-width_1s_ease,transform_1s_ease,background_1s_ease] [&:hover]:bg-[var(--zuora-teal)] min-[1024px]:pl-10",
              "group-data-[view=true]/cta:max-w-[80%] group-data-[view=true]/cta:grow-0 group-data-[view=true]/cta:basis-[80%]",
              "min-[767px]:group-data-[view=true]/cta:max-w-[40%] min-[767px]:group-data-[view=true]/cta:basis-[40%]",
              "min-[1024px]:group-data-[view=true]/cta:max-w-[25%] min-[1024px]:group-data-[view=true]/cta:min-w-[384px] min-[1024px]:group-data-[view=true]/cta:basis-[25%]",
              "max-[768px]:group-data-[active=true]/card:bg-[var(--zuora-teal)]",
            ].join(" ")}
          >
            <div className="flex flex-row items-center whitespace-nowrap [transform:translateX(calc(100cqw_-_105%))] [transition:transform_1s_ease] group-data-[view=true]/cta:justify-start group-data-[view=true]/cta:[transform:translateX(0)]">
              <p
                className="m-0 text-start font-[family-name:var(--font-founders-grotesk)] text-base leading-none font-medium text-[var(--zuora-white)] [transition:color_0.5s_ease] group-[:hover]/ctab:text-[var(--zuora-black)] max-[768px]:group-data-[active=true]/card:text-[var(--zuora-black)] min-[767px]:text-center"
                data-cslp={cslpTag(cslp, "cta_link")}
              >
                {tab.ctaPrefix}{" "}
                <span className="pl-1 text-[var(--zuora-teal)] [transition:color_0.5s_ease] group-[:hover]/ctab:text-[var(--zuora-black)] max-[768px]:group-data-[active=true]/card:text-[var(--zuora-black)]">
                  {" "}
                  {tab.cta.label}{" "}
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
                  className="fill-[var(--zuora-white)] [transition:fill_0.5s_ease] group-[:hover]/ctab:fill-[var(--zuora-black)] max-[768px]:group-data-[active=true]/card:fill-[var(--zuora-black)]"
                />
              </svg>
            </div>
          </a>
          <div
            className={[
              "flex max-w-1/2 shrink-0 grow basis-1/2 justify-center rounded-l-[50px] border border-l-0 border-[color:var(--zuora-silver)] [transition:flex-basis_1s_ease,max-width_1s_ease]",
              "group-data-[view=true]/cta:max-w-[20%] group-data-[view=true]/cta:grow-0 group-data-[view=true]/cta:basis-[20%]",
              "min-[767px]:group-data-[view=true]/cta:max-w-[60%] min-[767px]:group-data-[view=true]/cta:basis-[60%]",
              "min-[1024px]:group-data-[view=true]/cta:max-w-[75%] min-[1024px]:group-data-[view=true]/cta:basis-[75%]",
            ].join(" ")}
          />
        </div>
      )}
    </div>
  );
}
