import { IconType } from "react-icons";
import { FaHtml5, FaJs, FaReact, FaBootstrap } from "react-icons/fa";
import { SiGooglefonts, SiGoogleanalytics, SiNextdotjs, SiTailwindcss, SiCodeigniter, SiMysql, SiTypescript } from "react-icons/si";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  fullPageImage?: string;
  technologies: { name: string; reactIcon: IconType; color?: string }[];
  link: string;
  isPinned?: boolean;
  category: string;
  launchDate: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    id: "pojok-coffee",
    title: "PojokCoffee",
    description:
      "A simple e-commerce platform for coffee lovers, offering selected coffee beans from across Indonesia. Features a product catalog, shopping cart, checkout, and an informative blog, built as a frontend-only demonstration with a modern tech stack for responsiveness and interactivity.",
    image: "/images/project/pojok-coffee.webp",
    fullPageImage: "/images/project/pojok-coffee-fullpage.webp",
    technologies: [
      { name: "HTML5", reactIcon: FaHtml5, color: "text-orange-600" },
      { name: "Tailwind CSS", reactIcon: SiTailwindcss, color: "text-teal-500" },
      { name: "JavaScript", reactIcon: FaJs, color: "text-yellow-400" },
      { name: "Google Fonts", reactIcon: SiGooglefonts, color: "text-green-600" },
      { name: "Google Analytics", reactIcon: SiGoogleanalytics, color: "text-orange-500" },
    ],
    link: "https://hasbihasbullh.github.io/pojok-coffee/",
    isPinned: true,
    category: "Web Application",
    launchDate: "July 2025",
    githubLink: "https://github.com/hasbihasbullh/pojok-coffee",
  },
  {
    id: "if24-unlip",
    title: "IF24 UNLIP",
    description: "A modern web application built with Next.js App Router, Tailwind CSS, and TypeScript for the Informatika 2024 UNLIP Class, designed for internal tools, academic collaboration, or community engagement.",
    image: "/images/project/if24-unlip.webp",
    fullPageImage: "/images/project/if24-unlip-fullpage.webp",
    technologies: [
      { name: "React", reactIcon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", reactIcon: SiNextdotjs, color: "text-white" },
      { name: "Tailwind CSS", reactIcon: SiTailwindcss, color: "text-teal-500" },
      { name: "TypeScript", reactIcon: SiTypescript, color: "text-blue-600" },
    ],
    link: "https://inf24-unlip.vercel.app/",
    isPinned: true,
    category: "Web Application",
    launchDate: "July 2025",
    githubLink: "https://github.com/informatika24-unlip/if24-unlip",
  },
  {
    id: "lucky-kamera",
    title: "Lucky Kamera",
    description: "A web-based platform for camera rental services, allowing users to browse, rent, and manage camera equipment with a user-friendly interface and secure booking system.",
    image: "/images/project/lucky-kamera.webp",
    fullPageImage: "/images/project/lucky-kamera-fullpage.webp",
    technologies: [
      { name: "CodeIgniter", reactIcon: SiCodeigniter, color: "text-red-600" },
      { name: "MySQL", reactIcon: SiMysql, color: "text-blue-700" },
      { name: "Bootstrap", reactIcon: FaBootstrap, color: "text-purple-600" },
    ],
    link: "",
    isPinned: false,
    category: "Web Application",
    launchDate: "Maret 2020",
    githubLink: "https://github.com/hasbihasbullh/LuckyKamera",
  },
];
