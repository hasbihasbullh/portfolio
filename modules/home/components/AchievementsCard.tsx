"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Folder from "@/common/components/elements/Folder";
import { achievementsData } from "@/common/data";
import { Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AchievementsCard() {
  const achievementItems = achievementsData.slice(0, 3).map((achievement, index) => (
    <Link key={achievement.id} href={achievement.credentialUrl} aria-label={`View ${achievement.title}`}>
      <Image
        src={achievement.image}
        alt={`Achievement: ${achievement.title} from ${achievement.issuer}`}
        width={85}
        height={60}
        className="object-cover w-full h-full rounded-lg"
        priority={index === 0}
        loading={index > 0 ? "lazy" : undefined}
      />
    </Link>
  ));

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
      <div className="flex flex-col p-6 items-center text-center">
        <Link href="/achievements" aria-label="Go to Achievements page">
          <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
            <Award aria-label="Achievements icon" />
          </div>
        </Link>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Achievements</h2>
        <p className="text-xs text-zinc-400">Milestones from programs, projects, and communities.</p>
      </div>
      <div className="mb-4 mt-9 flex w-full items-center justify-center">
        <Folder size={0.9} color="#4BD3FF" className="custom-folder" items={achievementItems} />
      </div>
    </SpotlightCard>
  );
}
