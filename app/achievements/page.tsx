import React from "react";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";

import  Achievements from "@/modules/achievements";

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <Achievements/>
    </div>
  );
}