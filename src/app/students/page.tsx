"use client"; // ✅ Mark this as a Client Component

import { useEffect, useState } from "react";
import { StudentSection } from "@app/sections/Students/Students";
import { SolanLinjeforening } from "@app/sections/Students/SolanLinjeforening";
import { useSolanLinjeforening } from "@app/hooks/server/useSolanLinjeforening";
import { getStudentPageData } from "./get_data";
import { StudentHeader } from "@app/sections/Students/StudentHeader";
import { StudentStartups } from "@app/sections/Students/StudentStartups";
import { SolanLinjeforeningPage } from "@app/types";
import { StudentStories } from "@app/sections/Students/StudentStories";

// Import the type we created in get_data.ts
import type { StudentPageData } from "./get_data";

function StudentDataFetcher() {
  const [solanData, setSolanData] = useState<SolanLinjeforeningPage | null>(
    null,
  );
  const [pageData, setPageData] = useState<StudentPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const solanDataPromise = useSolanLinjeforening();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solanResult, studentPageData] = await Promise.all([
          solanDataPromise,
          getStudentPageData(),
        ]);
        setSolanData(solanResult.data);
        setPageData(studentPageData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [solanDataPromise]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <StudentHeader
        mainTitle={pageData?.mainTitle || "Studentene"}
        titleText={pageData?.titleText || ""}
      />
      <StudentStartups
        startupTitle={pageData?.startupTitle || "Våre oppstarter"}
      />
      <StudentSection studentTitle={pageData?.studentTitle || "Studentene"} />
      <StudentStories
        title={pageData?.studentStoryTitle || "What our students say"}
        stories={pageData?.studentStories || []}
      />
      <section className="flex my-2 md:my-8 justify-center">
        {solanData && <SolanLinjeforening data={solanData} />}
      </section>
    </>
  );
}

export default function StudentsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <StudentDataFetcher />
    </main>
  );
}
