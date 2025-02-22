"use client";

import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/hasbihasbullh",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/m-hasbi-hasbullah-1a152b340/",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/hasbihasbullh_",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-zinc-200 text-zinc-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-950 rounded-full transition-all duration-300 hover:scale-110" aria-label={link.label}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
