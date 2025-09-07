"use client";
import React from "react";

export function AboutHeader() {
  return (
    <div className="mb-8 lg:mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-200 leading-tight mb-4">About Me</h1>
      <p className="text-lg lg:text-xl text-zinc-300 leading-relaxed mb-4 max-w-4xl">
        I am a passionate and detail-oriented software developer with a robust background in full-stack web development and digital marketing. My expertise spans crafting dynamic, user-centric web applications using modern frameworks like Laravel, Next.js, and React.js, complemented by a strong ability to strategize and execute impactful digital advertising campaigns.
      </p>
      <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-4xl">
        My career is driven by a deep curiosity for leveraging technology to solve complex challenges and deliver measurable value. From developing scalable CRUD applications to optimizing e-commerce platforms and managing WordPress ecosystems, I thrive at the intersection of technical innovation and business strategy. I am committed to building intuitive digital solutions that empower businesses and enhance user experiences.
      </p>
    </div>
  );
}