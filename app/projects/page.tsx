import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/Project";
import { projects } from "@/lib/projects";
import { VelocityScroll } from "@/components/ui/magicui/scroll-based-velocity";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      <div className="px-4 sm:px-8 py-10 lg:py-16 sm:py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/" className="group inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">All Projects</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
      <VelocityScroll>HSB</VelocityScroll>
      <Footer />
    </main>
  );
}
