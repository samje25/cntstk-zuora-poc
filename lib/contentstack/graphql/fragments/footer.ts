/**
 * Footer section (`footer` content type → GraphQL `Footer`).
 * Variant is routed on `front_end_component` in components/sections/Footer.
 */
const FILE_URL = /* GraphQL */ `
  edges {
    node {
      url
    }
  }
`;

export const FOOTER_FRAGMENT = /* GraphQL */ `
  fragment FooterFields on Footer {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    region_label
    regions {
      label
      locale_code
      flagConnection { ${FILE_URL} }
    }
    newsletter_text
    email_placeholder
    submit_label
    error_message
    error_detail
    success_title
    success_message
    social_heading
    social_links {
      link {
        title
        href
      }
      iconConnection { ${FILE_URL} }
    }
    columns {
      heading
      desktop_order
      groups {
        kicker
        links {
          link {
            title
            href
          }
        }
      }
    }
    copyright
    legal_links {
      link {
        title
        href
      }
    }
    cookie_label
    background_logoConnection { ${FILE_URL} }
  }
`;
