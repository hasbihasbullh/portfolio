"use client";

import { FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram } from "lucide-react";
import { BorderBeam } from "@/components/ui/magicui/border-beam";
import Lanyard from "./Lanyard";

export default function Hero() {
  const handleDownloadCV = () => {
    const cvUrl = "/cv.pdf";

    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "M-Hasbi-Hasbullah-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-4 sm:px-8 py-10 lg:py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-20 pb-16 lg:pt-0 lg:pb-20">
      <div className="space-y-8 text-center lg:text-left md:w-7/12">
        <div className="space-y-4">
          <h2 className="text-sm sm:text-base text-yellow-500 font-semibold tracking-wider uppercase">Welcome to</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">My Portfolio</h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0">A passionate developer crafting beautiful web experiences with modern technologies. Focused on creating responsive, user-friendly applications.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <Button className="w-full sm:w-auto text-base relative overflow-hidden group" size="lg" variant="outline" onClick={handleDownloadCV}>
            <span className="relative z-10 flex items-center">
              Download CV
              <FileUser className="ml-2 h-5 w-5" />
            </span>
            <BorderBeam
              size={48}
              initialOffset={24}
              className="from-transparent via-yellow-500/50 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </Button>

          <div className="flex gap-3">
            {[
              { icon: Github, href: "https://github.com/hasbihasbullh" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/m-hasbi-hasbullah-1a152b340/" },
              { icon: Instagram, href: "https://www.instagram.com/hasbihasbullh_" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="bg-zinc-800/50 hover:bg-zinc-700 text-zinc-100 rounded-full p-2.5 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-8 lg:mt-0 md:w-5/12">
        <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} />
      </div>
    </section>
  );
}
