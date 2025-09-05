import { AboutPage, FacultyMember } from "@app/types";
import { ABOUT_PAGE_DATA } from "@app/text/about";
import { FACULTY_MEMBERS_DATA } from "@app/text/faculty-members";

export async function getAboutData(): Promise<AboutPage | null> {
  try {
    // Use hardcoded data instead of Sanity
    const aboutData = ABOUT_PAGE_DATA[0];

    // Transform hardcoded data to match AboutPage interface
    const result: AboutPage = {
      _type: "about",
      _id: "hardcoded-about",
      _rev: "1",
      _createdAt: new Date(),
      _updatedAt: new Date(),
      title: aboutData.title,
      titleText: aboutData.titleText,
      image: aboutData.image as AboutPage["image"],
      aboutTitle: aboutData.aboutTitle,
      aboutText: aboutData.aboutText,
    };

    return result;
  } catch (error) {
    console.error("Error loading about data:", error);
    return null;
  }
}

export async function getFacultyMembers(): Promise<FacultyMember[] | null> {
  try {
    // Transform hardcoded faculty data to match FacultyMember interface
    const facultyMembers: FacultyMember[] = FACULTY_MEMBERS_DATA.map(
      (member, index) => {
        const bioBlocks = member.bio
          .split("\n\n")
          .map((paragraph, paragraphIndex) => ({
            _key: `bio-${index}-paragraph-${paragraphIndex}`,
            _type: "block" as const,
            style: "normal" as const,
            children: [
              {
                text: paragraph.trim(),
              },
            ],
            markDefs: [],
          }));

        return {
          _type: "facultyMembers",
          _id: `hardcoded-faculty-${index}`,
          _rev: "1",
          _createdAt: new Date(member.createdAt),
          _updatedAt: new Date(member.updatedAt),
          name: member.name,
          title: member.title,
          image: member.image as any, // Use the direct image path from hardcoded data
          bio: bioBlocks as FacultyMember["bio"],
        };
      },
    );

    return facultyMembers;
  } catch (error) {
    console.error("Error loading faculty members:", error);
    return null;
  }
}
