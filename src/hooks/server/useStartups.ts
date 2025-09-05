"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Startup } from "@app/types";
import { STARTUPS_DATA } from "@app/text/startups";
import { getLocalImagePath } from "../../../public/images/image-mapping";
// Simple cache to prevent unnecessary data processing
const startupsCache = new Map<string, { data: Startup[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useStartups = (currentValue: string) => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStartups = useCallback(
    async (isInHouse: boolean) => {
      const cacheKey = isInHouse ? "inhouse" : "external";
      const cached = startupsCache.get(cacheKey);
      const now = Date.now();

      // Return cached data if it's still valid
      if (cached && now - cached.timestamp < CACHE_DURATION) {
        setStartups(cached.data);
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
        console.log("useStartups: Starting data fetch for", currentValue);
        console.log("useStartups: STARTUPS_DATA length:", STARTUPS_DATA.length);

        // Filter hardcoded data instead of using Sanity query
        const filteredStartups = STARTUPS_DATA.filter((startup) => {
          if (currentValue === "inhouse") {
            return startup.isInHouse === true;
          } else if (currentValue === "alumni") {
            return (
              startup.isInHouse === false || startup.isInHouse === undefined
            );
          }
          return true; // Default case
        }).map((startup) => ({
          _type: "startup" as const,
          name: startup.name,
          description: [
            {
              _key: `desc-${startup.id}`,
              _type: "block" as const,
              style: "normal" as const,
              children: [
                {
                  text: startup.description,
                },
              ],
              markDefs: [],
            },
          ],
          url: startup.url || undefined,
          linkedin: startup.linkedin || undefined,
          mail: startup.mail || undefined,
          isInHouse: startup.isInHouse,
          logo: getLocalImagePath(startup.logo) || (startup.logo as any), // Use image mapping to get local path
        }));

        console.log(
          "useStartups: Filtered startups count:",
          filteredStartups.length,
        );
        console.log("useStartups: First startup:", filteredStartups[0]);
        console.log(
          "useStartups: First startup description:",
          filteredStartups[0]?.description,
        );

        // Simulate async operation for consistency
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Cache the result
        startupsCache.set(cacheKey, { data: filteredStartups, timestamp: now });
        setStartups(filteredStartups);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error processing startups:", error);
          console.error("Error stack:", error.stack);
        }
        // Set empty array on error to prevent infinite loading
        setStartups([]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentValue],
  );

  useEffect(() => {
    void fetchStartups(currentValue === "inhouse");

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentValue, fetchStartups]);

  return { startups, isLoading };
};

export { useStartups };
