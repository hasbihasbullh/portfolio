"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import StackImages from "@/common/components/elements/StackImages";
import { profileImages } from "@/common/data";
import { CircleUser } from "lucide-react";
import Link from "next/link";

export function AboutMeCard() {
  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
      <div className="flex flex-col p-6 pb-0 items-center text-center">
        <Link href="/about" aria-label="Go to About Me page">
          <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
            <CircleUser aria-label="About Me icon" />
          </div>
        </Link>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">About Me</h2>
        <p className="text-xs text-zinc-400">Who I am and what I do.</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <StackImages randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 150, height: 200 }} cardsData={profileImages} />
      </div>
    </SpotlightCard>
  );
}
