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
import { FaExternalLinkAlt, FaGithub, FaArrowLeft, FaClock, FaTag, FaStar, FaLightbulb, FaCode } from "react-icons/fa";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>; // Updated to use Promise
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params; // Await the params to resolve the Promise
  const project = projects.find((p) => p.id === id);
  if (!project) {
    notFound();
  }

  // Check if project has live demo available
  const hasLiveDemo = project.link && project.status === "Live";

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Enhanced Navigation */}
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Link href="/projects">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 rounded-xl px-4 py-2.5 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Projects
                </Button>
              </Link>

              <div className="flex gap-3">
                {/* Conditional Preview Button */}
                {hasLiveDemo && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-semibold transition-all duration-300 rounded-xl px-6 py-2.5 shadow-lg shadow-zinc-600/25 hover:shadow-zinc-600/40 hover:scale-105"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                      Open Preview
                    </a>
                  </Button>
                )}

                {/* Show unavailable Preview button for offline projects */}
                {!hasLiveDemo && (
                  <Button disabled className="bg-zinc-700 text-zinc-400 cursor-not-allowed font-semibold rounded-xl px-6 py-2.5 shadow-lg" title="This project is currently offline">
                    <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                    Preview Unavailable
                  </Button>
                )}

                {/* Conditional GitHub Button */}
                {project.githubLink && (
                  <Button asChild className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-all duration-300 rounded-xl px-6 py-2.5 shadow-lg hover:scale-105 border border-zinc-700">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">{project.title}</h1>

              <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-3xl">{project.description}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800">
                  <FaTag className="w-4 h-4 text-blue-400" />
                  <span className="text-zinc-300 text-sm font-medium">{project.category}</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800">
                  <FaClock className="w-4 h-4 text-green-400" />
                  <span className="text-zinc-300 text-sm font-medium">{project.launchDate}</span>
                </div>
                <Badge className={`${project.status === "Live" ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"} px-4 py-2 text-sm font-semibold border`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${project.status === "Live" ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Enhanced Project Image */}
            <Card className="mb-12 overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <div className="relative w-full aspect-[16/9] group">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  quality={80}
                />
              </div>
            </Card>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Tech Stack Card */}
              <Card className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FaCode className="w-5 h-5 text-blue-400" />
                    <CardTitle className="text-white text-xl font-bold">Tech Stack</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-700/50 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 border border-zinc-700/50">
                        <Image src={tech.svgPath} alt={`${tech.name} icon`} width={24} height={24} className={`flex-shrink-0 ${tech.color || ""}`} />
                        <span className="text-zinc-300 font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Stats Card */}
              <Card className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border-zinc-800 rounded-xl">
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
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Technologies</p>
                    <p className="text-white font-semibold">{project.technologies.length} tools</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Demo Status</p>
                    <p className={`font-semibold ${hasLiveDemo ? "text-green-400" : "text-red-400"}`}>{hasLiveDemo ? "Available" : "Unavailable"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features & Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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

              {/* Challenges Card */}
              {project.challenges && (
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl">
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
