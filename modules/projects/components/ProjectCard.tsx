"use client";
import React, { useState } from "react";
import { Project } from "@/common/data/projectData";
import Image from "next/image";
import Link from "next/link";
import { ImageOff, Star } from "lucide-react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 group overflow-hidden transition-all duration-300 cursor-pointer !p-0">
      <Link href={`/projects/${project.id}`} className="flex flex-col gap-5 block outline-none h-full w-full">
        {/* Project Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-800">
          {project.isPinned && (
            <div className="absolute top-1 right-1 p-1 z-10">
              <div className="bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-zinc-800/60 rounded-full flex items-center justify-center px-3 py-1.5 shadow-sm" title="Featured Project">
                <Star className="w-3 h-3 fill-zinc-300 mr-1.5" />
                <span className="text-[11px] font-medium tracking-wide uppercase">Featured</span>
              </div>
            </div>
          )}
          {hasImageError ? (
            // Fallback when image fails to load
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-800">
              <ImageOff className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-sm text-center px-4">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
              onError={() => setHasImageError(true)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={85}
            />
          )}
          <div className="absolute inset-0 border border-white/5 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2.5 px-4 pb-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-zinc-100 text-xl font-medium tracking-tight group-hover:text-white transition-colors">{project.title}</h2>
            <span className="text-zinc-500 text-xs shrink-0">{project.launchDate}</span>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>

          {/* Tech Stack - Minimalist text format */}
          <div className="pt-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
            {project.technologies.map((tech, i) => (
              <React.Fragment key={i}>
                <span className="text-zinc-500 text-xs tracking-wide">{tech.name}</span>
                {i < project.technologies.length - 1 && <span className="text-zinc-700 text-xs">&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
