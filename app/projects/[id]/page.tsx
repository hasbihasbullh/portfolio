import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data";
import { projects } from "@/lib/data/projectData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft, FaStar, FaLightbulb } from "react-icons/fa";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
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
          <div className="pt-20 lg:pt-0">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">{project.title}</h1>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4 max-w-1xl">{project.description}</p>
              <div className="flex items-center gap-2.5">
                <span className="text-zinc-300 font-medium text-base">Tech Stack:</span>
                <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800">
                  {project.technologies.map((tech, index) => {
                    const TechIcon = tech.reactIcon;
                    return (
                      <div key={index} className="relative group">
                        <TechIcon className={`w-4 h-4 md:w-6 md:h-6 ${tech.color || ""}`} />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Project Image */}
            <Card className="mb-6 overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <div className="relative w-full aspect-[16/9] group">
                <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" quality={80} />
                {/* Floating Action Buttons - Conditional Rendering */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.link && project.status === "Live" && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 text-zinc-900 rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                      title="Live Demo"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span className="hidden sm:inline">Live Demo</span>
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-800/90 text-white rounded-full flex items-center justify-center shadow-lg px-4 py-2 sm:px-4 sm:py-2 w-10 h-10 sm:w-auto sm:h-auto text-sm font-medium gap-2"
                      title="Source Code"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span className="hidden sm:inline">Source Code</span>
                    </Link>
                  )}
                </div>
              </div>
            </Card>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* Project Stats Card */}
              <Card className="lg:col-span-4 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border-zinc-800 rounded-xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FaStar className="w-5 h-5 text-yellow-400" />
                    <CardTitle className="text-white text-xl font-bold">Project Info</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Category</p>
                    <p className="text-white font-semibold">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Launch Date</p>
                    <p className="text-white font-semibold">{project.launchDate}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Status</p>
                    <Badge className={`${project.status === "Live" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"} border font-semibold`}>{project.status}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Challenges Card */}
              {project.challenges && (
                <Card className="lg:col-span-8 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FaLightbulb className="w-5 h-5 text-orange-400" />
                      <CardTitle className="text-white text-xl font-bold">Technical Challenges</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 leading-relaxed">{project.challenges}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Features & Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
              {/* Features Card */}
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FaStar className="w-5 h-5 text-purple-400" />
                    <CardTitle className="text-white text-xl font-bold">Key Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-zinc-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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