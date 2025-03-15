"use client";
import React, { useState } from "react";
import { ProgramStructurePage } from "@app/types";
import { H1, H3 } from "@app/components/Typography";
import { PRIMARY_ORANGE } from "@app/constants/colors";
import { ProgramNavigationWrapper } from "./ProgramNavigationWrapper";

interface ProgramPageProps {
  program: ProgramStructurePage;
}

interface Section {
  id: string;
  title: string;
}

interface Course {
  credits: string;
  courseCode: string;
  title: string;
  url: string;
}

interface SemesterData {
  title: string;
  topic: string;
  text: string;
  courses: Course[];
}

interface ExternalData {
  title: string;
  topic: string;
  text: string;
  url: string;
}

interface OrderedSection {
  type: "semester" | "external";
  data: SemesterData | ExternalData;
  index: number;
}

const splitIntoSentences = (text: string): string[] => {
  // Split by period followed by a space or end of string
  return text
    .split(/\.(?:\s+|$)/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0); // Remove empty sentences
};

export default function ProgramPage({ program }: ProgramPageProps) {
  const sentences = splitIntoSentences(program.intro || "");
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // Create an ordered array of all sections
  const orderedSections = program.sections?.reduce(
    (acc: OrderedSection[], semester, index) => {
      acc.push({ type: "semester", data: semester as SemesterData, index });

      if (index === 0 && program.cernInfo) {
        acc.push({
          type: "external",
          data: program.cernInfo as ExternalData,
          index: 100,
        });
      }

      if (index === 1 && program.bostonInfo) {
        acc.push({
          type: "external",
          data: program.bostonInfo as ExternalData,
          index: 101,
        });
      }

      return acc;
    },
    [],
  );

  // Add Berlin info at the end if it exists
  if (program.berlinInfo) {
    orderedSections?.push({
      type: "external",
      data: program.berlinInfo as ExternalData,
      index: 102,
    });
  }

  // Create navigation sections using topics instead of full titles
  const navigationSections: Section[] = [
    { id: "introduction", title: "Introduksjon" },
    ...(orderedSections?.map((section) => ({
      id: `section-${section.index}`,
      title: section.data.topic || section.data.title,
    })) || []),
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Desktop Navigation - Only shown on desktop */}
        <div className="hidden md:block">
          <ProgramNavigationWrapper
            navigationSections={navigationSections}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>

        <main className="flex-1">
          <H1 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-12 overflow-hidden">
            {program.title || "Program"}
          </H1>

          {/* Introduction section */}
          <div id="introduction" className="mb-6 md:mb-8">
            <H3 className="mb-3 md:mb-4 lg:mb-6 text-lg sm:text-xl md:text-2xl">
              {program.introTitle || "Introduksjon"}
            </H3>
            <div className="text-gray-800 leading-relaxed">
              {sentences.reduce((pairs, sentence, index) => {
                if (index % 2 === 0) {
                  const pair = sentences[index + 1]
                    ? `${sentence}. ${sentences[index + 1]}.`
                    : `${sentence}.`;
                  pairs.push(
                    <p
                      key={index}
                      className="mb-3 md:mb-4 text-left text-sm sm:text-base md:text-lg"
                    >
                      {pair}
                    </p>,
                  );
                }
                return pairs;
              }, [] as JSX.Element[])}
            </div>
          </div>

          {/* Semesters and External Programs section */}
          <div id="semesters" className="w-full space-y-3 md:space-y-4">
            {orderedSections?.map((section, arrayIndex) => (
              <div key={arrayIndex} id={`section-${section.index}`}>
                <div className="bg-white shadow-md rounded-lg border border-gray-200">
                  <div
                    className="p-3 sm:p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleSection(section.index)}
                  >
                    <div className="flex-1 pr-2">
                      <H3 className="text-base sm:text-lg md:text-xl font-medium">
                        {section.data.title}
                      </H3>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        {section.data.topic}
                      </p>
                    </div>
                    <div style={{ color: PRIMARY_ORANGE }}>
                      {expandedSections.includes(section.index) ? "−" : "+"}
                    </div>
                  </div>

                  {expandedSections.includes(section.index) && (
                    <div className="border-t border-gray-200">
                      {section.type === "semester" ? (
                        <>
                          <div className="px-3 sm:px-4 py-3 sm:py-4 bg-gray-50">
                            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                              {section.data.text}
                            </p>
                          </div>
                          <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
                            {(section.data as SemesterData).courses.map(
                              (course: Course, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 hover:bg-gray-50 p-2 rounded-md transition-colors"
                                >
                                  <div className="min-w-[36px] sm:min-w-[40px] md:min-w-[48px] text-center">
                                    <span
                                      className="inline-block px-1 sm:px-1 md:px-2 py-1 text-xs md:text-sm border rounded-md"
                                      style={{
                                        color: PRIMARY_ORANGE,
                                        borderColor: PRIMARY_ORANGE,
                                      }}
                                    >
                                      {course.credits}SP
                                    </span>
                                  </div>
                                  <div>
                                    <a
                                      href={course.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      <div className="font-medium text-xs sm:text-sm md:text-base text-gray-900">
                                        {course.courseCode}
                                      </div>
                                      <div className="text-xs md:text-sm text-gray-600">
                                        {course.title}
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200">
                          <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                            {section.data.text}
                          </p>
                          <a
                            href={(section.data as ExternalData).url}
                            className="font-medium text-xs sm:text-sm md:text-base hover:underline"
                            style={{ color: PRIMARY_ORANGE }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Les mer
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
