import React from "react";
import { Metadata } from "next";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import Home from "@/modules/home";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `${METADATA.creator} | Personal Website`,
  description: `Personal portfolio of ${METADATA.creator}, a freelance web developer and designer specializing in user-centered design and modern web development.`,
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />
      <Home />
    </div>
  );
}
