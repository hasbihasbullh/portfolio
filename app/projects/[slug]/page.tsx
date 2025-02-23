"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Code2, Layers } from "lucide-react";
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
      <main className="min-h-screen bg-zinc-950">
        <div className="px-4 sm:px-8 py-10 lg:py-16 sm:py-20 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-float">
              <Code2 className="w-24 h-24 text-zinc-500" />
            </div>
            <h1 className="mt-8 text-4xl font-bold text-zinc-200">Project Not Found</h1>
            <Button size="lg" asChild className="mt-8 bg-zinc-500 hover:bg-zinc-600">
              <Link href="/projects">Return to Projects</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild className="text-zinc-300 hover:text-zinc-200">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Projects
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <p>HasbiHasbullah</p>
            </div>
          </div>
        </div>
      </nav>

      <section className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-zinc-200">{project.title}</h1>
                <p className="text-lg text-zinc-400 leading-relaxed">{project.fullDescription}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Button size="lg" className="bg-zinc-200 hover:bg-zinc-400" asChild>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      Source Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 via-transparent to-zinc-500/20" />
              <Image src={project.image} alt={project.title} width={1366} height={768} className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16 sm:py-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-zinc-500" />
                  <h2 className="text-xl font-semibold text-zinc-200">Tech Stack</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {project.technologies.map((tech) => (
                    <div key={tech} className="px-4 py-2 rounded-lg bg-zinc-800/50 text-sm text-zinc-300">
                      {tech}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-zinc-500" />
                  <h2 className="text-xl font-semibold text-zinc-200">Key Features</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-500/20 text-zinc-500 flex items-center justify-center text-sm">{index + 1}</span>
                        <p className="text-zinc-300">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <VelocityScroll>HSB</VelocityScroll>
      <Footer />
    </main>
  );
}
