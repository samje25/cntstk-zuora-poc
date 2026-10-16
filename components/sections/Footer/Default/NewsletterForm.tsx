"use client";

import { useRef, useState, type FormEvent } from "react";
import { cslpTag } from "@/lib/sections/cslp";
import type { FooterSection } from "@/lib/sections/types";

type NewsletterFormProps = Pick<
  FooterSection,
  | "cslpPrefix"
  | "newsletterHtml"
  | "emailPlaceholder"
  | "submitLabel"
  | "errorMessage"
  | "errorDetail"
  | "successTitle"
  | "successMessage"
>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup, styled like zuora.com's Marketo form 2821 in the footer.
 * An invalid address focuses the field and shows Marketo's "* Must be valid
 * email." line under it (white, like live); a valid one swaps in the thank-you note. There is no
 * submission endpoint yet — wire one up (Marketo or another ESP) in onSubmit.
 */
export function NewsletterForm({
  cslpPrefix,
  newsletterHtml,
  emailPlaceholder,
  submitLabel,
  errorMessage,
  errorDetail,
  successTitle,
  successMessage,
}: NewsletterFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (!EMAIL.test(value)) {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }
    setInvalid(false);
    setDone(true);
  };

  return (
    <section className="lg:pb-8">
      <div>
        {newsletterHtml ? (
          <p
            className="m-0 pt-8 pb-2 font-[family-name:var(--font-ibm-plex-serif)] text-[12px] leading-[1.5] font-normal text-[var(--zuora-white)] lg:max-w-[300px] lg:pt-10"
            data-cslp={cslpTag(cslpPrefix, "newsletter_text")}
            dangerouslySetInnerHTML={{ __html: newsletterHtml }}
          />
        ) : null}
        {done ? (
          <section
            role="status"
            className="mb-2 rounded-[4px] border-2 border-solid border-[var(--zuora-teal)] py-3 pr-[11px] pl-3 text-[var(--zuora-teal)]"
          >
            <h4
              className="m-0 font-[family-name:var(--font-founders-grotesk)] text-[21px] leading-none font-medium"
              data-cslp={cslpTag(cslpPrefix, "success_title")}
            >
              {successTitle}
            </h4>
            <p
              className="m-0 font-[family-name:var(--font-ibm-plex-serif)] text-[14px] leading-[1.5] text-[var(--zuora-white)]"
              data-cslp={cslpTag(cslpPrefix, "success_message")}
            >
              {successMessage}
            </p>
          </section>
        ) : null}
      </div>
      {done ? null : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex w-auto flex-row items-center gap-2 p-0 font-[family-name:var(--font-founders-grotesk)] text-[12px] leading-[1.5] lg:max-w-[300px] lg:flex-col wide:max-w-full wide:flex-row"
        >
          <div className="relative w-full">
            <label htmlFor="site-footer-email" className="sr-only">
              {emailPlaceholder}
            </label>
            <input
              ref={inputRef}
              id="site-footer-email"
              name="email"
              type="email"
              maxLength={255}
              autoComplete="email"
              placeholder={emailPlaceholder}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? "site-footer-email-error" : undefined}
              onChange={() => invalid && setInvalid(false)}
              data-cslp={cslpTag(cslpPrefix, "email_placeholder")}
              className="m-0 block h-10 w-full rounded-[32px] border-0 bg-[var(--zuora-input-fill)] px-4 py-2.5 font-[family-name:var(--font-founders-grotesk)] text-[12px] leading-[1.2] font-normal tracking-[1px] text-[var(--zuora-white)] placeholder:text-[var(--zuora-white)] focus:outline-none max-[481px]:leading-[18px]"
            />
            {invalid ? (
              <div className="absolute bottom-[-15px] left-0 w-[400px]">
                <div
                  id="site-footer-email-error"
                  role="alert"
                  className="relative top-[10px] mt-[5px] inline text-[12px] text-[var(--zuora-white)] before:content-['*_']"
                >
                  <span data-cslp={cslpTag(cslpPrefix, "error_message")}>{errorMessage}</span>{" "}
                  <span data-cslp={cslpTag(cslpPrefix, "error_detail")}>{errorDetail}</span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-auto">
            <span>
              <button
                type="submit"
                className="m-0 inline-block cursor-pointer whitespace-nowrap rounded-full border-2 border-solid border-transparent bg-[var(--zuora-black-25)] px-[25px] py-3 font-[family-name:var(--font-founders-grotesk)] text-[14px] leading-none font-medium text-[var(--zuora-teal)] capitalize"
                data-cslp={cslpTag(cslpPrefix, "submit_label")}
              >
                {submitLabel}
              </button>
            </span>
          </div>
          {/* Marketo's empty fieldset: one more gap after the button (20px wide at ≤480px). */}
          <fieldset aria-hidden="true" className="m-0 border-none p-0 max-[481px]:px-[10px]" />
        </form>
      )}
    </section>
  );
}
