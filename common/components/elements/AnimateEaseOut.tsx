"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@/common/context/PreloaderContext";

interface AnimateEaseOutProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateEaseOut: React.FC<AnimateEaseOutProps> = ({ children, className = "" }) => {
  const { isPreloaderDone } = usePreloader();

  return (
    <motion.div
      className={`pt-20 lg:pt-0 ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={isPreloaderDone ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
