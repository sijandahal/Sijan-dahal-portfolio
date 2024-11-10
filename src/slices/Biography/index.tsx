"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Content } from "@prismicio/client";
import ButtonLink from "@/components/ButtonLink";
import { PrismicRichText } from "@prismicio/react";
import Bounded from '@/components/Bounded';
import PropTypes from 'prop-types';
import { PrismicNextImage } from '@prismicio/next';

export default function BiographySlice({ slice }: any) {
  const leftWrapperRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const imageRef = useRef(null);  // Reference to the image for hover animation

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Left Wrapper (slides from left)
    tl.fromTo(
      leftWrapperRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2 },
    );

    
    tl.fromTo(
      rightWrapperRef.current,
      { x: 100, opacity: 0 }, // Start from right with opacity 0
      { x: 0, opacity: 1, duration: 2 },
      "-=0.15"
    );
  }, []);

  // Hover animation for the image with scaling and tilt effect
  const handleHoverIn = () => {
    gsap.to(imageRef.current, {
      scale: 1.04, // Zoom in effect
      rotationX: 2, // Tilt the image on X axis (upward)
      rotationY: -2, // Tilt the image on Y axis (to the left)
      duration: 0.5, // Duration for the hover-in effect
      ease: "power2.out", // Smooth easing
      transformOrigin: "center center", // Set the origin of the transform to center
    });
  };

  const handleHoverOut = () => {
    gsap.to(imageRef.current, {
      scale: 1, // Reset the scale to normal
      rotationX: 0, // Reset the X-axis tilt
      rotationY: 0, // Reset the Y-axis tilt
      duration: 0.5, // Duration for the hover-out effect
      ease: "power2.in", // Smooth easing for the reset effect
      transformOrigin: "center center", // Ensure the reset happens around the center of the image
    });
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex gap-5 md:gap-14 flex-wrap md:flex-nowrap flex-col-reverse md:flex-row">
          <div className="md:basis-8/12 left__wrapper" ref={leftWrapperRef}>
            <h1 className="font-bold leading-tight tracking-tight text-5xl mb-7 md:text-7xl">
              {slice.primary.heading}
            </h1>
            <div className=" hero__body mt-6 max-w-2xl text-balance text-slate-300 lg:text-lg">
              <PrismicRichText field={slice.primary.description} />
            </div>
            <ButtonLink
              field={slice.primary.button_link}
              className="mt-6"
              onMouseEnter={handleHoverIn} // Trigger hover-in animation
              onMouseLeave={handleHoverOut} // Trigger hover-out animation
            >
              {slice.primary.button_text || "More About Me"}
            </ButtonLink>
          </div>

          {/* Right Column with Image */}
          <div
            className="image__wrapper__right md:basis-4/12 w-8/12 md:w-full"
            ref={rightWrapperRef}
          >
            <div
              ref={imageRef}
              className="image__wrapper__right md:basis-4/12  md:w-full md:h-full h-28 w-28"
            >
              <PrismicNextImage
                field={slice.primary.avatar}
                className="highlight w-full bg-gradient-to-tr from-transparent rounded-full "
              // Attach imageRef to PrismicNextImage
              />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}

BiographySlice.propTypes = {
  slice: PropTypes.shape({
    slice_type: PropTypes.string.isRequired,
    variation: PropTypes.string.isRequired,
    primary: PropTypes.shape({
      heading: PropTypes.string.isRequired,
      description: PropTypes.array.isRequired,
      button_link: PropTypes.object.isRequired,
      button_text: PropTypes.string,
      avatar: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
