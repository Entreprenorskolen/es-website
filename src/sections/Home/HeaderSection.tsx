"use client";

import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import { Button, Title, P } from "@app/components";
import Link from "next/link";
import { HomePage } from "@app/types";
import { HeaderSectionWrapper } from "@app/sections";
import { useState } from "react";

interface HeaderSectionProps {
  title: HomePage["title"];
  description: HomePage["description"];
  image: HomePage["image"];
  cta: HomePage["cta"];
}

const HeaderSection = ({
  title,
  image,
  description,
  cta,
}: HeaderSectionProps) => {
  const [imageHeight, setImageHeight] = useState<number>(400);

  return (
    <HeaderSectionWrapper minHeight={imageHeight}>
      <div className="w-full flex flex-col md:flex-row justify-between items-center mx-auto mt-2 mb-8">
        {/* ✅ Hero Image - Moved to top for mobile */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:order-2 md:ml-12">
          <Image
            src={getImageUrl(image)}
            alt="Hero Image"
            width={500}
            height={400}
            className="rounded-lg w-full"
            onLoad={({ target }) =>
              setImageHeight((target as HTMLImageElement).naturalHeight)
            }
          />
        </div>

        {/* ✅ Text Content */}
        <div className="w-full md:w-1/2 text-left md:order-1">
          <Title className="text-secondary mb-4">{title}</Title>
          <P className="mt-2 text-base md:text-lg text-gray-600">
            {description}
          </P>

          {/* ✅ CTA Button */}
          {cta && (
            <div className="mt-6 flex gap-2">
              <Button
                variant="default"
                asChild
                size="lg"
                className="px-16 py-6 text-lg"
                style={{
                  backgroundColor: "#f97316",
                  color: "#ffffff",
                }}
              >
                <Link href={cta.link}>{cta.text}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderSectionWrapper>
  );
};

export { HeaderSection };
