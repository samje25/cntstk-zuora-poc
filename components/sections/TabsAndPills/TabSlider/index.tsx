import { cslpTag } from "@/lib/sections/cslp";
import type { TabsAndPillsSection } from "@/lib/sections/types";
import { FeatureAccordion } from "./FeatureAccordion";
import { FeatureTabs } from "./FeatureTabs";

type TabSliderProps = { section: TabsAndPillsSection };

/**
 * zuora.com `.HomePageContent-aiSection`: title, auto-advancing feature tabs
 * (≥767) / accordion (≤767), and a tab-shaped CTA. Breakpoints match
 * zuora.com: 767 / 1024; `max-[768px]` is their `max-width: 767px`.
 */
export function TabSlider({ section }: TabSliderProps) {
  const { cslpPrefix, heading, description, tabs, ctaLink, disableAutoplay } = section;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        // zuora.com body text context (font stack sizes inline-image line boxes).
        className="my-14 flex w-full flex-col items-center px-5 text-base leading-6 text-[var(--zuora-body)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[767px]:my-20 min-[1024px]:my-[120px]"
      >
        <div className="flex flex-col items-center text-center">
          {heading && (
            <h2
              className="mt-2 mb-4 font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-[48px]"
              data-cslp={cslpTag(cslpPrefix, "heading")}
            >
              {heading}
            </h2>
          )}
          {description && (
            <div
              className="font-[family-name:var(--font-ibm-plex-serif)] text-base leading-[1.5] font-normal min-[767px]:text-[20px] [&_p]:mt-0 [&_p]:mb-[14.4px]"
              data-cslp={cslpTag(cslpPrefix, "description")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {tabs.length > 0 && (
          <div className="w-full">
            <FeatureTabs tabs={tabs} cslpPrefix={cslpPrefix} disableAutoplay={disableAutoplay} />
            <FeatureAccordion tabs={tabs} cslpPrefix={cslpPrefix} />
          </div>
        )}

        {ctaLink && (
          <a
            href={ctaLink.href}
            className="group/aicta relative flex h-10 w-[600px] cursor-pointer flex-row items-stretch justify-center text-[var(--zuora-black)] max-[768px]:mt-8 max-[768px]:h-auto max-[768px]:w-full max-[768px]:rounded-[4px] max-[768px]:border max-[768px]:border-[color:var(--zuora-silver)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="600"
              height="41"
              viewBox="0 0 600 41"
              fill="none"
              aria-hidden="true"
              className="absolute inset-0 -z-10 max-[768px]:hidden"
            >
              <path
                d="M8.36496 26.2294L0.671875 0.5H598.672L590.979 26.2294C588.447 34.6979 580.656 40.5 571.817 40.5H27.5267C18.6878 40.5 10.897 34.6979 8.36496 26.2294Z"
                stroke="#D2DEE7"
                className="fill-[var(--zuora-white)] [transition:fill_0.5s_ease] group-[:hover]/aicta:fill-[var(--zuora-teal)]"
              />
            </svg>
            <div className="flex flex-row items-stretch justify-center">
              <div className="flex items-center justify-center">
                <p className="m-0 border-r border-[color:var(--zuora-silver)] px-2 py-4 font-[family-name:var(--font-ibm-plex-serif)] text-base leading-[1.5] font-normal min-[767px]:font-[family-name:var(--font-founders-grotesk-mono)] min-[767px]:text-[12px] min-[767px]:leading-none min-[767px]:uppercase">
                  <span
                    className="font-bold min-[767px]:font-medium"
                    data-cslp={cslpTag(cslpPrefix, "cta_link")}
                  >
                    {ctaLink.label}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M19.7364 9.4238L15.6114 13.5488C15.4824 13.6778 15.3074 13.7503 15.125 13.7503C14.9426 13.7503 14.7676 13.6778 14.6386 13.5488C14.5096 13.4198 14.4371 13.2448 14.4371 13.0624C14.4371 12.88 14.5096 12.705 14.6386 12.576L17.5905 9.62489H11C8.995 9.62717 7.07277 10.4247 5.65502 11.8424C4.23727 13.2602 3.43977 15.1824 3.4375 17.1874C3.4375 17.3697 3.36507 17.5446 3.23614 17.6735C3.1072 17.8025 2.93234 17.8749 2.75 17.8749C2.56766 17.8749 2.3928 17.8025 2.26386 17.6735C2.13493 17.5446 2.0625 17.3697 2.0625 17.1874C2.065 14.8178 3.00743 12.546 4.683 10.8704C6.35856 9.19483 8.6304 8.2524 11 8.24989H17.5905L14.6386 5.2988C14.5747 5.23492 14.524 5.15909 14.4895 5.07564C14.4549 4.99218 14.4371 4.90273 14.4371 4.81239C14.4371 4.72206 14.4549 4.63261 14.4895 4.54915C14.524 4.46569 14.5747 4.38986 14.6386 4.32599C14.7676 4.19698 14.9426 4.12451 15.125 4.12451C15.2153 4.12451 15.3048 4.1423 15.3882 4.17687C15.4717 4.21144 15.5475 4.26211 15.6114 4.32599L19.7364 8.45099C19.8003 8.51484 19.851 8.59066 19.8856 8.67412C19.9202 8.75758 19.938 8.84705 19.938 8.93739C19.938 9.02774 19.9202 9.1172 19.8856 9.20067C19.851 9.28413 19.8003 9.35995 19.7364 9.4238Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </a>
        )}
      </section>
    </div>
  );
}
