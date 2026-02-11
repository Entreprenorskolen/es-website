import React from "react";
import { Block, MarkDefinition } from "@app/types";

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

export function BlockRenderer({ blocks, className = "" }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const renderChild = (
    child: { _key?: string; text: string; marks?: string[] },
    markDefs: MarkDefinition[] = [],
    index: number,
  ): React.ReactNode => {
    const key = child._key || index;
    let content: React.ReactNode = child.text;

    if (child.marks && child.marks.length > 0) {
      for (const markKey of child.marks) {
        if (markKey === "strong") {
          content = <strong key={`${key}-strong`}>{content}</strong>;
        } else if (markKey === "em") {
          content = <em key={`${key}-em`}>{content}</em>;
        } else {
          const markDef = markDefs.find((m) => m._key === markKey);
          if (markDef && markDef._type === "link" && markDef.href) {
            content = (
              <a
                key={`${key}-link`}
                href={markDef.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {content}
              </a>
            );
          }
        }
      }
    }

    return <React.Fragment key={key}>{content}</React.Fragment>;
  };

  const renderBlock = (block: Block, index: number) => {
    const textContent = block.children.map((child, i) =>
      renderChild(child, block.markDefs, i),
    );

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
