import { ProgramStructurePage } from "@app/types";
import { PROGRAMSTRUCTURE_PAGE_DATA } from "@app/text/programStructure";

export async function getData(): Promise<ProgramStructurePage | null> {
  try {
    // Use hardcoded data instead of Sanity
    const programData = PROGRAMSTRUCTURE_PAGE_DATA[0];

    // Transform hardcoded data to match ProgramStructurePage interface
    const result: ProgramStructurePage = {
      _type: "programStructure",
      _id: "hardcoded-program",
      _rev: "1",
      _createdAt: new Date(),
      _updatedAt: new Date(),
      title: programData.title || "Program Structure",
      introTitle: programData.introTitle || "Introduction",
      intro: programData.intro || "",
      readMoreLink: programData.readMoreLink || "",
      sections:
        programData.sections?.map((section) => ({
          title: section.title,
          topic: section.topic,
          text: section.text,
          description: section.text, // Map text to description for compatibility
          courses: (section.courses || []).map((course) => ({
            courseCode: course.courseCode || "",
            title: course.title,
            credits: course.credits,
            url: course.url || "",
          })),
        })) || [],
      bostonInfo: programData.bostonInfo as ProgramStructurePage["bostonInfo"],
      cernInfo: programData.cernInfo as ProgramStructurePage["cernInfo"],
      berlinInfo: programData.berlinInfo as ProgramStructurePage["berlinInfo"],
    };

    return result;
  } catch (error) {
    console.error("Error loading program data:", error);
    return null;
  }
}
