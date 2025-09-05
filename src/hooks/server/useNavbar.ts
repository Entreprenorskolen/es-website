import { NAVBAR_DATA } from "@app/text/navbar";
import { NavbarData } from "@app/types/data";

export async function getNavbarData(): Promise<NavbarData | null> {
  try {
    // Transform hardcoded data to match Sanity interface
    const navbarData: NavbarData = {
      _createdAt: new Date(),
      _updatedAt: new Date(),
      _id: "hardcoded-navbar",
      _type: "navbar" as const,
      _rev: "hardcoded-rev",
      homeText: NAVBAR_DATA.homeText,
      studentsText: NAVBAR_DATA.studentsText,
      alumniText: NAVBAR_DATA.alumniText,
      programText: NAVBAR_DATA.programText,
      aboutText: NAVBAR_DATA.aboutText,
      applyText: NAVBAR_DATA.applyText,
    };

    return navbarData;
  } catch (error) {
    console.error("Error processing navbar data:", error);
    return null;
  }
}
