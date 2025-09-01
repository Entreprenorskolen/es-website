"use client";

import { Student } from "@app/types";
import { useEffect, useState, useRef } from "react";
import { client } from "@app/config";

// Simple cache to prevent unnecessary API calls
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
      const baseQuery = `
        {
            name,
            description,
            linkedin,
            year,
            current,
            image
        }
      `;

      const query = isCurrent
        ? `*[_type == "student" && current == true && year == $year] ${baseQuery}`
        : `*[_type == "student" && year == $year && (current == false || !defined(current))] ${baseQuery}`;

      const params = { year: Number(year) };
      const data = await client.fetch<Student[]>(query, params, {
        signal: abortControllerRef.current.signal,
        next: { revalidate: 1800 }, // ✅ Cache for 30 minutes
      });

      // Cache the result
      studentsCache.set(cacheKey, { data, timestamp: now });
      setStudents(data);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching students:", error);
      }
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
