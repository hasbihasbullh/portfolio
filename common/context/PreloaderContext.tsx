"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const PreloaderContext = createContext({
  isPreloaderDone: false,
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    // This matches the time when the preloader starts to fade out (2500ms) + 600ms of its 800ms fade out duration
    // We add this offset so the animation triggers right as the preloader is mostly transparent
    const timer = setTimeout(() => {
      setIsPreloaderDone(true);
    }, 3100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
