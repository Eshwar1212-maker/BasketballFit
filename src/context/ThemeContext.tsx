import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextProviderProps {
  children: ReactNode;
}

type Theme = {
  currentColor: string;
};

type ThemeContext = {
  theme: Theme;
  setColor: any
};

const ThemeContext = createContext<ThemeContext>({
  theme: { currentColor: "Light" },
  setColor: () => {},
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [currentColor, setCurrentColor] = useState("light");

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    // Update the theme object with the new color value
  };



  return (
    <ThemeContext.Provider value={{currentColor , setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useStateContext = () => useContext(ThemeContext);
