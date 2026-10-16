export type ImageAsset = {
  url: string | null;
  title?: string | null;
};

export type SeoFaq = {
  question: string | null;
  answer: string | null;
};

export type SeoEntry = {
  uid?: string;
  /** Internal title of the SEO entry. */
  title?: string | null;

  // Core meta
  /** The <title> tag; falls back to the page title when null. */
  metaTitle?: string | null;
  description?: string | null;
  /** Comma-separated keywords / focus terms. */
  keywords?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;

  // Open Graph
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: ImageAsset | null;
  /** website | article | product | profile */
  ogType?: string | null;

  // Twitter / X
  /** summary | summary_large_image */
  twitterCard?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: ImageAsset | null;

  // AEO (Answer Engine Optimization)
  /** Concise direct answer to the page's core question. */
  shortAnswer?: string | null;
  /** Newline-separated summary points. */
  keyTakeaways?: string | null;
  /** Primary entity/topic the page is about. */
  primaryEntity?: string | null;
  /** LLM-optimized page summary. */
  aiSummary?: string | null;
  /** Comma-separated CSS selectors for schema.org SpeakableSpecification. */
  speakableSelectors?: string | null;
  /** Q&A pairs, rendered as FAQPage JSON-LD. */
  faqs?: SeoFaq[] | null;

  /** Raw JSON string from the SEO `schema_markup` field; parse before use. */
  schemaMarkup?: string | null;
};

/**
 * Every concrete section extends BaseSection and sets a unique `type` literal.
 * Add your section types to the `Section` union below as you build them out.
 * See `components/ARCHITECTURE.md` for the full pattern.
 *
 * `id` is the entry's `system.uid` (each section's fragment should select
 * `system { uid locale content_type_uid }` and map it through here) so React
 * keys stay stable and Live Preview edit tags can be built.
 */
export type BaseSection = {
  id: string;
  type: string;
  /**
   * Live Preview / Visual Builder edit-tag prefix:
   * `{content_type_uid}.{entry_uid}.{locale}`. Transforms compute it via
   * `cslpPrefixFrom(node.system)`; components append field paths with
   * `cslpTag()` to emit `data-cslp` attributes. Null when unavailable.
   */
  cslpPrefix?: string | null;
};

export type UnknownSection = BaseSection & {
  type: "unknown";
  raw: unknown;
};

export type BannerCta = {
  label: string;
  href: string;
  /** `style` dropdown on the `ctas` group. */
  style: "White" | "Teal";
};

export type BannerSection = BaseSection & {
  type: "banner";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  heading: string | null;
  ctas: BannerCta[];
  desktopVideo: { url: string; contentType: string | null } | null;
  mobileImage: {
    url: string;
    title: string | null;
    width: number | null;
    height: number | null;
  } | null;
};

export type ContentCard = {
  /** Small label above the card (Webinar Listing: "WEBINAR") + its icon. */
  eyebrow: string | null;
  eyebrowIcon: AssetImage | null;
  /** Card title / stat (Resource Cards with Counters: "95%"). */
  heading: string | null;
  /** Rich-text body as inline HTML (outer <p> unwrapped, paragraphs joined by "\n"). */
  body: string | null;
  href: string | null;
  /** `link.title`, e.g. "Read the Report". */
  linkLabel: string | null;
  image: {
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  } | null;
};

export type ContentCardsSection = BaseSection & {
  type: "contentCards";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  heading: string | null;
  /** Rich-text HTML. */
  description: string | null;
  backgroundImage: string | null;
  cards: ContentCard[];
};

export type Slide = {
  /** Rich-text quote as HTML (kept as <p> blocks). */
  quote: string | null;
  speaker: string | null;
  image: {
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  } | null;
  /** `link.title` is the CTA label (e.g. "Read Case study"). */
  link: { label: string | null; href: string } | null;
};

export type SlidersSection = BaseSection & {
  type: "sliders";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  heading: string | null;
  slides: Slide[];
};

export type AssetImage = {
  url: string;
  width: number | null;
  height: number | null;
};

/** Named overlap-image placements (zuora.com hard-codes one per card id). */
export type OverlapLayout =
  | "Top band"
  | "Bottom right compact"
  | "Bottom wide"
  | "Bottom right"
  | "Top right compact";

