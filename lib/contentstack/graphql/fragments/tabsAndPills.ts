/**
 * Tabs and Pills section (`tabs_and_pills` content type → GraphQL `TabsAndPills`).
 * Variant is routed on `front_end_component` in components/sections/TabsAndPills.
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

export const TABS_AND_PILLS_FRAGMENT = /* GraphQL */ `
  fragment TabsAndPillsFields on TabsAndPills {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    heading
    description
    nav_iconConnection { ${FILE} }
    cta_link {
      title
      href
    }
    disable_autoplay
    tabs {
      tab_label
      anchor_id
      tab_summary
      heading
      body
      partner_logo_alt
      partner_stat
      partner_link {
        title
        href
      }
      cta_prefix
      cta_link {
        title
        href
      }
      overlap_layout
      image_alt
      tab_iconConnection { ${FILE} }
      partner_logoConnection { ${FILE} }
      background_imageConnection { ${FILE} }
      imageConnection { ${FILE} }
      overlap_imageConnection { ${FILE} }
    }
  }
`;
