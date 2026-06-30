import React from "react";
import { Metadata } from "next";
import Activity from "@/modules/activity";

import { METADATA } from "@/common/constants/metadata";
export const metadata: Metadata = {
  title: `Activity ${METADATA.exTitle}`,
  description: `A collection of activities and projects by ${METADATA.creator}`,
  alternates: {
    canonical: "/activity",
  },
};

export default function ActivityPage() {
  return <Activity />;
}
