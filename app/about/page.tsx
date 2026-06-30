import React from "react";
import { Metadata } from "next";
import About from "@/modules/about";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `About ${METADATA.exTitle}`,
  description: `A short story of ${METADATA.creator}`,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
