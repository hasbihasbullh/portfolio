"use client";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data/profileData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data/projectData";
import { FaGithub } from "react-icons/fa";
import { Globe, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Introduction */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Projects</h1>
              <p className="text-zinc-400 text-sm lg:text-base max-w-2xl">A showcase of both private and open-source projects Ive built or contributed to. Each project represents a unique challenge and learning experience.</p>
            </div>

            {/* Enhanced Projects Grid */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-500/10 group overflow-hidden rounded-2xl hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Enhanced Project Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Floating Action Buttons - Conditional Rendering */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {/* Show Live Demo button only if project has link and status is Live */}
                        {project.link && project.status === "Live" && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/90 hover:bg-white text-zinc-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                            title="Live Demo"
                          >
                            <Globe className="w-4 h-4" />
                          </Link>
                        )}
                        {/* Show GitHub button only if githubLink exists */}
                        {project.githubLink && (
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-zinc-800/90 hover:bg-zinc-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                            title="Source Code"
                          >
                            <FaGithub className="w-4 h-4" />
                          </Link>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          project.status === "Live" 
                            ? "bg-green-500/90 text-white border-0 shadow-lg" 
                            : "bg-red-500/90 text-white border-0 shadow-lg"
                          } text-xs font-semibold px-3 py-1`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            project.status === "Live" 
                              ? "bg-green-300" 
                              : "bg-red-300"
                            } animate-pulse`} />
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-white text-xl font-bold group-hover:text-zinc-300 transition-colors duration-300">{project.title}</CardTitle>
                      <CardDescription className="text-zinc-300 text-sm leading-relaxed line-clamp-2">{project.description}</CardDescription>

                      {/* Category & Date */}
                      <div className="flex items-center gap-3 pt-2">
                        <Badge variant="outline" className="text-zinc-400 border-zinc-600 text-xs">
                          {project.category}
                        </Badge>
                        <span className="text-zinc-500 text-xs">{project.launchDate}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="py-0">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center justify-center bg-zinc-800/60 hover:bg-zinc-700 w-10 h-10 rounded-lg transition-colors duration-200"
                            title={tech.name}
                          >
                            <Image
                              src={tech.svgPath}
                              alt={`${tech.name} icon`}
                              width={24}
                              height={24}
                              className={tech.color || ""}
                            />
                          </div>
                        ))}
                        {project.technologies.length > 3 && (
                          <div className="flex items-center justify-center bg-zinc-800/60 w-10 h-10 rounded-lg">
                            <span className="text-zinc-400 text-xs font-medium">+{project.technologies.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-6">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-semibold transition-all duration-300 rounded-xl py-2.5 shadow-lg shadow-zinc-600/25 hover:shadow-zinc-600/40 hover:scale-[1.02]"
                      >
                        <Link href={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="ml-2 w-3 h-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
              <div className="text-center">
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Made with <span className="text-red-400">♥</span> by {profileData.name}
                </p>
                <p className="text-zinc-600 text-xs mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}