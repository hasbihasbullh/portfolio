"use client";
import React, { useRef } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!rectRef.current || !divRef.current) return;
    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleFocus = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      divRef.current.style.setProperty("--mouse-x", `${rect.width / 2}px`);
      divRef.current.style.setProperty("--mouse-y", `${rect.height / 2}px`);
      divRef.current.style.setProperty("--spotlight-opacity", "0.6");
    }
  };

  const handleBlur = () => {
    if (divRef.current) {
      divRef.current.style.setProperty("--spotlight-opacity", "0");
    }
  };

  const handleMouseEnter = () => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
      divRef.current.style.setProperty("--spotlight-opacity", "0.6");
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (divRef.current) {
      divRef.current.style.setProperty("--spotlight-opacity", "0");
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[var(--spotlight-opacity,0)] transition-opacity duration-500 ease-in-out"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;

