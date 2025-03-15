"use client";

import Image from "next/image";
import Link from "next/link";
import { FullWidthContainer } from "@app/components/FullWidthContainer";
import { useColors } from "@app/context/ColorContext";

const Footer = () => {
  const { footerColor } = useColors();
  console.log("Footer color:", footerColor);

  const links = [
    { label: "Hjem", href: "/" },
    { label: "Studenter", href: "/students" },
    { label: "Alumni", href: "/alumni" },
    { label: "Studieprogram", href: "/program" },
    { label: "Om oss", href: "/about" },
    { label: "Kontakt", href: "/contact" },
    { label: "Søk", href: "/sok", isButton: true },
  ];

  const FacebookIcon = ({ width = 24, height = 24, className = "" }) => (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
    </svg>
  );

  const LinkedInIcon = ({ width = 24, height = 24, className = "" }) => (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const YoutubeIcon = ({ width = 24, height = 24, className = "" }) => (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );

  return (
    <FullWidthContainer bgColor={footerColor}>
      <footer className={`${footerColor} px-4 sm:px-6 py-8 sm:py-10`}>
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo & Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start pb-6 border-b border-gray-300">
            {/* Logo */}
            <div className="mb-6 md:mb-0">
              <Image
                src="/NSE.png"
                alt="NSE Logo"
                width={140}
                height={45}
                className="sm:w-[180px]"
                priority
              />
            </div>

            {/* Navigation */}
            <nav className="w-full md:w-auto" aria-label="Footer Navigation">
              <ul className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 lg:gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${
                        link.isButton
                          ? "bg-[#FF5F15] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-orange-600 text-sm sm:text-base"
                          : footerColor === "bg-[#0B3B8F]"
                            ? "text-white hover:text-gray-200 text-sm sm:text-base"
                            : "text-gray-600 hover:text-gray-900 text-sm sm:text-base"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Section - Contact & Socials */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
            {/* Contact */}
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold text-sm sm:text-base mb-2">
                Kontakt
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                +47 73 59 36 09
              </p>
              <Link
                href="mailto:es.rekruttering@iot.ntnu.no"
                className="text-gray-600 hover:text-gray-900 text-sm sm:text-base inline-block"
              >
                es.rekruttering@iot.ntnu.no →
              </Link>
            </div>

            {/* Address */}
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold text-sm sm:text-base mb-2">
                Adresse
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Sem Sælands Vei 1
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                7034, Trondheim
              </p>
            </div>

            {/* Socials */}
            <div className="flex justify-center md:justify-end space-x-4 sm:space-x-6">
              <Link
                href="#"
                className="text-[#FF5F15] hover:text-orange-600"
                aria-label="Facebook"
              >
                <FacebookIcon
                  width={24}
                  height={24}
                  className="sm:w-7 sm:h-7"
                />
              </Link>
              <Link
                href="#"
                className="text-[#FF5F15] hover:text-orange-600"
                aria-label="LinkedIn"
              >
                <LinkedInIcon
                  width={24}
                  height={24}
                  className="sm:w-7 sm:h-7"
                />
              </Link>
              <Link
                href="#"
                className="text-[#FF5F15] hover:text-orange-600"
                aria-label="YouTube"
              >
                <YoutubeIcon width={24} height={24} className="sm:w-7 sm:h-7" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </FullWidthContainer>
  );
};

export { Footer };
