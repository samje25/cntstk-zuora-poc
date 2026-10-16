/**
 * Header section (`header` content type → GraphQL `Header`).
 * Variant is routed on `front_end_component` in components/sections/Header.
 */
export const HEADER_FRAGMENT = /* GraphQL */ `
  fragment HeaderFields on Header {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    logoConnection {
      edges {
        node {
          url
          title
        }
      }
    }
    logo_link {
      title
      href
    }
    nav_items {
      label
      columns
      groups {
        kicker
        hide_kicker
        columns
        links {
          link {
            title
            href
          }
          description
          iconConnection {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
    login {
      title
      href
    }
    ctas {
      link {
        title
        href
      }
      style
    }
  }
`;
