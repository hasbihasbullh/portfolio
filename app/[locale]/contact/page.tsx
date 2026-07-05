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

import { client } from "@/sanity/lib/client";
import { profileQuery } from "@/sanity/lib/queries";

export default async function ContactPage() {
  const profile = await client.fetch(profileQuery);
  return <Contact sanityProfile={profile} />;
}
