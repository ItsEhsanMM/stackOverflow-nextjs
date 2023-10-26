"use client";
import React, { useState, createContext, useEffect, useContext } from "react";

interface contextType {
   mode: string;
   setMode: (mode: string) => void;
}

const ThemeContext = createContext<contextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [mode, setMode] = useState("");

   const handleThemeChange = () => {
      mode === "dark" ? setMode("light") : setMode("dark");
   };

   useEffect(() => {
      handleThemeChange();
   }, [mode]);

   return (
      <ThemeContext.Provider value={{ mode, setMode }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => {
   const context = useContext(ThemeContext);

   if (context === undefined)
      throw new Error("useTheme must be used within a theme provider");
};
