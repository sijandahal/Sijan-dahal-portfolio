import Bounded from "@/components/Bounded";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import AnimatedContent from "../Showcase/AnimatedContent";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative">
        <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
        <AnimatedContent>
      <h2 className="text-balance text-5xl font-medium md:text-7xl text-left">
        {slice.primary.heading}
      </h2>
        </AnimatedContent>
      <div className="">
        {slice.primary.item?.map((item, index) => (
          <div key={index} className="mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm  max-w-5xl">
            <div className=" flex-wrap md:flex-nowrap flex items-center gap-3 md:gap-6">
              <h2 className="text-2xl">
                {item.title}
              </h2> <span className="text-slate-400 flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-3 text-sm ">
                {item.tech_stacks
                  .split(',') 
                  .map((tech, index) => (
                    <span key={index} className="relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-3 py-1 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-15 focus:ring-2 gap-3">
                      {tech.trim()}
                    </span>
                  ))}
              </span>
            </div>



            <div className=" mt-2 mb-2 text-blue-200 company__wrapper">
              <PrismicNextLink field={item.company_link}  className="relative"/>          </div>

            <div>
              <PrismicRichText field={slice.primary.time_period} />
            </div>
            <div className="list-disc mt-4 company__desc">
            <PrismicRichText field={slice.primary.description} />
              </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Experience;
