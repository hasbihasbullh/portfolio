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

export default function AboutPage() {
  return <About />;
}
