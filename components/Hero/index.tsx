"use client";

import { FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram } from "lucide-react";
import { BorderBeam } from "@/components/ui/magicui/border-beam";

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
    <section className="px-4 sm:px-8 py-10 lg:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
      <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-none font-bold tracking-tighter">M HASBI HASBULLAH</h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-zinc-400 max-w-full lg:max-w-none mx-auto lg:mx-0">A passionate developer specializing in modern web development with a focus on the latest technologies.</p>

        <Button className="relative overflow-hidden text-lg px-6 py-3" size="lg" variant="outline" onClick={handleDownloadCV}>
          Download CV
          <BorderBeam
            size={48}
            initialOffset={24}
            className="from-transparent via-yellow-500 to-transparent"
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
            }}
          />
          <FileUser className="ml-2 h-6 w-6" />
        </Button>

        <div className="flex justify-center lg:justify-normal gap-4 mt-4">
          <a href="https://github.com/hasbihasbullh" target="_blank" rel="noopener noreferrer" className="bg-zinc-200 text-zinc-950 hover:bg-zinc-400 rounded-full p-3 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/m-hasbi-hasbullah-1a152b340/" target="_blank" rel="noopener noreferrer" className="bg-zinc-200 text-zinc-950 hover:bg-zinc-400 rounded-full p-3 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/hasbihasbullh_" target="_blank" rel="noopener noreferrer" className="bg-zinc-200 text-zinc-950 hover:bg-zinc-400 rounded-full p-3 transition-all duration-300">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="relative mt-8 lg:mt-0"></div>
    </section>
  );
}
