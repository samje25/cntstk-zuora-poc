import type { SlidersSection } from "@/lib/sections/types";
import { TestimonialSlider } from "./TestimonialSlider";

type SlidersProps = { section: SlidersSection };

export function Sliders({ section }: SlidersProps) {
  switch (section.frontEndComponent) {
    case "Testimonial Slider":
      return <TestimonialSlider section={section} />;
    default:
      return <TestimonialSlider section={section} />;
  }
}
