"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimateEaseOutProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateEaseOut: React.FC<AnimateEaseOutProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`pt-20 lg:pt-0 ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
