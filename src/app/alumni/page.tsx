import AlumniStudents from "@app/sections/Alumni/AlumniStudents";
import { AlumniHeader } from "@app/sections/Alumni/AlumniHeader";
import { getAlumniPageData } from "./get_data";
import AlumniStories from "@app/sections/Alumni/AlumniStories";
import AlumniStartups from "@app/sections/Alumni/AlumniStartups";

export default async function Alumni() {
  const content = await getAlumniPageData();

  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl">Could not load Alumni page content</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <AlumniHeader
        mainTitle={content.mainTitle}
        titleText={content.titleText}
      />
      <AlumniStartups
        startupTitle={content.startupTitle || "Alumni Startups"}
      />
      <AlumniStudents alumniTitle={content.alumniTitle} />
      <AlumniStories
        title={content.alumniStoryTitle}
        stories={content.alumniStories}
      />
    </main>
  );
}
