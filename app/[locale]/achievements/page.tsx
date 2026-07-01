import { getTranslations } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import Achievements from "@/modules/achievements";

import { METADATA } from "@/common/constants/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.achievements" });
  
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: `${t("description")} ${METADATA.creator}`,
    alternates: {
      canonical: "/achievements",
    },
  };
}

export default function AchievementsPage() {
  return <Achievements />;
}
