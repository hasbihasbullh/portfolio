"use client";
import React, { useState, useMemo } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { achievementsData, Achievement } from "@/common/data";
import { AchievementsHeader } from "./AchievementsHeader";
import { AchievementsGrid } from "./AchievementsGrid";
import { FooterContent } from "@/common/components/layouts/FooterContent";

type FilterType = "all" | "certificate" | "badge";

export const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Filter and search logic
  const filteredAchievements = useMemo((): Achievement[] => {
    let filtered: Achievement[] = achievementsData;

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter((item: Achievement) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.issuer.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  }, [searchTerm, filterType]);

  const handleImageError = (achievementId: number) => {
    setImageErrors((prev) => ({ ...prev, [achievementId]: true }));
  };

  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <AchievementsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType} />
          <AchievementsGrid filteredAchievements={filteredAchievements} imageErrors={imageErrors} handleImageError={handleImageError} />
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
};
