import React from "react";
import { Metadata } from "next";
import Achievements from "@/modules/achievements";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Achievements ${METADATA.exTitle}`,
  description: `A showcase of achievements by ${METADATA.creator}`,
  alternates: {
    canonical: "/achievements",
  },
};

export default function AchievementsPage() {
  return <Achievements />;
}
