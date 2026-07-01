"use client";
import React from "react";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Separator } from "@/common/components/ui/separator";
import { Search, Filter } from "lucide-react";
import { useTranslations } from "next-intl";

type FilterCategory = "all" | "Application" | "Web Application";

interface ProjectsHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCategory: FilterCategory;
  setFilterCategory: (value: FilterCategory) => void;
}

export function ProjectsHeader({ searchTerm, setSearchTerm, filterCategory, setFilterCategory }: ProjectsHeaderProps) {
  const t = useTranslations("Projects.header");

  return (
    <div className="mb-8 lg:mb-12">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">{t("title")}</h1>

          {/* Search and Filter Controls - Hidden on mobile */}
          <div className="hidden lg:flex flex-col sm:flex-row gap-4 lg:min-w-96 w-full lg:w-auto mt-4 lg:mt-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 focus:border-zinc-700"
                aria-label="Search projects"
              />
            </div>

            <Select value={filterCategory} onValueChange={(value: FilterCategory) => setFilterCategory(value)}>
              <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-zinc-100" aria-label={t("filter")}>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("filter")} />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                  {t("filterAll")}
                </SelectItem>
                <SelectItem value="Application" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                  {t("filterApp")}
                </SelectItem>
                <SelectItem value="Web Application" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                  {t("filterWebApp")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-zinc-400 text-base lg:text-lg max-w-1xl">{t("description")}</p>

        <Separator className="my-6 bg-zinc-800" />
      </div>
    </div>
  );
}
