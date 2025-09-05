import { HomePage } from "@app/types";
import {
  HeaderSection,
  InformationSection,
  LogoSection,
  SuccessStoriesSection,
  StatisticsSection,
  IdeaSection,
} from "@app/sections";
import { HOME_PAGE_DATA } from "@app/text/home";

export default async function Home() {
  // Use hardcoded data instead of Sanity
  // For now, we'll use the Norwegian version (index 0)
  // Later this can be made dynamic based on language preference
  const homeData = HOME_PAGE_DATA[0];

  // Transform hardcoded data to match HomePage interface
  const content: HomePage = {
    _type: "home",
    _id: "hardcoded-home",
    _rev: "1",
    _createdAt: new Date(),
    _updatedAt: new Date(),
    title: homeData.title,
    description: homeData.description,
    image: homeData.image,
    cta: homeData.cta,
    partners: homeData.partners || [],
    sections: homeData.sections,
    successStories: homeData.successStories || [],
    news: homeData.news || [],
    statistics: homeData.statistics || [],
    contact: homeData.contact,
  };

  // ✅ Show a fallback UI if content is missing
  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p>Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col mt-24">
      {/* ✅ Updated Header Section with CTA */}
      <HeaderSection
        title={content.title || "Welcome"}
        description={content.description || "No description available"}
        image={content.image || null}
        cta={content.cta || null}
      />

      <LogoSection />

      <InformationSection sections={content.sections || []} />

      <SuccessStoriesSection successStories={content.successStories || []} />

      {/* <NewsSection news={content.news || []} /> */}

      <StatisticsSection statistics={content.statistics || []} />

      <IdeaSection content={content} />
    </main>
  );
}
