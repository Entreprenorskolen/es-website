"use client";

import { useState, useEffect } from "react";
import { useStartups } from "@app/hooks/server/useStartups";
import { FullWidthContainer } from "@app/components/FullWidthContainer";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { getImageUrl } from "@app/lib/image-utils";
import { PRIMARY_ORANGE } from "@app/constants";

interface AlumniStartupsProps {
  startupTitle: string;
}

export function AlumniStartups({ startupTitle }: AlumniStartupsProps) {
  const { startups } = useStartups("alumni");
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedStartups, setExpandedStartups] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 4 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!startups.length) {
    return null;
  }

  const toggleExpanded = (startupName: string) => {
    setExpandedStartups((prev) =>
      prev.includes(startupName)
        ? prev.filter((name) => name !== startupName)
        : [...prev, startupName],
    );
  };

  const totalPages = Math.ceil(startups.length / itemsPerPage);
  const visibleStartups = startups.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <FullWidthContainer bgColor="bg-[#FDF8F4]">
      <div className="w-full py-12 px-4 mt-8 md:mt-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-0 text-center sm:text-left"
              style={{
                color: PRIMARY_ORANGE,
              }}
            >
              {startupTitle}
            </h2>

            {totalPages > 1 && (
              <div className="flex gap-4 justify-center sm:justify-end w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="text-primary-600 disabled:text-gray-300 transition-colors p-2 bg-white rounded-full shadow-sm"
                  style={{
                    color: PRIMARY_ORANGE,
                  }}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="text-primary-600 disabled:text-gray-300 transition-colors p-2 bg-white rounded-full shadow-sm"
                  style={{
                    color: PRIMARY_ORANGE,
                  }}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {visibleStartups.map((startup) => {
                const isExpanded = expandedStartups.includes(startup.name);
                return (
                  <div
                    key={startup.name}
                    className="bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-28 sm:h-32 md:h-40 relative mb-3 sm:mb-4">
                      <Image
                        src={getImageUrl(startup.logo)}
                        alt={`${startup.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {startup.url ? (
                        <a
                          href={startup.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 hover:text-secondary-600 transition-colors"
                        >
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                            {startup.name}
                          </h3>
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                          {startup.name}
                        </h3>
                      )}
                    </div>
                    <div
                      className={`text-gray-600 text-xs sm:text-sm ${!isExpanded ? "line-clamp-3" : ""} mb-4 sm:mb-6`}
                    >
                      {startup.description && (
                        <>
                          <div>
                            {startup.description.map(
                              (block: any, index: number) => (
                                <p key={index}>
                                  {block.children?.[0]?.text || "No text"}
                                </p>
                              ),
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        onClick={() => toggleExpanded(startup.name)}
                        className="text-primary-600 text-xs sm:text-sm hover:underline cursor-pointer italic"
                        style={{
                          color: PRIMARY_ORANGE,
                        }}
                      >
                        {isExpanded ? "Vis mindre" : "Les mer"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </FullWidthContainer>
  );
}

export default AlumniStartups;
