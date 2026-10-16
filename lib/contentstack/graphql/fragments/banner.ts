/**
 * Banner section (`banner` content type → GraphQL `Banner`).
 * Variant is routed on `front_end_component` in components/sections/Banner.
 */
export const BANNER_FRAGMENT = /* GraphQL */ `
  fragment BannerFields on Banner {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    heading
    ctas {
      link {
        title
        href
      }
      style
    }
    desktop_videoConnection {
      edges {
        node {
          url
          content_type
        }
      }
    }
    mobile_imageConnection {
      edges {
        node {
          url
          title
          dimension {
            width
            height
          }
        }
      }
    }
  }
`;
