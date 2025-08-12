"use client";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData, experiences, education } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Introduction */}
            <div className="mb-8 lg:mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">About Me</h1>
              <p className="text-lg lg:text-xl text-zinc-300 leading-relaxed mb-4 max-w-4xl">
                I am a passionate and detail-oriented software developer with a robust background in full-stack web development and digital marketing. My expertise spans crafting dynamic, user-centric web applications using modern
                frameworks like Laravel, Next.js, and React.js, complemented by a strong ability to strategize and execute impactful digital advertising campaigns.
              </p>
              <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-4xl">
                My career is driven by a deep curiosity for leveraging technology to solve complex challenges and deliver measurable value. From developing scalable CRUD applications to optimizing e-commerce platforms and managing WordPress
                ecosystems, I thrive at the intersection of technical innovation and business strategy. I am committed to building intuitive digital solutions that empower businesses and enhance user experiences.
              </p>
            </div>

            {/* Career Section */}
            <div className="mb-8 lg:mb-10">
              <div className="border-t border-zinc-800 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Professional Experience</h2>
                </div>
                <p className="text-zinc-400 mb-6">A journey through my diverse roles in web development, digital marketing, and technical administration, showcasing my ability to deliver impactful solutions.</p>

                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/90 transition-colors duration-200">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-3">
                            <Image src={exp.logo} alt={`${exp.company} Logo`} width={80} height={80} className="w-full h-full object-contain rounded" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center text-zinc-400 text-sm mb-2 space-y-1 sm:space-y-0 sm:space-x-4">
                            <span>{exp.company}</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center text-zinc-400 text-sm mb-3 space-x-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{exp.duration}</span>
                            </div>
                            {exp.tags.map((tag) => (
                              <span key={tag} className={`px-2 py-1 rounded text-xs ${tag === "Internship" ? "bg-blue-600/20 text-blue-400" : tag === "Remote" ? "bg-orange-600/20 text-orange-400" : "bg-green-600/20 text-green-400"}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => toggleExpand(exp.id)}
                            aria-expanded={expandedCard === exp.id}
                            aria-controls={`responsibilities-${exp.id}`}
                            className="flex items-center text-zinc-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {expandedCard === exp.id ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                            {expandedCard === exp.id ? "Hide responsibilities" : "Show responsibilities"}
                          </button>
                          {expandedCard === exp.id && (
                            <div id={`responsibilities-${exp.id}`} className="mt-4 pt-4 border-t border-zinc-600">
                              <ul className="text-zinc-300 text-sm space-y-2">
                                {exp.responsibilities.map((resp, index) => (
                                  <li key={index}>• {resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-8 lg:mb-10">
              <div className="border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-10 h-10 text-white" />
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Education</h2>
                  </div>
                  <div className="hidden sm:flex space-x-3">
                    <a href="/portfolio.pdf" download className="flex items-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 12a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 7a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"></path>
                      </svg>
                      Download Portfolio
                    </a>
                    <a href="/resume.pdf" download className="flex items-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 12a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 7a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"></path>
                      </svg>
                      Download Resume
                    </a>
                  </div>
                </div>
                <p className="text-zinc-400 mb-6">My academic journey in software engineering and informatics, equipping me with a strong technical foundation.</p>
                <div className="sm:hidden flex flex-col space-y-3 mb-6">
                  <a
                    href="/portfolio.pdf"
                    download
                    className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-3 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 12a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 7a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"></path>
                    </svg>
                    Download Portfolio
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-3 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 12a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 7a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"></path>
                    </svg>
                    Download Resume
                  </a>
                </div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/90 transition-colors duration-200">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-3">
                            <Image src={edu.logo} alt={`${edu.title} Logo`} width={80} height={80} className="w-full h-full object-contain rounded" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-white mb-1">{edu.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center text-zinc-400 text-sm mb-2 space-y-1 sm:space-y-0 sm:space-x-4">
                            <span>{edu.degree}</span>
                          </div>
                          <div className="flex flex-wrap items-center text-zinc-400 text-sm space-x-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{edu.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="lg:hidden mt-16 pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-xs text-center leading-relaxed">COPYRIGHT ©2025 {profileData.name}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
