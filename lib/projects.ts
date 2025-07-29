export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "pojok-coffee",
    title: "PojokCoffee - E-commerce and Blog",
    description: "A personal e-commerce website for selling coffee and sharing coffee-related information.",
    image: "/images/img3.png",
    fullDescription:
      "PojokCoffee is a modern e-commerce website that focuses on selling coffee products and providing a blog for coffee enthusiasts. The site features a responsive design, a dynamic shopping cart, and a blog section with articles about coffee.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Preline UI"],
    features: [
      "Responsive design with Tailwind CSS",
      "Dynamic shopping cart functionality",
      "Product detail pages with information and reviews",
      "Blog section with articles about coffee",
      "User  account management (sign in, register, my account)",
      "FAQ and contact pages for customer support",
    ],
    demoUrl: "https://hasbihasbullh.github.io/pojok-coffee/",
    githubUrl: "https://github.com/hasbihasbullh/pojok-coffee",
  },
  {
    id: "if24-unlip",
    title: "IF24 UNLIP - Informatika 2024 UNLIP Class",
    description: "A web-based app built with Next.js, Tailwind CSS, and TypeScript for Informatika 2024 UNLIP Class.",
    image: "/images/img1.png",
    fullDescription:
      "This is a modern web application designed using Next.js App Router, with styling powered by Tailwind CSS, and written in TypeScript. It serves as a foundational platform for the Informatika 2024 UNLIP project—either for internal tools, academic collaboration, or community engagement.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Built using Next.js 14 with App Router",
      "Tailwind CSS for rapid UI development",
      "Optimized for fast development and deployment",
      "Custom font integration using Geist",
      "Modular folder structure for scalability",
      "Deployed on Vercel",
    ],
    demoUrl: "https://if24-unlip.vercel.app/",
    githubUrl: "https://github.com/informatika24-unlip",
  },
  {
    id: "lucy-kamera-rental",
    title: "Lucy Kamera - Camera Rental Website",
    description: "A camera rental platform built with CodeIgniter 3 and Bootstrap, featuring product management, categories, and rental functionality.",
    image: "/images/img2.png",
    fullDescription:
      "Lucy Kamera is a web-based platform designed to facilitate camera rentals. The website allows users to browse available cameras, view details, and manage rentals. It also includes an admin panel for managing products, categories, and other essential features.",
    technologies: ["CodeIgniter 3", "Bootstrap", "MySQL", "jQuery", "PHP"],
    features: [
      "Product management: Add, edit, and delete camera products",
      "Category management: Organize products into categories",
      "Responsive and user-friendly interface with Bootstrap",
      "Rental functionality: Users can rent cameras and check availability",
      "Admin panel for managing products, categories, and orders",
      "Search and filter functionality for easy navigation",
    ],
    demoUrl: "",
    githubUrl: "https://github.com/hasbihasbullh/LuckyKamera",
  },
];
