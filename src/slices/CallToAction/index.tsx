import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps, PrismicRichText } from "@prismicio/react";
import PlainLogo from "./PlainLogo";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" />

      {/* <div className="glass-container rounded-lg mr-auto bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:rounded-xl">
        <PlainLogo />
      </div> */}

      <div className="text-balance text-left text-5xl font-medium md:text-7xl block w-full">
        <PrismicText field={slice.primary.heading} />
      </div>
      <div className="hero__body mt-6 md:mt-16 max-w-7xl text-balance text-slate-300  lg:text-lg">

    <PrismicRichText field={slice.primary.description} />
      </div>
    <div className="m-auto w-full">
      <button className="mt-6 relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-15 focus:ring-2">
        <a href="mailto:dahalsijan7@gmail.com">Say Hello</a>
      </button>
    </div>
    </Bounded>
  );
};

export default CallToAction;