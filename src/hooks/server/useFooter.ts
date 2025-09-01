import { client } from "@app/config/sanity";
import { FooterData } from "@app/types/sanity";

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const query = `*[_type == "footer"][0]{
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
      applyText,
      contactTitle,
      phoneNumber,
      email,
      addressTitle,
      streetAddress,
      cityPostalCode
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 86400 } // ✅ Cache for 24 hours
    });
    return data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}
