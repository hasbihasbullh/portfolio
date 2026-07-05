"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import MarqueeElement from "@/common/components/elements/MarqueeElement";
import { getIconComponent } from "@/common/utils/iconMapper";
import { Blocks } from "lucide-react";
import { useTranslations } from "next-intl";

export function SkillsToolsCard({ sanitySkills }: { sanitySkills?: any[] }) {
  const t = useTranslations("Home.Skills");

  const frontendSkills = sanitySkills?.filter((s) => s.category === "frontend") || [];
  const backendSkills = sanitySkills?.filter((s) => s.category === "backend") || [];
  const toolsSkills = sanitySkills?.filter((s) => s.category === "tools") || [];
  const mobileSkills = sanitySkills?.filter((s) => s.category === "mobile") || [];
  const aiSkills = sanitySkills?.filter((s) => s.category === "ai") || [];

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col h-full w-full" spotlightColor="rgba(16, 185, 129, 0.12)">
      <div className="flex flex-col p-6 items-center text-center">
        <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
          <Blocks aria-label="Skills icon" />
        </div>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">{t("title")}</h2>
        <p className="text-xs text-zinc-400">{t("description")}</p>
      </div>
      <div className="flex flex-col overflow-x-hidden">
        <div className="space-y-3 lg:space-y-6 mb-6 md:mb-0">
          <MarqueeElement direction="right" withPadding={false}>
            <div className="flex items-center gap-3 px-2">
              {frontendSkills.map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`frontend-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </MarqueeElement>
          <MarqueeElement direction="left" withPadding={false}>
            <div className="flex items-center gap-3 px-2">
              {backendSkills.map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`backend-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </MarqueeElement>
          <MarqueeElement direction="right" withPadding={false}>
            <div className="flex items-center gap-3 px-2">
              {toolsSkills.map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`tools-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </MarqueeElement>
          <MarqueeElement direction="left" withPadding={false}>
            <div className="flex items-center gap-3 px-2">
              {mobileSkills.map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`mobile-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
              {aiSkills.map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`ai-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </MarqueeElement>
        </div>
      </div>
    </SpotlightCard>
  );
}
