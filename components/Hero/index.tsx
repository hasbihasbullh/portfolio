"use client";

import Image from "next/image";
import { FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram } from "lucide-react";
import { BorderBeam } from "@/components/ui/magicui/border-beam";

export default function Hero() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const formattedDate = currentDate.toLocaleString("id-ID", options);

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
    <section className="px-4 sm:px-8 py-10 lg:py-10 sm:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
      <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-none font-bold tracking-tighter">M HASBI HASBULLAH</h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-zinc-400 max-w-full lg:max-w-none mx-auto lg:mx-0">User is a developer who continues to learn and focuses on modern web development using the latest technologies.</p>

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

      <div className="relative mt-8 lg:mt-0">
        <Image src="/me.webp" alt="Foto Profil M Hasbi Hasbullah" width={400} height={500} className="w-full sm:w-[400px] h-[300px] sm:h-[500px] object-cover mx-auto rounded-lg shadow-lg" />
        <div className="absolute bottom-0 right-0 bg-zinc-200 text-zinc-950 p-4 sm:p-6 rounded-lg">
          <p className="text-xs sm:text-sm opacity-70">TODAY DATE</p>
          <p className="text-3xl sm:text-5xl font-bold mt-2">{formattedDate}</p>
        </div>
      </div>
    </section>
  );
}
