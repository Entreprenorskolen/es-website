"use client";

import { Student } from "@app/types";
import { useEffect, useState, useRef } from "react";
import { STUDENTS_DATA } from "@app/text/students";

// Simple cache to prevent unnecessary data processing
const studentsCache = new Map<string, { data: Student[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useStudents = (
  currentView: "current" | "alumni",
  currentYear: string,
) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStudents = async (isCurrent: boolean, year: string) => {
    const cacheKey = `${isCurrent ? "current" : "alumni"}_${year}`;
    const cached = studentsCache.get(cacheKey);
    const now = Date.now();

    // Return cached data if it's still valid
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setStudents(cached.data);
      setIsLoading(false);
      return;
    }

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);

      // Filter hardcoded data instead of using Sanity query
      const yearNum = Number(year);

      // Debug logging
      console.log(
        "useStudents - isCurrent:",
        isCurrent,
        "year:",
        year,
        "yearNum:",
        yearNum,
      );
      console.log("useStudents - Total students:", STUDENTS_DATA.length);
      console.log(
        "useStudents - Sample students:",
        STUDENTS_DATA.slice(0, 3).map((s) => ({
          name: s.name,
          current: s.current,
          year: s.year,
        })),
      );

      const filteredStudents = STUDENTS_DATA.filter((student) => {
        if (isCurrent) {
          return student.current === true && student.year === yearNum;
        } else {
          return (
            (student.current === false || student.current === undefined) &&
            student.year === yearNum
          );
        }
      }).map((student) => ({
        _type: "student" as const,
        name: student.name,
        description: student.description,
        linkedin: student.linkedin || null,
        current: student.current,
        image: student.image as any, // Use direct image path
        year: student.year,
      }));

      // Simulate async operation for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log(
        "useStudents - Filtered students count:",
        filteredStudents.length,
      );
      console.log(
        "useStudents - Filtered students:",
        filteredStudents.map((s) => ({
          name: s.name,
          current: s.current,
          year: s.year,
        })),
      );

      // Cache the result
      studentsCache.set(cacheKey, { data: filteredStudents, timestamp: now });
      setStudents(filteredStudents);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error processing students:", error);
        console.error("Error stack:", error.stack);
      }
      // Set empty array on error to prevent infinite loading
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchStudents(currentView === "current", currentYear);

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentView, currentYear]);

  return { students, isLoading };
};

export { useStudents };
