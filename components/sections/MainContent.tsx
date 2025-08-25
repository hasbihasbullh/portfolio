import { profileData } from "@/lib/data/profileData";
import { MapPin } from "lucide-react";

export function MainContent() {
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
  );
}
