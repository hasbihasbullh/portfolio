"use client";
import React, { useState, useMemo } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsGrid } from "./ProjectsGrid";

import { FooterContent } from "@/common/components/layouts/FooterContent";



const Projects = ({ sanityProjects = [], sanityProfile }: { sanityProjects?: any[], sanityProfile?: any }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const allCats = sanityProjects.map(p => p.category).filter(Boolean);
    return Array.from(new Set(allCats));
  }, [sanityProjects]);

  // Filter and search logic dengan pengurutan pinned projects
  const filteredProjects = useMemo(() => {
    let filtered: any[] = sanityProjects;

    if (filterCategory !== "all") {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((project: any) => {
        const titleMatch = project.title?.toLowerCase().includes(term);
        const descEn = project.description?.en || "";
        const descId = project.description?.id || "";
        const descMatch = typeof project.description === 'string' 
          ? project.description.toLowerCase().includes(term) 
          : (descEn.toLowerCase().includes(term) || descId.toLowerCase().includes(term));
        return titleMatch || descMatch;
      });
    }

    // Urutkan proyek yang dipin di atas, lalu berdasarkan tanggal rilis (terbaru ke terlama)
    return [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      const dateA = new Date(a.date || a.createdAt || a._createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt || b._createdAt).getTime();
      return dateB - dateA; // Descending order
    });
  }, [searchTerm, filterCategory, sanityProjects]);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <ProjectsHeader categories={categories} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
          <ProjectsGrid filteredProjects={filteredProjects} />
          <FooterContent sanityProfile={sanityProfile} />
        </AnimateEaseOut>
      </div>
    </div>
  );
};

export default Projects;
