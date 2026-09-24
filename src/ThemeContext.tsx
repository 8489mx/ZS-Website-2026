import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "emerald" | "hybrid";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("zsystems_theme");
    return (saved as Theme) || "emerald";
  });

  useEffect(() => {
    localStorage.setItem("zsystems_theme", theme);
    if (theme === "hybrid") {
      document.body.classList.add("theme-hybrid");
      document.documentElement.classList.add("theme-hybrid");
    } else {
      document.body.classList.remove("theme-hybrid");
      document.documentElement.classList.remove("theme-hybrid");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
