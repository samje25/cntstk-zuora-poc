import type { CSSProperties } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { FooterSection } from "@/lib/sections/types";
import { FooterAccordions } from "./FooterAccordions";
import { NewsletterForm } from "./NewsletterForm";
import { RegionSwitcher } from "./RegionSwitcher";

type FooterDefaultProps = { section: FooterSection };

const FONT = "font-[family-name:var(--font-founders-grotesk)]";
/** Footnote text (zuora.com `util-text-headline-xs text-xs! text-neutral-300! font-normal!`). */
const FOOTNOTE = `${FONT} block text-[12px] leading-[1.33333] font-normal text-[var(--zuora-greys-300)] first-of-type:hidden lg:first-of-type:block`;

function Social({ section }: FooterDefaultProps) {
  const { cslpPrefix, socialHeading, socialLinks } = section;
  return (
    <section className="relative lg:pt-8">
      {socialHeading ? (
        <h4
          className="m-0 p-0 pb-3 font-[family-name:var(--zuora-system-font)] text-[11px] leading-[1.2] font-medium text-[var(--zuora-teal)] uppercase"
          data-cslp={cslpTag(cslpPrefix, "social_heading")}
        >
          {socialHeading}
        </h4>
      ) : null}
      <ul className="m-0 flex list-none gap-x-2 p-0">
        {socialLinks.map((link, i) => (
          <li key={i} className="h-6 w-6 p-0">
            <a
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
              className="block"
              data-cslp={cslpTag(cslpPrefix, `social_links.${i}.link`)}
            >
              <span
                className="block h-6 w-6 bg-no-repeat"
                style={link.icon ? { backgroundImage: `url(${link.icon})` } : undefined}
                data-cslp={cslpTag(cslpPrefix, `social_links.${i}.icon`)}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * zuora.com universal footer. Forest card with a notched "Change region" tab,
 * newsletter signup + social icons, four link columns (desktop) / accordions
 * (mobile), a striped fade and faded logo, and a footnote row. The grid
 * placement mirrors live's `unav-footer__inner` areas so every breakpoint
 * lines up.
 */
export function FooterDefault({ section }: FooterDefaultProps) {
  const { cslpPrefix, columns, copyright, legalLinks, cookieLabel, backgroundLogo } = section;
  const desktopColumns = columns.map((column, i) => ({ column, i }));

  return (
    <footer className="relative pt-5 font-[family-name:var(--zuora-system-font)] text-[16px] leading-[1.5] text-[var(--zuora-body)] [interpolate-size:allow-keywords] lg:px-10 lg:py-9">
      <div className="relative lg:mx-auto lg:max-w-[1360px] wide:p-0">
        <div className="relative z-20 grid grid-cols-12 gap-x-4 px-5 py-6 lg:h-full lg:min-h-[768px] lg:px-8 lg:py-10 wide:p-10">
          <RegionSwitcher
            cslpPrefix={cslpPrefix}
            regionLabel={section.regionLabel}
            regions={section.regions}
          />

          <section className="col-span-full mt-6 flex w-full flex-col pb-20 md:w-3/4 md:pe-6 lg:col-span-4 lg:w-full lg:pb-10 wide:pb-0">
            <NewsletterForm
              cslpPrefix={cslpPrefix}
              newsletterHtml={section.newsletterHtml}
              emailPlaceholder={section.emailPlaceholder}
              submitLabel={section.submitLabel}
              errorMessage={section.errorMessage}
              errorDetail={section.errorDetail}
              successTitle={section.successTitle}
              successMessage={section.successMessage}
            />
            <section className="hidden lg:block">
              <Social section={section} />
            </section>
          </section>

          <section className="[grid-area:2/1/auto/-1] lg:[grid-area:1/5/auto/none]">
            <div>
              <section className="col-span-full hidden grid-cols-4 gap-x-4 lg:grid">
                {desktopColumns.map(({ column, i }) => {
                  const base = cslpTag(cslpPrefix, `columns.${i}`);
                  return (
                    <nav key={i} aria-label={column.heading} style={{ order: column.desktopOrder } as CSSProperties}>
                      <h4
                        className="m-0 mb-3 font-[family-name:var(--font-founders-grotesk-mono)] text-[12px] leading-none font-medium text-[var(--zuora-teal)] uppercase"
                        data-cslp={base && `${base}.heading`}
                      >
                        {column.heading}
                      </h4>
                      {column.groups.map((group, j) => {
                        const groupBase = base && `${base}.groups.${j}`;
                        return (
                          <div key={j} className="lg:pb-7">
                            {group.kicker ? (
                              <h5
                                className="m-0 mb-2 font-[family-name:var(--font-founders-grotesk-mono)] text-[12px] leading-none font-medium text-[var(--zuora-slate)] uppercase"
                                data-cslp={groupBase && `${groupBase}.kicker`}
                              >
                                {group.kicker}
                              </h5>
                            ) : null}
                            <ul className="m-0 list-none p-0">
                              {group.links.map((link, k) => (
                                <li key={k} className="leading-none">
                                  <a
                                    href={link.href}
                                    className={`${FONT} block pb-1 text-[16px] leading-[1.5] font-normal text-[var(--zuora-white)]`}
                                    data-cslp={groupBase && `${groupBase}.links.${k}.link`}
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </nav>
                  );
                })}
              </section>
              <FooterAccordions columns={columns} cslpPrefix={cslpPrefix} />
            </div>
          </section>

          <section className="flex items-end justify-between pt-8 pb-5 text-right [grid-area:3/1/auto/-1] lg:hidden">
            {copyright ? (
              <div
                className="block text-[12px] leading-[1.33333] font-normal text-[var(--zuora-greys-300)]"
                data-cslp={cslpTag(cslpPrefix, "copyright")}
              >
                {copyright}
              </div>
            ) : null}
            <Social section={section} />
          </section>

          <div
            style={backgroundLogo ? ({ "--z-footer-logo": `url(${backgroundLogo})` } as CSSProperties) : undefined}
            data-cslp={cslpTag(cslpPrefix, "background_logo")}
            className="relative pt-10 [grid-area:5/1/5/-1] before:block before:h-[100px] before:w-full before:bg-[image:var(--z-footer-logo)] before:bg-contain before:bg-bottom before:bg-no-repeat before:content-[''] lg:pt-0 lg:[grid-row:2/2] lg:before:h-[200px] lg:before:max-w-[696px] lg:before:bg-top"
          />

          <section className="[grid-area:4/1/4/-1] lg:self-end lg:border-t lg:border-solid lg:border-[var(--zuora-white)] lg:[grid-row:3/3]">
            <div className="relative flex flex-col justify-between lg:grid lg:grid-cols-12 lg:gap-x-4">
              <div className="absolute top-0 -ms-5 w-[calc(100%+40px)] border-t border-solid border-[var(--zuora-white)] lg:hidden" />
              <section className="flex flex-wrap items-center justify-center gap-x-2 py-4 md:gap-x-5 lg:justify-end lg:[grid-column:1/none] lg:[&_div:first-of-type]:me-auto">
                {copyright ? (
                  <div className={FOOTNOTE} data-cslp={cslpTag(cslpPrefix, "copyright")}>
                    {copyright}
                  </div>
                ) : null}
                {legalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className={FOOTNOTE}
                    data-cslp={cslpTag(cslpPrefix, `legal_links.${i}.link`)}
                  >
                    {link.label}
                  </a>
                ))}
                {cookieLabel ? (
                  <div className={FOOTNOTE}>
                    <div>
                      {/* Hook for the cookie consent manager's preferences modal. */}
                      <button
                        type="button"
                        className={`${FONT} block cursor-pointer text-[12px] leading-none font-normal text-[var(--zuora-greys-300)]`}
                        data-cslp={cslpTag(cslpPrefix, "cookie_label")}
                      >
                        {cookieLabel}
                      </button>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
          </section>
        </div>

        <span className="absolute inset-0 h-full w-full">
          <span className="absolute bottom-0 left-0 z-10 block h-[30dvh] w-full bg-[url(/images/footer/footer-bg-line.svg)] bg-[length:4px_30dvh] bg-repeat lg:h-[40dvh] lg:rounded-[20px] lg:bg-[length:4px_40dvh]" />
        </span>
        <div className="absolute inset-0 z-0 rounded-tl-[24px] bg-[var(--zuora-forest)] lg:rounded-[20px] lg:rounded-tl-[24px]" />
      </div>
    </footer>
  );
}
