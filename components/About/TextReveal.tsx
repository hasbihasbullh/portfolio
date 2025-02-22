"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  text: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end 70%"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative", className)}>
      <p className="flex flex-wrap text-xl sm:text-2xl leading-loose mb-12">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(start + 1.5 / words.length, 1);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1], {
    clamp: false,
  });

  return (
    <span className="relative mx-1.5 lg:mx-3">
      <span className="absolute opacity-30 text-zinc-400">{children}</span>
      <motion.span style={{ opacity }} className="text-zinc-400">
        {children}
      </motion.span>
    </span>
  );
};
