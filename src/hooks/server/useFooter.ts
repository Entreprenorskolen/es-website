import { FOOTER_DATA } from "@app/text/footer";
import { FooterData } from "@app/types/data";

export async function getFooterData(): Promise<FooterData | null> {
  try {
    // Transform hardcoded data to match Sanity interface
    const footerData: FooterData = {
      _createdAt: new Date(),
      _updatedAt: new Date(),
      _id: "hardcoded-footer",
      _type: "footer" as const,
      _rev: "hardcoded-rev",
      homeText: FOOTER_DATA.homeText,
      studentsText: FOOTER_DATA.studentsText,
      alumniText: FOOTER_DATA.alumniText,
      programText: FOOTER_DATA.programText,
      aboutText: FOOTER_DATA.aboutText,
      applyText: FOOTER_DATA.applyText,
      contactTitle: FOOTER_DATA.contactTitle,
      phoneNumber: FOOTER_DATA.phoneNumber,
      email: FOOTER_DATA.email,
      addressTitle: FOOTER_DATA.addressTitle,
      streetAddress: FOOTER_DATA.streetAddress,
      cityPostalCode: FOOTER_DATA.cityPostalCode,
    };

    return footerData;
  } catch (error) {
    console.error("Error processing footer data:", error);
    return null;
  }
}
