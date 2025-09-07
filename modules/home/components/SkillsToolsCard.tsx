"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import MarqueeElement from "@/common/components/elements/MarqueeElement";
import { skills } from "@/common/data";
import { Blocks } from "lucide-react";

export function SkillsToolsCard() {
  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
      <div className="flex flex-col p-6 items-center text-center">
        <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
          <Blocks aria-label="Skills icon" />
        </div>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Skills &amp; Tools</h2>
        <p className="text-xs text-zinc-400">Covering mobile, web, AI, and UI/UX technologies.</p>
      </div>
      <div className="flex flex-col overflow-x-hidden">
        <div className="space-y-3 lg:space-y-6 mb-6 md:mb-0">
          <MarqueeElement direction="right" withPadding={false}>
            <div className="flex items-center gap-3 px-2">
              {skills.frontend?.map((skill, index) => {
                const IconComponent = skill.icon;
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
              {skills.backend?.map((skill, index) => {
                const IconComponent = skill.icon;
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
              {skills.tools?.map((skill, index) => {
                const IconComponent = skill.icon;
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
              {skills.mobile?.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={`mobile-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                    <IconComponent className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                  </div>
                );
              })}
              {skills.ai?.map((skill, index) => {
                const IconComponent = skill.icon;
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
