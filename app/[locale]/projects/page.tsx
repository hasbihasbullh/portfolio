import { getTranslations } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import Projects from "@/modules/projects";

import { METADATA } from "@/common/constants/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.projects" });
  
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: `${t("description")} ${METADATA.creator}`,
    alternates: {
      canonical: "/projects",
    },
  };
}

import { client } from "@/sanity/lib/client";
import { projectsQuery, profileQuery } from "@/sanity/lib/queries";

export default async function ProjectsPage() {
  const [projects, profile] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(profileQuery)
  ]);
  return <Projects sanityProjects={projects} sanityProfile={profile} />;
}
