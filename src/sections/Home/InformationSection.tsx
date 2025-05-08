import { HomePage } from "@app/types";
import { H2, H4, H3 } from "@app/components";
import { FaLightbulb, FaRocket, FaBullseye, FaChartLine } from "react-icons/fa";
import React from "react";
import { FullWidthContainer } from "@app/components/FullWidthContainer";

interface InformationSectionProps {
  sections?: HomePage["sections"]; // sections is now HomeSection | undefined
}

const InformationSection = ({ sections }: InformationSectionProps) => {
  const icons = [FaLightbulb, FaRocket, FaBullseye, FaChartLine];

  // Use default values if sections or its properties are not available
  const sectionTitle = sections?.sectionTitle || "Mer enn en master";
  const sectionSubtitle =
    sections?.sectionSubtitle ||
    "NTNUs Entreprenørskole skiller seg ut på mer enn én måte.";
  const itemsToRender = sections?.items || [];

  return (
    <FullWidthContainer bgColor="bg-[#FFF5E6]">
      <section className="w-full py-18 my-16">
        <div className="w-11/12 md:w-4/5 lg:w-3/4 mx-auto text-center">
          <H2 className="text-2xl sm:text-3xl mb-4">{sectionTitle}</H2>
          <H4 className="text-gray-600 mt-2 sm:text-xl">
            {sectionSubtitle}
          </H4>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-24 w-11/12 lg:w-[98%] mx-auto">
          {/* Map over sections.items now */}
          {itemsToRender.map((item, index) => (
            <div
              key={item._key || index} // Use _key from Sanity item, or index as fallback
              className="bg-white p-8 shadow-md rounded-lg text-left w-full sm:w-[90%] lg:w-[calc(30%-24px)] flex flex-col min-h-[280px]"
            >
              <div className="flex justify-start mb-6">
                {React.createElement(icons[index % icons.length], {
                  size: 48,
                  style: { color: "#f97316" },
                })}
              </div>

              <H3 className="font-semibold text-lg">{item.title || "Tittel mangler"}</H3>
              <p className="text-gray-500 mt-4 text-base">
                {item.description || "Beskrivelse mangler"}
              </p>

              <a
                href="#" // Consider making this link dynamic if needed
                className="text-black text-xs font-semibold mt-auto pt-6 inline-block hover:text-orange-500 transition-colors"
              >
                Les mer om {item.title || "dette"}
              </a>
            </div>
          ))}
        </div>
      </section>
    </FullWidthContainer>
  );
};

export { InformationSection };
