"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@app/components";
import Link from "next/link";
import { paths } from "@app/constants/page_links";
import { useColors } from "@app/context/ColorContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { navbarColor } = useColors();
  const isDarkBg = navbarColor === "bg-[#0B3B8F]";
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("NO");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

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
          {paths
            .filter((path) => path !== "/sok")
            .map((path) => (
              <Link
                key={path}
                href={path}
                className={`text-sm lg:text-base hover:text-orange-500 transition-colors ${
                  isDarkBg ? "text-white" : "text-black"
                }`}
              >
                {path === "/"
                  ? "Hjem"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
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
              Søk
            </Button>
          </Link>
          {/* Language Dropdown */}
          <div className="hidden md:flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-sm lg:text-base hover:text-orange-500 transition-colors"
            >
              <option value="NO">NO</option>
              <option value="EN">EN</option>
            </select>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-lg">
            {paths
              .filter((path) => path !== "/sok")
              .map((path) => (
                <Link
                  key={path}
                  href={path}
                  className="text-gray-700 hover:text-orange-500 py-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {path === "/"
                    ? "Hjem"
                    : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
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
                Søk
              </Button>
            </Link>
            {/* Mobile Language Dropdown */}
            <div className="flex items-center gap-2 mt-4">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-sm hover:text-orange-500 transition-colors"
              >
                <option value="NO">NO</option>
                <option value="EN">EN</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
