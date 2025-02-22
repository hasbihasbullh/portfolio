"use client";

import React, { forwardRef, useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaGitAlt, FaLaravel } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiExpress, SiMysql } from "react-icons/si";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/magicui/animated-beam";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn("z-10 flex w-16 h-16 items-center justify-center p-3 [0_0_20px_-12px_rgba(0,0,0,0.8)] ", className)}>
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function Skills({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);
  const div11Ref = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative flex w-full items-center justify-center overflow-hidden", className)} ref={containerRef}>
      <div className="flex size-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-14">
          <Circle ref={div1Ref}>
            <FaHtml5 size={50} />
          </Circle>
          <Circle ref={div2Ref}>
            <FaCss3Alt size={50} />
          </Circle>
          <Circle ref={div3Ref}>
            <FaJsSquare size={50} />
          </Circle>
          <Circle ref={div4Ref}>
            <SiTypescript size={50} />
          </Circle>
          <Circle ref={div5Ref}>
            <SiNextdotjs size={50} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref}>
            <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
              <p className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2">Skills</p>
            </div>
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-14">
          <Circle ref={div7Ref}>
            <FaNodeJs size={50} />
          </Circle>
          <Circle ref={div8Ref}>
            <FaLaravel size={50} />
          </Circle>
          <Circle ref={div9Ref}>
            <SiExpress size={50} />
          </Circle>
          <Circle ref={div10Ref}>
            <FaGitAlt size={50} />
          </Circle>
          <Circle ref={div11Ref}>
            <SiMysql size={50} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div6Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div8Ref} toRef={div6Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div9Ref} toRef={div6Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div10Ref} toRef={div6Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div11Ref} toRef={div6Ref} reverse />
    </div>
  );
}