import React from "react";

interface FullWidthContainerProps {
  children: React.ReactNode;
  bgColor?: string;
}

export const FullWidthContainer = ({
  children,
  bgColor = "bg-white",
}: FullWidthContainerProps) => {
  return (
    <div
      className={`w-full relative ${bgColor}`}
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </div>
  );
};
