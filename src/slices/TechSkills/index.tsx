import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TechSkills`.
 */
export type TechSkillsProps = SliceComponentProps<Content.TechSkillsSlice>;

/**
 * Component for "TechSkills" Slices.
 */
const TechSkills = ({ slice }: TechSkillsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for tech_skills (variation: {slice.variation})
      Slices
    </section>
  );
};

export default TechSkills;
