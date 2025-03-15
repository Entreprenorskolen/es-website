import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForProfileImage = (source: Image) => {
  return imageBuilder
    ?.image(source)
    .auto("format")
    .fit("crop")
    .crop("focalpoint")
    .focalPoint(0.5, 0.3) // Positions focus point slightly above center for better face framing
    .width(400)
    .height(400)
    .url();
};
