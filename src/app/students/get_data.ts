import { Image } from "sanity";
import { STUDENTPAGE_PAGE_DATA } from "@app/text/studentPage";

export interface StudentPageData {
  mainTitle: string;
  titleText: string;
  startupTitle: string;
  studentTitle: string;
  studentStoryTitle: string;
  studentStories: Array<{
    _key?: string;
    name: string;
    roleInStartup: string;
    image: Image;
    text: string;
  }>;
}

export async function getStudentPageData(): Promise<StudentPageData | null> {
  try {
    // Use hardcoded data instead of Sanity
    const pageData = STUDENTPAGE_PAGE_DATA[0];

    // Transform hardcoded data to match StudentPageData interface
    const result: StudentPageData = {
      mainTitle: pageData.mainTitle,
      titleText: pageData.titleText,
      startupTitle: pageData.startupTitle,
      studentTitle: pageData.studentTitle,
      studentStoryTitle: pageData.studentStoryTitle,
      studentStories: pageData.studentStories.map((story) => ({
        _key: story._key,
        name: story.name,
        roleInStartup: story.roleInStartup,
        image: story.image as any, // Direct image path string
        text: story.text,
      })),
    };

    return result;
  } catch (error) {
    console.error("Error loading student page data:", error);
    return null;
  }
}
