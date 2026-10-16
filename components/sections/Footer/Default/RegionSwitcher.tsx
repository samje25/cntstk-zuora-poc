"use client";

import { useState, type MouseEvent } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { FooterSection } from "@/lib/sections/types";

type RegionSwitcherProps = Pick<FooterSection, "cslpPrefix" | "regionLabel" | "regions">;

/** zuora.com unav `util-is-visible` / `util-is-invisible`. */
const SHOWN = "visible h-auto opacity-100 [transition:opacity_.1s_linear]";
const HIDDEN = "invisible h-0 opacity-0 [transition:opacity_.1s_linear]";

/**
 * "Change region" tab in the footer's top-left notch. Clicking the tab toggles
 * the region list (the current region is left out, as on live). Static for
 * now: picking a region only closes the list — routing comes with
 * localization.
 */
export function RegionSwitcher({ cslpPrefix, regionLabel, regions }: RegionSwitcherProps) {
  const [open, setOpen] = useState(false);

  // Like live, only clicks on the tab itself toggle — not on the list.
  const onTabClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target as HTMLElement).closest("menu")) setOpen((value) => !value);
  };

  return (
    <section className="absolute top-0 left-0 h-[52px] w-full max-w-fit rounded-tl-[20px] rounded-br-[20px] bg-[var(--zuora-white)] md:max-w-[25dvw] lg:h-12 lg:max-w-[220px]">
      <section className="relative h-full cursor-pointer rounded-[20px]" onClick={onTabClick}>
        <div className="absolute top-0 right-[-20px] h-[26px] w-5 bg-[var(--zuora-white)] lg:h-6">
          <div className="absolute right-0 h-[26px] w-full rounded-tl-[20px] bg-[var(--zuora-forest)] lg:h-6" />
        </div>
        <section className="relative flex h-full w-full flex-col items-center justify-center px-5 lg:px-0">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-footer-regions"
            className="m-0 flex h-full w-full cursor-pointer items-center justify-start gap-x-1 p-0 focus-visible:outline-1 focus-visible:outline-[var(--zuora-focus-blue)] focus-visible:outline-solid lg:justify-center"
          >
            <span className="pointer-events-none block h-5 w-5 bg-[url(/images/footer/globe.svg)]" />
            <span
              className="pointer-events-none inline-block font-[family-name:var(--font-founders-grotesk)] text-[16px] leading-none font-normal"
              data-cslp={cslpTag(cslpPrefix, "region_label")}
            >
              {regionLabel}
            </span>
            <span
              className={`pointer-events-none block h-3 w-3 origin-center bg-[url(/images/header/chevron-grey-700.svg)] [transition:all_.25s_linear] ${open ? "rotate-180" : ""}`}
            />
          </button>
          <menu
            id="site-footer-regions"
            className={`absolute top-[calc(100%+12px)] left-5 z-20 m-0 w-[40dvw] list-none rounded-[10px] bg-[var(--zuora-white)] p-2 lg:w-3/4 ${open ? SHOWN : HIDDEN}`}
          >
            {regions.map((region, i) => (
              <li
                key={i}
                className={`border-b border-[var(--zuora-cloud)] font-[family-name:var(--font-founders-grotesk)] text-[16px] leading-none font-normal last-of-type:border-none ${region.current ? HIDDEN : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-full w-full cursor-pointer items-center justify-center gap-x-1 py-2 text-[var(--zuora-black)]"
                >
                  {region.flag ? (
                    <span
                      className="block h-4 w-4 bg-contain"
                      style={{ backgroundImage: `url(${region.flag})` }}
                      data-cslp={cslpTag(cslpPrefix, `regions.${i}.flag`)}
                    />
                  ) : null}
                  <span data-cslp={cslpTag(cslpPrefix, `regions.${i}.label`)}>{region.label}</span>
                </button>
              </li>
            ))}
          </menu>
        </section>
      </section>
      <div className="absolute -bottom-6 left-0 hidden h-6 w-5 bg-[var(--zuora-white)] lg:block">
        <div className="absolute right-0 h-6 w-full rounded-tl-[20px] bg-[var(--zuora-forest)]" />
      </div>
    </section>
  );
}
