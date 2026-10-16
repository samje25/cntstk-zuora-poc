import { cslpTag } from "@/lib/sections/cslp";
import type { TabsAndPillsSection } from "@/lib/sections/types";
import { RevealObserver } from "@/components/common/RevealObserver";
import { SolutionPanel } from "./SolutionPanel";
import { StickyTabBar } from "./StickyTabBar";

type ScrollingTabsProps = { section: TabsAndPillsSection };

/**
 * zuora.com `.HomePageContent-solutionsSection`: heading row, sticky tab bar,
 * one panel per tab. Breakpoints match zuora.com: 767 / 1024 (`max-[768px]`
 * is Tailwind's `width < 768`, i.e. their `max-width: 767px`).
 */
export function ScrollingTabs({ section }: ScrollingTabsProps) {
  const { cslpPrefix, heading, description, tabs, navIcon } = section;
  const rootId = `scrolling-tabs-${section.id}`;

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        id={rootId}
        // zuora.com body text context (font stack sizes inline-icon line boxes).
        className="relative mx-auto mt-10 rounded-t-[8px] text-base leading-6 text-[var(--zuora-body)] [--z-sticky-container-max-width:1360px] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] min-[767px]:mt-[60px] min-[1024px]:mx-5 min-[1024px]:mt-20 min-[1024px]:border min-[1024px]:border-[color:var(--zuora-silver)]"
      >
        <div className="flex w-full flex-col items-center justify-center gap-6 p-6 min-[767px]:flex-row min-[767px]:px-10 min-[767px]:py-8 min-[1024px]:px-12 min-[1024px]:py-10">
          <div className="w-full self-start min-[767px]:w-1/2">
            <div className="w-full text-center min-[767px]:text-left">
              {heading && (
                <h2
                  className="mt-2 mb-4 font-[family-name:var(--font-founders-grotesk)] text-[36px] leading-none font-medium min-[767px]:text-start min-[767px]:text-[48px] min-[1024px]:w-[85%]"
                  data-cslp={cslpTag(cslpPrefix, "heading")}
                >
                  {heading}
                </h2>
              )}
            </div>
          </div>
          {description && (
            <div
              className="w-full self-start min-[767px]:w-1/2 [&_p]:mt-2 [&_p]:mb-[0.9em] [&_p]:w-full [&_p]:text-center [&_p]:font-[family-name:var(--font-ibm-plex-serif)] [&_p]:text-base [&_p]:leading-6 [&_p]:font-normal min-[767px]:[&_p]:w-[90%] min-[767px]:[&_p]:text-start"
              data-cslp={cslpTag(cslpPrefix, "description")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {tabs.length > 0 && (
          <StickyTabBar tabs={tabs} navIcon={navIcon} cslpPrefix={cslpPrefix} />
        )}

        <div className="flex flex-col gap-20 py-10" data-sticky-end="">
          {tabs.map((tab, i) => (
            <div key={tab.anchorId}>
              <SolutionPanel tab={tab} cslp={cslpTag(cslpPrefix, `tabs.${i}`) ?? null} />
            </div>
          ))}
        </div>

        <RevealObserver rootId={rootId} />
      </section>
    </div>
  );
}
