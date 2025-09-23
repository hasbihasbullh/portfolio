"use client";
import React, { useState } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { AboutHeader } from "./AboutHeader";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { FooterContent } from "@/common/components/layouts/FooterContent";

export default function About() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <AboutHeader />
          <ExperienceSection expandedCard={expandedCard} toggleExpand={toggleExpand} />
          <EducationSection />
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
}
