import React from "react";
import { Metadata } from "next";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import Projects from "@/modules/projects";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Projects ${METADATA.exTitle}`,
  description: `A showcase of projects by ${METADATA.creator}`,
  alternates: {
    canonical: `${process.env.DOMAIN}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />
      <Projects />
    </div>
  );
}
