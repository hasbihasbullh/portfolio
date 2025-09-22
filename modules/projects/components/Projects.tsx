"use client";
import React, { useState, useMemo } from "react";

import { projects, Project } from "@/common/data/projectData";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsGrid } from "./ProjectsGrid";

import { FooterContent } from "@/common/components/layouts/FooterContent";

type FilterCategory = "all" | "E-commerce" | "Web Application";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");

  // Filter and search logic dengan pengurutan pinned projects
  const filteredProjects = useMemo((): Project[] => {
    let filtered: Project[] = projects;

    if (filterCategory !== "all") {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((project: Project) => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Urutkan proyek yang dipin di atas
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [searchTerm, filterCategory]);
  

  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="pt-20 lg:pt-0">
          <ProjectsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
          <ProjectsGrid filteredProjects={filteredProjects} />
          <FooterContent/>
        </div>
      </div>
    </div>
  );
};

export default Projects;