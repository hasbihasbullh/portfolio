"use client";
import React from "react";
import { Separator } from "@/common/components/ui/separator";

export function ActivityHeader() {
  return (
    <div className="mb-8">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">Activity</h1>
        </div>
        <p className="text-zinc-400 text-base lg:text-lg max-w-1xl">A dynamic platform Information, designed to track and visualize real-time development activities, contributions, and performance metrics.</p>
        <Separator className="my-6 bg-zinc-800" />
      </div>
    </div>
  );
}
