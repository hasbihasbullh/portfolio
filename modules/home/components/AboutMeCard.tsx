"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import StackImages from "@/common/components/elements/StackImages";
import { profileImages } from "@/common/constants/profileImages";
import { CircleUser } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function AboutMeCard({ sanityProfile }: { sanityProfile?: any }) {
  const t = useTranslations("Home.About");
  const galleryUrls = sanityProfile?.galleryUrls || [];
  
  // Transform dynamic Sanity images to StackImages format, fallback to static if empty
  const dynamicImages = galleryUrls.length > 0 
    ? galleryUrls.map((url: string, index: number) => ({ id: index + 1, img: url }))
    : profileImages;

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-1 flex flex-col h-full w-full" spotlightColor="rgba(245, 158, 11, 0.12)">
      <div className="flex flex-col p-6 pb-0 items-center text-center">
        <Link href="/about" aria-label="Go to About Me page">
          <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
            <CircleUser aria-label="About Me icon" />
          </div>
        </Link>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">{t("title")}</h2>
        <p className="text-xs text-zinc-400">{t("description")}</p>
      </div>
      <div className="flex items-center justify-center p-6 min-h-[220px]">
        {dynamicImages.length > 0 ? (
          <StackImages randomRotation={true} sensitivity={180} sendToBackOnClick={true} cardDimensions={{ width: 150, height: 200 }} cardsData={dynamicImages} />
        ) : (
          <div className="text-zinc-600 text-sm">No images available</div>
        )}
      </div>
    </SpotlightCard>
  );
}
