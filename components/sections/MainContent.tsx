"use client";
import { skillsList } from "@/lib/constants/skills";
import { profileData } from "@/lib/data/profileData";
import { TbBrandMetabrainz } from "react-icons/tb";
import { MapPin } from "lucide-react";
import { useState } from "react";

export function MainContent() {
  // Group skills by category
  const groupedSkills = skillsList.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skillsList>
  );

  // Get unique categories and add "All" as the first option
  const categories = ["All", ...Object.keys(groupedSkills)];

  // State for active tab, default to "All"
  const [activeTab, setActiveTab] = useState("All");

  // Determine skills to display based on active tab
  const displayedSkills = activeTab === "All" ? skillsList : groupedSkills[activeTab] || [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="pt-20 lg:pt-0">
          <div className="mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Hi, I&apos;m {profileData.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Based in {profileData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{profileData.status.split(" ")[0]}</span>
              </div>
            </div>
            <p className="text-lg lg:text-xl text-zinc-300 leading-relaxed mb-4 max-w-4xl">
              I am a dynamic {profileData.position} with a proven track record in full-stack web development and digital marketing. My expertise lies in building responsive, scalable web applications using Laravel, Next.js, and React.js,
              while also driving impactful digital campaigns on platforms like Facebook Ads and TikTok Ads. My passion for technology fuels my ability to create innovative solutions that align with business goals and deliver exceptional
              user experiences.
            </p>
            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-4xl">
              Fluent in Indonesian and English, I excel in cross-cultural collaboration, bringing clarity and creativity to every project. My diverse skill set and dedication to continuous learning enable me to adapt and thrive in
              fast-paced, tech-driven environments.
            </p>
          </div>

          <div className="mb-8 lg:mb-10">
            <div className="border-t border-zinc-800 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <TbBrandMetabrainz className="w-10 h-10 text-white" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Technical Skills</h2>
              </div>
              <p className="text-zinc-400 mb-6">A curated selection of technologies and tools I leverage to craft cutting-edge web applications and digital solutions.</p>

              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === category ? "bg-zinc-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    } focus:outline-none focus:ring-2 focus:ring-zinc-500`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Skills Grid for Active Tab */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
                {displayedSkills.map((skill, index) => {
                  const softGlow = skill.glow ? skill.glow.replace(/0\.3\)/, "0.2)") : "rgba(255,255,255,0.2)";

                  return (
                    <div
                      key={index}
                      className="relative group flex items-center justify-center p-4 rounded-xl border border-zinc-800 
                      hover:scale-110 hover:rotate-1 transition-transform duration-300 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${softGlow} 0%, #18181b 100%)`,
                        boxShadow: `0 0 6px ${softGlow}`,
                      }}
                    >
                      <skill.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white transition-transform duration-300" />

                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-md text-xs text-white bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-center">
                        {skill.name} <br /> ({skill.proficiency})
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-16 pt-8 border-t border-zinc-800">
            <p className="text-zinc-400 text-xs text-center leading-relaxed">COPYRIGHT ©2025 {profileData.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
