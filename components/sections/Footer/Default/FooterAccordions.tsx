"use client";

import { useState } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { FooterColumn } from "@/lib/sections/types";

type FooterAccordionsProps = {
  columns: FooterColumn[];
  cslpPrefix: string | null | undefined;
};

/** Full-bleed divider (spans the 20px inner padding on both sides). */
const DIVIDER =
  "pointer-events-none absolute -ms-5 w-[calc(100%+40px)] border border-solid border-t-[var(--zuora-black)]";

const ItemArrow = () => (
  <svg viewBox="0 0 5 8" fill="none" width="5" height="8" aria-hidden="true" className="pointer-events-none">
    <path
      d="M0.52417 1.5C0.52417 1.37385 0.57364 1.25229 0.662842 1.16309C0.752042 1.07389 0.873612 1.02441 0.999756 1.02441C1.12571 1.0245 1.24659 1.07407 1.33569 1.16309L1.34741 1.1748V1.17676L3.83569 3.66406C3.87998 3.70819 3.91523 3.76062 3.93921 3.81836C3.96311 3.87596 3.9753 3.93763 3.97534 4C3.97534 4.06252 3.96318 4.12488 3.93921 4.18262C3.91524 4.24029 3.87993 4.29283 3.83569 4.33691L1.33569 6.83691C1.24653 6.92591 1.12575 6.97558 0.999756 6.97559C0.873762 6.97559 0.752988 6.92591 0.663818 6.83691C0.574617 6.74771 0.52417 6.62615 0.52417 6.5C0.524256 6.37397 0.574693 6.25319 0.663818 6.16406L2.8269 4.00098L0.662842 1.83594C0.573821 1.74682 0.524249 1.62596 0.52417 1.5Z"
      strokeWidth="0.2"
      className="fill-[var(--zuora-white)] stroke-[var(--zuora-white)]"
    />
  </svg>
);

/**
 * Below 1024px the link columns become accordions (zuora.com
 * `unav-footer-dropdown`): one open at a time, tapping the open one closes
 * it, and the panel grows over 0.1s while its links show at once.
 */
export function FooterAccordions({ columns, cslpPrefix }: FooterAccordionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="lg:hidden">
      {columns.map((column, i) => {
        const open = openIndex === i;
        const base = cslpTag(cslpPrefix, `columns.${i}`);
        const panelId = `site-footer-links-${i}`;
        return (
          <section key={i} className="group/acc relative">
            <div className={`${DIVIDER} top-0`} />
            <h4 className="m-0 font-[family-name:var(--font-founders-grotesk-mono)] text-[12px] leading-none font-medium uppercase">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer justify-between gap-x-2 py-4 uppercase focus-visible:outline-1 focus-visible:outline-[var(--zuora-focus-blue)] focus-visible:outline-solid"
              >
                <span
                  className="pointer-events-none flex flex-row items-center justify-center gap-2 text-[var(--zuora-teal)]"
                  data-cslp={base && `${base}.heading`}
                >
                  {column.heading}
                </span>
                <span
                  className={`pointer-events-none block origin-center [transition:all_.25s_linear] after:block after:h-[14px] after:w-[14px] after:bg-[url(/images/footer/chevron-teal.svg)] after:bg-center after:bg-no-repeat after:[transition:all_.25s_linear] after:content-[''] ${open ? "rotate-180" : ""}`}
                />
              </button>
            </h4>
            <nav
              id={panelId}
              aria-label={column.heading}
              className={`[transition:height_.1s_linear] ${open ? "visible h-fit opacity-100" : "invisible h-0 opacity-0"}`}
            >
              <div className="mx-auto flex h-full w-full flex-col items-center justify-start p-0 pb-4">
                {column.groups.map((group, j) => {
                  const groupBase = base && `${base}.groups.${j}`;
                  return (
                    <section key={j} className="flex h-full w-full flex-col self-start not-first:pt-4">
                      {group.kicker ? (
                        <div className="m-0 h-full w-full">
                          <h3
                            className="m-0 pt-0 pb-2 font-[family-name:var(--font-founders-grotesk-mono)] text-[12px] leading-none font-medium text-[var(--zuora-slate)] uppercase"
                            data-cslp={groupBase && `${groupBase}.kicker`}
                          >
                            {group.kicker}
                          </h3>
                        </div>
                      ) : null}
                      <ul className="m-0 flex h-full list-none flex-col p-0">
                        {group.links.map((link, k) => (
                          <li key={k} className="flex h-full items-center justify-start">
                            <a
                              href={link.href}
                              className="group/item flex w-full justify-between px-0 py-2 font-[family-name:var(--font-founders-grotesk)] text-[16px] leading-none font-normal text-[var(--zuora-white)] hover:[text-shadow:0_0_1px_var(--zuora-white)]"
                              data-cslp={groupBase && `${groupBase}.links.${k}.link`}
                            >
                              {link.label}
                              <span className="pointer-events-none invisible block h-3 w-3 opacity-0 [transition:all_.1s_linear,margin-inline-end_.25s_linear] group-[:is(:hover,:active,:focus,:focus-visible,:focus-within)]/item:visible group-[:is(:hover,:active,:focus,:focus-visible,:focus-within)]/item:me-[-2px] group-[:is(:hover,:active,:focus,:focus-visible,:focus-within)]/item:opacity-100">
                                <ItemArrow />
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </nav>
            <div className={`${DIVIDER} bottom-0 hidden group-last-of-type/acc:block`} />
          </section>
        );
      })}
    </section>
  );
}
