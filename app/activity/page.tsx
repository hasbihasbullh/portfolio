import React from "react";
import { Metadata } from "next";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import Activity from "@/modules/activity";

import { METADATA } from "@/common/constants/metadata";
export const metadata: Metadata = {
  title: `Activity ${METADATA.exTitle}`,
  description: `A collection of activities and projects by ${METADATA.creator}`,
  alternates: {
    canonical: `${process.env.DOMAIN}/activity`,
  },
};

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />
      <Activity />
    </div>
  );
}
