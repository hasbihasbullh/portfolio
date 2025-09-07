"use client";
import React from "react";
import { education } from "@/common/data";
import { EducationCard } from "./EducationCard";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <div className="mb-8 lg:mb-10">
      <div className="border-t border-zinc-800 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-zinc-200" />
            <h2 className="text-2xl lg:text-3xl font-bold text-zinc-200">Education</h2>
          </div>
        </div>
        <p className="text-zinc-400 mb-6">My academic journey in software engineering and informatics, equipping me with a strong technical foundation.</p>
        <div className="space-y-6">
          {education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>
      </div>
    </div>
  );
}