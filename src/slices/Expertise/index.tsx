import Bounded from "@/components/Bounded";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import AnimatedContent from "../Showcase/AnimatedContent";
/**
 * Props for `Expertise`.
 */
export type ExpertiseProps = SliceComponentProps<Content.ExpertiseSlice>;

/**
 * Component for "Expertise" Slices.
 */
const Expertise = ({ slice }: ExpertiseProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative">
    <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
    <AnimatedContent>
      <h2 className="text-balance text-5xl font-medium md:text-7xl text-left">
        {slice.primary.heading}
      </h2>
    </AnimatedContent>
    {/* Programming Wrapper */}
    <div className="">
      <div className="flex mt-16 rounded-xl backdrop-blur-sm flex-col w-full">
        <div className="flex md:flex-nowrap flex-wrap md:gap-0 gap-8">
          {slice.primary.expertise_group.map((item, index) => (
            <>
            <div key = {index} className=" w-full md:w-4/12 flex gap-3 flex-col border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 md:px-8 md:py-8 rounded-md md:rounded-none">
              <div className="wrapper flex flex-row-reverse justify-end gap-5 items-center ">
              <h3 className="text-xl font-bold">{item.expertise_title}</h3>
              <PrismicNextImage field={item.image} className="w-11 h-11" />
            </div>
            <div className="desc__expertise lg:pl-16">
            <PrismicRichText field={item.description} />
            </div>
            </div>
              </>
          ))}
        </div>

      </div>

    </div>

    {/* <div className="">
      {slice.primary.languages.map((item, index) => (
        <div key={index} className="mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm  max-w-5xl">
          <div className=" flex-wrap md:flex-nowrap flex items-center gap-3 md:gap-6">
            <h2 className="text-2xl">
              {item.heading}
            </h2> 
            <span className="text-slate-400 flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-3 text-sm ">
            <PrismicNextImage field={item.image} />
            </span>
          </div>

        </div>
      ))}
    </div> */}
  </Bounded>
  );
};

export default Expertise;
