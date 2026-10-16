"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { wpSrcSet } from "@/lib/images/wpSrcSet";
import { cslpTag } from "@/lib/sections/cslp";
import type { ScrollingTab } from "@/lib/sections/types";

type FeatureTabsProps = {
  tabs: ScrollingTab[];
  cslpPrefix: string | null | undefined;
  disableAutoplay: boolean;
};

const DURATION_MS = 5000;
const IN_VIEW_THRESHOLD = 0.25;

type TimerState = {
  current: number;
  rafId: number | null;
  startTime: number;
  elapsed: number;
  isPaused: boolean;
  hasStarted: boolean;
};

const HOVER_NONE = "(hover: none)";
const subscribeHoverNone = (onChange: () => void) => {
  const query = window.matchMedia(HOVER_NONE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useHoverNone = () =>
  useSyncExternalStore(
    subscribeHoverNone,
    () => window.matchMedia(HOVER_NONE).matches,
    () => false
  );

/** zuora.com dashed tab separator: dot, dashed line, dot. */
function DashedDivider() {
  return (
    <div aria-hidden="true" className="flex min-h-full w-2 flex-col items-center justify-between">
      <div className="h-1 w-1 bg-[var(--zuora-grey)]" />
      <div className="flex-1 border-l border-dashed border-[color:var(--zuora-grey)]" />
      <div className="h-1 w-1 bg-[var(--zuora-grey)]" />
    </div>
  );
}

/**
 * Port of zuora.com's `ZuoraFeatureComponent` (desktop, ≥767px).
 *
 * Each tab gets 5s; a teal bar fills its share of the width (`scaleX`) then
 * the next tab activates, wrapping to the first. Autoplay starts the first
 * time 25% of the component is visible, pauses while the pointer is over it
 * and is off on touch-only devices. Clicking a tab jumps there and restarts
 * its 5s.
 */
export function FeatureTabs({ tabs, cslpPrefix, disableAutoplay }: FeatureTabsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<TimerState>({
    current: 0,
    rafId: null,
    startTime: 0,
    elapsed: 0,
    isPaused: false,
    hasStarted: false,
  });
  const clickRef = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const hoverNone = useHoverNone();
  // zuora.com: with autoplay off (and a hover-capable pointer) every tab
  // label shows at full strength.
  const allTabsActive = disableAutoplay && !hoverNone;

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar || !tabs.length) return;

    const state = stateRef.current;
    const count = tabs.length;

    const activate = (index: number) => {
      state.current = index;
      setActive(index);
    };
    const resetProgress = () => {
      bar.style.transform = "scaleX(0)";
    };
    const setProgress = (index: number, fraction: number) => {
      const segment = 1 / count;
      const value = index * segment + segment * Math.min(1, Math.max(0, fraction));
      bar.style.transform = `scaleX(${value})`;
    };
    const cancel = () => {
      if (state.rafId !== null) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
    };
    const advance = () => {
      setProgress(state.current, 1);
      const next = (state.current + 1) % count;
      activate(next);
      if (next === 0) resetProgress();
      state.elapsed = 0;
      state.startTime = performance.now();
      setProgress(next, 0);
    };
    const tick = (now: number) => {
      if (state.isPaused) return;
      const fraction = (state.elapsed + (now - state.startTime)) / DURATION_MS;
      if (fraction >= 1) advance();
      else setProgress(state.current, fraction);
      state.rafId = requestAnimationFrame(tick);
    };
    const start = () => {
      state.isPaused = false;
      state.startTime = performance.now();
      cancel();
      state.rafId = requestAnimationFrame(tick);
    };
    const pause = () => {
      if (state.isPaused) return;
      state.isPaused = true;
      state.elapsed += performance.now() - state.startTime;
      cancel();
    };
    const resume = () => {
      if (!state.isPaused) return;
      state.isPaused = false;
      state.startTime = performance.now();
      cancel();
      state.rafId = requestAnimationFrame(tick);
    };
    const restartSegment = () => {
      cancel();
      state.elapsed = 0;
      state.startTime = performance.now();
      setProgress(state.current, 0);
    };

    state.current = 0;

    if (disableAutoplay && !hoverNone) {
      clickRef.current = (index) => activate(index);
      return;
    }

    clickRef.current = (index) => {
      activate(index);
      if (hoverNone) {
        setProgress(index, 0);
        return;
      }
      if (disableAutoplay) return;
      restartSegment();
      if (state.hasStarted) start();
      else {
        state.isPaused = true;
        cancel();
      }
    };

    if (disableAutoplay) return;
    resetProgress();
    if (hoverNone) return;

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !state.hasStarted) {
          state.hasStarted = true;
          start();
          observer.disconnect();
        }
      },
      { threshold: IN_VIEW_THRESHOLD }
    );
    observer.observe(root);

    return () => {
      cancel();
      observer.disconnect();
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("mouseleave", resume);
    };
  }, [tabs.length, disableAutoplay, hoverNone]);

  return (
    <div ref={rootRef} className="w-full">
      <div className="hidden flex-col gap-4 min-[767px]:flex min-[767px]:px-5 min-[1024px]:px-20 min-[1024px]:pt-10">
        <div className="flex flex-row gap-2 px-4 min-[1024px]:gap-6">
          <DashedDivider />
          {tabs.map((tab, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={i === active}
              data-active={allTabsActive || i === active}
              onClick={() => clickRef.current(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  clickRef.current(i);
                }
              }}
              className="group/tab flex cursor-pointer justify-between gap-2 min-[1024px]:gap-4"
            >
              {tab.summary && (
                <div
                  className="opacity-50 [transition:opacity_0.5s_ease] group-data-[active=true]/tab:opacity-100 group-[:hover]/tab:opacity-100 [&_p]:m-0 [&_p]:pt-[10px] [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal"
                  data-cslp={cslpTag(cslpPrefix, `tabs.${i}.tab_summary`)}
                  dangerouslySetInnerHTML={{ __html: tab.summary }}
                />
              )}
              <DashedDivider />
            </div>
          ))}
        </div>

        <div className="relative min-h-[500px] overflow-hidden rounded-[8px] bg-[var(--zuora-silver-50)] pt-3">
          <div
            aria-hidden="true"
            className={`absolute top-0 right-6 left-6 h-[6px] overflow-hidden ${disableAutoplay ? "hidden" : ""}`}
          >
            <div
              ref={barRef}
              className="h-full bg-[var(--zuora-teal)] [transform:scaleX(0)] [transform-origin:left_center] [will-change:transform]"
            />
          </div>

          {tabs.map((tab, i) => (
            <div
              key={i}
              data-active={i === active}
              aria-hidden={i !== active}
              className="group/card flex max-h-0 flex-col overflow-hidden opacity-0 [transition:opacity_0.8s_ease] data-[active=true]:max-h-[2000px] data-[active=true]:min-h-[500px] data-[active=true]:w-full data-[active=true]:opacity-100 min-[1024px]:flex-row"
            >
              <div className="flex min-h-full flex-col gap-5 p-10 [transform:translateY(16px)] [transition:transform_0.8s_ease] group-data-[active=true]/card:[transform:translateY(0)] min-[1024px]:w-1/2 min-[1024px]:py-20 min-[1024px]:pr-0 min-[1024px]:pl-10">
                {tab.heading && (
                  <h3
                    className="m-0 font-[family-name:var(--font-founders-grotesk-mono)] text-base leading-none font-medium uppercase"
                    data-cslp={cslpTag(cslpPrefix, `tabs.${i}.heading`)}
                  >
                    {tab.heading}
                  </h3>
                )}
                {tab.body && (
                  <div
                    className="w-full font-[family-name:var(--font-ibm-plex-serif)] text-[20px] leading-[1.5] font-medium min-[1024px]:w-3/4 [&_p]:mt-0 [&_p]:mb-[14.4px]"
                    data-cslp={cslpTag(cslpPrefix, `tabs.${i}.body`)}
                    dangerouslySetInnerHTML={{ __html: tab.body }}
                  />
                )}
              </div>
              <figure
                className="m-0 flex min-h-full bg-contain bg-bottom bg-no-repeat max-[1025px]:justify-center min-[1024px]:w-1/2 min-[1024px]:items-center"
                style={
                  tab.backgroundImage
                    ? { backgroundImage: `url('${tab.backgroundImage.url}')` }
                    : undefined
                }
                data-cslp={cslpTag(cslpPrefix, `tabs.${i}.background_image`)}
              >
                {tab.image && (
                  // Plain <img>: next/image can't take a hand-built srcSet.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tab.image.url}
                    srcSet={wpSrcSet(tab.image)}
                    alt={tab.imageAlt}
                    width={tab.image.width ?? undefined}
                    height={tab.image.height ?? undefined}
                    loading="lazy"
                    decoding="async"
                    className="w-[60%] [transform:translateY(16px)] [transition:transform_0.8s_ease] group-data-[active=true]/card:[transform:translateY(0)] min-[1024px]:w-[90%]"
                    data-cslp={cslpTag(cslpPrefix, `tabs.${i}.image`)}
                  />
                )}
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
