import { getTranslations } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import About from "@/modules/about";

import { METADATA } from "@/common/constants/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.about" });
  
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: `${t("description")} ${METADATA.creator}`,
    alternates: {
      canonical: "/about",
    },
  };
}

import { client } from "@/sanity/lib/client";
import { profileQuery, experiencesQuery, educationQuery } from "@/sanity/lib/queries";

export default async function AboutPage() {
  const [profile, experiences, education] = await Promise.all([
    client.fetch(profileQuery),
    client.fetch(experiencesQuery),
    client.fetch(educationQuery)
  ]);
  return <About sanityProfile={profile} sanityExperiences={experiences} sanityEducation={education} />;
}
