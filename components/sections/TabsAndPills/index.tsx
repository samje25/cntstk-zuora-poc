import type { TabsAndPillsSection } from "@/lib/sections/types";
import { ScrollingTabs } from "./ScrollingTabs";
import { TabSlider } from "./TabSlider";

type TabsAndPillsProps = { section: TabsAndPillsSection };

export function TabsAndPills({ section }: TabsAndPillsProps) {
  switch (section.frontEndComponent) {
    case "Scrolling Tabs":
      return <ScrollingTabs section={section} />;
    case "Tab Slider":
      return <TabSlider section={section} />;
    default:
      return <ScrollingTabs section={section} />;
  }
}
