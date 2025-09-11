import React from "react";
import { Metadata } from "next";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import Achievements from "@/modules/achievements";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Achievements ${METADATA.exTitle}`,
  description: `A showcase of achievements by ${METADATA.creator}`,
  alternates: {
    canonical: `${process.env.DOMAIN}/achievements`,
  },
};

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <Achievements />
    </div>
  );
}
