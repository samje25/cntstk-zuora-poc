import { NOTIFICATION_FRAGMENT } from "@/lib/contentstack/graphql/fragments/notification";
import { Notification } from "@/components/sections/Notification";
import { cslpPrefixFrom, type CslpSystem } from "../cslp";
import type { RawSectionNode, SectionDefinition } from "../config";
import type { NotificationSection } from "../types";

type RawNotification = RawSectionNode & {
  system?: CslpSystem;
  front_end_component?: string | null;
  message?: string | null;
  link?: { href?: string | null } | null;
};

const transformNotification = (node: RawSectionNode): NotificationSection => {
  const raw = node as RawNotification;

  return {
    id: raw.system?.uid ?? "notification",
    type: "notification",
    cslpPrefix: cslpPrefixFrom(raw.system),
    frontEndComponent: raw.front_end_component ?? "Default",
    message: raw.message?.trim() || null,
    href: raw.link?.href || null,
  };
};

export const notificationDefinition: SectionDefinition = {
  contentstackTypename: "Notification",
  type: "notification",
  fragment: NOTIFICATION_FRAGMENT,
  fragmentName: "NotificationFields",
  transform: transformNotification,
  render: (section) => <Notification section={section as NotificationSection} />,
};
