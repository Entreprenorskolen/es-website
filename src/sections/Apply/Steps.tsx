import { H3 } from "@app/components";
import { PRIMARY_ORANGE } from "@app/constants/colors";

interface StepsSectionProps {
  title: string;
  steps: {
    title: string;
    text: string;
  }[];
  outroText: {
    title: string;
    text: string;
    url: string;
  }[];
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function TextWithUrls({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) =>
        isUrl(word) ? (
          <>
            <a
              key={i}
              href={word}
              style={{ color: PRIMARY_ORANGE }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>{" "}
          </>
        ) : (
          `${word} `
        ),
      )}
    </>
  );
}

export function Steps({ title, steps, outroText }: StepsSectionProps) {
  return (
    <div className="w-full">
      <H3 className="text-2xl font-semibold mb-4">{title}</H3>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <H3 className="font-medium text-lg mb-2">
              {index + 1}. {step.title}
            </H3>
            <p className="text-gray-600">
              <TextWithUrls text={step.text} />
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {outroText.map((item, index) => (
          <div key={index}>
            <H3 className="font-medium text-lg">{item.title}</H3>
            <p className="text-gray-600 mb-2">
              <TextWithUrls text={item.text} />
            </p>
            <a
              href={item.url}
              className="font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: PRIMARY_ORANGE,
              }}
            >
              Les mer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
