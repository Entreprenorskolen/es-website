import { HomePage } from "@app/types";
import { Title } from "@app/components";
import Link from "next/link";
import { H2 } from "@app/components";

interface NewsSectionProps {
  news: HomePage["news"];
}

const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <section className="w-full py-24 my-24 bg-[#F0F7FF]">
      <div className="w-10/12 md:w-3/5 mx-auto text-center">
        <Title>Nyheter og Publikasjoner</Title>
        <H2 className="text-gray-600 mt-2">
          Hold deg oppdatert på det siste fra NTNU Entreprenørskole
        </H2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-8 w-10/12 mx-auto">
        {news.map((newsItem) => (
          <div
            key={newsItem.title}
            className="bg-white [background-color:white] p-6 shadow-md rounded-lg text-left w-full sm:w-1/2 md:w-1/5 lg:w-1/5 flex flex-col min-h-[300px]"
          >
            <p className="text-gray-400 text-sm mb-4 text-left">
              {newsItem.date}
            </p>
            <H2 className="font-semibold text-lg text-left mb-4">
              {newsItem.title}
            </H2>
            <p className="text-gray-500 text-sm mt-2">{newsItem.description}</p>

            <Link
              href={newsItem.link}
              className="text-sm font-semibold mt-auto pt-4 inline-block"
              style={{ color: "#f97316", fontWeight: "bold" }}
            >
              Les mer
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export { NewsSection };
