import { IconType } from "react-icons";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap } from "react-icons/fa";
import { SiGooglefonts, SiGoogleanalytics, SiNextdotjs, SiTailwindcss, SiCodeigniter, SiMysql } from "react-icons/si";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: { name: string; reactIcon: IconType; color?: string }[];
  link: string;
  status: string;
  category: string;
  launchDate: string;
  features: string[];
  challenges?: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    id: "pojok-coffee",
    title: "PojokCoffee",
    description:
      "A simple e-commerce platform for coffee lovers, offering selected coffee beans from across Indonesia. Features a product catalog, shopping cart, checkout, and an informative blog, built as a frontend-only demonstration with a modern tech stack for responsiveness and interactivity.",
    image: "/images/project/pojok-coffee.png",
    technologies: [
      { name: "HTML5", reactIcon: FaHtml5, color: "text-zinc-200" },
      { name: "Tailwind CSS", reactIcon: SiTailwindcss, color: "text-zinc-200" },
      { name: "JavaScript", reactIcon: FaJs, color: "text-zinc-200" },
      { name: "Google Fonts", reactIcon: SiGooglefonts, color: "text-zinc-200" },
      { name: "Google Analytics", reactIcon: SiGoogleanalytics, color: "text-zinc-200" },
    ],
    link: "https://hasbihasbullh.github.io/pojok-coffee/",
    status: "Live",
    category: "E-commerce",
    launchDate: "July 2025",
    features: [
      "Interactive homepage with featured products, testimonials, and contact info",
      "Comprehensive product listing with search and filter by price/popularity",
      "Detailed product pages with tasting notes, origin, and add-to-cart option",
      "Functional shopping cart with add/remove/edit items and cost calculations",
      "Simple checkout with shipping form and payment method simulation",
      "Order confirmation page summarizing the purchase",
      "Informative blog with article listing and detail pages",
      "Additional pages: About, FAQ, Contact, Terms & Conditions, Privacy Policy, Return Policy, Shipping Policy",
      "Frontend-only authentication pages (Sign In, Register, Forgot Password)",
      "Smooth page loader for enhanced user experience",
      "Responsive design optimized for desktop, tablet, and mobile",
    ],
    challenges:
      "Ensuring optimal performance across devices while maintaining a clean and modern design was a key challenge. The frontend-only approach limited features like user authentication, inventory management, and real payment processing, requiring reliance on LocalStorage and static data.",
    githubLink: "https://github.com/hasbihasbullh/pojok-coffee",
  },
  {
    id: "if24-unlip",
    title: "IF24 UNLIP",
    description: "A modern web application built with Next.js App Router, Tailwind CSS, and TypeScript for the Informatika 2024 UNLIP Class, designed for internal tools, academic collaboration, or community engagement.",
    image: "/images/project/if24-unlip.png",
    technologies: [
      { name: "React", reactIcon: FaReact, color: "text-zinc-200" },
      { name: "Next.js", reactIcon: SiNextdotjs, color: "text-zinc-200" },
      { name: "Tailwind CSS", reactIcon: FaCss3Alt, color: "text-zinc-200" },
      { name: "TypeScript", reactIcon: FaJs, color: "text-zinc-200" },
    ],
    link: "https://if24-unlip.vercel.app",
    status: "Live",
    category: "Web Application",
    launchDate: "July 2025",
    features: ["Built using Next.js 14 with App Router", "Tailwind CSS for rapid UI development", "Optimized for fast development and deployment", "Custom font integration using Geist", "Modular folder structure for scalability"],
    challenges: "Ensuring seamless integration of Next.js App Router with Tailwind CSS for a scalable and performant UI, while maintaining a modular folder structure for future expansion.",
    githubLink: "https://github.com/informatika24-unlip/if24-unlip",
  },
  {
    id: "lucky-kamera",
    title: "Lucky Kamera",
    description: "A web-based platform for camera rental services, allowing users to browse, rent, and manage camera equipment with a user-friendly interface and secure booking system.",
    image: "/images/project/luky-kamera.png",
    technologies: [
      { name: "CodeIgniter", reactIcon: SiCodeigniter, color: "text-zinc-200" },
      { name: "MySQL", reactIcon: SiMysql, color: "text-zinc-200" },
      { name: "Bootstrap", reactIcon: FaBootstrap, color: "text-zinc-200" },
    ],
    link: "",
    status: "Offline",
    category: "Web Application",
    launchDate: "Maret 2020",
    features: ["Camera equipment catalog with search and filter options", "Online booking and payment system", "User account management for rental history", "Responsive design for desktop and mobile"],
    challenges: "Integrating a reliable booking system with real-time availability checks was complex. Ensuring secure payment processing and handling high traffic during peak rental periods required extensive optimization.",
    githubLink: "https://github.com/hasbihasbullh/LuckyKamera",
  },
];