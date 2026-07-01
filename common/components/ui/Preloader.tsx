"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hasShownPreloader, setPreloaderShown } from "@/common/utils/preloaderState";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Halo",
];

export const Preloader = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    if (hasShownPreloader) {
      setIsLoading(false);
      return;
    }

    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setPreloaderShown(true);
      // Re-enable scrolling after exit animation completes
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.overflowX = "";
      }, 1000);
    }, 2500); // 2.5 seconds total loading time

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;

    const timer = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 800 : 180
    ); // First word shows longer, others flash quickly

    return () => clearTimeout(timer);
  }, [index]);

  if (!hasMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          // Blur out and fade out the entire wrapper
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#09090b] pointer-events-none"
        >
          {/* Language Text Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10 flex items-center gap-4 text-zinc-100 text-4xl md:text-5xl font-medium tracking-wide"
          >
            <span className="w-2.5 h-2.5 bg-zinc-100 rounded-full block animate-pulse"></span>
            {words[index]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
