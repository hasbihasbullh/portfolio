"use client";
import React, { useMemo } from "react";
import { ProjectCard } from "./ProjectCard";

interface RelatedProjectsProps {
  projectId: string;
  allProjects?: any[];
}

export function RelatedProjects({ projectId, allProjects = [] }: RelatedProjectsProps) {
  const relatedProjects = useMemo(() => {
    const currentProject = allProjects.find((p) => p.slug?.current === projectId || p._id === projectId);
    if (!currentProject) return [];
    // 1. Find projects in the same category
    // 2. Or projects sharing at least one technology
    // 3. Exclude the current project
    // 4. Limit to 2 projects
    const filtered = allProjects.filter((p) => {
      const pId = p.slug?.current || p._id;
      const cId = currentProject.slug?.current || currentProject._id;
      if (pId === cId) return false;

      const sameCategory = p.category && p.category === currentProject.category;
      const sharedTech = p.techStack?.some((tech: any) =>
        currentProject.techStack?.some((currTech: any) => (currTech.name || currTech) === (tech.name || tech))
      );

      return sameCategory || sharedTech;
    });

    // Sort to get the newest related projects
    return filtered
      .sort((a, b) => new Date(b._createdAt || b.createdAt).getTime() - new Date(a._createdAt || a.createdAt).getTime())
      .slice(0, 2);
  }, [projectId, allProjects]);

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-24 mb-16 pt-12 border-t border-zinc-800/50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Related Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedProjects.map((project) => (
          <ProjectCard key={project.slug?.current || project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
