import type { CSSProperties, FocusEvent } from "react";
import type { HeaderNavItem } from "@/lib/sections/types";

type SubnavPanelProps = {
  item: HeaderNavItem;
  /** `nav_items.{i}` edit-tag base. */
  cslpBase: string | undefined;
  /** Desktop only: hide the dropdown (mobile panels are shown by their slide wrapper). */
  hidden?: boolean;
  id?: string;
  onLinkBlur?: (event: FocusEvent<HTMLAnchorElement>) => void;
};

/** Selector shared with the header's blur handler. */
export const SUBNAV_LINK_ATTR = "data-subnav-link";

/** Keyboard focus ring (zuora.com unav: 1px blue outline, 4px radius). */
export const FOCUS_RING =
  "outline-none focus-visible:rounded-[4px] focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-[var(--zuora-focus-blue)] focus-visible:outline-solid";

/** Hover / keyboard / press state of a link (zuora.com `util-subnav-body-active-styles`). */
const ACTIVE_BG =
  "[transition:background-color_.25s_linear] [&:is(:hover,:focus,:active,:focus-within)]:bg-[var(--zuora-cloud)]";

const ItemArrow = () => (
  <svg viewBox="0 0 5 8" fill="none" width="5" height="8" aria-hidden="true" className="pointer-events-none">
    <path
      d="M0.52417 1.5C0.52417 1.37385 0.57364 1.25229 0.662842 1.16309C0.752042 1.07389 0.873612 1.02441 0.999756 1.02441C1.12571 1.0245 1.24659 1.07407 1.33569 1.16309L1.34741 1.1748V1.17676L3.83569 3.66406C3.87998 3.70819 3.91523 3.76062 3.93921 3.81836C3.96311 3.87596 3.9753 3.93763 3.97534 4C3.97534 4.06252 3.96318 4.12488 3.93921 4.18262C3.91524 4.24029 3.87993 4.29283 3.83569 4.33691L1.33569 6.83691C1.24653 6.92591 1.12575 6.97558 0.999756 6.97559C0.873762 6.97559 0.752988 6.92591 0.663818 6.83691C0.574617 6.74771 0.52417 6.62615 0.52417 6.5C0.524256 6.37397 0.574693 6.25319 0.663818 6.16406L2.8269 4.00098L0.662842 1.83594C0.573821 1.74682 0.524249 1.62596 0.52417 1.5Z"
      strokeWidth="0.2"
      className="fill-[var(--zuora-greys-700)] stroke-[var(--zuora-greys-700)]"
    />
  </svg>
);

/**
 * One menu's link groups — the desktop dropdown card (≥1024px) and the mobile
 * slide-in sub-menu share this markup, like zuora.com's unav. Groups stack on
 * mobile; on desktop they sit in `item.columns` columns and each group lays
 * its links out in `group.columns` columns.
 */
