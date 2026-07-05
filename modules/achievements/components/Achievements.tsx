"use client";
import React, { useState, useMemo } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { AchievementsHeader } from "./AchievementsHeader";
import { AchievementsGrid } from "./AchievementsGrid";
import { FooterContent } from "@/common/components/layouts/FooterContent";

type FilterType = "all" | "certificate" | "badge";

export const Achievements = ({ sanityAchievements = [], sanityProfile }: { sanityAchievements?: any[], sanityProfile?: any }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Filter and search logic
  const filteredAchievements = useMemo(() => {
    let filtered: any[] = sanityAchievements;

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter((item: any) => item.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) || item.title?.id?.toLowerCase().includes(searchTerm.toLowerCase()) || item.issuer?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  }, [searchTerm, filterType, sanityAchievements]);

  const handleImageError = (achievementId: string) => {
    setImageErrors((prev) => ({ ...prev, [achievementId]: true }));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <AchievementsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType} />
          <AchievementsGrid filteredAchievements={filteredAchievements} imageErrors={imageErrors} handleImageError={handleImageError} />
          <FooterContent sanityProfile={sanityProfile} />
        </AnimateEaseOut>
      </div>
    </div>
  );
};
