"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTOSLIDE_MS = 3000;
const SCROLL_SETTLE_MS = 100;

/**
 * Port of zuora.com's `CarouselEffect` (used by its mobile card sliders):
 * scroll-snap track, 3s autoplay that wraps to the start, prev/next disabled
 * at the ends, and any pointer/touch/wheel/button use stops autoplay for good.
 * Slide positions come from `offsetLeft`, so the slider root must be the
 * slides' offset parent (`position: relative`) exactly as on zuora.com.
 */
export function useCarouselEffect(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const interactedRef = useRef(false);
  const [current, setCurrent] = useState(0);

  const setActive = useCallback((index: number) => {
    currentRef.current = index;
    setCurrent(index);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, count - 1));
      const slide = slideRefs.current[target];
      if (slide) trackRef.current?.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      setActive(target);
    },
    [count, setActive]
  );

  const next = useCallback(() => {
    goTo(currentRef.current < count - 1 ? currentRef.current + 1 : 0);
  }, [count, goTo]);

  const prev = useCallback(() => {
    if (currentRef.current > 0) goTo(currentRef.current - 1);
  }, [goTo]);

  const stopAuto = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const markUserInteracted = useCallback(() => {
    interactedRef.current = true;
    stopAuto();
  }, [stopAuto]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count <= 1) return;

    if (!interactedRef.current) timerRef.current = window.setInterval(next, AUTOSLIDE_MS);

    const onInteract = () => markUserInteracted();
    let settle: number | null = null;
    const onScroll = () => {
      if (settle !== null) window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        let closest = 0;
        let best = Infinity;
        slideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (distance < best) {
            best = distance;
            closest = i;
          }
        });
        if (closest !== currentRef.current) setActive(closest);
        settle = null;
      }, SCROLL_SETTLE_MS);
    };
    const onResize = () => {
      const slide = slideRefs.current[currentRef.current];
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: "auto" });
    };

    track.addEventListener("pointerdown", onInteract, { passive: true });
    track.addEventListener("touchstart", onInteract, { passive: true });
    track.addEventListener("wheel", onInteract, { passive: true });
    track.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      stopAuto();
      if (settle !== null) window.clearTimeout(settle);
      track.removeEventListener("pointerdown", onInteract);
      track.removeEventListener("touchstart", onInteract);
      track.removeEventListener("wheel", onInteract);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [count, next, markUserInteracted, setActive, stopAuto]);

  const slideRef = (index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el;
  };

  return {
    trackRef,
    slideRef,
    current,
    prevDisabled: current === 0,
    nextDisabled: current === count - 1,
    onPrev: () => {
      markUserInteracted();
      prev();
    },
    onNext: () => {
      markUserInteracted();
      next();
    },
  };
}
