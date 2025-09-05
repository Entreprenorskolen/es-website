import React from "react";
import { Block, MarkDefinition } from "@app/types";

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

interface ProcessedChild {
  text: string;
  marks?: string[];
  markDefs?: MarkDefinition[];
}

export function BlockRenderer({ blocks, className = "" }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const processChildren = (
    children: { text: string }[],
    markDefs: MarkDefinition[] = [],
  ): ProcessedChild[] => {
    return children.map((child) => ({
      text: child.text,
      marks: [], // We'll handle marks if needed in the future
      markDefs,
    }));
  };

  const renderTextWithMarks = (child: ProcessedChild) => {
    let text = child.text;

    // Handle links and other marks if markDefs are present
    if (child.markDefs && child.markDefs.length > 0) {
      // For now, we'll render plain text
      // In the future, we can add support for links, bold, italic, etc.
      return text;
    }

    return text;
  };

  const renderBlock = (block: Block, index: number) => {
    const processedChildren = processChildren(block.children, block.markDefs);
    const textContent = processedChildren.map(renderTextWithMarks).join("");

    // Handle different block styles
    switch (block.style) {
      case "h1":
        return (
          <h1 key={block._key || index} className="text-3xl font-bold mb-4">
            {textContent}
          </h1>
        );
      case "h2":
        return (
          <h2 key={block._key || index} className="text-2xl font-bold mb-3">
            {textContent}
          </h2>
        );
      case "h3":
        return (
          <h3 key={block._key || index} className="text-xl font-semibold mb-2">
            {textContent}
          </h3>
        );
      case "h4":
        return (
          <h4 key={block._key || index} className="text-lg font-semibold mb-2">
            {textContent}
          </h4>
        );
      case "h5":
        return (
          <h5
            key={block._key || index}
            className="text-base font-semibold mb-2"
          >
            {textContent}
          </h5>
        );
      case "h6":
        return (
          <h6 key={block._key || index} className="text-sm font-semibold mb-2">
            {textContent}
          </h6>
        );
      case "normal":
      default:
        // Handle list items
        if (block.listItem) {
          return (
            <li key={block._key || index} className="mb-1">
              {textContent}
            </li>
          );
        }

        // Regular paragraph
        return (
          <p key={block._key || index} className="mb-3 last:mb-0">
            {textContent}
          </p>
        );
    }
  };

  // Group consecutive list items together
  const renderBlocks = () => {
    const elements: React.ReactNode[] = [];
    let currentList: Block[] = [];
    let currentListType: "bullet" | "number" | null = null;

    blocks.forEach((block, index) => {
      if (block.listItem) {
        // If this is a list item
        if (currentListType === block.listItem) {
          // Same list type, add to current list
          currentList.push(block);
        } else {
          // Different list type or first list item
          if (currentList.length > 0) {
            // Render the previous list
            const ListTag = currentListType === "bullet" ? "ul" : "ol";
            elements.push(
              <ListTag
                key={`list-${index}`}
                className="mb-3 list-disc list-inside"
              >
                {currentList.map((listBlock, listIndex) =>
                  renderBlock(listBlock, listIndex),
                )}
              </ListTag>,
            );
          }
          // Start new list
          currentList = [block];
          currentListType = block.listItem;
        }
      } else {
        // Not a list item
        if (currentList.length > 0) {
          // Render the current list first
          const ListTag = currentListType === "bullet" ? "ul" : "ol";
          elements.push(
            <ListTag
              key={`list-${index}`}
              className="mb-3 list-disc list-inside"
            >
              {currentList.map((listBlock, listIndex) =>
                renderBlock(listBlock, listIndex),
              )}
            </ListTag>,
          );
          currentList = [];
          currentListType = null;
        }
        // Render the regular block
        elements.push(renderBlock(block, index));
      }
    });

    // Render any remaining list items
    if (currentList.length > 0) {
      const ListTag = currentListType === "bullet" ? "ul" : "ol";
      elements.push(
        <ListTag key="list-final" className="mb-3 list-disc list-inside">
          {currentList.map((listBlock, listIndex) =>
            renderBlock(listBlock, listIndex),
          )}
        </ListTag>,
      );
    }

    return elements;
  };

  return (
    <div className={`prose max-w-none ${className}`}>{renderBlocks()}</div>
  );
}
