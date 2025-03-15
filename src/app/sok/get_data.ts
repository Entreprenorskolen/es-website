import { client } from "@app/config";
import { ApplyPage } from "@app/types";

export async function getData() {
  const query = `*[_type == 'apply'][0]{
    title,
    intro{
      title,
      content
    },
    process{
      title,
      timeline[]{
        date,
        title,
        description
      }
    },
    content{
      title,
      introText,
      informationBoxes[]{
        title,
        text
      }
    },
    steps{
      title,
      steps[]{
        title,
        text
      },
      outroText[]{
        title,
        text,
        url
      }
    },
    FAQ[]{
      _key,
      title,
      content
    }
  }`;

  try {
    const result = await client.fetch<ApplyPage>(
      query,
      {},
      { cache: "no-store" },
    );
    return result;
  } catch (error) {
    console.error("Error fetching apply data:", error);
    return null;
  }
}
