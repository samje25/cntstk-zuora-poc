/**
 * Notification section (`notification` content type → GraphQL `Notification`).
 * Variant is routed on `front_end_component` in components/sections/Notification.
 */
export const NOTIFICATION_FRAGMENT = /* GraphQL */ `
  fragment NotificationFields on Notification {
    system {
      uid
      locale
      content_type_uid
    }
    front_end_component
    message
    link {
      href
    }
  }
`;
