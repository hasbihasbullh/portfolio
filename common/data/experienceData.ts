export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  tags: string[];
  logo: string;
  responsibilities: string[];
  description?: string;
  type: 'internship' | 'part-time' | 'full-time' | 'training' | 'apprentice';
  workMode: 'remote' | 'onsite' | 'hybrid';
}

export const experiences: Experience[] = [
  {
    id: "solusiku",
    title: "Advertiser Training",
    company: "PT. Solusi Kreatif Universal",
    location: "Bekasi, Jawa Barat",
    duration: "Mar 2024 - May 2024 • 3 Months",
    tags: ["Internship", "Remote"],
    logo: "/logo/solusiku.png",
    type: "internship",
    workMode: "remote",
    description: "Gained hands-on experience in digital marketing and advertising across multiple platforms.",
    responsibilities: [
      "Designed engaging image and video content for various products and campaigns",
      "Managed and optimized advertising campaigns on Facebook Ads and TikTok Ads platforms", 
      "Set up and configured online marketplaces on Shopee, TikTok, Lazada, and other e-commerce platforms",
      "Analyzed campaign performance and provided optimization recommendations"
    ],
  },
  {
    id: "lead",
    title: "Junior Web Administrator",
    company: "Language, Education, and Arts Development English (LEAD)",
    location: "Bandung, Jawa Barat", 
    duration: "Oct 2023 - Mar 2024 • 6 Months",
    tags: ["Part-time", "Remote"],
    logo: "/logo/lead.png",
    type: "part-time",
    workMode: "remote",
    description: "Responsible for web administration and data management for an educational institution.",
    responsibilities: [
      "Maintained accurate student database with regular data entry and updates",
      "Administered and maintained WordPress-based institutional website",
      "Ensured website security and performed regular backups",
      "Coordinated with academic staff for data accuracy and system improvements"
    ],
  },
  {
    id: "disnaker-trans", 
    title: "International Training Program",
    company: "Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Barat",
    location: "Bandung, Jawa Barat",
    duration: "Sep 2023 - Sep 2023 • 21 Days",
    tags: ["Training", "Onsite"],
    logo: "/logo/disnakertrans.png",
    type: "training",
    workMode: "onsite",
    description: "Intensive training program focused on professional development and language skills enhancement.",
    responsibilities: [
      "Participated in comprehensive English proficiency enhancement sessions",
      "Completed intensive 21-day professional development training program",
      "Engaged in cross-cultural communication workshops",
      "Received certification in international workplace communication"
    ],
  },
  {
    id: "inti-persero",
    title: "Technical Apprentice",
    company: "PT. Industri Telekomunikasi Indonesia (INTI)",
    location: "Bandung, Jawa Barat",
    duration: "Mar 2019 - May 2019 • 3 Months",
    tags: ["Apprentice", "Onsite"],
    logo: "/logo/inti-persero.png", 
    type: "apprentice",
    workMode: "onsite",
    description: "Technical apprenticeship program focusing on software development and IT infrastructure management.",
    responsibilities: [
      "Developed and implemented a comprehensive CRUD application for student data management",
      "Performed systematic data entry for tools and equipment inventory using web-based systems",
      "Conducted routine computer maintenance and troubleshooting for office workstations",
      "Assisted senior developers in system testing and quality assurance processes"
    ],
  },
];