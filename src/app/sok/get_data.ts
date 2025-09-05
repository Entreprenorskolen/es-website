import { ApplyPage } from "@app/types";
import { APPLY_PAGE_DATA } from "@app/text/apply";

export async function getData(): Promise<ApplyPage | null> {
  try {
    // Use hardcoded data instead of Sanity
    const applyData = APPLY_PAGE_DATA[0];

    // Transform hardcoded data to match ApplyPage interface
    const result: ApplyPage = {
      _type: "apply",
      _id: "hardcoded-apply",
      _rev: "1",
      _createdAt: new Date(),
      _updatedAt: new Date(),
      title: applyData.title,
      intro: applyData.intro as ApplyPage["intro"],
      process: applyData.process as ApplyPage["process"],
      content: applyData.content as ApplyPage["content"],
      steps: applyData.steps as ApplyPage["steps"],
      FAQ: applyData.FAQ as ApplyPage["FAQ"],
    };

    return result;
  } catch (error) {
    console.error("Error loading apply data:", error);
    return null;
  }
}
