"use client";
import React, { useState } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { AboutHeader } from "./AboutHeader";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { FooterContent } from "@/common/components/layouts/FooterContent";

export default function About({ sanityProfile, sanityExperiences = [], sanityEducation = [] }: { sanityProfile?: any, sanityExperiences?: any[], sanityEducation?: any[] }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <AboutHeader sanityProfile={sanityProfile} />
          <ExperienceSection expandedCard={expandedCard} toggleExpand={toggleExpand} sanityExperiences={sanityExperiences} />
          <EducationSection sanityEducation={sanityEducation} />
          <FooterContent sanityProfile={sanityProfile} />
        </AnimateEaseOut>
      </div>
    </div>
  );
}
