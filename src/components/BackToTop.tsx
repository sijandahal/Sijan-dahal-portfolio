"use client"
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null); // Create a reference for the button

  // Scroll event to show or hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // GSAP animation to fade in and slide up the button
  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        duration: 0.5,
        opacity: 1,
        y: 20,  // Slide up effect
        ease: "power2.out",
      });
    } else {
      gsap.to(buttonRef.current, {
        duration: 0.5,
        opacity: 0,
        y: 50,  
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  return (
    <>
     
           {isVisible && (
          <div ref={buttonRef}  
            className=" flex gap-3 h-5 w-28 md:h-11 md:w-32 fixed bottom-14 top-unset -right-4 justify-center items-center transition-all duration-300 cursor-pointer rounded-full  bg-white text-black m-2.5 p-4 rotate-[270deg]  hover:translate-y-[-3px]"  onClick={scrollToTop}
          >
            <div className=" text-xs md:text-sm">TO TOP</div>
            <div className="h-6 w-6 rotate-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="injected-svg"
                data-src="https://static.elfsight.com/icons/app-back-to-top-arrow-3.svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path d="m7.997 10 3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10l-3 .001V18h-2v-7.999L7.997 10z"></path>
              </svg>
            </div>
          </div>
      )}
    </>
  );
}
