"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Content, LinkField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  // Create a ref for the desktop navigation items
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (navItemsRef.current.length > 0) {
      
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -20 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2, // delay between each item
          ease: "power3.out",
        }
      );
    }
  }, [settings]);

  const isLinkField = (link: any): link is LinkField => link?.url !== undefined;

  const isActive = (link: string | LinkField) => {
    if (isLinkField(link)) {
      return pathname === asLink(link) || pathname.includes(asLink(link) as string);
    }
    // Handle string-based link comparison directly
    return pathname === link || pathname.includes(link);
  };

  return (
    <nav className="md:py-6 px-4 py-4 md:px-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between logo__wrapper">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <Logo />
            <span className="sr-only">Home Page</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        
        {/* Mobile Nav */}
        <div
          className={clsx(
            "gap-4 fixed bottom-0 left-0 right-0 top-0 z-40  flex-col items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden flex",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              const active = isActive(item.link); // Check if the link is active
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  key={item.label}
                  className={clsx("block px-3 text-3xl first:mt-8 hover:text-yellow-500 transition-colors", active && "text-yellow-500")} // Highlight active item
                  field={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item, index) => {
            const active = isActive(item.link); // Check if the link is active
            return (
              <li
              key={item.label}
              ref={(el) => {
                if (el) {
                  navItemsRef.current[index] = el; 
                }
              }}
            >
                {item.cta_button ? (
                  <ButtonLink
                    field={item.link}
                    aria-current={active ? "page" : undefined}
                    className={active ? "text-yellow-500" : ""} // Highlight active item
                  >
                    {item.label}
                  </ButtonLink>
                ) : (
                  <PrismicNextLink
                    field={item.link}
                    className={clsx("inline-flex min-h-11 items-center hover:text-yellow-500 transition-colors", active && "text-yellow-500")} // Highlight active item
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </PrismicNextLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
