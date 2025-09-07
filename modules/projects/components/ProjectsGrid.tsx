"use client";
import React from "react";
import { Alert, AlertDescription } from "@/common/components/ui/alert";
import { Search } from "lucide-react";
import { Project } from "@/common/data/projectData";
import { ProjectCard } from "./ProjectCard";

interface ProjectsGridProps {
  filteredProjects: Project[];
}

export function ProjectsGrid({ filteredProjects }: ProjectsGridProps) {
  return (
    <div className="mb-16">
      {filteredProjects.length === 0 ? (
        <div className="col-span-full">
          <Alert className="bg-zinc-900 border-zinc-800">
            <Search className="h-4 w-4 text-zinc-400" />
            <AlertDescription className="text-center py-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-100">No projects found</h3>
                <p className="text-zinc-400">
                  Try adjusting your search terms or select a different filter to find what you’re looking for.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}