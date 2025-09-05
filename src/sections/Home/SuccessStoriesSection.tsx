"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import { HomePage } from "@app/types";
import {
  H2,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@app/components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SuccessStoriesSectionProps {
  successStories: HomePage["successStories"];
}

const SuccessStoriesSection = ({
  successStories,
}: SuccessStoriesSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [expandedStories, setExpandedStories] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Show only 1 story on mobile, 2 on larger screens
  const storiesPerView = isMobile ? 1 : 2;
  const displayedStories = successStories.slice(
    currentIndex,
    currentIndex + storiesPerView,
  );

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + storiesPerView >= successStories.length
        ? 0
        : prev + storiesPerView,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - storiesPerView < 0
        ? Math.max(0, successStories.length - storiesPerView)
        : prev - storiesPerView,
    );
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

  return (
    <section className="my-6 w-10/12 md:w-[95%] mx-auto mb-32 mt-24">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
        <div className="w-full text-left md:text-center mb-4 sm:mb-0">
          <H2>Suksesshistorier</H2>
        </div>
        {successStories.length > 1 && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full"
              style={{ backgroundColor: "#f97316" }}
            >
              <FaChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="rounded-full hover:bg-gray-100"
              style={{ backgroundColor: "#f97316" }}
            >
              <FaChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {displayedStories.map((story, index) => {
          const globalIndex = currentIndex + index;
          const isExpanded = expandedStories.has(globalIndex);

          return (
            <Card
              key={`${story.name}-${globalIndex}`}
              className="p-8 bg-white shadow-lg rounded-lg w-full sm:w-[calc(90%-32px)] lg:w-[calc(60%-32px)] xl:w-[calc(40%-32px)]"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={getImageUrl(story.image)}
                  alt={story.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-gray-100 shadow-sm"
                />
                <CardHeader className="p-0">
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <H2 className="text-sm">{story.position}</H2>
                </CardHeader>
              </div>
              <CardContent className="mt-4">
                <div className="relative">
                  <p
                    className={`text-base leading-relaxed transition-all duration-300 ${
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
                    {story.story}
                  </p>
                  {story.story.length > 200 && (
                    <button
                      onClick={() => toggleExpanded(globalIndex)}
                      className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      {isExpanded ? "Les mindre" : "Les mer"}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export { SuccessStoriesSection };
