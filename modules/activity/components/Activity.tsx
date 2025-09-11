"use client";
import React from "react";

import { ActivityHeader } from "./ActivityHeader";
import { GitHubContributions } from "./GitHubContributions";
// import { MonkeytypeStats } from "./MonkeytypeStats";
import { FooterContent } from "@/common/components/layouts/FooterContent";

import { Separator } from "@/common/components/ui/separator";

export const Activity = () => {
  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="pt-20 lg:pt-0">
          <ActivityHeader />
          <GitHubContributions />
          <Separator className="my-8 bg-zinc-800" />
          {/* <MonkeytypeStats/> */}
          <FooterContent />
        </div>
      </div>
    </div>
  );
};
