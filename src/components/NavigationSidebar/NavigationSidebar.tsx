"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
}

interface NavigationSidebarProps {
  sections: Section[];
}

export function NavigationSidebar({ sections }: NavigationSidebarProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <nav className="sticky top-32 h-fit w-64">
      {" "}
      {/* Adjusted top value */}
      <div className="relative space-y-8">
        {/* Vertical line that spans all sections */}
        <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-gray-200" />

        {sections.map((section, index) => (
          <div key={section.id} className="relative flex items-center">
            {/* Circle indicator */}
            <div
              className={`z-10 w-2 h-2 rounded-full mr-4 ${
                activeSection === section.id ? "" : "bg-gray-300"
              }`}
              style={{
                backgroundColor:
                  activeSection === section.id ? "#f97316" : undefined,
              }}
            />

            {/* Active section vertical line */}
            {activeSection === section.id && (
              <div
                className="absolute left-[3px] w-[2px]"
                style={{
                  backgroundColor: "#f97316",
                  top: index === 0 ? "0" : "-16px",
                  bottom: index === sections.length - 1 ? "0" : "-16px",
                }}
              />
            )}

            <Link
              href={`#${section.id}`}
              className={`text-sm transition-colors ${
                activeSection === section.id ? "font-medium" : "text-gray-600"
              }`}
              style={{
                color: activeSection === section.id ? "#f97316" : undefined,
              }}
            >
              {section.title}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
