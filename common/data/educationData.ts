export interface Education {
  id: string;
  title: string;
  degree: string;
  duration: string;
  location: string;
  logo: string;
  description?: string;
  gpa?: string;
  status?: 'completed' | 'ongoing' | 'paused';
}

export const education: Education[] = [
  {
    id: "univ-linggabuana-pgri",
    title: "Universitas Linggabuana PGRI Sukabumi",
    degree: "Bachelor's degree, Informatics (S.Kom)",
    duration: "2024 - 2028",
    location: "Sukabumi, Jawa Barat",
    logo: "/logo/univ-linggabuana.png",
    description: "Currently pursuing Bachelor's degree in Informatics with focus on software engineering and web development.",
    status: "ongoing"
  },
  {
    id: "smk-pasim-plus",
    title: "SMK Pasim Plus Kota Sukabumi",
    degree: "Vocational High School, Software Engineering (RPL)",
    duration: "2017 - 2020",
    location: "Sukabumi, Jawa Barat",
    logo: "/logo/smk-pasim.png",
    description: "Specialized in Software Engineering with comprehensive training in programming, database management, and web development.",
    status: "completed"
  },
  {
    id: "mts-azzainiyyah",
    title: "MTs Azzainiyyah",
    degree: "Islamic Junior High School (MTs)",
    duration: "2014 - 2017",
    location: "Sukabumi, Jawa Barat",
    logo: "/logo/azzainiyyah.png",
    description: "Islamic-based education with strong foundation in mathematics, science, and religious studies.",
    status: "completed"
  },
];