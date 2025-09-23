"use client";
import React from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { WelcomeCard } from "./WelcomeCard";
import { AboutMeCard } from "./AboutMeCard";
import { SkillsToolsCard } from "./SkillsToolsCard";
import { AchievementsCard } from "./AchievementsCard";
import { ProjectsShowcaseCard } from "./ProjectsShowcaseCard";
import { FooterContent } from "@/common/components/layouts/FooterContent";

export default function Home() {
  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <div className="mb-8 lg:mb-10">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <WelcomeCard />
              <AboutMeCard />
              <SkillsToolsCard />
              <AchievementsCard />
              <ProjectsShowcaseCard />
            </div>
          </div>
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
}
