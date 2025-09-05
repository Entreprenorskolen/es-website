import React from "react";
import { BlockRenderer, H3 } from "@app/components";
import {
  IconFileText,
  IconKey,
  IconChartBar,
  IconFiles,
} from "@tabler/icons-react";
import { PRIMARY_ORANGE } from "@app/constants/colors";
import { Block } from "@app/types";
const icons = [IconFileText, IconKey, IconChartBar, IconFiles];

interface ContentSectionProps {
  title: string;
  introText: Block[];
  informationBoxes: {
    title: string;
    text: string;
  }[];
}

export function Content({
  title,
  introText,
  informationBoxes,
}: ContentSectionProps) {
  return (
    <div className="w-full">
      <H3 className="text-2xl font-semibold mb-4">{title}</H3>
      <BlockRenderer blocks={introText} className="mb-8" />

      <div className="mt-16 flex flex-wrap justify-center gap-8 w-full">
        {informationBoxes.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 shadow-md rounded-lg text-left w-full sm:w-[90%] lg:w-[calc(50%-16px)] flex flex-col min-h-[200px]"
          >
            <div className="flex justify-start mb-6">
              {React.createElement(icons[index % icons.length], {
                size: 48,
                style: { color: PRIMARY_ORANGE },
              })}
            </div>
            <H3 className="font-semibold text-lg">{item.title}</H3>
            <p className="text-gray-500 mt-4 text-base">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
