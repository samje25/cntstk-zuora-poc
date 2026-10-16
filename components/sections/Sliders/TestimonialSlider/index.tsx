import Image from "next/image";
import { cslpTag } from "@/lib/sections/cslp";
import type { Slide, SlidersSection } from "@/lib/sections/types";

type TestimonialSliderProps = { section: SlidersSection };

/*
 * zuora.com `.HomePageContent-testimonialSlider`. Pure CSS, no client JS:
 *   ≥767  — infinite marquee (slides rendered twice, `testimonial-scroll` in
 *           globals.css), paused on hover, 96px edge-fade mask; linked cards
 *           get a cloud hover with a "Read Case study" bar sliding in below.
 *   ≤767  — static vertical list, duplicates hidden, CTA shown inline.
 * Tailwind's `max-[768px]:` is `width < 768`, i.e. zuora.com's `max-width: 767px`.
 */
export function TestimonialSlider({ section }: TestimonialSliderProps) {
  const { cslpPrefix, heading, slides } = section;
  const headingId = `testimonial-slider-title-${section.id}`;
  const hasCta = slides.some((slide) => slide.link);

  const renderSlides = (duplicate: boolean) =>
    slides.map((slide, i) => (
      <li
        key={`${duplicate ? "dup" : "main"}-${i}`}
        aria-hidden={duplicate || undefined}
        className={`w-[490px] max-w-[90vw] flex-none max-[768px]:w-full max-[768px]:max-w-full ${
          duplicate ? "max-[768px]:hidden motion-reduce:hidden" : ""
        }`}
      >
        <TestimonialCard
          slide={slide}
          cslp={cslpTag(cslpPrefix, `slides.${i}`) ?? null}
          focusable={!duplicate}
        />
      </li>
    ));

  return (
    <div className="mx-auto w-full min-[1440px]:max-w-[1440px] min-[1440px]:px-5">
      <section
        aria-labelledby={heading ? headingId : undefined}
        className="mx-auto mt-8 text-[var(--zuora-body)] [--testimonial-cta-height:40px] [--testimonial-edge-fade:96px] [--testimonial-gap:40px] min-[767px]:mt-16"
      >
        {heading && (
          <div className="text-center font-[family-name:var(--font-ibm-plex-serif)]">
            <h2
              id={headingId}
              className="m-0 text-[20px] leading-6 font-bold"
              data-cslp={cslpTag(cslpPrefix, "heading")}
            >
              {heading}
            </h2>
          </div>
        )}

        <div
          className={`group/viewport relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_var(--testimonial-edge-fade),#000_calc(100%_-_var(--testimonial-edge-fade)),transparent_100%)] max-[768px]:overflow-visible max-[768px]:[mask-image:none] motion-reduce:overflow-x-auto ${
            hasCta ? "min-[767px]:pb-[var(--testimonial-cta-height)]" : ""
          }`}
        >
          <ul
            role="list"
            className="m-0 flex w-max list-none animate-[testimonial-scroll_20s_linear_infinite] items-stretch gap-[var(--testimonial-gap)] p-0 [will-change:transform] group-[:hover]/viewport:[animation-play-state:paused] max-[768px]:w-full max-[768px]:animate-none max-[768px]:flex-col max-[768px]:gap-6 max-[768px]:[will-change:auto] motion-reduce:animate-none motion-reduce:[will-change:auto]"
          >
            {renderSlides(false)}
            {renderSlides(true)}
          </ul>
        </div>
      </section>
    </div>
  );
}

type TestimonialCardProps = {
  slide: Slide;
  /** Item-scoped Live Preview base, e.g. `sliders.blt…en-us.slides.0`. */
  cslp: string | null;
  /** Marquee duplicates are aria-hidden, so keep their links out of tab order. */
  focusable: boolean;
};

const CARD_LINKED =
  "group/tcard text-inherit no-underline min-[767px]:relative min-[767px]:[transition:background-color_0.2s,box-shadow_0.2s] min-[767px]:focus-visible:bg-[var(--zuora-cloud)] min-[767px]:focus-visible:shadow-[0_0_0_8px_var(--zuora-cloud)] min-[767px]:[&:hover]:bg-[var(--zuora-cloud)] min-[767px]:[&:hover]:shadow-[0_0_0_8px_var(--zuora-cloud)]";

