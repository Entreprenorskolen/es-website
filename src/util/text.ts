export function splitTextIntoParagraphs(text: string, maxLength = 200) {
  const result = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxLength;
    if (end < text.length) {
      // Attempt to find a sentence ending near the maximum length
      const possibleEnd = text.substring(start, end + 1); // Include a bit more to find the end
      const lastPeriod = possibleEnd.lastIndexOf(".");
      const lastQuestionMark = possibleEnd.lastIndexOf("?");
      const lastExclamationMark = possibleEnd.lastIndexOf("!");

      // Find the closest sentence-ending punctuation to the end of the chunk
      const sentenceEnd = Math.max(
        lastPeriod,
        lastQuestionMark,
        lastExclamationMark,
      );

      if (sentenceEnd > 0) {
        end = start + sentenceEnd;
      } else {
        // If no sentence-ending punctuation is found, fallback to the original method
        const lastSpace = possibleEnd.lastIndexOf(" ");
        if (lastSpace > 0) {
          end = start + lastSpace;
        }
      }
    }

    // Add the chunk to the result
    result.push(text.substring(start, end + 1).trim());
    start = end + 1; // Move start to the next chunk
  }

  return result;
}
