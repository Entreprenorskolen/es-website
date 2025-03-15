import { SanityBlock, H3 } from "@app/components";
import { PRIMARY_BLUE, PRIMARY_ORANGE } from "@app/constants/colors";
import { Block } from "@app/types";

interface ProcessSectionProps {
  title: string;
  timeline: {
    date: string;
    title: string;
    description: Block[];
  }[];
}

export function Process({ title, timeline }: ProcessSectionProps) {
  return (
    <div className="w-full">
      <H3 className="text-2xl font-semibold mb-4">{title}</H3>
      <div className="mt-8 space-y-8">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 border-l-2"
            style={{ borderColor: PRIMARY_ORANGE }}
          >
            <div className="absolute -left-[9px] top-0">
              <div className="w-4 h-4 bg-orange-500 rounded-full" />
            </div>
            <div className="mb-2">
              <span
                className="font-medium"
                style={{
                  color: PRIMARY_BLUE,
                  fontWeight: "bold",
                }}
              >
                {item.date}
              </span>
              <span
                className="500 mx-2"
                style={{
                  color: PRIMARY_ORANGE,
                }}
              >
                —
              </span>
              <span
                className="font-medium"
                style={{
                  color: PRIMARY_BLUE,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </span>
            </div>
            <div className="prose max-w-none">
              <SanityBlock blocks={item.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
