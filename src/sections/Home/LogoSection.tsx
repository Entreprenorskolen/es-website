"use client";

import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import { useStartups } from "@app/hooks";

const LogoSection = () => {
  const { startups: inhouseStartups } = useStartups("inhouse");
  const { startups: alumniStartups } = useStartups("alumni");

  // Make sure both arrays exist before spreading
  const allStartups = [
    ...(inhouseStartups || []),
    ...(alumniStartups || []),
  ].filter(Boolean); // Remove any undefined/null values

  if (!allStartups.length) {
    return null;
  }

  // Calculate the total width needed for the animation
  const totalWidth = allStartups.length * (80 + 64); // 80px for logo + 64px for gap (16 * 4)

  return (
    <section className="w-full pt-32 pb-32 border-t border-gray-300 overflow-hidden">
      <div className="relative w-full">
        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
        <div
          className="flex gap-16"
          style={{
            animation: "slide 100s linear infinite",
            width: `${totalWidth * 2}px`,
            animationPlayState: "running",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {/* First set */}
          <div className="flex gap-16 items-center shrink-0">
            {allStartups.map((startup, index) => (
              <div key={`logo1-${index}`} className="w-[80px] flex-shrink-0">
                <Image
                  src={getImageUrl(startup.logo)}
                  alt={startup.name}
                  width={80}
                  height={32}
                  className="transition-all duration-300"
                />
              </div>
            ))}
          </div>
          {/* Second set */}
          <div className="flex gap-16 items-center shrink-0">
            {allStartups.map((startup, index) => (
              <div key={`logo2-${index}`} className="w-[80px] flex-shrink-0">
                <Image
                  src={getImageUrl(startup.logo)}
                  alt={startup.name}
                  width={80}
                  height={32}
                  className="transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { LogoSection };
