"use client";

import { H2 } from "@app/components";
import { FullWidthContainer } from "@app/components/FullWidthContainer";
import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AlumniPage } from "@app/types";

interface AlumniStoriesProps {
  title: string;
  stories: AlumniPage["alumniStories"];
}

export function AlumniStories({ title, stories }: AlumniStoriesProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedStories, setExpandedStories] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setTotalPages(Math.ceil(stories.length / (mobile ? 1 : 2)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [stories.length]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const toggleExpanded = (globalIndex: number) => {
    setExpandedStories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(globalIndex)) {
        newSet.delete(globalIndex);
      } else {
        newSet.add(globalIndex);
      }
      return newSet;
    });
  };

  if (!stories?.length) return null;

  const storiesPerPage = isMobile ? 1 : 2;
  const currentStories = stories.slice(
    currentPage * storiesPerPage,
    (currentPage + 1) * storiesPerPage,
  );

  return (
    <FullWidthContainer bgColor="bg-[#F0F7FF]">
      <div className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-16">
            <div className="flex-1 mb-6 md:mb-0">
              <H2 className="text-left relative pb-4">
                {title}
                <div
                  className="absolute bottom-0 left-0 w-16 h-1 bg-[#FF5C00]"
                  style={{ transform: "translateY(8px)" }}
                />
              </H2>
            </div>
            <div className="flex gap-2 self-center md:self-auto">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
                aria-label="Previous stories"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
                aria-label="Next stories"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentStories.map((story, index) => {
              const globalIndex = currentPage * storiesPerPage + index;
              const isExpanded = expandedStories.has(globalIndex);

              return (
                <div
                  key={globalIndex}
                  className="bg-white rounded-lg shadow-md p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
                      <Image
                        src={getImageUrl(story.image)}
                        alt={story.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-4 text-center md:text-left">
                        <h3 className="text-xl font-semibold">{story.name}</h3>
                        <p className="text-gray-600">{story.roleInStartup}</p>
                      </div>
                      <div className="relative">
                        <p
                          className={`text-gray-700 leading-relaxed transition-all duration-300 ${
                            isExpanded ? "" : "line-clamp-4 overflow-hidden"
                          }`}
                          style={
                            !isExpanded
                              ? {
                                  maxHeight: "6rem",
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: "vertical",
                                  display: "-webkit-box",
                                }
                              : {}
                          }
                        >
                          {story.text}
                        </p>
                        {story.text.length > 200 && (
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          >
                            {isExpanded ? "Les mindre" : "Les mer"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? "bg-[#FF5C00]" : "bg-gray-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </FullWidthContainer>
  );
}

export default AlumniStories;
