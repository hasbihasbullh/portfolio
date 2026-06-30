import React from "react";
import { Metadata } from "next";
import Home from "@/modules/home";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `${METADATA.creator} | Personal Website`,
  description: `Personal portfolio of ${METADATA.creator}, a freelance web developer and designer specializing in user-centered design and modern web development.`,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
