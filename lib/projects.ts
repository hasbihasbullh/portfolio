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
    id: "informatika-gen2",
    title: "Informatika Gen 2 - Website Class",
    description: "A personal class website for Informatika Gen 2, built with Next.js, GSAP, and Tailwind CSS.",
    image: "/images/img1.png",
    fullDescription: "A modern and interactive class website for Informatika Gen 2 (Batch 2). This website serves as a hub for class-related information, including a homepage, a gallery of class activities, and a list of members.",
    technologies: ["Next.js", "SASS", "GSAP", "Lenis", "Framer Motion", "Tailwind CSS"],
    features: [
      "Smooth scrolling animations with GSAP & Lenis",
      "Dynamic and responsive UI with Tailwind CSS",
      "Interactive motion effects using Framer Motion",
      "Class gallery showcasing memorable moments",
      "List of class members with profiles",
    ],
    demoUrl: "https://informatika24-unlip.vercel.app/",
    githubUrl: "https://github.com/hasbihasbullh/Informatika24-unlip",
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
