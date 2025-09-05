import { AlumniPage } from "@app/types";
import { ALUMNIPAGE_PAGE_DATA } from "@app/text/alumniPage";

export async function getAlumniPageData(): Promise<AlumniPage | null> {
  try {
    // Use hardcoded data instead of Sanity
    const alumniData = ALUMNIPAGE_PAGE_DATA[0];

    // Transform hardcoded data to match AlumniPage interface
    const result: AlumniPage = {
      _type: "alumniPage",
      _id: "hardcoded-alumni",
      _rev: "1",
      _createdAt: new Date(),
      _updatedAt: new Date(),
      mainTitle: alumniData.mainTitle,
      titleText: alumniData.titleText,
      startupTitle: alumniData.startupTitle,
      alumniTitle: alumniData.alumniTitle,
      alumniStoryTitle: alumniData.alumniStoryTitle,
      alumniStories: alumniData.alumniStories.map((story) => ({
        _key: story._key,
        name: story.name,
        roleInStartup: story.roleInStartup,
        image: story.image as any, // Will be handled by image utility
        text: story.text,
      })),
    };

    return result;
  } catch (error) {
    console.error("Error loading alumni page data:", error);
    return null;
  }
}
