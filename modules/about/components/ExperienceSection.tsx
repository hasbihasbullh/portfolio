"use client";
import React from "react";
import { experiences } from "@/common/data";
import { ExperienceCard } from "./ExperienceCard";
import { Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  expandedCard: string | null;
  toggleExpand: (id: string) => void;
}

export function ExperienceSection({ expandedCard, toggleExpand }: ExperienceSectionProps) {
  return (
    <div className="mb-8 lg:mb-10">
      <div className="border-t border-zinc-800 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-10 h-10 text-zinc-200" />
          <h2 className="text-2xl lg:text-3xl font-bold text-zinc-200">Professional Experience</h2>
        </div>
        <p className="text-zinc-400 mb-6">A journey through my diverse roles in web development, digital marketing, and technical administration, showcasing my ability to deliver impactful solutions.</p>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              expanded={expandedCard === exp.id}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}