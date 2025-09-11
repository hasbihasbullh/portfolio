import React from "react";
import { Metadata } from "next";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import Contact from "@/modules/contact";

import { METADATA } from "@/common/constants/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Contact ${METADATA.exTitle}`,
    description: `Get in touch with ${METADATA.creator} for project inquiries or collaborations`,
    alternates: {
      canonical: `${process.env.DOMAIN}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />
      <Contact />
    </div>
  );
}
