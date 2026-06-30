import React from "react";
import { Metadata } from "next";
import Contact from "@/modules/contact";

import { METADATA } from "@/common/constants/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Contact ${METADATA.exTitle}`,
    description: `Get in touch with ${METADATA.creator} for project inquiries or collaborations`,
    alternates: {
      canonical: "/contact",
    },
  };
}

export default function ContactPage() {
  return <Contact />;
}
