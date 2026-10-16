import { cslpTag } from "@/lib/sections/cslp";
import type { NotificationSection } from "@/lib/sections/types";

type NotificationDefaultProps = { section: NotificationSection };

const ARROW_PATH =
  "M19.7364 9.4238L15.6114 13.5488C15.4824 13.6778 15.3074 13.7503 15.125 13.7503C14.9426 13.7503 14.7676 13.6778 14.6386 13.5488C14.5096 13.4198 14.4371 13.2448 14.4371 13.0624C14.4371 12.88 14.5096 12.705 14.6386 12.576L17.5905 9.62489H11C8.995 9.62717 7.07277 10.4247 5.65502 11.8424C4.23727 13.2602 3.43977 15.1824 3.4375 17.1874C3.4375 17.3697 3.36507 17.5446 3.23614 17.6735C3.1072 17.8025 2.93234 17.8749 2.75 17.8749C2.56766 17.8749 2.3928 17.8025 2.26386 17.6735C2.13493 17.5446 2.0625 17.3697 2.0625 17.1874C2.065 14.8178 3.00743 12.546 4.683 10.8704C6.35856 9.19483 8.6304 8.2524 11 8.24989H17.5905L14.6386 5.2988C14.5747 5.23492 14.524 5.15909 14.4895 5.07564C14.4549 4.99218 14.4371 4.90273 14.4371 4.81239C14.4371 4.72206 14.4549 4.63261 14.4895 4.54915C14.524 4.46569 14.5747 4.38986 14.6386 4.32599C14.7676 4.19698 14.9426 4.12451 15.125 4.12451C15.2153 4.12451 15.3048 4.1423 15.3882 4.17687C15.4717 4.21144 15.5475 4.26211 15.6114 4.32599L19.7364 8.45099C19.8003 8.51484 19.851 8.59066 19.8856 8.67412C19.9202 8.75758 19.938 8.84705 19.938 8.93739C19.938 9.02774 19.9202 9.1172 19.8856 9.20067C19.851 9.28413 19.8003 9.35995 19.7364 9.4238Z";

const SHAPE = "pointer-events-none absolute inset-0 -z-[1] h-full w-full";
const SHAPE_PATH =
  "fill-[var(--zuora-white)] [transition:fill_0.5s_ease] group-[:hover]/nb:fill-[var(--zuora-teal)]";
const TRACK =
  "inline-flex flex-none items-center whitespace-nowrap after:inline-block after:content-[''] max-[768px]:after:w-14 [&_p]:m-0 [&_p]:font-[family-name:var(--font-founders-grotesk-mono)] [&_p]:text-[12px] [&_p]:leading-[1.5] [&_p]:font-medium [&_p]:whitespace-nowrap";

/**
 * zuora.com "Global Banner": a tab-shaped pill pinned just under the site
 * header (`--site-header-offset`), overlapping the next section. The shape
 * turns teal on hover; below 767px it's 300×37 and the line scrolls as a
 * marquee (two copies, `z-banner-marquee-loop` in globals.css). CSS only.
 */
export function NotificationDefault({ section }: NotificationDefaultProps) {
  const { cslpPrefix, message, href } = section;
  if (!message) return null;

  return (
    <div className="relative flex w-full flex-row items-center justify-center bg-transparent">
      <div className="absolute top-[var(--site-header-offset)] z-[1] h-10 w-fit max-[768px]:h-[37px] max-[768px]:w-[300px]">
        <a
          href={href ?? undefined}
          className="group/nb relative flex h-full w-full cursor-pointer flex-row items-stretch justify-center overflow-hidden text-[var(--zuora-black)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="656"
            height="41"
            viewBox="0 0 656 41"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className={`${SHAPE} hidden min-[767px]:block`}
          >
            <path
              d="M9.2622 26.7161L0.689545 0.5H654.69L646.117 26.7161C643.428 34.9383 635.758 40.5 627.107 40.5H28.2717C19.621 40.5 11.9509 34.9383 9.2622 26.7161Z"
              stroke="#103426"
              className={SHAPE_PATH}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="37"
            viewBox="0 0 332 41"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className={`${SHAPE} block min-[767px]:hidden`}
          >
            <path
              d="M4.42659 23.756L0.589355 0.5H330.589L326.752 23.756C325.158 33.4144 316.808 40.5 307.019 40.5H24.1598C14.3707 40.5 6.02024 33.4144 4.42659 23.756Z"
              stroke="#103426"
              className={SHAPE_PATH}
            />
          </svg>

          <div className="relative z-[1] flex h-full w-full min-w-0 flex-row items-stretch justify-center pl-2 min-[767px]:pl-0">
            <div className="flex min-w-0 flex-auto items-center justify-center overflow-hidden border-r-[0.5px] border-[color:var(--zuora-black)] p-2 min-[767px]:px-6">
              <div className="flex max-w-max items-center leading-none uppercase max-[768px]:animate-[z-banner-marquee-loop_12s_linear_infinite]">
                <div
                  className={TRACK}
                  data-cslp={cslpTag(cslpPrefix, "message")}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
                <div
                  aria-hidden="true"
                  className={`${TRACK} min-[767px]:hidden`}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              </div>
            </div>
            <div className="flex flex-none items-center justify-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d={ARROW_PATH} fill="black" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
