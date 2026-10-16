/**
 * Contentstack Live Preview / Visual Builder edit tags.
 *
 * A `data-cslp` attribute of the form
 * `{content_type_uid}.{entry_uid}.{locale}.{field_path}` binds a rendered
 * element to the CMS field that produced it, enabling click-to-edit in the
 * Visual Experience tab. Group fields use dotted indices, e.g.
 * `related_post.blt123.en-us.featured_posts.0.heading`.
 *
 * `cslpTag` returns `undefined` when the section has no prefix (e.g. entries
 * fetched without system metadata), which makes React omit the attribute.
 */
export const cslpTag = (
  prefix: string | null | undefined,
  fieldPath: string
): string | undefined => (prefix ? `${prefix}.${fieldPath}` : undefined);

/** Raw `system` selection shape shared by all section fragments. */
export type CslpSystem = {
  uid?: string | null;
  locale?: string | null;
  content_type_uid?: string | null;
} | null;

/** Builds the `{ct}.{uid}.{locale}` prefix from a fragment's `system` node. */
export const cslpPrefixFrom = (system: CslpSystem | undefined): string | null =>
  system?.uid && system.locale && system.content_type_uid
    ? `${system.content_type_uid}.${system.uid}.${system.locale}`
    : null;
