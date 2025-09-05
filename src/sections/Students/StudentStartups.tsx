"use client";

import { useState } from "react";
import { useStartups } from "@app/hooks/server/useStartups";
import { FullWidthContainer } from "@app/components/FullWidthContainer";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { getImageUrl } from "@app/lib/image-utils";
import { PRIMARY_ORANGE } from "@app/constants";

interface StudentStartupsProps {
  startupTitle: string;
}

export function StudentStartups({ startupTitle }: StudentStartupsProps) {
  const { startups, isLoading } = useStartups("inhouse");
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedStartups, setExpandedStartups] = useState<string[]>([]);

  if (isLoading) {
    return (
      <FullWidthContainer bgColor="bg-[#FDF8F4]">
        <div className="w-full py-12 px-4 mt-24 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-40">
              <div className="text-gray-500">Loading startups...</div>
            </div>
          </div>
        </div>
      </FullWidthContainer>
    );
  }

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

  // Change pages to show 2 startups on mobile, 4 on desktop
  const itemsPerPage =
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 4 : 2;
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
      <div className="w-full py-12 px-4 mt-24 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2
              className="text-4xl font-bold"
              style={{
                color: PRIMARY_ORANGE,
              }}
            >
              {startupTitle}
            </h2>

            {totalPages > 1 && (
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="text-primary-600 disabled:text-gray-300 transition-colors"
                  style={{
                    color: PRIMARY_ORANGE,
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="text-primary-600 disabled:text-gray-300 transition-colors"
                  style={{
                    color: PRIMARY_ORANGE,
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleStartups.map((startup) => {
                const isExpanded = expandedStartups.includes(startup.name);
                return (
                  <div
                    key={startup.name}
                    className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 relative mb-4">
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
                          <h3 className="text-xl font-semibold">
                            {startup.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <h3 className="text-xl font-semibold">
                          {startup.name}
                        </h3>
                      )}
                    </div>
                    <div
                      className={`text-gray-600 text-sm ${!isExpanded ? "line-clamp-3" : ""} mb-8`}
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
                        className="text-primary-600 text-sm hover:underline cursor-pointer italic"
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
