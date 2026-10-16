/**
 * Feature Cards section (`feature_cards` content type → GraphQL `FeatureCards`).
 * Variant is routed on `front_end_component` in components/sections/FeatureCards.
 */
const FILE = /* GraphQL */ `
  edges {
    node {
      url
      dimension {
        width
        height
      }
    }
  }
`;

export const FEATURE_CARDS_FRAGMENT = /* GraphQL */ `
  fragment FeatureCardsFields on FeatureCards {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    heading
    cta_prefix
    cta_link {
      title
      href
    }
    cards {
      heading
      body
      image_alt
      iconConnection { ${FILE} }
      imageConnection { ${FILE} }
    }
  }
`;
