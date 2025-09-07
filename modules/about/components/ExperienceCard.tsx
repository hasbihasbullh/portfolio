"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ChevronDown, ChevronUp, Briefcase, Code, Zap } from "lucide-react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { Experience } from "@/common/data";

interface ExperienceCardProps {
  experience: Experience;
  expanded?: boolean;
  toggleExpand?: (id: string) => void;
}

export function ExperienceCard({ experience, expanded, toggleExpand }: ExperienceCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(expanded || false);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleToggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (toggleExpand) {
      toggleExpand(experience.id);
    }
  };

  const getTypeConfig = (type: string) => {
    const configs = {
      internship: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Code },
      "part-time": { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Clock },
      "full-time": { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Briefcase },
      training: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: Zap },
      apprentice: { color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", icon: Code },
    };
    return configs[type as keyof typeof configs] || configs.internship;
  };

  const getWorkModeConfig = (workMode: string) => {
    const configs = {
      remote: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Remote" },
      onsite: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Onsite" },
      hybrid: { color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", label: "Hybrid" },
    };
    return configs[workMode as keyof typeof configs] || configs.onsite;
  };

  const typeConfig = getTypeConfig(experience.type);
  const workModeConfig = getWorkModeConfig(experience.workMode);
  const TypeIcon = typeConfig.icon;

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 !p-6 md:col-span-2 group">
      {/* Mobile: Column layout with centered content */}
      <div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-zinc-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center p-3 border border-zinc-700/50 relative overflow-hidden">
            {isLoading && <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-800 animate-pulse" />}

            {!imageError ? (
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={100}
                height={100}
                className={`w-full h-full object-contain transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"} group-hover:scale-105`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                quality={90}
              />
            ) : (
              <TypeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-500" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between sm:mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-200 leading-tight">{experience.title}</h3>
            <div className="flex gap-2 flex-shrink-0">
              <span className={`px-2 py-1 text-xs rounded-full border ${typeConfig.color} capitalize`}>{experience.type}</span>
              <span className={`px-2 py-1 text-xs rounded-full border ${workModeConfig.color}`}>{workModeConfig.label}</span>
            </div>
          </div>

          {/* Company */}
          <div className="mb-4 sm:mb-3">
            <p className="text-sm sm:text-base text-zinc-300 font-medium">{experience.company}</p>
          </div>

          {/* Duration and Location */}
          <div className="flex flex-col items-center gap-3 text-sm text-zinc-400 mb-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <div className="border-l-2 border-zinc-700/50 pl-4 mb-4">
              <p className="text-sm text-zinc-400 leading-relaxed">{experience.description}</p>
            </div>
          )}

          {/* Expand/Collapse Button */}
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={handleToggleExpand}
                aria-expanded={isExpanded}
                aria-controls={`responsibilities-${experience.id}`}
                className="flex items-center text-zinc-400 hover:text-zinc-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-md px-2 py-1"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                {isExpanded ? "Hide responsibilities" : "Show responsibilities"}
              </button>
            </div>
          )}

          {/* Responsibilities */}
          {isExpanded && experience.responsibilities && (
            <div id={`responsibilities-${experience.id}`} className="mt-4 pt-4 border-t border-zinc-700/50 transition-all duration-300">
              <h4 className="text-sm font-medium text-zinc-300 mb-3">Key Responsibilities:</h4>
              <ul className="space-y-2">
                {experience.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start text-sm text-zinc-400">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="leading-relaxed">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
