import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="project" className="px-4 sm:px-8 py-10 lg:py-16 sm:py-20 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-20">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-zinc-50">
                Featured Projects
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="ghost" asChild>
            <Link href="/projects" className="group text-xl px-6 py-3">
              View All Projects
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { ProjectCard };