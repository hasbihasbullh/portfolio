"use client";
import React, { useMemo } from "react";
import { Project, projects } from "@/common/data/projectData";
import { ProjectCard } from "./ProjectCard";

interface RelatedProjectsProps {
  projectId: string;
}

export function RelatedProjects({ projectId }: RelatedProjectsProps) {
  const relatedProjects = useMemo(() => {
    const currentProject = projects.find((p) => p.id === projectId);
    if (!currentProject) return [];
    // 1. Find projects in the same category
    // 2. Or projects sharing at least one technology
    // 3. Exclude the current project
    // 4. Limit to 2 projects
    const filtered = projects.filter((p) => {
      if (p.id === currentProject.id) return false;

      const sameCategory = p.category === currentProject.category;
      const sharedTech = p.technologies.some((tech) =>
        currentProject.technologies.some((currTech) => currTech.name === tech.name)
      );

      return sameCategory || sharedTech;
    });

    // Sort to get the newest related projects
    return filtered
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2);
  }, [projectId]);

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-24 mb-16 pt-12 border-t border-zinc-800/50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Related Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
