import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { FooterContent } from "@/common/components/layouts/FooterContent";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { Metadata } from "next";
import { METADATA } from "@/common/constants/metadata";
import { RelatedProjects } from "@/modules/projects/components/RelatedProjects";
import { getIconComponent } from "@/common/utils/iconMapper";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id, locale } = await params as unknown as { id: string, locale: string };
  const project = await client.fetch(projectBySlugQuery, { slug: id });

  if (!project) {
    return {
      title: `Not Found ${METADATA.exTitle}`,
      description: `Project not found on ${METADATA.creator}'s portfolio`,
      alternates: {
        canonical: "/projects",
      },
    };
  }

  const title = project.title?.[locale] || project.title?.en || project.title || "Project";
  const desc = project.description?.[locale] || project.description?.en || project.description || "";

  return {
    title: `${title} - ${METADATA.exTitle}`,
    description: `Explore ${title}, a project by ${METADATA.creator}: ${desc}`,
    alternates: {
      canonical: `/projects/${id}`,
    },
    openGraph: {
      title: `${title} - ${METADATA.exTitle}`,
      description: desc,
      url: `/projects/${id}`,
      siteName: METADATA.creator,
      images: [
        {
          url: project.imageUrl || project.image || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${METADATA.exTitle}`,
      description: desc,
      images: [project.imageUrl || project.image || "/placeholder.svg"],
    },
  };
}

import { profileQuery, projectsQuery } from "@/sanity/lib/queries";

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id, locale } = await params as unknown as { id: string, locale: string };
  const [project, profile, allProjects] = await Promise.all([
    client.fetch(projectBySlugQuery, { slug: id }),
    client.fetch(profileQuery),
    client.fetch(projectsQuery)
  ]);
  if (!project) {
    notFound();
  }

  const title = project.title?.[locale] || project.title?.en || project.title || "Project";
  const desc = project.description?.[locale] || project.description?.en || project.description || "";
  const link = project.liveUrl || project.linkDemo || project.link;
  const linkGithub = project.githubUrl || project.linkGithub;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
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

            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">{title}</h1>
              
              {project.date && (
                <div className="flex items-center gap-2 mb-6 text-zinc-400">
                  <span className="capitalize">{new Date(project.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "long", year: "numeric" })}</span>
                </div>
              )}

              <p className="text-zinc-300 text-lg leading-relaxed mb-4 max-w-1xl">{desc}</p>
              <div className="flex items-center gap-2.5">
                <span className="text-zinc-400 font-medium text-base">Tech Stack:</span>
                <TooltipProvider>
                  <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800">
                    {project.techStack?.map((tech: any, index: number) => {
                      const techName = tech.name || tech;
                      const iconName = tech.icon || `Si${techName.replace(/\s+/g, '')}`;
                      const TechIcon = getIconComponent(iconName);
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              <TechIcon className={`w-4 h-4 md:w-6 md:h-6 ${tech.color || 'text-zinc-300'}`} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1">
                            {techName}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Full Page Image Section or Fallback */}
            {project.fullPageImageUrl ? (
              <Card className="mb-16 overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/80 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]">
                <div className="relative w-full">
                  <Image src={project.fullPageImageUrl} alt={`${title} full page preview`} width={1600} height={900} className="w-full rounded-[2rem] object-contain" loading="lazy" sizes="100vw" quality={90} />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {Boolean(link) && (
                      <a
                        href={link || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-zinc-900 hover:bg-zinc-300 rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                        title="Open Preview"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        <span className="hidden sm:inline">Open Preview</span>
                      </a>
                    )}
                    {Boolean(linkGithub) && (
                      <a
                        href={linkGithub || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 text-white hover:bg-zinc-500 rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                        title="Source Code"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span className="hidden sm:inline">Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <div className="mb-16 flex gap-4">
                {Boolean(link) && (
                  <a
                    href={link || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-zinc-900 hover:bg-zinc-300 rounded-full flex items-center justify-center shadow-lg px-6 py-3 text-sm font-medium gap-2"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>Open Preview</span>
                  </a>
                )}
                {Boolean(linkGithub) && (
                  <a
                    href={linkGithub || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-full flex items-center justify-center shadow-lg px-6 py-3 text-sm font-medium gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            )}

            <RelatedProjects projectId={project.slug?.current || project._id} allProjects={allProjects} />
            <FooterContent sanityProfile={profile} />
      </AnimateEaseOut>
    </div>
  );
}
