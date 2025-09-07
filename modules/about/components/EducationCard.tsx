"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, GraduationCap } from "lucide-react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { Education } from "@/common/data";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    const statusConfig = {
      ongoing: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Ongoing" },
      completed: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Completed" },
      paused: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "Paused" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return <span className={`px-2 py-1 text-xs rounded-full border ${config.color}`}>{config.label}</span>;
  };

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
                src={education.logo}
                alt={`${education.title} logo`}
                width={100}
                height={100}
                className={`w-full h-full object-contain transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"} group-hover:scale-105`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                quality={90}
              />
            ) : (
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-500" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          {/* Header with Status */}
          <div className="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between sm:mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-200 leading-tight">{education.title}</h3>
            {getStatusBadge(education.status)}
          </div>

          {/* Degree */}
          <div className="mb-4 sm:mb-3">
            <p className="text-sm sm:text-base text-zinc-300 font-medium">{education.degree}</p>
          </div>

          {/* Duration and Location */}
          <div className="flex flex-col items-center gap-3 text-sm text-zinc-400 mb-4 sm:items-start sm:gap-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{education.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{education.location}</span>
            </div>
          </div>

          {/* Description */}
          {education.description && (
            <div className="border-l-2 border-zinc-700/50 pl-4 mb-4 sm:mb-0">
              <p className="text-sm text-zinc-400 leading-relaxed">{education.description}</p>
            </div>
          )}

          {/* GPA if available */}
          {education.gpa && (
            <div className="mt-4 sm:mt-3">
              <div className="inline-flex items-center px-3 py-1 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <span className="text-xs text-zinc-400 mr-2">GPA:</span>
                <span className="text-sm font-medium text-zinc-200">{education.gpa}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
