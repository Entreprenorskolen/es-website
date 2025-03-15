import { ParagraphBlue, H2 } from "@app/components";
import { FullWidthContainer } from "@app/components/FullWidthContainer";

interface AboutContentTextProps {
  aboutTitle: string;
  aboutText: string;
}

export const AboutContentText = ({
  aboutTitle,
  aboutText,
}: AboutContentTextProps) => {
  return (
    <FullWidthContainer bgColor="bg-[#F0F7FF]">
      <H2 className="text-center mt-32 mb-32">{aboutTitle}</H2>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-32 mb-32">
        {aboutText.split("\n\n").map((paragraph, index) => (
          <div key={index} className="bg-white p-8 shadow-md rounded-lg">
            <ParagraphBlue>{paragraph}</ParagraphBlue>
          </div>
        ))}
      </div>
    </FullWidthContainer>
  );
};
