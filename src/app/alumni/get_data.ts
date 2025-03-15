import { client } from "@app/config";
import { AlumniPage } from "@app/types";

export async function getAlumniPageData() {
  const query = `*[_type == "alumniPage"][0]{
    mainTitle,
    titleText,
    startupTitle,
    alumniTitle,
    alumniStoryTitle,
    alumniStories
  }`;

  try {
    const result = await client.fetch<AlumniPage>(
      query,
      {},
      { cache: "no-store" },
    );
    return result;
  } catch (error) {
    console.error("Error fetching student page data:", error);
    return null;
  }
}
