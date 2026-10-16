"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
  type: string | null;
  label?: string;
  cslp?: string;
};

/**
 * Plays once and holds the last frame, like zuora.com. React doesn't emit the
 * `muted` attribute during SSR, so set it on the element before calling play()
 * or browsers block the autoplay.
 */
export function HeroVideo({ src, type, label, cslp }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover p-8"
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-label={label}
      data-cslp={cslp}
    >
      <source src={src} type={type ?? undefined} />
    </video>
  );
}
