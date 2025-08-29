"use client";
import React, { useState, useMemo } from "react";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data/profileData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/lib/data/projectData";
import { FaGithub } from "react-icons/fa";
import { Globe, ArrowRight, Search, Filter } from "lucide-react";
import SpotlightCard from "@/components/elements/SpotlightCard";

type FilterCategory = "all" | "E-commerce" | "Web Application";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");

  // Filter and search logic
  const filteredProjects = useMemo((): Project[] => {
    let filtered: Project[] = projects;

    if (filterCategory !== "all") {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project: Project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, filterCategory]);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Introduction */}
            <div className="mb-8 lg:mb-12">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">Projects</h1>

                  {/* Search and Filter Controls - Colombo */}
                  <div className="hidden lg:flex flex-col sm:flex-row gap-4 lg:min-w-96">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 focus:border-zinc-700"
                        aria-label="Search projects"
                      />
                    </div>

                    <Select value={filterCategory} onValueChange={(value: FilterCategory) => setFilterCategory(value)}>
                      <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-zinc-100" aria-label="Filter projects by category">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          All Categories
                        </SelectItem>
                        <SelectItem value="E-commerce" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          E-commerce
                        </SelectItem>
                        <SelectItem value="Web Application" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          Web Application
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-zinc-400 text-base lg:text-lg max-w-1xl">
                  A showcase of both private and open-source projects I’ve built or contributed to. Each project represents a unique challenge and learning experience.
                </p>

                <Separator className="my-6 bg-zinc-800" />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="mb-16">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full">
                  <Alert className="bg-zinc-900 border-zinc-800">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <AlertDescription className="text-center py-8">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-zinc-100">No projects found</h3>
                        <p className="text-zinc-400">Try adjusting your search terms or select a different filter to find what you’re looking for.</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-3">
                  {filteredProjects.map((project) => (
                    <SpotlightCard key={project.id} className="custom-spotlight-card group overflow-hidden rounded-2xl !p-0">
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

                        {/* Floating Action Buttons - Conditional Rendering */}
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
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
              <div className="text-center">
                <p className="text-zinc-500 text-xs leading-relaxed">Made with by {profileData.name}</p>
                <p className="text-zinc-600 text-xs mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}