import { client } from "@app/config";
import { SolanLinjeforeningPage } from "@app/types";

export async function useSolanLinjeforening() {
  const query = `*[_type == 'solanLinjeforening'][0]{
    title,
    description,
    solanUrl,
    videoTitle,
    video
  }`;

  try {
    const data = await client.fetch<SolanLinjeforeningPage>(
      query,
      {},
      { cache: "no-store" },
    );
    return { data };
  } catch (error) {
    console.error("Error fetching Solan Linjeforening data:", error);
    return { data: null };
  }
}
