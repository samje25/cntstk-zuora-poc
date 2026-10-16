"use client";

import { useEffect, useRef } from "react";

const ANIMATION_PATH = "/lottie/hero-stroke.json";

// Both panels share one fetch of the animation data.
let animationData: Promise<unknown> | null = null;
const loadAnimationData = () =>
  (animationData ??= fetch(ANIMATION_PATH).then((res) => res.json()));

/** zuora.com hero stroke Lottie: SVG renderer, speed 1, plays once. */
export function StrokeGraphic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;

    Promise.all([import("lottie-web/build/player/lottie_light"), loadAnimationData()])
      .then(([{ default: lottie }, data]) => {
        if (cancelled || !ref.current) return;
        const animation = lottie.loadAnimation({
          container: ref.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: data,
        });
        destroy = () => animation.destroy();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}
