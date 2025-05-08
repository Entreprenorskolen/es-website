import { client } from "@app/config";
import { AboutPage, FacultyMember } from "@app/types";

// Define the expected language type
type Language = "EN" | "NO";

export async function getAboutData(currentLanguage: Language) {

  const query = `*[_type == "about"]{
    title,
    titleText,
    image,
    aboutTitle,
    aboutText,
    isEnglish
  }`;

  try {
    const result = await client.fetch<AboutPage[]>(
      query,
      {},
      { cache: "no-store" },
    );
    if (currentLanguage === "EN") {
      return result[1];
    } else {
      return result[0];
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export async function getFacultyMembers() {
  const query = `*[_type == "facultyMembers"]{
    name,
    title,
    image,
    bio
  }`;

  try {
    const result = await client.fetch<FacultyMember[]>(
      query,
      {},
      { cache: "no-store" },
    );
    return result;
  } catch (error) {
    console.error("Error fetching faculty members:", error);
    return null;
  }
}