export function SubnavPanel({ item, cslpBase, hidden, id, onLinkBlur }: SubnavPanelProps) {
  const multi = item.columns > 1;

  return (
    <section
      id={id}
      style={{ "--z-panel-cols": `repeat(${item.columns}, minmax(0, 1fr))` } as CSSProperties}
      className={`flex h-full w-full flex-col gap-x-5 bg-[var(--zuora-white)] lg:grid lg:w-max lg:max-w-[calc(100dvw-80px)] lg:grid-cols-[var(--z-panel-cols)] lg:rounded-[4px] lg:border-t-2 lg:border-t-[var(--zuora-teal)] lg:shadow-[0_4px_36px_0_var(--zuora-greys-400-50)] ${multi ? "lg:gap-x-10" : "lg:gap-x-5"} ${hidden ? "lg:hidden" : ""}`}
    >
      {item.groups.map((group, j) => {
        const groupBase = cslpBase ? `${cslpBase}.groups.${j}` : undefined;
        const hasDescriptions = group.links.some((link) => link.description);

        return (
          <div
            key={j}
            className={`flex max-w-[100dvh] flex-col rounded-[4px] bg-[var(--zuora-white)] px-5 py-3 not-first-of-type:pt-[18px] last-of-type:pb-6 lg:py-5 lg:last-of-type:pb-5 landscape:first-of-type:mt-[52px] landscape:md:first-of-type:mt-16 landscape:lg:first-of-type:mt-0 ${multi ? "lg:px-0 lg:first-of-type:pl-5 lg:last-of-type:pr-5" : "lg:px-4"}`}
          >
            {group.kicker ? (
              <header>
                <h4
                  className="m-0 p-0 pb-3 pl-1 font-[family-name:var(--font-founders-grotesk-mono)] text-[11px] leading-[1.2] font-medium text-[var(--zuora-greys-700)] uppercase"
                  data-cslp={groupBase && `${groupBase}.kicker`}
                >
                  {group.kicker}
                </h4>
              </header>
            ) : null}
            <ul
              style={{ "--z-link-cols": `repeat(${group.columns}, minmax(0, 1fr))` } as CSSProperties}
              className={`m-0 flex list-none flex-col gap-x-5 gap-y-2 p-0 lg:grid lg:grid-cols-[var(--z-link-cols)] ${hasDescriptions ? "lg:gap-y-4" : ""}`}
            >
              {group.links.map((link, k) => {
                const linkBase = groupBase ? `${groupBase}.links.${k}` : undefined;
                const external = /^https?:\/\//.test(link.href);

                return (
                  <li key={k} className="cursor-pointer rounded-[4px]">
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener" : undefined}
                      onBlur={onLinkBlur}
                      {...{ [SUBNAV_LINK_ATTR]: "" }}
                      className={`group/item m-0 flex cursor-pointer items-center justify-between gap-x-5 rounded-[2px] p-1 pr-2 text-[var(--zuora-black)] no-underline ${FOCUS_RING} ${ACTIVE_BG} ${link.description ? "" : "h-8"}`}
                    >
                      <div className="flex w-full cursor-pointer flex-col gap-y-1">
                        <section className={`flex w-full gap-x-2 ${link.description ? "items-start" : "items-center"}`}>
                          {link.icon ? (
                            <div className="h-6 w-6 rounded-[2px] bg-[var(--zuora-forest)] p-1">
                              <span
                                className="block h-4 w-4 bg-contain bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${link.icon})` }}
                                data-cslp={linkBase && `${linkBase}.icon`}
                              />
                            </div>
                          ) : null}
                          <div className="flex w-full cursor-pointer flex-col gap-y-1">
                            <h5 className="relative m-0 flex w-full cursor-pointer items-center justify-between gap-x-4 p-0 font-[family-name:var(--font-founders-grotesk)] text-[16px] leading-none font-normal group-[:is(:hover,:focus,:active,:focus-within)]/item:[text-shadow:0_0_1px_var(--zuora-black-50)]">
                              <span data-cslp={linkBase && `${linkBase}.link`}>{link.label}</span>
                              <div className="relative flex h-2 w-2 items-center justify-center">
                                <div className="invisible absolute right-0 me-0 flex h-2 w-2 items-center justify-center opacity-0 group-[:is(:hover,:focus,:active,:focus-within)]/item:visible group-[:is(:hover,:focus,:active,:focus-within)]/item:me-[-2px] group-[:is(:hover,:focus,:active,:focus-within)]/item:opacity-100 group-[:is(:hover,:focus,:active,:focus-within)]/item:[transition:all_.1s_linear,margin-inline-end_.25s_linear]">
                                  <ItemArrow />
                                </div>
                              </div>
                            </h5>
                            {link.description ? (
                              <p
                                className="m-0 cursor-pointer p-0 font-[family-name:var(--font-ibm-plex-serif)] text-[10px] leading-[1.5] font-normal lg:max-w-[170px]"
                                data-cslp={linkBase && `${linkBase}.description`}
                              >
                                {link.description}
                              </p>
                            ) : null}
                          </div>
                        </section>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
