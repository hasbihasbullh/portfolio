"use client";
import React from "react";
import { Achievement } from "@/common/data";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { getTypeIcon, getTypeBadgeVariant } from "./achievementUtils";

interface AchievementCardProps {
  achievement: Achievement;
  hasImageError: boolean;
  handleImageError: (achievementId: number) => void;
}

export function AchievementCard({
  achievement,
  hasImageError,
  handleImageError,
}: AchievementCardProps) {
  return (
    <SpotlightCard
      className="bg-zinc-900/50 border-zinc-800 group overflow-hidden transition-all duration-300 cursor-pointer !p-0"
    >
      {/* Certificate Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        {hasImageError ? (
          // Fallback when image fails to load
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-800">
            <Award className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-sm text-center px-4">Certificate Image</span>
          </div>
        ) : (
          <Image
            src={achievement.image}
            alt={`Sertifikat ${achievement.title} dari ${achievement.issuer} diterbitkan pada ${achievement.issuedOn}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => handleImageError(achievement.id)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6i+gaVUoUS4udNcwuBvdgeCUtxbeI/fkjqGDC3Ew=="
          />
        )}

        {/* Achievement Type Badge */}
        <div className="absolute top-1 right-1 p-1">
          <Badge
            variant={getTypeBadgeVariant(achievement.type)}
            className={`gap-1 ${
              achievement.type === "badge"
                ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
                : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            }`}
          >
            {getTypeIcon(achievement.type)}
            <span className="capitalize text-xs">{achievement.type}</span>
          </Badge>
        </div>

        {/* Credential ID Badge */}
        {achievement.credentialId && (
          <div className="absolute bottom-1 left-1 p-1">
            <Badge
              variant="outline"
              className="gap-1 bg-zinc-900 text-zinc-100 border-zinc-700 hover:bg-zinc-800 text-xs"
            >
              <span>{achievement.credentialId}</span>
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 bg-transparent text-white hover:bg-white/20"
            onClick={() => window.open(achievement.credentialUrl, "_blank", "noopener,noreferrer")}
          >
            View Credentials
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-1 ">
        <h3 className="text-base line-clamp-2 leading-tight text-zinc-100">
          {achievement.title}
        </h3>
        <p className="font-medium text-zinc-400">{achievement.issuer}</p>
        <p className="text-sm font-medium text-zinc-700">Issued on</p>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>{achievement.issuedOn}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}