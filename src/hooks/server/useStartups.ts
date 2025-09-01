"use client";

import { useEffect, useState, useRef } from "react";
import { Startup } from "@app/types";
import { client } from "@app/config";

// Simple cache to prevent unnecessary API calls
const startupsCache = new Map<string, { data: Startup[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useStartups = (currentValue: string) => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStartups = async (isInHouse: boolean) => {
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
      const baseQuery = `
        {
            name,
            description,
            url,
            logo,
            linkedin,
            mail,
            isInHouse
        }
     `;

      const query = isInHouse
        ? `*[_type == "startup" && isInHouse == true] ${baseQuery}`
        : `*[_type == "startup" && (isInHouse == false || !defined(isInHouse))] ${baseQuery}`;

      const params = { isInHouse };
      const data = await client.fetch<Startup[]>(query, params, {
        signal: abortControllerRef.current.signal,
        next: { revalidate: 1800 }, // ✅ Cache for 30 minutes
      });

      // Cache the result
      startupsCache.set(cacheKey, { data, timestamp: now });
      setStartups(data);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching startups:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchStartups(currentValue === "inhouse");

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentValue]);

  return { startups, isLoading };
};

export { useStartups };
