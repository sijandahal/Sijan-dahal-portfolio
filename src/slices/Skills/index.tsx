"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Bounded from "@/components/Bounded";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import AnimatedContent from "../Showcase/AnimatedContent";

/**
 * Props for `Skills`.
 */
export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

const Skills = ({ slice }: SkillsProps): JSX.Element => {
  const skillsRef = useRef<HTMLDivElement[]>([]); // Ref array to hold all divs

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        const index = skillsRef.current.indexOf(target);
  
        if (entry.isIntersecting) {
          if (index === 0 || index === 2) {
            gsap.fromTo(
              target,
              { opacity: 0, x: -100 }, 
              { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: index * 0.2 } // Add delay based on index
            );
          }
  
          if (index === 1 || index === 3) {
            gsap.fromTo(
              target,
              { opacity: 0, x: 100 },
              { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: index * 0.2 } // Add delay based on index
            );
          }
        }
      });
    }, { threshold: 0.5 }); 
  
    // Attach the observer to each skill div
    skillsRef.current.forEach((div) => observer.observe(div));
  
    return () => {
      observer.disconnect(); // Clean up the observer
    };
  }, []);

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
      <AnimatedContent>
        <h2 className="text-balance text-5xl font-medium md:text-7xl text-left">
          {slice.primary.heading}
        </h2>
      </AnimatedContent>
      {/* Programming Wrapper */}
      <div className="flex gap-7">
        <div
          ref={(el) => { if (el) skillsRef.current.push(el); }} // Correct ref callback
          className="flex gap-5 mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm flex-col w-full"
        >
          <h2 className="text-2xl">Programming Language</h2>
          <div className="flex gap-7">
            {slice.primary.languages.map((item, index) => (
              <div key={index} className="max-w-xs">
                <PrismicNextImage field={item.image} className="w-24 h-24" />
                <h3 className="text-center mt-2">{item.heading}</h3>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={(el) => { if (el) skillsRef.current.push(el); }} // Correct ref callback
          className="flex gap-5 mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm flex-col w-full"
        >
          <h2 className="text-2xl">FrontEnd Technologies</h2>
          <div className="flex gap-7">
            {slice.primary.front_end.map((item, index) => (
              <div key={index} className="max-w-xs">
                <PrismicNextImage field={item.image} className="w-24 h-24" />
                <h3 className="text-center mt-2">{item.heading}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-7">
        <div
          ref={(el) => { if (el) skillsRef.current.push(el); }} // Correct ref callback
          className="flex gap-5 mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm flex-col w-full"
        >
          <h2 className="text-2xl">BackEnd</h2>
          <div className="flex gap-7">
            {slice.primary.back_end.map((item, index) => (
              <div key={index} className="max-w-xs">
                <PrismicNextImage field={item.image} className="w-24 h-24" />
                <h3 className="text-center mt-2">{item.heading}</h3>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={(el) => { if (el) skillsRef.current.push(el); }} // Correct ref callback
          className="flex gap-5 mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 md:px-8 md:py-8 px-4 py-4 backdrop-blur-sm flex-col w-full"
        >
          <h2 className="text-2xl">Database</h2>
          <div className="flex gap-7">
            {slice.primary.database.map((item, index) => (
              <div key={index} className="max-w-xs">
                <PrismicNextImage field={item.image} className="w-24 h-24" />
                <h3 className="text-center mt-2">{item.heading}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Skills;
