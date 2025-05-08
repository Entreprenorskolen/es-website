"use client";

import { client } from "@app/config";
import { HomePage } from "@app/types";
import {
  HeaderSection,
  InformationSection,
  LogoSection,
  SuccessStoriesSection,
  StatisticsSection,
  IdeaSection,
} from "@app/sections";
import { useLanguage } from "@app/context/LanguageContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [content, setContent] = useState<HomePage | null>(null);
  const [loading, setLoading] = useState(true);
  const { language: currentLanguage } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "home"]`;
        const result = await client.fetch<HomePage[]>(
          query,
          {},
          { cache: "no-store" },
        );

        if (result && result.length > 0) {
          if (currentLanguage === 'EN') {
            setContent(result[1]);
          } else {
            setContent(result[0]);
          }
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p>Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col mt-24">
      <HeaderSection
        title={content.title || "Welcome"}
        description={content.description || "No description available"}
        image={content.image || null}
        cta={content.cta || null}
      />

      <LogoSection />

      <InformationSection sections={content.sections} />

      <SuccessStoriesSection successStories={content.successStories || []} />

      <StatisticsSection statistics={content.statistics || []} />

      <IdeaSection content={content} />
    </main>
  );
}
