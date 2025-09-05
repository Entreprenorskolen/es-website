import { getLocalImagePath } from "../../public/images/image-mapping";
import type { Image } from "sanity";

/**
 * Utility function to handle both Sanity images and local image paths
 * This replaces the urlForImage function when using hardcoded data
 */
export function getImageUrl(imageSource: Image | string): string {
  // If it's a string, assume it's already a local path
  if (typeof imageSource === "string") {
    return imageSource;
  }

  // If it's a Sanity image object, extract the reference and map to local path
  if (imageSource && imageSource.asset && imageSource.asset._ref) {
    const localPath = getLocalImagePath(imageSource.asset._ref);
    if (localPath) {
      return localPath;
    }

    // For hardcoded faculty data, check if it's a generated reference
    if (imageSource.asset._ref.startsWith("hardcoded-")) {
      // This is a faculty member, use a safe placeholder
      const name = imageSource.asset._ref
        .replace("hardcoded-", "")
        .replace(/-/g, " ");
      return `https://via.placeholder.com/400x400/cccccc/666666?text=${encodeURIComponent(name)}`;
    }

    // For development/testing, create a placeholder URL with the reference
    console.warn(`Image not found for reference: ${imageSource.asset._ref}`);
    return `https://via.placeholder.com/400x300/cccccc/666666?text=Image+Missing`;
  }

  // Fallback for invalid image data
  return "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
}

/**
 * Helper function to determine if we should use Sanity or local images
 * This can be controlled via environment variable or config
 */
export function shouldUseLocalImages(): boolean {
  return process.env.USE_LOCAL_IMAGES === "true" || true; // Default to true for now
}
