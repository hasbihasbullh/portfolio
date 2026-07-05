
import React from "react";
import { EducationCard } from "./EducationCard";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export function EducationSection({ sanityEducation = [] }: { sanityEducation?: any[] }) {
  const t = useTranslations("About.Education");

  return (
    <div className="mb-8 lg:mb-10">
      <div className="border-t border-zinc-800 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-zinc-200" />
            <h2 className="text-2xl lg:text-3xl font-bold text-zinc-200">{t("title")}</h2>
          </div>
        </div>
        <p className="text-zinc-400 mb-6">{t("description")}</p>
        <div className="space-y-6">
          {sanityEducation.map((edu, index) => (
            <EducationCard key={edu._id || String(index)} education={edu} />
          ))}
        </div>
      </div>
    </div>
  );
}