import React, { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

interface ProgramNavigationWrapperProps {
  navigationSections: Section[];
  expandedSections: number[];
  toggleSection: (index: number) => void;
}

export const ProgramNavigationWrapper = ({
  navigationSections,
  expandedSections,
  toggleSection,
}: ProgramNavigationWrapperProps) => {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const handleScroll = (): void => {
      const introSection = document.getElementById("introduction");
      if (introSection) {
        const rect = introSection.getBoundingClientRect();
        const isIntroVisible = rect.top <= 100 && rect.bottom >= 100;
        if (isIntroVisible) {
          setActiveSection("introduction");
        } else if (rect.bottom < 100) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Common circle styles
  const circleStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "16px",
    zIndex: 10,
    transition: "background-color 0.2s ease",
  };

  return (
    <div className="hidden md:block w-64 mt-32 mb-24">
      <nav className="sticky top-32 h-fit">
        <div className="relative space-y-8">
          {/* Vertical line that spans all sections */}
          <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-gray-200" />

          {navigationSections.map((section) => {
            // Special handling for introduction section
            if (section.id === "introduction") {
              const isIntroActive = activeSection === "introduction";
              return (
                <div key={section.id} className="relative flex items-center">
                  <div
                    style={{
                      ...circleStyle,
                      backgroundColor: isIntroActive ? "#f97316" : "#d1d5db",
                    }}
                  />
                  {isIntroActive && (
                    <div
                      className="absolute left-[3px]"
                      style={{
                        backgroundColor: "#f97316",
                        width: "2px",
                        top: "-16px",
                        bottom: "-16px",
                      }}
                    />
                  )}
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                      setActiveSection("introduction");
                    }}
                    className={`text-sm transition-colors ${
                      isIntroActive ? "font-medium" : "text-gray-600"
                    }`}
                    style={{
                      color: isIntroActive ? "#f97316" : undefined,
                    }}
                  >
                    {section.title}
                  </a>
                </div>
              );
            }

            // Regular section handling
            const sectionIndex = parseInt(section.id.split("-")[1]);
            const isActive = expandedSections.includes(sectionIndex);

            return (
              <div key={section.id} className="relative flex items-center">
                <div
                  style={{
                    ...circleStyle,
                    backgroundColor: isActive ? "#f97316" : "#d1d5db",
                  }}
                />
                {isActive && (
                  <div
                    className="absolute left-[3px]"
                    style={{
                      backgroundColor: "#f97316",
                      width: "2px",
                      top: "-16px",
                      bottom: "-16px",
                    }}
                  />
                )}
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(sectionIndex);
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("");
                  }}
                  className={`text-sm transition-colors ${
                    isActive ? "font-medium" : "text-gray-600"
                  }`}
                  style={{
                    color: isActive ? "#f97316" : undefined,
                  }}
                >
                  {section.title}
                </a>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
