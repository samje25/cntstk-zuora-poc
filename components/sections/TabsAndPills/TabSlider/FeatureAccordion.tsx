"use client";

import Image from "next/image";
import { useState } from "react";
import { wpSrcSet } from "@/lib/images/wpSrcSet";
import { cslpTag } from "@/lib/sections/cslp";
import type { ScrollingTab } from "@/lib/sections/types";

type FeatureAccordionProps = {
  tabs: ScrollingTab[];
  cslpPrefix: string | null | undefined;
};

const CHEVRON_PATH =
  "M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM13.5672 8.30781C13.6253 8.36586 13.6714 8.43479 13.7029 8.51066C13.7343 8.58654 13.7505 8.66787 13.7505 8.75C13.7505 8.83213 13.7343 8.91346 13.7029 8.98934C13.6714 9.06521 13.6253 9.13414 13.5672 9.19219L10.4422 12.3172C10.3841 12.3753 10.3152 12.4214 10.2393 12.4529C10.1635 12.4843 10.0821 12.5005 10 12.5005C9.91787 12.5005 9.83654 12.4843 9.76067 12.4529C9.68479 12.4214 9.61586 12.3753 9.55782 12.3172L6.43282 9.19219C6.31554 9.07491 6.24966 8.91585 6.24966 8.75C6.24966 8.58415 6.31554 8.42509 6.43282 8.30781C6.55009 8.19054 6.70915 8.12465 6.875 8.12465C7.04086 8.12465 7.19992 8.19054 7.31719 8.30781L10 10.9914L12.6828 8.30781C12.7409 8.2497 12.8098 8.2036 12.8857 8.17215C12.9615 8.1407 13.0429 8.12451 13.125 8.12451C13.2071 8.12451 13.2885 8.1407 13.3643 8.17215C13.4402 8.2036 13.5091 8.2497 13.5672 8.30781Z";

function Divider() {
  return (
    <Image
      src="/images/ai-mobile-divider.png"
      alt=""
      width={355}
      height={4}
      unoptimized
      loading="lazy"
      className="block"
    />
  );
}

/**
 * zuora.com `AccordionToggle` for the feature tabs below 767px: first item
 * open, one open at a time, tapping the open item closes it; panels animate
 * `max-height` 0 → 2000px over 0.3s.
 */
export function FeatureAccordion({ tabs, cslpPrefix }: FeatureAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="hidden w-full flex-col pt-10 max-[768px]:flex">
      {tabs.map((tab, i) => {
        const isOpen = open === i;
        const panelId = `feature-accordion-panel-${i}`;
        return (
          <div key={i} className="flex flex-col">
            <Divider />
            <div className="flex flex-col px-[10px] py-6">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setOpen(isOpen ? null : i);
                  }
                }}
                className="group/head flex flex-row items-center justify-between"
                data-open={isOpen}
              >
                <h3
                  className="m-0 font-[family-name:var(--font-founders-grotesk-mono)] text-base leading-none font-medium uppercase"
                  data-cslp={cslpTag(cslpPrefix, `tabs.${i}.heading`)}
                >
                  {tab.heading}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="[transition:transform_0.3s_ease-in-out] group-data-[open=true]/head:[transform:rotate(180deg)]"
                >
                  <path
                    d={CHEVRON_PATH}
                    className="fill-[var(--zuora-grey)] group-data-[open=true]/head:fill-[var(--zuora-black)]"
                  />
                </svg>
              </div>
              <div
                id={panelId}
                data-open={isOpen}
                className="flex max-h-0 flex-col gap-4 overflow-hidden [transition:max-height_0.3s_ease-in-out] data-[open=true]:max-h-[2000px] [&_p]:m-0 [&_p]:pt-[10px] [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal"
              >
                {tab.summary && (
                  <div
                    data-cslp={cslpTag(cslpPrefix, `tabs.${i}.tab_summary`)}
                    dangerouslySetInnerHTML={{ __html: tab.summary }}
                  />
                )}
                {tab.image && (
                  // Inline + baseline image like zuora.com (adds its 6px line gap).
                  <figure className="m-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tab.image.url}
                      srcSet={wpSrcSet(tab.image)}
                      alt={tab.imageAlt}
                      width={tab.image.width ?? undefined}
                      height={tab.image.height ?? undefined}
                      loading="lazy"
                      decoding="async"
                      className="inline align-baseline"
                      data-cslp={cslpTag(cslpPrefix, `tabs.${i}.image`)}
                    />
                  </figure>
                )}
                {tab.body && (
                  <div
                    className="font-[family-name:var(--font-ibm-plex-serif)] text-base leading-[1.5] font-medium"
                    data-cslp={cslpTag(cslpPrefix, `tabs.${i}.body`)}
                    dangerouslySetInnerHTML={{ __html: tab.body }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      {tabs.length > 0 && <Divider />}
    </div>
  );
}
