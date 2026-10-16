"use client";

import { useCallback, useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { HeaderSection } from "@/lib/sections/types";
import { FOCUS_RING, SUBNAV_LINK_ATTR, SubnavPanel } from "./SubnavPanel";

type HeaderDefaultProps = { section: HeaderSection };

const FONT = "font-[family-name:var(--font-founders-grotesk)]";
/** zuora.com `util-text-unav-nav-item-header`. */
const NAV_TEXT = `${FONT} text-[16px] leading-none font-medium text-[var(--zuora-gunmetal)]`;
/** The unav content wrapper: 1440px max, 16px gutters (40px from 1024px). */
const WRAPPER = "mx-auto w-full max-w-[1440px] px-4 lg:px-10";

const ChevronRight = () => (
  <svg viewBox="0 0 5 8" fill="none" width="12" height="12" aria-hidden="true" className="pointer-events-none">
    <path
      d="M0.52417 1.5C0.52417 1.37385 0.57364 1.25229 0.662842 1.16309C0.752042 1.07389 0.873612 1.02441 0.999756 1.02441C1.12571 1.0245 1.24659 1.07407 1.33569 1.16309L1.34741 1.1748V1.17676L3.83569 3.66406C3.87998 3.70819 3.91523 3.76062 3.93921 3.81836C3.96311 3.87596 3.9753 3.93763 3.97534 4C3.97534 4.06252 3.96318 4.12488 3.93921 4.18262C3.91524 4.24029 3.87993 4.29283 3.83569 4.33691L1.33569 6.83691C1.24653 6.92591 1.12575 6.97558 0.999756 6.97559C0.873762 6.97559 0.752988 6.92591 0.663818 6.83691C0.574617 6.74771 0.52417 6.62615 0.52417 6.5C0.524256 6.37397 0.574693 6.25319 0.663818 6.16406L2.8269 4.00098L0.662842 1.83594C0.573821 1.74682 0.524249 1.62596 0.52417 1.5Z"
      strokeWidth="0.2"
      className="fill-[var(--zuora-greys-700)] stroke-[var(--zuora-greys-700)]"
    />
  </svg>
);

/**
 * zuora.com universal nav. Two sticky bars, like the live site:
 *
 * - **Desktop (≥1024px, 56px):** logo · menus · Login + CTAs. A menu opens on
 *   click (not hover); clicking it again, Escape, or the frosted backdrop
 *   below the bar closes it. Only one is open at a time.
 * - **Mobile (<1024px, 52px / 64px from 768px):** logo + bars icon. The icon
 *   slides a full-height drawer in from the right; each menu row slides its
 *   links in over the drawer, with "All" to go back. Like live, the page
 *   behind is not scroll-locked (live's lock class never matches its CSS).
 *
 * Any resize to ≤1000px closes everything, as on live.
 */
export function HeaderDefault({ section }: HeaderDefaultProps) {
  const { cslpPrefix, logo, logoHref, navItems, login, ctas } = section;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubnav, setMobileSubnav] = useState<number | null>(null);

  const closeAll = useCallback(() => {
    setOpenIndex(null);
    setMobileOpen(false);
    setMobileSubnav(null);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 1000) closeAll();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeAll]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAll();
    }
  };

  // Tabbing out of a dropdown's links closes it.
  const onLinkBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget;
    if (next && !next.hasAttribute(SUBNAV_LINK_ATTR)) closeAll();
  };

  const toggleMobile = () => {
    setMobileOpen((open) => !open);
    setMobileSubnav(null);
  };

  const logoLink = logo ? (
    <div className="flex items-center">
      <a href={logoHref} className={`flex items-center py-4 ${FOCUS_RING}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed 108px SVG */}
        <img
          src={logo.url}
          alt={logo.alt}
          width={108}
          className="object-cover"
          data-cslp={cslpTag(cslpPrefix, "logo")}
        />
      </a>
    </div>
  ) : null;

  const loginLink = login ? (
    <div className="rounded-[2px] text-[var(--zuora-gunmetal)] [transition:all_.25s_linear] hover:bg-[var(--zuora-cloud)] hover:text-[var(--zuora-black)] landscape:pb-2 lg:landscape:pb-0">
      <a
        href={login.href}
        target="_blank"
        rel="noopener"
        className={`flex items-center justify-center gap-x-0.5 px-2 py-2.5 ${NAV_TEXT} ${FOCUS_RING}`}
        data-cslp={cslpTag(cslpPrefix, "login")}
      >
        {login.label}
      </a>
    </div>
  ) : null;

  const ctaButtons = ctas.length ? (
    <section className="flex w-full max-w-[360px] flex-col items-center justify-center gap-4 md:flex-row lg:mx-0 lg:w-auto lg:gap-4">
      {ctas.map((cta, i) => (
        <a
          key={i}
          href={cta.href}
          className={`relative flex h-full w-full items-center justify-center gap-x-0.5 rounded-full border border-solid px-5 py-[10px] ${FONT} text-[14px] leading-none font-medium no-underline [transition:all_.25s_linear] lg:w-auto ${FOCUS_RING} focus-visible:rounded-full ${
            cta.style === "Light"
              ? "border-[var(--zuora-teal)] bg-[var(--zuora-teal)] text-[var(--zuora-black)] hover:border-[var(--zuora-black)] hover:bg-transparent"
              : "border-[var(--zuora-black)] bg-[var(--zuora-black)] text-[var(--zuora-white)] hover:bg-transparent hover:text-[var(--zuora-black)]"
          }`}
          data-cslp={cslpTag(cslpPrefix, `ctas.${i}.link`)}
        >
          {cta.label}
        </a>
      ))}
    </section>
  ) : null;

  const menuToggle = (
    <button
      type="button"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
      aria-controls="site-header-mobile-menu"
      onClick={toggleMobile}
      className={`flex h-full w-1/5 max-w-[60px] items-center justify-end hover:cursor-pointer ${FOCUS_RING}`}
    >
      <span className="flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
        <span
          className={`block h-4 w-4 bg-contain bg-center bg-no-repeat transition-all duration-100 ease-linear md:h-5 md:w-5 ${
            mobileOpen
              ? "bg-[url(/images/header/xmark.svg)]"
              : "bg-[url(/images/header/bars.svg)]"
          }`}
        />
      </span>
    </button>
  );

  return (
    <>
      {/* Desktop */}
      <header className="sticky top-0 z-[1000] mx-auto hidden flex-col items-center justify-center bg-[var(--zuora-white)] lg:flex lg:h-14">
        <div
          className={`relative z-[1000] grid h-full grid-cols-[repeat(3,max-content)] items-center justify-between gap-x-6 min-[1440px]:grid-cols-3 ${WRAPPER}`}
        >
          <section>{logoLink}</section>
          <section className="flex justify-center gap-x-4 min-[1440px]:gap-x-6">
            <nav aria-label="Main" className="flex flex-row justify-evenly">
              <ul
                className="m-0 flex items-center gap-2 p-0 min-[1440px]:gap-x-5"
                onKeyDown={onMenuKeyDown}
              >
                {navItems.map((item, i) => {
                  const open = openIndex === i;
                  const base = cslpTag(cslpPrefix, `nav_items.${i}`);
                  const panelId = `site-header-menu-${i}`;
                  return (
                    <li
                      key={i}
                      className={`relative flex h-9 flex-col gap-y-2 rounded-[2px] ${open ? "bg-[var(--zuora-cloud)]" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : i)}
                        className={`group m-0 flex h-9 cursor-pointer items-center gap-x-1 rounded-[2px] p-3 ${NAV_TEXT} [transition:all_.1s_linear] hover:bg-[var(--zuora-cloud)] hover:[transition:all_.25s_linear] ${FOCUS_RING}`}
                      >
                        <span data-cslp={base && `${base}.label`}>{item.label}</span>
                        <span
                          className={`pointer-events-none block origin-center group-hover:[transition:all_.25s_linear] after:block after:h-3 after:w-3 after:bg-[url(/images/header/chevron-grey-700.svg)] after:content-[''] ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div className="absolute top-11 -left-15 min-[1440px]:left-full min-[1440px]:-translate-x-1/2">
                        <SubnavPanel
                          id={panelId}
                          item={item}
                          cslpBase={base}
                          hidden={!open}
                          onLinkBlur={onLinkBlur}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </section>
          <section aria-label="Navigation CTAs" className="flex items-center justify-end gap-3 lg:gap-8">
            {loginLink}
            {ctaButtons}
          </section>
        </div>
        {openIndex !== null ? (
          <div
            aria-hidden="true"
            onClick={closeAll}
            className="absolute top-14 h-screen w-screen bg-[var(--zuora-backdrop)] backdrop-blur-[4px]"
          />
        ) : null}
      </header>

      {/* Mobile */}
      <header className="sticky top-0 z-[1020] mx-auto flex h-[52px] flex-col justify-center bg-[var(--zuora-white)] md:h-16 lg:hidden">
        <div
          className={`flex h-full items-center justify-between ${WRAPPER} ${mobileSubnav !== null ? "hidden" : ""}`}
        >
          <section className="flex">{logoLink}</section>
          {menuToggle}
        </div>
        <section
          className={`absolute z-[1020] flex h-full items-center justify-between transition-all duration-500 ease-in-out ${WRAPPER} ${
            mobileSubnav !== null ? "translate-x-0" : "hidden translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileSubnav(null)}
            className={`flex h-full w-1/5 max-w-[60px] hover:cursor-pointer ${FOCUS_RING}`}
          >
            <span className="pointer-events-none flex items-center justify-center gap-x-1">
              <span className="pointer-events-none block h-5 w-5 bg-[url(/images/header/mobile-return-arrow.svg)]" />
              <span className={`${FONT} text-[16px] leading-none font-normal text-[var(--zuora-greys-700)]`}>
                All
              </span>
            </span>
          </button>
          {menuToggle}
        </section>

        <div
          id="site-header-mobile-menu"
          inert={!mobileOpen}
          className={`fixed top-[52px] flex h-dvh w-full max-w-[100vw] flex-col overflow-auto border-t border-t-[var(--zuora-black)] bg-[var(--zuora-white)] [scrollbar-width:none] transition-transform duration-500 ease-in-out md:top-16 landscape:h-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav aria-label="Main">
            <div className="m-0 flex h-[calc(100dvh-52px)] w-full flex-col items-start justify-between p-0 md:h-[calc(100dvh-64px)] md:gap-y-20">
              <div className="h-full w-full">
                {navItems.map((item, i) => {
                  const base = cslpTag(cslpPrefix, `nav_items.${i}`);
                  const active = mobileSubnav === i;
                  return (
                    <section key={i} className="not-last-of-type:*:border-b">
                      <button
                        type="button"
                        onClick={() => setMobileSubnav(i)}
                        className={`group/nav-item relative m-0 flex h-12 w-full cursor-pointer items-center justify-between border-b-[var(--zuora-silver)] px-5 py-4 ${NAV_TEXT} ${FOCUS_RING}`}
                      >
                        <span data-cslp={base && `${base}.label`}>{item.label}</span>
                        <span className="pointer-events-none relative flex h-4 w-4 items-center justify-center">
                          <span className="pointer-events-none absolute top-px right-0 me-0 flex h-4 w-4 items-center justify-center [transition:all_.1s_linear,margin-inline-end_.25s_linear] group-hover/nav-item:me-[-2px]">
                            <ChevronRight />
                          </span>
                        </span>
                      </button>
                      <section
                        className={`absolute bottom-0 z-[1000] h-dvh w-full [transition:all_.25s_linear] ${
                          active
                            ? "animate-[z-subnav-in_.5s_ease-in-out_1_forwards]"
                            : "animate-[z-subnav-out_.5s_ease-in-out_1_forwards]"
                        }`}
                      >
                        <SubnavPanel item={item} cslpBase={base} />
                      </section>
                    </section>
                  );
                })}
              </div>
              <section className={`mb-6 flex flex-col items-center gap-1 ${WRAPPER}`}>
                {loginLink}
                {ctaButtons}
              </section>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