export type ScrollingTab = {
  label: string;
  /** In-page id of the tab's panel; the tab bar scrolls to it. */
  anchorId: string;
  icon: AssetImage | null;
  /** Rich-text HTML — Tab Slider tab text. */
  summary: string | null;
  heading: string | null;
  /** Rich-text HTML. */
  body: string | null;
  partnerLogo: (AssetImage & { alt: string }) | null;
  /** Rich-text HTML (e.g. "Up to <strong>4x Faster</strong> …"). */
  partnerStat: string | null;
  partnerLink: { label: string; href: string } | null;
  ctaPrefix: string | null;
  cta: { label: string; href: string } | null;
  backgroundImage: AssetImage | null;
  image: AssetImage | null;
  imageAlt: string;
  overlapImage: AssetImage | null;
  overlapLayout: OverlapLayout;
};

export type TabsAndPillsSection = BaseSection & {
  type: "tabsAndPills";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  heading: string | null;
  /** Rich-text HTML. */
  description: string | null;
  navIcon: AssetImage | null;
  /** Tab Slider: button under the panels. */
  ctaLink: { label: string; href: string } | null;
  /** Tab Slider: stop the 5s auto-advance. */
  disableAutoplay: boolean;
  tabs: ScrollingTab[];
};

export type FeatureCard = {
  heading: string | null;
  /** Rich-text HTML (one or more <p> blocks). */
  body: string | null;
  icon: AssetImage | null;
  image: AssetImage | null;
  imageAlt: string;
};

export type FeatureCardsSection = BaseSection & {
  type: "featureCards";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  heading: string | null;
  /** CTA lead-in (e.g. "Explore") + link whose title is the highlighted part. */
  ctaPrefix: string | null;
  cta: { label: string; href: string } | null;
  cards: FeatureCard[];
};

export type NotificationSection = BaseSection & {
  type: "notification";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  /** Rich-text HTML, a single line (bold parts render heavier). */
  message: string | null;
  href: string | null;
};

export type HeaderLink = {
  label: string;
  href: string;
  /** One-line summary under the title (Products menu). */
  description: string | null;
  /** Square SVG shown on a forest tile. */
  icon: string | null;
};

export type HeaderLinkGroup = {
  /** Small uppercase label; null when the CMS hides it. */
  kicker: string | null;
  /** Desktop grid columns for this group's links. */
  columns: number;
  links: HeaderLink[];
};

export type HeaderNavItem = {
  label: string;
  /** Desktop dropdown: link groups side by side (1 = stacked). */
  columns: number;
  groups: HeaderLinkGroup[];
};

export type HeaderCta = {
  label: string;
  href: string;
  style: "Dark" | "Light";
};

export type HeaderSection = BaseSection & {
  type: "header";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  logo: { url: string; alt: string } | null;
  logoHref: string;
  navItems: HeaderNavItem[];
  login: { label: string; href: string } | null;
  ctas: HeaderCta[];
};

export type FooterLink = { label: string; href: string };

export type FooterColumn = {
  heading: string;
  /** CSS `order` of the desktop column; mobile accordions keep list order. */
  desktopOrder: number;
  groups: { kicker: string | null; links: FooterLink[] }[];
};

export type FooterSection = BaseSection & {
  type: "footer";
  /** `front_end_component` dropdown value — the variant switch key. */
  frontEndComponent: string;
  regionLabel: string | null;
  /** Static region list; the entry's own locale is left out, as on zuora.com. */
  regions: { label: string; localeCode: string; flag: string | null; current: boolean }[];
  /** Rich-text HTML, outer <p> removed. */
  newsletterHtml: string | null;
  emailPlaceholder: string;
  submitLabel: string;
  errorMessage: string;
  errorDetail: string;
  successTitle: string;
  successMessage: string;
  socialHeading: string | null;
  socialLinks: (FooterLink & { icon: string | null })[];
  columns: FooterColumn[];
  copyright: string | null;
  legalLinks: FooterLink[];
  cookieLabel: string | null;
  backgroundLogo: string | null;
};

export type Section =
  | FooterSection
  | HeaderSection
  | NotificationSection
  | BannerSection
  | ContentCardsSection
  | SlidersSection
  | TabsAndPillsSection
  | FeatureCardsSection
  | UnknownSection;
