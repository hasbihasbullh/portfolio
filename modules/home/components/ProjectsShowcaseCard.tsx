"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { projects } from "@/common/data";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsShowcaseCard() {
  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-3 grid grid-cols-2 gap-2" spotlightColor="rgba(255, 255, 255, 0.25)">
      <div className="flex flex-col p-6 item-start">
        <Link href="/projects" aria-label="Go to Projects page">
          <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
            <GalleryVerticalEnd aria-label="Projects icon" />
          </div>
        </Link>
        <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Projects Showcase</h2>
        <p className="text-xs text-zinc-400">A selection of real apps built to solve real problems.</p>
      </div>
      <div className="flex flex-col p-0">
        <div className="max-h-[300px] overflow-y-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar{display:none}]">
          {projects.map((project, index) => (
            <div key={project.id} className="mb-4 cursor-pointer" role="listitem">
              <Link href={project.link} passHref aria-label={`View ${project.title} project`}>
                <div className="rounded-xl bg-zinc-300 p-[3px] dark:bg-zinc-800">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      alt={project.title}
                      width={150}
                      height={100}
                      className="h-auto w-full rounded-lg shadow-xl object-cover transition-transform duration-700 ease-in-out"
                      src={project.image || "/placeholder.svg"}
                      priority={index < 2}
                      loading={index >= 2 ? "lazy" : undefined}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
