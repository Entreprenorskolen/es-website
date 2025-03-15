import { FullWidthContainer } from "@app/components/FullWidthContainer";

interface AlumniHeaderProps {
  mainTitle: string;
  titleText: string;
}

export function AlumniHeader({ mainTitle, titleText }: AlumniHeaderProps) {
  return (
    <FullWidthContainer bgColor="bg-[#002B4E]">
      <div className="w-full py-16 md:py-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold w-full md:w-1/3 mb-4 md:mb-0"
            style={{
              color: "white",
            }}
          >
            {mainTitle}
          </h1>
          <p
            className="text-base md:text-lg max-w-xl md:w-1/2 leading-relaxed"
            style={{
              color: "white",
            }}
          >
            {titleText}
          </p>
        </div>
      </div>
    </FullWidthContainer>
  );
}
