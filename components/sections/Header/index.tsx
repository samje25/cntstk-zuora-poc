import type { HeaderSection } from "@/lib/sections/types";
import { HeaderDefault } from "./Default";

type HeaderProps = { section: HeaderSection };

export function Header({ section }: HeaderProps) {
  switch (section.frontEndComponent) {
    case "Default":
      return <HeaderDefault section={section} />;
    default:
      return <HeaderDefault section={section} />;
  }
}
