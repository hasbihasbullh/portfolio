import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaTerminal, FaBootstrap, FaGitAlt, FaGithub, FaPhp, FaLaravel, FaWordpress, FaNpm } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiCodeigniter, SiMysql, SiGraphql, SiFigma, SiCoreldraw, SiAdobephotoshop } from "react-icons/si";
import { TbSeo } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
import { VscVscode } from "react-icons/vsc";

export const skillsList = [
  // Front-end
  {
    name: "HTML",
    category: "Front-end",
    color: "bg-orange-500",
    glow: "rgba(251, 146, 60, 0.3)",
    icon: FaHtml5,
    proficiency: "Advanced",
  },
  {
    name: "CSS",
    category: "Front-end",
    color: "bg-blue-500",
    glow: "rgba(59, 130, 246, 0.3)",
    icon: FaCss3Alt,
    proficiency: "Advanced",
  },
  {
    name: "JavaScript",
    category: "Front-end",
    color: "bg-yellow-500",
    glow: "rgba(234, 179, 8, 0.3)",
    icon: FaJsSquare,
    proficiency: "Intermediate",
  },
  {
    name: "TypeScript",
    category: "Front-end",
    color: "bg-blue-400",
    glow: "rgba(96, 165, 250, 0.3)",
    icon: SiTypescript,
    proficiency: "Beginner",
  },
  {
    name: "Tailwind CSS",
    category: "Front-end",
    color: "bg-sky-400",
    glow: "rgba(56, 189, 248, 0.3)",
    icon: SiTailwindcss,
    proficiency: "Intermediate",
  },
  {
    name: "Bootstrap",
    category: "Front-end",
    color: "bg-purple-600",
    glow: "rgba(147, 51, 234, 0.3)",
    icon: FaBootstrap,
    proficiency: "Intermediate",
  },
  {
    name: "React",
    category: "Front-end",
    color: "bg-cyan-500",
    glow: "rgba(6, 182, 212, 0.3)",
    icon: FaReact,
    proficiency: "Intermediate",
  },
  {
    name: "Next.js",
    category: "Front-end",
    color: "bg-black",
    glow: "rgba(0, 0, 0, 0.3)",
    icon: SiNextdotjs,
    proficiency: "Beginner",
  },
  {
    name: "SEO",
    category: "Front-end",
    color: "bg-green-600",
    glow: "rgba(16, 185, 129, 0.3)",
    icon: TbSeo,
    proficiency: "Intermediate",
  },

  // Back-end
  {
    name: "Node.js",
    category: "Back-end",
    color: "bg-green-500",
    glow: "rgba(34, 197, 94, 0.3)",
    icon: FaNodeJs,
    proficiency: "Intermediate",
  },
  {
    name: "PHP",
    category: "Back-end",
    color: "bg-indigo-500",
    glow: "rgba(99, 102, 241, 0.3)",
    icon: FaPhp,
    proficiency: "Intermediate",
  },
  {
    name: "Laravel",
    category: "Back-end",
    color: "bg-red-500",
    glow: "rgba(239, 68, 68, 0.3)",
    icon: FaLaravel,
    proficiency: "Intermediate",
  },
  {
    name: "CodeIgniter",
    category: "Back-end",
    color: "bg-orange-600",
    glow: "rgba(234, 88, 12, 0.3)",
    icon: SiCodeigniter,
    proficiency: "Intermediate",
  },
  {
    name: "GraphQL",
    category: "Back-end",
    color: "bg-pink-500",
    glow: "rgba(232, 62, 140, 0.3)",
    icon: SiGraphql,
    proficiency: "Beginner",
  },

  // Database
  {
    name: "MySQL",
    category: "Database",
    color: "bg-blue-600",
    glow: "rgba(37, 99, 235, 0.3)",
    icon: SiMysql,
    proficiency: "Intermediate",
  },

  // CMS
  {
    name: "WordPress",
    category: "CMS",
    color: "bg-blue-800",
    glow: "rgba(30, 64, 175, 0.3)",
    icon: FaWordpress,
    proficiency: "Intermediate",
  },

  // DevOps
  // {
  //   name: "Docker",
  //   category: "DevOps",
  //   color: "bg-blue-400",
  //   glow: "rgba(66, 153, 225, 0.3)",
  //   icon: SiDocker,
  //   proficiency: "Beginner",
  // },

  // Tools
  {
    name: "VS Code",
    category: "Tools",
    color: "bg-blue-600",
    glow: "rgba(37, 99, 235, 0.3)",
    icon: VscVscode,
    proficiency: "Advanced",
  },
  {
    name: "Git",
    category: "Tools",
    color: "bg-orange-700",
    glow: "rgba(194, 65, 12, 0.3)",
    icon: FaGitAlt,
    proficiency: "Intermediate",
  },
  {
    name: "GitHub",
    category: "Tools",
    color: "bg-gray-800",
    glow: "rgba(31, 41, 55, 0.3)",
    icon: FaGithub,
    proficiency: "Intermediate",
  },
  {
    name: "CLI",
    category: "Tools",
    color: "bg-gray-500",
    glow: "rgba(107, 114, 128, 0.3)",
    icon: FaTerminal,
    proficiency: "Intermediate",
  },
  {
    name: "AI",
    category: "Tools",
    color: "bg-indigo-500",
    glow: "rgba(99, 102, 241, 0.3)",
    icon: LuBrainCircuit,
    proficiency: "Intermediate",
  },
  {
    name: "npm",
    category: "Tools",
    color: "bg-red-500",
    glow: "rgba(239, 68, 68, 0.3)",
    icon: FaNpm,
    proficiency: "Intermediate",
  },

  // Design
  {
    name: "Figma",
    category: "Design",
    color: "bg-purple-500",
    glow: "rgba(168, 85, 247, 0.3)",
    icon: SiFigma,
    proficiency: "Beginner",
  },
  {
    name: "Photoshop",
    category: "Design",
    color: "bg-blue-700",
    glow: "rgba(0, 122, 204, 0.3)",
    icon: SiAdobephotoshop,
    proficiency: "Intermediate",
  },
  {
    name: "CorelDRAW",
    category: "Design",
    color: "bg-green-700",
    glow: "rgba(0, 141, 76, 0.3)",
    icon: SiCoreldraw,
    proficiency: "Intermediate",
  },
];
