// ThemeContext.tsx
import { createContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}



const toggleTheme = () => {
  const [theme, setTheme] = useState("light");

  const newTheme = theme === "lightMode" ? "darkMode" : "lightMode";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme
});
