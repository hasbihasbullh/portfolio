"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { projects } from "@/lib/projects";
import { VelocityScroll } from "@/components/ui/magicui/scroll-based-velocity";
import Footer from "@/components/Footer";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-200">
        <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Project not found</h1>
          <Button variant="ghost" asChild className="mt-4">
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      <div className="px-4 sm:px-8 py-10 lg:py-16 max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects" className="group inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </Button>

        <div className="space-y-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image src={project.image} alt={project.title} width={1200} height={600} className="w-full object-cover rounded-lg" />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{project.title}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">About the Project</h2>
                <p className="text-zinc-400">{project.fullDescription}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {(project.demoUrl || project.githubUrl) && (
            <div className="flex gap-4">
              {project.demoUrl && (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    View Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Source
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <VelocityScroll>HSB</VelocityScroll>
      <Footer />
    </main>
  );
}
