"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ColorContextType {
  navbarColor: string;
  footerColor: string;
  setColors: (colors: { navbarColor: string; footerColor: string }) => void;
}

export const ColorContext = createContext<ColorContextType>({
  navbarColor: "bg-white",
  footerColor: "bg-[#FFF5E6]",
  setColors: () => {},
});

export const useColors = () => useContext(ColorContext);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState({
    navbarColor: "bg-white",
    footerColor: "bg-[#FFF5E6]",
  });

  return (
    <ColorContext.Provider
      value={{
        ...colors,
        setColors,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
