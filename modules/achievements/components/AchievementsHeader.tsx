"use client";
import React from "react";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Separator } from "@/common/components/ui/separator";
import { Search, Filter } from "lucide-react";
import { useTranslations } from "next-intl";

type FilterType = "all" | "certificate" | "badge";

interface AchievementsHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: FilterType;
  setFilterType: (value: FilterType) => void;
}

export function AchievementsHeader({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}: AchievementsHeaderProps) {
  const t = useTranslations("Achievements.header");

  return (
    <div className="mb-8 lg:mb-12">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">
            {t("title")}
          </h1>

          {/* Search and Filter Controls - Hidden on mobile */}
          <div className="hidden lg:flex flex-col sm:flex-row gap-4 lg:min-w-96">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 focus:border-zinc-700"
                aria-label="Search certificates"
              />
            </div>

            <Select
              value={filterType}
              onValueChange={(value: FilterType) => setFilterType(value)}
            >
              <SelectTrigger
                className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-zinc-100"
                aria-label="Filter certificates by type"
              >
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("filter")} />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem
                  value="all"
                  className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {t("filterAll")}
                </SelectItem>
                <SelectItem
                  value="certificate"
                  className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {t("filterCertificates")}
                </SelectItem>
                <SelectItem
                  value="badge"
                  className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {t("filterBadges")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-zinc-400 text-base lg:text-lg max-w-1xl">
          {t("description")}
        </p>

        <Separator className="my-6 bg-zinc-800" />
      </div>
    </div>
  );
}