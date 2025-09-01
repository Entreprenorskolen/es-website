import { client } from "@app/config";
import { HomePage } from "@app/types";
import {
  HeaderSection,
  InformationSection,
  LogoSection,
  SuccessStoriesSection,
  StatisticsSection,
  IdeaSection,
} from "@app/sections";

export default async function Home() {
  let content: HomePage | null = null;

  try {
    const query = `*[_type == "home"]`;
    const result = await client.fetch<HomePage[]>(
      query,
      {},
      { next: { revalidate: 3600 } }, // ✅ Cache for 1 hour
    );

    if (result && result.length > 0) {
      content = result[0];
    }
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

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
