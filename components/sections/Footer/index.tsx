import type { FooterSection } from "@/lib/sections/types";
import { FooterDefault } from "./Default";

type FooterProps = { section: FooterSection };

export function Footer({ section }: FooterProps) {
  switch (section.frontEndComponent) {
    case "Default":
      return <FooterDefault section={section} />;
    default:
      return <FooterDefault section={section} />;
  }
}
