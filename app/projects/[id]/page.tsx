import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import { FooterContent } from "@/common/components/layouts/FooterContent";
import { projects } from "@/common/data/projectData";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { Metadata } from "next";
import { METADATA } from "@/common/constants/metadata";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: `Not Found ${METADATA.exTitle}`,
      description: `Project not found on ${METADATA.creator}'s portfolio`,
      alternates: {
        canonical: `${process.env.DOMAIN}/projects`,
      },
    };
  }

  return {
    title: `${project.title} ${METADATA.exTitle}`,
    description: `Explore ${project.title}, a project by ${METADATA.creator}: ${project.description}`,
    alternates: {
      canonical: `${process.env.DOMAIN}/projects/${id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <AnimateEaseOut>
            {/* Enhanced Navigation */}
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Link href="/projects">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 rounded-xl px-4 py-2.5 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            {/* Hero Section */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">{project.title}</h1>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4 max-w-1xl">{project.description}</p>
              <div className="flex items-center gap-2.5">
                <span className="text-zinc-400 font-medium text-base">Tech Stack:</span>
                <TooltipProvider>
                  <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800">
                    {project.technologies.map((tech, index) => {
                      const TechIcon = tech.reactIcon;
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              <TechIcon className={`w-4 h-4 md:w-6 md:h-6 ${tech.color}`} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1">
                            {tech.name}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Enhanced Project Image */}
            <Card className="mb-6 overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <div className="relative w-full aspect-[16/9] group">
                <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" quality={80} />
                {/* Floating Action Buttons - Conditional Rendering */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-zinc-900 hover:bg-zinc-300 rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                      title="Open Preview"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span className="hidden sm:inline">Open Preview</span>
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-800 text-white hover:bg-zinc-500 rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                      title="Source Code"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span className="hidden sm:inline">Source Code</span>
                    </Link>
                  )}
                </div>
              </div>
            </Card>

            <FooterContent />
          </AnimateEaseOut>
        </div>
      </div>
    </div>
  );
}
