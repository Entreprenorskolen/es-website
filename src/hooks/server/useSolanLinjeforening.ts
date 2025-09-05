import { SolanLinjeforeningPage } from "@app/types";
import { SOLANLINJEFORENING_PAGE_DATA } from "@app/text/solanLinjeforening";

export async function useSolanLinjeforening() {
  try {
    // Use hardcoded data instead of Sanity
    const solanData = SOLANLINJEFORENING_PAGE_DATA[0];

    // Transform hardcoded data to match SolanLinjeforeningPage interface
    const data: SolanLinjeforeningPage = {
      _type: "solanLinjeforening",
      _id: "hardcoded-solan",
      _rev: "1",
      _createdAt: new Date(),
      _updatedAt: new Date(),
      title: solanData.title,
      description: solanData.description,
      solanUrl: solanData.solanUrl,
      videoTitle: solanData.videoTitle,
      video: solanData.video,
    };

    return { data };
  } catch (error) {
    console.error("Error loading Solan Linjeforening data:", error);
    return { data: null };
  }
}
