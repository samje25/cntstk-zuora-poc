/**
 * Sliders section (`sliders` content type → GraphQL `Sliders`).
 * Variant is routed on `front_end_component` in components/sections/Sliders.
 */
export const SLIDERS_FRAGMENT = /* GraphQL */ `
  fragment SlidersFields on Sliders {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    heading
    slides {
      quote
      speaker
      image_alt
      link {
        title
        href
      }
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
