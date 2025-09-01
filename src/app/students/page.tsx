import { StudentSection } from "@app/sections/Students/Students";
import { SolanLinjeforening } from "@app/sections/Students/SolanLinjeforening";
import { useSolanLinjeforening } from "@app/hooks/server/useSolanLinjeforening";
import { getStudentPageData } from "./get_data";
import { StudentHeader } from "@app/sections/Students/StudentHeader";
import { StudentStartups } from "@app/sections/Students/StudentStartups";
import { StudentStories } from "@app/sections/Students/StudentStories";

export default async function Students() {
  // ✅ Fetch data on server side with caching
  const [solanResult, pageData] = await Promise.all([
    useSolanLinjeforening(),
    getStudentPageData(),
  ]);

  if (!pageData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>No student data available</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <StudentHeader
        mainTitle={pageData.mainTitle || "Studentene"}
        titleText={pageData.titleText || ""}
      />
      <StudentStartups
        startupTitle={pageData.startupTitle || "Våre oppstarter"}
      />
      <StudentSection studentTitle={pageData.studentTitle || "Studentene"} />
      <StudentStories
        title={pageData.studentStoryTitle || "What our students say"}
        stories={pageData.studentStories || []}
      />
      <section className="flex my-2 md:my-8 justify-center">
        {solanResult.data && <SolanLinjeforening data={solanResult.data} />}
      </section>
    </main>
  );
}
