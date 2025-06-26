import { client } from "@app/config/sanity";
import { NavbarData } from "@app/types/sanity";

export async function getNavbarData(): Promise<NavbarData | null> {
  try {
    const query = `*[_type == "navbar"][0]{
      _id,
      _type,
      _rev,
      _createdAt,
      _updatedAt,
      homeText,
      studentsText,
      alumniText,
      programText,
      aboutText,
      applyText
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return null;
  }
}
