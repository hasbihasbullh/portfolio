"use client";
import React from "react";
import { Project } from "@/common/data/projectData";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Globe, ArrowRight } from "lucide-react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 group overflow-hidden rounded-2xl !p-0">
      {/* Project Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60" />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.link && project.status === "Live" && (
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 text-zinc-900 rounded-full flex items-center justify-center shadow-lg" title="Live Demo">
              <Globe className="w-4 h-4" />
            </Link>
          )}
          {project.githubLink && (
            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-800/90 text-white rounded-full flex items-center justify-center shadow-lg" title="Source Code">
              <FaGithub className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${project.status === "Live" ? "bg-green-500/90 text-white border-0 shadow-lg" : "bg-red-500/90 text-white border-0 shadow-lg"} text-xs font-semibold px-3 py-1`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${project.status === "Live" ? "bg-green-300" : "bg-red-300"}`} />
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="pb-4 px-8 pt-6">
        <h2 className="text-white text-xl font-bold">{project.title}</h2>
        <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">{project.description}</p>

        {/* Category & Date */}
        <div className="flex items-center gap-3 pt-2">
          <Badge variant="outline" className="text-zinc-400 border-zinc-600 text-xs">
            {project.category}
          </Badge>
          <span className="text-zinc-500 text-xs">{project.launchDate}</span>
        </div>
      </div>

      <div className="px-8 py-0">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, techIndex) => {
            const TechIcon = tech.reactIcon;
            return (
              <div key={techIndex} className="flex items-center justify-center bg-zinc-800/60 w-10 h-10 rounded-lg" title={tech.name}>
                <TechIcon className={`w-6 h-6 ${tech.color || ""}`} />
              </div>
            );
          })}
          {project.technologies.length > 3 && (
            <div className="flex items-center justify-center bg-zinc-800/60 w-10 h-10 rounded-lg">
              <span className="text-zinc-400 text-xs font-medium">+{project.technologies.length - 3}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 px-8 pb-8">
        <Button asChild className="w-full bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all shadow-sm">
          <Link href={`/projects/${project.id}`}>
            View Details
            <ArrowRight className="ml-2 w-3 h-3" />
          </Link>
        </Button>
      </div>
    </SpotlightCard>
  );
}
