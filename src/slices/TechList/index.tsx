"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PropTypes from 'prop-types';
// import Heading from '@/components/Heading'; // Assuming Heading is a custom component
import Bounded from '@/components/Bounded'; // Assuming Bounded is a custom component
import { Content } from '@prismicio/client';
import { BsCodeSlash } from "react-icons/bs";


// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TechListSlice = ({ slice }: { slice: Content.TechListSlice }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Create GSAP Timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: componentRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 4,
      },
    });

    tl.fromTo(
      '.tech-row',
      {
        x: (index: number) => (index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)),
      },
      {
        x: (index: number) => (index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)),
        ease: 'power1.inOut',
      }
    );
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={componentRef}
    >

      {slice.primary.item.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || undefined}
        >
       {Array.from({ length: 15 }).map((_, index) => {
  const techStackArray = tech_name.split(","); 
  return (
    <>
      {techStackArray.map((tech, idx) => (
        <span
          key={`${index}-${idx}`} 
          className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
          style={{ color: index === 7 && tech_color ? tech_color : "inherit" }}
        >
          {tech.trim()} 
        </span>
      ))}
      {index !== 14 && <span className="mx-2"> </span>}
    </>
  );
})}

        </div>
      ))}
    </section>
  );
};

TechListSlice.propTypes = {
  slice: PropTypes.shape({
    slice_type: PropTypes.string.isRequired,
    variation: PropTypes.string.isRequired,
    primary: PropTypes.shape({
      heading: PropTypes.string.isRequired,
      item: PropTypes.arrayOf(
        PropTypes.shape({
          tech_color: PropTypes.string.isRequired, // Assuming tech_color is a string
          tech_name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default TechListSlice;
