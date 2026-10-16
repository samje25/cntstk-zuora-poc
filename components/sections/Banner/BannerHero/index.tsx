import Image from "next/image";
import { cslpTag } from "@/lib/sections/cslp";
import type { BannerCta, BannerSection } from "@/lib/sections/types";
import { HeroVideo } from "./HeroVideo";
import { StrokeGraphic } from "./StrokeGraphic";

type BannerHeroProps = { section: BannerSection };

// Mirrors zuora.com `.Button` — 2px border, 10px/16px padding, 16/21 medium, 0.3s ease.
const CTA_BASE =
  "flex h-fit w-fit items-center justify-center gap-x-2 rounded-[50px] border-2 px-4 py-[10px] font-[family-name:var(--font-founders-grotesk)] text-base leading-[21px] font-medium outline-none [transition:0.3s]";

const CTA_STYLES: Record<BannerCta["style"], string> = {
  White:
    "border-[var(--zuora-white)] bg-[var(--zuora-white)] text-[var(--zuora-black)] [&:hover]:bg-transparent [&:hover]:text-[var(--zuora-white)]",
  Teal:
    "border-[var(--zuora-teal)] bg-[var(--zuora-teal)] text-[var(--zuora-black)] [&:hover]:bg-transparent [&:hover]:text-[var(--zuora-teal)] active:bg-transparent active:text-[var(--zuora-teal)]",
};

// Decorative stroke Lottie panels: hidden < 767, 45% (max 400) to 1024, 400 after.
const GRAPHIC_BASE =
  "pointer-events-none absolute top-0 m-0 aspect-square h-auto w-[45%] max-w-[400px] overflow-hidden opacity-0 [clip-path:inset(0_round_0_18px_0_0)] min-[767px]:pointer-events-auto min-[767px]:opacity-100 min-[1024px]:w-[400px] min-[1024px]:max-w-none";

export function BannerHero({ section }: BannerHeroProps) {
  const { cslpPrefix, heading, ctas, desktopVideo, mobileImage } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section className="mx-auto w-full min-[767px]:w-[95%] min-[1440px]:w-full">
        <header className="relative flex flex-col items-center justify-center gap-10 rounded-[20px] bg-[var(--zuora-forest)] text-[var(--zuora-white)] max-[1025px]:rounded-b-none max-[768px]:rounded-none">
          {heading && (
            <h1
              className="mt-2 mb-4 px-5 pt-[50px] text-center font-[family-name:var(--font-founders-grotesk)] text-[40px] leading-none font-medium min-[767px]:w-[796px] min-[767px]:pt-[85px] min-[767px]:text-[56px]"
              data-cslp={cslpTag(cslpPrefix, "heading")}
            >
              {heading}
            </h1>
          )}

          <figure className={`${GRAPHIC_BASE} right-0`} aria-hidden="true">
            <StrokeGraphic />
          </figure>
          <figure className={`${GRAPHIC_BASE} left-0 -scale-x-100`} aria-hidden="true">
            <StrokeGraphic />
          </figure>

          {ctas.length > 0 && (
            <div className="flex flex-row items-center justify-center gap-2">
              {ctas.map((cta, i) => (
                <a
                  key={`${cta.href}-${i}`}
                  href={cta.href}
                  className={`${CTA_BASE} ${CTA_STYLES[cta.style]}`}
                  data-cslp={cslpTag(cslpPrefix, `ctas.${i}.link`)}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}

          {desktopVideo && (
            <figure className="relative my-0 hidden w-full max-w-full min-h-[600px] min-[767px]:block">
              <HeroVideo
                src={desktopVideo.url}
                type={desktopVideo.contentType}
                label={heading ?? undefined}
                cslp={cslpTag(cslpPrefix, "desktop_video")}
              />
            </figure>
          )}

          {mobileImage && (
            // pb-[30px] = 24px padding + the 6px baseline gap zuora.com's inline <img> leaves.
            <div className="block h-auto w-full px-6 pt-6 pb-[30px] min-[767px]:h-0 min-[767px]:p-0">
              <Image
                src={mobileImage.url}
                alt=""
                width={mobileImage.width ?? 708}
                height={mobileImage.height ?? 1444}
                sizes="(min-width: 767px) 0px, 100vw"
                unoptimized
                className="h-auto w-full min-[767px]:hidden"
                data-cslp={cslpTag(cslpPrefix, "mobile_image")}
              />
            </div>
          )}
        </header>
      </section>
    </div>
  );
}
