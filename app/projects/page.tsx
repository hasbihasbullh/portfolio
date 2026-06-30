import React from "react";
import { Metadata } from "next";
import Projects from "@/modules/projects";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Projects ${METADATA.exTitle}`,
  description: `A showcase of projects by ${METADATA.creator}`,
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <Projects />;
}
