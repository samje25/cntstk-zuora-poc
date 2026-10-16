import type { AssetImage } from "@/lib/sections/types";

/**
 * zuora.com serves content images through WordPress `srcset` (no `sizes`, so
 * 100vw): 640×640-bounded, 768-wide and 1280×1280-bounded variants plus the
 * original. Emitting the same candidate widths makes the browser pick the same
 * file width, and each variant's rounded size gives the same layout height.
 * Contentstack's image API (`?width=&height=`) produces the variants.
 */
export const wpSrcSet = (image: AssetImage): string | undefined => {
  const { url, width: w, height: h } = image;
  if (!w || !h) return undefined;
  const sizes = new Map<number, number>();
  const bound = (max: number) => {
    if (w <= max && h <= max) return;
    const scale = Math.min(max / w, max / h);
    sizes.set(Math.round(w * scale), Math.round(h * scale));
  };
  bound(640);
  if (w > 768) sizes.set(768, Math.round((h * 768) / w));
  bound(1280);
  if (!sizes.size) return undefined;
  return [
    `${url} ${w}w`,
    ...[...sizes].map(([vw, vh]) => `${url}?width=${vw}&height=${vh} ${vw}w`),
  ].join(", ");
};
