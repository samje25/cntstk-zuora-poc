"use client";

import { useEffect } from "react";

type RevealObserverProps = { rootId: string };

/**
 * zuora.com's `OnViewTransform` + card activation, scoped to one section root:
 *   [data-reveal] → data-view="true" once 30% is visible (expands the CTA bar,
 *                   slides the overlap image home);
 *   [data-card]   → data-active="true" once 50% is visible (teal CTA ≤767).
 * Both are one-way, like the live site.
 */
export function RevealObserver({ rootId }: RevealObserverProps) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const reveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.view = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    const activate = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) (entry.target as HTMLElement).dataset.active = "true";
        });
      },
      { threshold: 0.5 }
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    root.querySelectorAll("[data-card]").forEach((el) => activate.observe(el));

    return () => {
      reveal.disconnect();
      activate.disconnect();
    };
  }, [rootId]);

  return null;
}