/** zuora.com `.TestimonialCard`. */
function TestimonialCard({ slide, cslp, focusable }: TestimonialCardProps) {
  const label = slide.link?.label ?? "Read more";
  const body = (
    <div className="flex grow justify-center gap-2 min-[767px]:justify-between">
      <div className="flex min-h-[240px] w-[320px] flex-col justify-between gap-4 rounded-[8px] border border-[color:var(--zuora-silver)] bg-[var(--zuora-white)] p-4 shadow-[0_1px_4px_0_var(--zuora-silver)]">
        {slide.quote && (
          <blockquote
            className="m-0 font-[family-name:var(--font-ibm-plex-serif)] text-base leading-6 font-normal [&_p]:mt-0 [&_p]:mb-[0.9em]"
            data-cslp={cslpTag(cslp, "quote")}
            dangerouslySetInnerHTML={{ __html: slide.quote }}
          />
        )}
        {slide.speaker && (
          <p
            className="m-0 font-[family-name:var(--font-ibm-plex-serif)] text-base leading-6 font-medium"
            data-cslp={cslpTag(cslp, "speaker")}
          >
            {slide.speaker}
          </p>
        )}
      </div>
      {slide.image && (
        // zuora.com's body font stack: it sizes the inline image's baseline gap.
        <figure className="m-0 w-[160px] overflow-hidden rounded-[8px] text-base leading-6 shadow-[0_1px_4px_0_var(--zuora-silver)] [font-family:-apple-system,'system-ui','Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif]">
          <Image
            src={slide.image.url}
            alt={slide.image.alt}
            width={slide.image.width ?? 320}
            height={slide.image.height ?? 480}
            unoptimized
            loading="lazy"
            // Inline + baseline like zuora.com (not preflight's block/middle): at
            // some widths the figure's line box adds the same 6px they get.
            className="inline h-full w-full object-cover align-baseline"
            data-cslp={cslpTag(cslp, "image")}
          />
        </figure>
      )}
    </div>
  );

  const base = "flex h-full flex-col gap-4 rounded-t-[8px] p-2";

  if (!slide.link) return <div className={base}>{body}</div>;

  return (
    <a
      href={slide.link.href}
      aria-label={slide.speaker ? `${label} — ${slide.speaker}` : label}
      tabIndex={focusable ? undefined : -1}
      className={`${base} ${CARD_LINKED}`}
    >
      {body}
      <span className="flex items-center justify-between gap-2 min-[767px]:absolute min-[767px]:top-full min-[767px]:-right-2 min-[767px]:-left-2 min-[767px]:h-[var(--testimonial-cta-height)] min-[767px]:rounded-b-[8px] min-[767px]:bg-[var(--zuora-cloud)] min-[767px]:px-4 min-[767px]:opacity-0 min-[767px]:[transition:opacity_0.2s] min-[767px]:group-focus-visible/tcard:opacity-100 min-[767px]:group-[:hover]/tcard:opacity-100">
        <span
          className="font-[family-name:var(--font-founders-grotesk)] leading-6 font-medium"
          data-cslp={cslpTag(cslp, "link")}
        >
          {label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M17.1875 4.5874C17.3033 4.5874 17.4184 4.6095 17.5254 4.65381C17.6321 4.69808 17.7288 4.76352 17.8105 4.84521L22.498 9.53271L22.5566 9.59717C22.6115 9.664 22.6562 9.73868 22.6895 9.81885C22.7337 9.92569 22.7568 10.0401 22.7568 10.1558C22.7568 10.2716 22.7338 10.3867 22.6895 10.4937C22.6451 10.6006 22.58 10.698 22.498 10.7798L17.8105 15.4673C17.6452 15.6325 17.4212 15.7251 17.1875 15.7251C16.9538 15.7251 16.7298 15.6325 16.5645 15.4673C16.3991 15.3019 16.3057 15.0771 16.3057 14.8433C16.3058 14.6096 16.3992 14.3855 16.5645 14.2202L19.748 11.0376H12.5C10.2482 11.0402 8.08938 11.9356 6.49707 13.5278C4.90472 15.1202 4.00841 17.2798 4.00586 19.5317C4.00572 19.7653 3.91319 19.9896 3.74805 20.1548C3.58281 20.3199 3.35859 20.4126 3.125 20.4126C2.89141 20.4126 2.66719 20.3199 2.50195 20.1548C2.33669 19.9895 2.24414 19.7645 2.24414 19.5308C2.2471 16.8117 3.32828 14.2044 5.25098 12.2817C7.17373 10.3591 9.78089 9.27777 12.5 9.2749H19.748L16.5645 6.09229C16.4826 6.01043 16.4174 5.91309 16.373 5.80615C16.3287 5.69918 16.3057 5.58405 16.3057 5.46826C16.3057 5.35263 16.3288 5.23818 16.373 5.13135C16.4174 5.02438 16.4826 4.92709 16.5645 4.84521C16.7298 4.68 16.9538 4.5874 17.1875 4.5874Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.2"
          />
        </svg>
      </span>
    </a>
  );
}
