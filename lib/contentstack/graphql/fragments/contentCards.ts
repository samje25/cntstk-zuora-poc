/**
 * Content Cards section (`content_cards` content type → GraphQL `ContentCards`).
 * Variant is routed on `front_end_component` in components/sections/ContentCards.
 */
export const CONTENT_CARDS_FRAGMENT = /* GraphQL */ `
  fragment ContentCardsFields on ContentCards {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    heading
    description
    background_imageConnection {
      edges {
        node {
          url
        }
      }
    }
    cards {
      eyebrow
      eyebrow_iconConnection {
        edges {
          node {
            url
            dimension {
              width
              height
            }
          }
        }
      }
      heading
      body
      link {
        title
        href
      }
      image_alt
      imageConnection {
        edges {
          node {
            url
            dimension {
              width
              height
            }
          }
        }
      }
    }
  }
`;
