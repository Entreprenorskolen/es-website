import { client } from "@app/config";
import { AboutPage, FacultyMember } from "@app/types";

export async function getAboutData() {
  const query = `*[_type == "about"][0]{
    title,
    titleText,
    image,
    aboutTitle,
    aboutText
  }`;

  try {
    const result = await client.fetch<AboutPage>(
      query,
      {},
      { cache: "no-store" },
    );
    return result;
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
