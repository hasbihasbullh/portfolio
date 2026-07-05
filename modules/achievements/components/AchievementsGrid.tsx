"use client";
import React from "react";
import { Alert, AlertDescription } from "@/common/components/ui/alert";
import { Search } from "lucide-react";
import { AchievementCard } from "./AchievementCard";

interface AchievementsGridProps {
  filteredAchievements: any[];
  imageErrors: Record<string, boolean>;
  handleImageError: (achievementId: string) => void;
}

export function AchievementsGrid({
  filteredAchievements,
  imageErrors,
  handleImageError,
}: AchievementsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {filteredAchievements.length === 0 ? (
        <div className="col-span-full">
          <Alert className="bg-zinc-900 border-zinc-800">
            <Search className="h-4 w-4 text-zinc-400" />
            <AlertDescription className="text-center py-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-100">No certificates found</h3>
                <p className="text-zinc-400">
                  Try adjusting your search terms or select a different filter to find what you&apos;re looking for.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        filteredAchievements.map((item) => (
          <AchievementCard
            key={item._id || item.id || Math.random().toString()}
            achievement={item}
            hasImageError={imageErrors[item._id || item.id]}
            handleImageError={handleImageError}
          />
        ))
      )}
    </div>
  );
}