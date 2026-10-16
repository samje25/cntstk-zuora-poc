import type { NotificationSection } from "@/lib/sections/types";
import { NotificationDefault } from "./Default";

type NotificationProps = { section: NotificationSection };

export function Notification({ section }: NotificationProps) {
  switch (section.frontEndComponent) {
    case "Default":
      return <NotificationDefault section={section} />;
    default:
      return <NotificationDefault section={section} />;
  }
}
