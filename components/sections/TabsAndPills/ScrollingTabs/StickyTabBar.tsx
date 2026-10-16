"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { AssetImage, ScrollingTab } from "@/lib/sections/types";

type StickyTabBarProps = {
  tabs: ScrollingTab[];
  navIcon: AssetImage | null;
  cslpPrefix: string | null | undefined;
};

/** Distance kept between a scrolled-to panel and the bar (zuora.com: 80). */
const SCROLL_GAP = 80;
/** The bar fades out over the last 50px before the panels end. */
const FADE_DISTANCE = 50;

/**
 * Port of zuora.com's `ZuoraStickyNavigator`.
 *
 * - Pins (`position: fixed`, drop-in animation) once the sentinel above it
 *   scrolls under the site header (`--site-header-offset`), fades out over the
 *   last 50px of the panel list (`[data-sticky-end]`) and un-pins past it.
 *   Like zuora.com it leaves no placeholder, so content moves up by its height.
 * - Each panel's IntersectionObserver marks its tab active while the bar is
 *   pinned: teal underline on desktop, title + progress bar on mobile.
 * - Clicking a tab smooth-scrolls its panel to 80px below the header.
 * - Below 767px the bar collapses to a dropdown showing the active tab.
 */
export function StickyTabBar({ tabs, navIcon, cslpPrefix }: StickyTabBarProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offsetRef = useRef(0);
  const validZoneRef = useRef(false);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const measureOffset = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return 0;
    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.height = "var(--site-header-offset)";
    nav.appendChild(probe);
    const height = parseFloat(getComputedStyle(probe).height) || 0;
    nav.removeChild(probe);
    return height;
  }, []);

  const moveIndicator = useCallback((index: number) => {
    const nav = navRef.current;
    const item = itemRefs.current[index];
    if (!nav || !item) return;
    const navBox = nav.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    nav.style.setProperty("--indicator-left", `${itemBox.left - navBox.left}px`);
    nav.style.setProperty("--indicator-width", `${itemBox.width}px`);
    nav.dataset.indicator = "true";
  }, []);

  const activate = useCallback(
    (index: number) => {
      setActive(index);
      moveIndicator(index);
      navRef.current?.style.setProperty(
        "--progress-percentage",
        `${((index + 1) / tabs.length) * 100}%`
      );
    },
    [moveIndicator, tabs.length]
  );

  useEffect(() => {
    const nav = navRef.current;
    const sentinel = sentinelRef.current;
    const end = nav?.closest("section")?.querySelector<HTMLElement>("[data-sticky-end]");
    if (!nav || !sentinel || !end || !tabs.length) return;

    offsetRef.current = measureOffset();

    const updateSticky = () => {
      const offset = offsetRef.current;
      const endBox = end.getBoundingClientRect();
      const barBottom = offset + nav.offsetHeight;
      const remaining = endBox.bottom - barBottom;
      const pastSentinel = sentinel.getBoundingClientRect().bottom < offset;

      if (pastSentinel && endBox.bottom > barBottom) {
        nav.dataset.sticky = "true";
        if (remaining <= FADE_DISTANCE && remaining > 0) {
          nav.style.opacity = String(remaining / FADE_DISTANCE);
          validZoneRef.current = false;
        } else {
          nav.style.opacity = "1";
          validZoneRef.current = true;
        }
      } else if (remaining <= 0) {
        nav.style.opacity = "0";
        nav.dataset.sticky = "false";
        validZoneRef.current = false;
      } else if (!pastSentinel) {
        nav.dataset.sticky = "false";
        nav.style.opacity = "1";
        validZoneRef.current = false;
      }
    };

    // One observer per panel, re-created when the header offset changes.
    let panelObservers: IntersectionObserver[] = [];
    const observePanels = () => {
      panelObservers.forEach((observer) => observer.disconnect());
      panelObservers = tabs.flatMap((tab, i) => {
        const panel = document.getElementById(tab.anchorId);
        if (!panel) return [];
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && validZoneRef.current) activate(i);
          },
          { rootMargin: `-${offsetRef.current + 50}px 0px -50% 0px`, threshold: 0 }
        );
        observer.observe(panel);
        return [observer];
      });
    };

    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        updateSticky();
        frame = null;
      });
    };

    const onResize = () => {
      const current = itemRefs.current.findIndex((item) => item?.dataset.active === "true");
      if (current >= 0) moveIndicator(current);
      const offset = measureOffset();
      if (offset !== offsetRef.current) {
        offsetRef.current = offset;
        observePanels();
      }
      if (end.getBoundingClientRect().bottom <= 0) {
        nav.dataset.sticky = "false";
        nav.style.opacity = "0";
        validZoneRef.current = false;
      }
      updateSticky();
    };

    observePanels();
    activate(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      panelObservers.forEach((observer) => observer.disconnect());
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [tabs, activate, measureOffset, moveIndicator]);

  const goTo = (tab: ScrollingTab) => {
    const panel = document.getElementById(tab.anchorId);
    if (!panel) return;
    const top =
      panel.getBoundingClientRect().top - SCROLL_GAP + (window.scrollY - offsetRef.current);
    window.scrollTo({ top: Math.round(top), behavior: "smooth" });
    if (expanded) setExpanded(false);
  };

  const current = tabs[active];
  const navStyle = navIcon
    ? ({ "--sticky-nav-logo": `url('${navIcon.url}')` } as CSSProperties)
    : undefined;

  return (
    <>
      <div ref={sentinelRef} />
      <nav
        ref={navRef}
        aria-label="Section tabs"
        data-expanded={expanded}
        style={navStyle}
        className={[
          "group/nav relative mx-auto flex min-h-[60px] flex-col items-start gap-0 border-t border-[color:var(--zuora-teal)] bg-[var(--zuora-forest)] py-0 [will-change:transform] [--indicator-left:0] [--indicator-width:0] [--progress-percentage:0%]",
          // Pinned state (set from the scroll handler).
          "data-[sticky=true]:fixed data-[sticky=true]:top-[var(--site-header-offset)] data-[sticky=true]:right-0 data-[sticky=true]:left-0 data-[sticky=true]:z-[100] data-[sticky=true]:max-w-[var(--z-sticky-container-max-width,100%)] data-[sticky=true]:animate-[sticky-drop-in_0.3s_ease-out_forwards] motion-reduce:data-[sticky=true]:animate-none",
          // ≤767: collapsed dropdown unless expanded.
          "max-[768px]:data-[expanded=false]:min-h-0 max-[768px]:data-[expanded=false]:py-0",
          "min-[767px]:flex-row min-[767px]:items-center min-[767px]:gap-4 min-[767px]:px-6",
          "min-[1024px]:gap-5 min-[1024px]:px-16",
          // ≥1024: the section icon pinned to the right edge.
          navIcon
            ? "min-[1024px]:after:absolute min-[1024px]:after:top-0 min-[1024px]:after:right-0 min-[1024px]:after:mx-[-1px] min-[1024px]:after:h-[60px] min-[1024px]:after:w-[60px] min-[1024px]:after:bg-[image:var(--sticky-nav-logo)] min-[1024px]:after:bg-contain min-[1024px]:after:bg-center min-[1024px]:after:bg-no-repeat min-[1024px]:after:content-['']"
            : "",
        ].join(" ")}
      >
        {/* Mobile header: active tab + chevron, toggles the list. */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setExpanded((open) => !open);
            }
          }}
          className="flex h-[var(--zuora-unav-height)] w-full cursor-pointer items-center justify-between bg-[var(--zuora-forest)] px-4 min-[767px]:hidden"
        >
          {current && (
            <div className="flex items-center gap-1">
              {current.icon && (
                <Image
                  src={current.icon.url}
                  alt=""
                  width={current.icon.width ?? 20}
                  height={current.icon.height ?? 20}
                  unoptimized
                  className="h-5 w-5 [filter:brightness(0)_invert(1)]"
                />
              )}
              <span className="m-0 font-[family-name:var(--font-founders-grotesk-mono)] text-[14px] leading-[1.2] font-medium text-[var(--zuora-white)] uppercase">
                {current.label}
              </span>
            </div>
          )}
          <div className="flex items-center justify-center text-[var(--zuora-white)] [transition:transform_0.3s_ease] group-data-[expanded=true]/nav:[transform:rotate(180deg)] motion-reduce:[transition:none]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                d="M9.75 19.5C11.6784 19.5 13.5634 18.9282 15.1668 17.8568C16.7702 16.7855 18.0199 15.2627 18.7578 13.4812C19.4958 11.6996 19.6889 9.73918 19.3127 7.84787C18.9364 5.95655 18.0079 4.21927 16.6443 2.85571C15.2807 1.49215 13.5434 0.563549 11.6521 0.187343C9.76081 -0.188863 7.80041 0.00421994 6.01883 0.742175C4.23725 1.48013 2.71451 2.72981 1.64317 4.33319C0.571824 5.93657 -2.79374e-06 7.82163 -2.96233e-06 9.75C0.00272623 12.335 1.03083 14.8134 2.85872 16.6413C4.68661 18.4692 7.16497 19.4973 9.75 19.5ZM9.75 1.5C11.3817 1.5 12.9767 1.98385 14.3335 2.89037C15.6902 3.7969 16.7476 5.08537 17.372 6.59286C17.9964 8.10035 18.1598 9.75915 17.8415 11.3595C17.5231 12.9598 16.7374 14.4298 15.5836 15.5836C14.4298 16.7374 12.9598 17.5231 11.3595 17.8415C9.75915 18.1598 8.10035 17.9964 6.59286 17.372C5.08537 16.7476 3.79689 15.6902 2.89037 14.3335C1.98385 12.9767 1.5 11.3817 1.5 9.75C1.50248 7.56272 2.37247 5.46575 3.91911 3.91911C5.46574 2.37247 7.56272 1.50248 9.75 1.5ZM5.46937 11.7806C5.39964 11.711 5.34432 11.6283 5.30658 11.5372C5.26883 11.4462 5.24941 11.3486 5.24941 11.25C5.24941 11.1514 5.26883 11.0538 5.30658 10.9628C5.34432 10.8717 5.39964 10.789 5.46937 10.7194L9.21937 6.96937C9.28903 6.89964 9.37174 6.84432 9.46279 6.80658C9.55384 6.76884 9.65144 6.74941 9.75 6.74941C9.84856 6.74941 9.94615 6.76884 10.0372 6.80658C10.1283 6.84432 10.211 6.89964 10.2806 6.96937L14.0306 10.7194C14.1714 10.8601 14.2504 11.051 14.2504 11.25C14.2504 11.449 14.1714 11.6399 14.0306 11.7806C13.8899 11.9214 13.699 12.0004 13.5 12.0004C13.301 12.0004 13.1101 11.9214 12.9694 11.7806L9.75 8.56031L6.53062 11.7806C6.46097 11.8504 6.37825 11.9057 6.2872 11.9434C6.19615 11.9812 6.09856 12.0006 6 12.0006C5.90143 12.0006 5.80384 11.9812 5.71279 11.9434C5.62174 11.9057 5.53903 11.8504 5.46937 11.7806Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {tabs.map((tab, i) => (
          <div
            key={tab.anchorId}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            role="button"
            tabIndex={0}
            aria-current={i === active ? "true" : undefined}
            data-active={i === active}
            onClick={() => goTo(tab)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goTo(tab);
              }
            }}
            className={[
              "mx-auto flex w-full cursor-pointer items-center gap-1 border-b border-[color:var(--zuora-silver)] bg-[var(--zuora-white)] px-5 py-3 [transition:opacity_0.2s_ease]",
              "max-[768px]:group-data-[expanded=false]/nav:hidden",
              "min-[767px]:w-auto min-[767px]:border-none min-[767px]:bg-[var(--zuora-forest)] min-[767px]:p-0",
              // Icon: white on hover, black when active (white when active ≥767).
              "[&_img]:h-5 [&_img]:w-5 [&:hover:not([data-active=true])_img]:[filter:brightness(0)_invert(1)] [&[data-active=true]_img]:[filter:brightness(0)] min-[767px]:[&[data-active=true]_img]:[filter:brightness(0)_invert(1)]",
              // Label: gunmetal 14px → mist 10px ≥767 → 14px ≥1024; white on hover.
              "[&_span]:text-[var(--zuora-gunmetal)] [&:hover:not([data-active=true])_span]:text-[var(--zuora-white)] [&[data-active=true]_span]:text-[var(--zuora-black)]",
              "min-[767px]:[&_span]:text-[10px] min-[767px]:[&_span]:text-[var(--zuora-mist)] min-[767px]:[&[data-active=true]_span]:text-[var(--zuora-white)] min-[1024px]:[&_span]:text-[14px]",
            ].join(" ")}
          >
            {tab.icon && (
              <Image
                src={tab.icon.url}
                alt=""
                width={tab.icon.width ?? 20}
                height={tab.icon.height ?? 20}
                unoptimized
                data-cslp={cslpTag(cslpPrefix, `tabs.${i}.tab_icon`)}
              />
            )}
            <span
              className="m-0 font-[family-name:var(--font-founders-grotesk-mono)] text-[14px] leading-none font-medium uppercase [transition:color_0.2s_ease]"
              data-cslp={cslpTag(cslpPrefix, `tabs.${i}.tab_label`)}
            >
              {tab.label}
            </span>
          </div>
        ))}

        {/* Desktop underline that slides to the active tab. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 hidden h-1 bg-[var(--zuora-teal)] opacity-0 [transform:translateX(var(--indicator-left,0))] [transition:transform_0.3s_ease,width_0.3s_ease,opacity_0.3s_ease] [will-change:transform,width] w-[var(--indicator-width,0)] group-data-[indicator=true]/nav:opacity-100 min-[767px]:block motion-reduce:[transition:none]"
        />
        {/* Mobile progress through the tabs. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 block h-1 w-[var(--progress-percentage,0)] bg-[var(--zuora-teal)] [transition:width_0.3s_ease] min-[767px]:hidden motion-reduce:[transition:none]"
        />
      </nav>
    </>
  );
}
