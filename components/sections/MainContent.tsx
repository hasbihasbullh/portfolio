"use client";

import type React from "react";
import { profileData, profileImages, skills, projects, achievementsData } from "@/lib/data";
import SpotlightCard from "@/components/elements/SpotlightCard";
import Folder from "@/components/elements/Folder";
import StackImages from "@/components/elements/StackImages";
import MarqueeElement from "@/components/elements/MarqueeElement";

import Image from "next/image";
import Link from "next/link";

import { CircleUser, Blocks, Award, GalleryVerticalEnd, Download } from "lucide-react";

export function MainContent() {
  const achievementItems = achievementsData.slice(0, 3).map((achievement, index) => (
    <Link key={achievement.id} href={achievement.credentialUrl} aria-label={`View ${achievement.title}`}>
      <Image
        src={achievement.image}
        alt={`Achievement: ${achievement.title} from ${achievement.issuer}`}
        width={85}
        height={60}
        className="object-cover w-full h-full rounded-lg"
        priority={index === 0}
        loading={index > 0 ? "lazy" : undefined}
      />
    </Link>
  ));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="pt-20 lg:pt-0">
          <div className="mb-8 lg:mb-10">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              {/* Welcome */}
              <SpotlightCard className="custom-spotlight-card relative overflow-hidden !p-0 md:col-span-2" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl md:text-3xl font-bold text-white">
                        <span className="text-xl md:text-xl">Hi 👋 , my name is</span>
                        <span className="bg-gradient-to-r from-zinc-400 to-zinc-400 bg-clip-text text-transparent block">{profileData.name}</span>
                      </h1>
                      <p className="text-zinc-200 text-sm">{profileData.position}</p>
                      <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">Creating beautiful, functional, and user-centered digital experiences. Always excited to work on meaningful projects that make a difference.</p>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-500/10 border border-zinc-500/20 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Available for new opportunities</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-zinc-800/50"></div>

                  {/* Bottom Section */}
                  <div className="grid md:grid-cols-1 gap-6">
                    {/* Resume/CV */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Link
                          href="/document/resume.pdf"
                          download={`${profileData.name}_Resume.pdf`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF Resume</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* About Me */}
              <SpotlightCard className="custom-spotlight-card relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="flex flex-col p-6 pb-0 items-center text-center">
                  <Link href="/about" aria-label="Go to About Me page">
                    <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
                      <CircleUser aria-label="About Me icon" />
                    </div>
                  </Link>
                  <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">About Me</h2>
                  <p className="text-xs text-zinc-400">Who I am and what I do.</p>
                </div>
                <div className="flex items-center justify-center p-6">
                  <StackImages randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 150, height: 200 }} cardsData={profileImages} />
                </div>
              </SpotlightCard>

              {/* Skills & Tools */}
              <SpotlightCard className="custom-spotlight-card relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="flex flex-col p-6 items-center text-center">
                  <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
                    <Blocks aria-label="Skills icon" />
                  </div>
                  <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Skills &amp; Tools</h2>
                  <p className="text-xs text-zinc-400">Covering mobile, web, AI, and UI/UX technologies.</p>
                </div>
                <div className="flex flex-col overflow-x-hidden">
                  <div className="space-y-3 lg:space-y-6 mb-6 md:mb-0">
                    {/* Frontend Technologies */}
                    <MarqueeElement direction="right" withPadding={false}>
                      <div className="flex items-center gap-3 px-2">
                        {skills.frontend?.map((skill, index) => {
                          const IconComponent = skill.icon;
                          return (
                            <div key={`frontend-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                              <IconComponent className="w-3 h-3 text-zinc-400" />
                              <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </MarqueeElement>

                    {/* Backend Technologies */}
                    <MarqueeElement direction="left" withPadding={false}>
                      <div className="flex items-center gap-3 px-2">
                        {skills.backend?.map((skill, index) => {
                          const IconComponent = skill.icon;
                          return (
                            <div key={`backend-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                              <IconComponent className="w-3 h-3 text-zinc-400" />
                              <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </MarqueeElement>

                    {/* Tools & Platforms - Hidden on mobile */}
                    <div className="hidden md:block">
                      <MarqueeElement direction="right" withPadding={false}>
                        <div className="flex items-center gap-3 px-2">
                          {skills.tools?.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                              <div key={`tools-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                                <IconComponent className="w-3 h-3 text-zinc-400" />
                                <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </MarqueeElement>
                    </div>

                    {/* Mobile & AI - Hidden on mobile */}
                    <div className="hidden md:block">
                      <MarqueeElement direction="left" withPadding={false}>
                        <div className="flex items-center gap-3 px-2">
                          {skills.mobile?.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                              <div key={`mobile-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                                <IconComponent className="w-3 h-3 text-zinc-400" />
                                <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                              </div>
                            );
                          })}
                          {skills.ai?.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                              <div key={`ai-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full whitespace-nowrap">
                                <IconComponent className="w-3 h-3 text-zinc-400" />
                                <span className="text-xs text-zinc-300 font-medium">{skill.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </MarqueeElement>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* Achievements */}
              <SpotlightCard className="custom-spotlight-card relative overflow-hidden !p-0 md:col-span-1 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="flex flex-col p-6 items-center text-center">
                  <Link href="/achievements" aria-label="Go to Achievements page">
                    <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
                      <Award aria-label="Achievements icon" />
                    </div>
                  </Link>
                  <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Achievements</h2>
                  <p className="text-xs text-zinc-400">Milestones from programs, projects, and communities.</p>
                </div>
                <div className="mb-4 mt-9 flex w-full items-center justify-center">
                  <Folder size={0.9} color="#4BD3FF" className="custom-folder" items={achievementItems} />
                </div>
              </SpotlightCard>

              {/* Projects */}
              <SpotlightCard className="custom-spotlight-card relative overflow-hidden !p-0 md:col-span-3 grid grid-cols-2 gap-2" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="flex flex-col p-6 item-start">
                  <Link href="/projects" aria-label="Go to Projects page">
                    <div className="bg-zinc-200 rounded-lg w-fit p-3 text-zinc-900">
                      <GalleryVerticalEnd aria-label="Projects icon" />
                    </div>
                  </Link>
                  <h2 className="mb-1 mt-3 text-sm font-medium text-zinc-300">Projects Showcase</h2>
                  <p className="text-xs text-zinc-400">A selection of real apps built to solve real problems.</p>
                </div>
                <div className="flex flex-col p-0">
                  <div className="max-h-[300px] overflow-y-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar{display:none}]">
                    {projects.map((project, index) => (
                      <div key={project.id} className="mb-4 cursor-pointer" role="listitem">
                        <Link href={project.link} passHref aria-label={`View ${project.title} project`}>
                          <div className="rounded-xl bg-zinc-300 p-[3px] dark:bg-zinc-800">
                            <div className="overflow-hidden rounded-lg">
                              <Image
                                alt={project.title}
                                width={150}
                                height={100}
                                className="h-auto w-full rounded-lg shadow-xl object-cover transition-transform duration-700 ease-in-out"
                                src={project.image || "/placeholder.svg"}
                                priority={index < 2}
                                loading={index >= 2 ? "lazy" : undefined}
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
          {/* Enhanced Footer */}
          <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
            <div className="text-center">
              <p className="text-zinc-500 text-xs leading-relaxed">Made with by {profileData.name}</p>
              <p className="text-zinc-600 text-xs mt-1">© {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
