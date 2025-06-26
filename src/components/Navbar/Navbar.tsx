"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@app/components";
import Link from "next/link";
import { useColors } from "@app/context/ColorContext";
import { Menu, X } from "lucide-react";
import { NavbarData } from "@app/types/sanity";

interface NavbarProps {
  navbarData?: NavbarData | null;
}

const Navbar = ({ navbarData }: NavbarProps) => {
  const { navbarColor } = useColors();
  const isDarkBg = navbarColor === "bg-[#0B3B8F]";
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links with fallback text
  const navigationLinks = [
    { path: "/", text: navbarData?.homeText || "Hjem" },
    { path: "/students", text: navbarData?.studentsText || "Students" },
    { path: "/alumni", text: navbarData?.alumniText || "Alumni" },
    { path: "/program", text: navbarData?.programText || "Program" },
    { path: "/about", text: navbarData?.aboutText || "About" },
  ];

  const applyText = navbarData?.applyText || "Søk";

  return (
    <div className={`${navbarColor} w-full py-2 md:py-4`}>
      <header className="container mx-auto flex justify-between items-center py-3 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Desktop logo */}
        <Link href={"/"} passHref className={"group hidden md:block"}>
          <Image
            src={"/NSE.png"}
            alt={"NSE Logo"}
            width={250}
            height={80}
            className={"group-hover:opacity-80 transition-opacity"}
            priority
          />
        </Link>

        {/* Mobile logo and menu button */}
        <div className="flex items-center justify-between md:hidden w-full">
          <Link href={"/"} passHref className={"group"}>
            <Image
              src={"/NSE.png"}
              alt={"NSE Logo"}
              width={120}
              height={40}
              className={"group-hover:opacity-80 transition-opacity"}
              priority
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-orange-500 focus:outline-none p-3"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm lg:text-base hover:text-orange-500 transition-colors ${
                isDarkBg ? "text-white" : "text-black"
              }`}
            >
              {link.text}
            </Link>
          ))}
          <Link href="/sok">
            <Button
              className="px-4 sm:px-6 lg:px-8 py-2"
              style={{
                backgroundColor: "#f97316",
                color: "#ffffff",
              }}
            >
              {applyText}
            </Button>
          </Link>
        </nav>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-lg">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-gray-700 hover:text-orange-500 py-2 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            <Link href="/sok" onClick={() => setIsOpen(false)}>
              <Button
                className="w-full py-2 text-sm"
                style={{
                  backgroundColor: "#f97316",
                  color: "#ffffff",
                }}
              >
                {applyText}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
