"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { hasShownPreloader, setPreloaderShown } from "@/common/utils/preloaderState";

const PreloaderContext = createContext({
  isPreloaderDone: false,
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    if (hasShownPreloader) {
      setIsPreloaderDone(true);
      return;
    }

    const desktop = window.innerWidth >= 768;
    const baseDelay = desktop ? 2500 : 1200;
    const fadeOffset = desktop ? 600 : 300;

    // This matches the time when the preloader starts to fade out + part of its fade out duration
    // We add this offset so the animation triggers right as the preloader is mostly transparent
    const timer = setTimeout(() => {
      setIsPreloaderDone(true);
      setPreloaderShown(true);
    }, baseDelay + fadeOffset); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
