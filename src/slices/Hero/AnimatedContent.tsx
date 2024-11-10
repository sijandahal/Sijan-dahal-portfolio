"use client";
import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.HeroSlice;
}) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".img__wrapper__hero, .hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });


      tl.fromTo(
        ".img__wrapper__hero",
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 2 }, 
        "-=0.7"  // Overlap with the previous animation by 0.7 seconds
      );
      
      

      tl.fromTo(
        ".hero__heading",
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 2 }, 
        "-=0.7"  // Overlap with the previous animation by 0.7 seconds
      );

      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6",
      );

      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8",
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 1.3 },
        "+=0.3",
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1",
      );
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      {/* <StarGrid /> */}

      {isFilled.image(slice.primary.header_image) && (
         <div className="img__wrapper__hero h-28 w-28  lg:w-32 lg:h-32 2xl:h-36 2xl:w-36 rounded-full mb-7 2xl:mb-9 opacity-0">
         <PrismicNextImage field={slice.primary.header_image} className="rounded-full"/>
         </div>
      )}
     
      {isFilled.richText(slice.primary.heading) && (
        <h1 className="hero__heading text-balance text-5xl font-medium opacity-0 md:text-7xl mb-5 sm:mb-7">
          <PrismicText field={slice.primary.heading} />
        </h1>
      )}

      {isFilled.richText(slice.primary.body) && (
        <div className="hero__body mt-6 max-w-xl text-balance text-slate-300 opacity-0 lg:text-lg">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}
      {isFilled.link(slice.primary.button_link) && (
        <ButtonLink
          className="hero__button mt-5 md:mt-8 opacity-0"
          field={slice.primary.button_link}
        >
          {slice.primary.button_label}
        </ButtonLink>
      )}
      {isFilled.image(slice.primary.image) && (
        <div className="hero__image glass-container mt-16 w-fit opacity-0">
          <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" />
          <PrismicNextImage
            className="rounded-lg"
            field={slice.primary.image}
            priority
            sizes="100vw"
          />
        </div>
      )}
    </div>
  );
}