"use client";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data/profileData";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { SiGmail, SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { useMemo, useState } from "react";

export default function ContactPage() {
  const [error, setError] = useState<string | null>(null);

  const socialCards = useMemo(
    () => [
      {
        title: "Stay in Touch",
        description: "Reach out via email for inquiries or collaborations",
        action: "Go to Gmail",
        gradient: "from-red-500 via-red-600 to-rose-700",
        icon: SiGmail,
        iconBg: "bg-red-500/20",
        onClick: () => handleSocialClick(`mailto:${profileData.email}`, "Gmail"),
        accent: "border-red-400/30 shadow-red-500/20",
        link: profileData.email,
      },
      {
        title: "Follow My Journey",
        description: "Follow my creative journey and daily insights",
        action: "Go to Instagram",
        gradient: "from-purple-500 via-pink-500 to-orange-500",
        icon: SiInstagram,
        iconBg: "bg-pink-500/20",
        onClick: () => handleSocialClick(profileData.social?.instagram, "Instagram"),
        accent: "border-pink-400/30 shadow-pink-500/20",
        link: profileData.social?.instagram,
      },
      {
        title: "Let's Connect",
        description: "Connect with me professionally on LinkedIn",
        action: "Go to LinkedIn",
        gradient: "from-blue-500 via-blue-600 to-cyan-600",
        icon: SiLinkedin,
        iconBg: "bg-blue-500/20",
        onClick: () => handleSocialClick(profileData.social?.linkedin, "LinkedIn"),
        accent: "border-blue-400/30 shadow-blue-500/20",
        link: profileData.social?.linkedin,
      },
      {
        title: "Explore the Code",
        description: "Dive into my open-source projects & contributions.",
        action: "Go to GitHub",
        gradient: "from-gray-700 via-gray-800 to-zinc-900",
        icon: SiGithub,
        iconBg: "bg-gray-500/20",
        onClick: () => handleSocialClick(profileData.social?.github, "GitHub"),
        accent: "border-gray-400/30 shadow-gray-500/20",
        link: profileData.social?.github,
      },
    ],
    [profileData]
  );

  const handleSocialClick = (url: string | undefined, platform: string) => {
    try {
      if (!url) {
        setError(`${platform} link is not available`);
        setTimeout(() => setError(null), 3000);
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
      setError(null);
    } catch (err) {
      console.error(`Failed to open ${platform} link:`, err);
      setError(`Failed to open ${platform}. Please try again.`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, onClick: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Error Toast */}
            {error && (
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Introduction */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Let&apos;s Connect</h1>
              <p className="text-zinc-400 text-sm lg:text-base max-w-2xl">
                Ready to collaborate on something amazing? I&apos;d love to hear from you. Choose your preferred way to connect and let&apos;s create something extraordinary together.
              </p>
            </div>

            {/* Enhanced Social Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {socialCards.map((card, index) => {
                const isDisabled = !card.link;

                return (
                  <div
                    key={card.title}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-[1px] transition-all duration-300 cursor-pointer ${card.accent} ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 focus-within:scale-105"
                    }`}
                    onClick={!isDisabled ? card.onClick : undefined}
                    onKeyDown={!isDisabled ? (e) => handleKeyDown(e, card.onClick) : undefined}
                    tabIndex={!isDisabled ? 0 : -1}
                    role="button"
                    aria-label={`${card.action} - ${card.description}`}
                    aria-disabled={isDisabled}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className={`relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 ${!isDisabled && "group-hover:bg-zinc-900/60 group-focus:bg-zinc-900/60"}`}>
                      {/* Icon di pojok kanan bawah */}
                      <div className={`absolute -bottom-6 -right-6 opacity-8 transition-all duration-300 ${!isDisabled && "group-hover:opacity-12 group-hover:scale-110 group-focus:opacity-12 group-focus:scale-110"}`}>
                        <card.icon size={140} className="text-white/10 rotate-12" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 space-y-4">
                        <h3 className="text-white text-xl font-bold pr-16">{card.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed pr-8">{card.description}</p>

                        {/* CTA Button */}
                        <div className={`flex items-center gap-2 text-white font-medium transition-all duration-300 ${!isDisabled && "group-hover:gap-3 group-focus:gap-3"}`}>
                          <span className="text-sm">{isDisabled ? "Not Available" : card.action}</span>
                          {!isDisabled && <ArrowUpRight size={16} className="group-hover:rotate-45 group-focus:rotate-45 transition-transform duration-300" />}
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      {!isDisabled && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      )}

                      {/* Focus Ring */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 ring-offset-2 ring-offset-zinc-950 opacity-0 group-focus:opacity-100 transition-opacity duration-200"></div>
                    </div>
                  </div>
                );
              })}
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
