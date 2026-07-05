"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Folder from "@/common/components/elements/Folder";
import { Award } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function AchievementsCard({ sanityAchievements }: { sanityAchievements?: any[] }) {
  const t = useTranslations("Home.Achievements");

  const displayAchievements = sanityAchievements && sanityAchievements.length > 0 ? sanityAchievements : [];

  const achievementItems = displayAchievements.slice(0, 3).map((achievement, index) => {
    const title = achievement.title?.en || achievement.title || "Achievement";
    return (
      <Link key={achievement.id || index} href={achievement.certificateUrl || achievement.credentialUrl || "#"} aria-label={`View ${title}`} target="_blank">
        <Image
          src={achievement.imageUrl || achievement.image || "/placeholder.svg"}
          alt={`Achievement: ${title} from ${achievement.issuer}`}
          width={85}
          height={60}
          className="object-cover w-full h-full rounded-lg"
          priority={index === 0}
          loading={index > 0 ? "lazy" : undefined}
        />
      </Link>
    );
  });

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col h-full w-full" spotlightColor="rgba(6, 182, 212, 0.12)">
      <div className="flex flex-col p-6 items-center text-center">
        <Link href="/achievements" aria-label="Go to Achievements page">
          <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
            <Award aria-label="Achievements icon" />
          </div>
        </Link>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">{t("title")}</h2>
        <p className="text-xs text-zinc-400">{t("description")}</p>
      </div>
      <div className="mb-4 mt-9 flex w-full items-center justify-center">
        <Folder size={0.9} color="#4BD3FF" className="custom-folder" items={achievementItems} />
      </div>
    </SpotlightCard>
  );
}
