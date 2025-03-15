import { HomePage } from "@app/types";
import { FullWidthContainer } from "@app/components/FullWidthContainer";

interface StatisticsSectionProps {
  statistics: HomePage["statistics"];
}

const StatisticsSection = ({ statistics }: StatisticsSectionProps) => {
  return (
    <FullWidthContainer bgColor="bg-[#f97316]">
      <section className="text-white py-12 mt-8 mb-8">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-8 text-center w-full max-w-6xl mx-auto px-4">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-8 md:mb-0"
            >
              <p
                className="text-3xl md:text-5xl font-extrabold mb-2"
                style={{ color: "#ffffff" }}
              >
                {stat.value}
              </p>
              <p
                className="text-base md:text-lg leading-tight font-bold px-2"
                style={{ color: "#ffffff" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </FullWidthContainer>
  );
};

export { StatisticsSection };
