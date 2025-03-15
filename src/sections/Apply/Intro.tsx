import { SanityBlock, H3 } from "@app/components";
import { Block } from "@app/types";

interface IntroSectionProps {
  title: string;
  content: Block[];
}

export function Intro({ title, content }: IntroSectionProps) {
  return (
    <div className="w-full">
      <H3 className="font-semibold mb-4">{title}</H3>
      <div className="prose max-w-none">
        <SanityBlock blocks={content} />
      </div>
    </div>
  );
}
