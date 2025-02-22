// components/Projects/ProjectCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/magicui/border-beam";
import type { Project } from "@/lib/projects";

const MotionLink = motion(Link);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <MotionLink 
    href={`/projects/${project.id}`} 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="block"
  >
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-zinc-900/50 backdrop-blur-sm">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400">{project.description}</p>
      </CardContent>
      <BorderBeam />
    </Card>
  </MotionLink>
);