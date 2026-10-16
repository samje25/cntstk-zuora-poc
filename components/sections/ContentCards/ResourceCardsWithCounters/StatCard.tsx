import { cslpTag } from "@/lib/sections/cslp";
import type { ContentCard } from "@/lib/sections/types";

type StatCardProps = {
  card: ContentCard;
  /** Item-scoped Live Preview base, e.g. `content_cards.blt…en-us.cards.0`. */
  cslp: string | null;
  /** Slider's current card: dark tab + white label (zuora.com `.is-active`). */
  active?: boolean;
};

const PANEL =
  "absolute top-0 flex h-full w-[230px] flex-col overflow-hidden rounded-[8px] border border-[color:var(--zuora-greys-300)] bg-[var(--zuora-white)] px-6 pt-6 shadow-[0_4px_28px_0_rgba(210,222,231,0.5)] group-data-[active=true]/scard:shadow-none group-[:hover]/scard:shadow-none min-[767px]:w-[260px]";

/**
 * zuora.com `.SurveyCard`: a white stat panel over a second panel whose edge
 * shows as a "Read the Report" tab; on hover the back panel slides out 10px
 * and turns forest green.
 */
export function StatCard({ card, cslp, active = false }: StatCardProps) {
  const content = (
    <div
      data-active={active}
      className="group/scard relative flex min-h-[340px] w-[260px] max-w-full cursor-pointer flex-col justify-center text-[var(--zuora-black)] min-[767px]:w-[290px]"
    >
      <div
        className={`${PANEL} left-0 z-[1] border-l-8 border-l-[color:var(--zuora-teal)] [transition:box-shadow_0.5s_ease]`}
      >
        {card.heading && (
          <h3
            className="m-0 font-[family-name:var(--font-ibm-plex-serif)] text-[60px] leading-[1.5] font-medium not-italic"
            data-cslp={cslpTag(cslp, "heading")}
          >
            {card.heading}
          </h3>
        )}
        {card.body && (
          <div data-cslp={cslpTag(cslp, "body")}>
            <p
              className="mt-0 mb-[14.4px] font-[family-name:var(--font-ibm-plex-serif)] text-base leading-[1.5] font-medium"
              dangerouslySetInnerHTML={{ __html: card.body }}
            />
          </div>
        )}
        {card.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image.url}
            alt={card.image.alt}
            width={card.image.width ?? undefined}
            height={card.image.height ?? undefined}
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 mt-auto h-[100px] max-w-[200px] self-center"
            data-cslp={cslpTag(cslp, "image")}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className={`${PANEL} right-0 items-end [transition:background-color_0.5s_ease,right_0.5s_ease] group-data-[active=true]/scard:bg-[var(--zuora-forest)] group-[:hover]/scard:right-[-10px] group-[:hover]/scard:bg-[var(--zuora-forest)]`}
      />
      {card.linkLabel && (
        <span
          className="absolute top-0 right-[5px] bottom-[10px] flex items-center justify-end font-[family-name:var(--font-founders-grotesk)] text-base leading-none font-medium text-[var(--zuora-greys-500)] [transition:color_0.5s_ease,right_0.5s_ease] [writing-mode:vertical-rl] group-data-[active=true]/scard:text-[var(--zuora-white)] group-[:hover]/scard:right-[3px] group-[:hover]/scard:text-[var(--zuora-white)]"
          data-cslp={cslpTag(cslp, "link")}
        >
          {card.linkLabel}
        </span>
      )}
    </div>
  );

  return card.href ? (
    <a href={card.href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
