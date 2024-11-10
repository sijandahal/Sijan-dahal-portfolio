import Bounded from "@/components/Bounded";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Social`.
 */
export type SocialProps = SliceComponentProps<Content.SocialSlice>;

/**
 * Component for "Social" Slices.
 */
const Social = ({ slice }: SocialProps): JSX.Element => {
  return (

      <div className="block shareButtons float-right clear-right fixed flex-col top-56 z-20 text-left transition-all right-0 ">
        {slice.primary.sociallist.map((item, index) => (
          <>
          <div key={index} className="skills__wrap  main__wrap flex items-center gap-3 bg-[#f7f7f7] w-10 h-10  2xl:w-14 2xl:h-14 shareButton float-right clear-right transition ease-in duration-200 border-none  cursor-pointer  text-xl  mb-0 opacity-100 overflow-hidden p-[10px] relative text-left align-top whitespace-nowrap color-white ">
              <div className="wrapper__text ">
                <div className="image__wrapper w-6 h-6 2xl:w-8 2xl:h-8">
            <PrismicRichText field={item.rich_text}  />   
            </div>       
              </div>
              <div className="link__text transition ease-in duration-200 text-black inline-block font-medium left-[-35px] tracking-wide opacity-0 px-1.5 relative align-middle ml-3 text-sm">
            <PrismicNextLink field={item.link}  />
            </div>
            </div>
            </>
        ))}
      </div>

  );
};

export default Social;
