"use client";
import React from "react";
import { Separator } from "@/common/components/ui/separator";

export function ContactHeader() {
  return (
    <div className="mb-8 lg:mb-12">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">Let&apos;s Connect</h1>
        </div>
        <p className="text-zinc-400 text-base lg:text-lg max-w-2xl">Ready to collaborate on something amazing? I&apos;d love to hear from you.</p>
        <Separator className="my-6 bg-zinc-800" />
      </div>
    </div>
  );
}