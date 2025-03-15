import { client } from "@app/config";
import { Image } from "sanity";

export interface StudentPageData {
  mainTitle: string;
  titleText: string;
  startupTitle: string;
  studentTitle: string;
  studentStoryTitle: string;
  studentStories: Array<{
    name: string;
    roleInStartup: string;
    image: Image;
    text: string;
  }>;
}

export async function getStudentPageData() {
  const query = `*[_type == "studentPage"][0]{
    mainTitle,
    titleText,
    startupTitle,
    studentTitle,
    studentStoryTitle,
    studentStories
  }`;

  try {
    const result = await client.fetch<StudentPageData>(
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
