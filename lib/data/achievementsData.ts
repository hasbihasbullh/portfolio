export interface Achievement {
  id: number;
  type: "certificate" | "badge";
  title: string;
  issuer: string;
  issuedOn: string;
  image: string;
  credentialId: string;
  credentialUrl: string;
}

const monthMap: { [key: string]: number } = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

const parseIndonesianDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split(" ");
  const monthIndex = monthMap[month];

  if (monthIndex === undefined) {
    console.warn(`Invalid month: ${month} in date: ${dateString}`);
    return new Date(0);
  }

  return new Date(parseInt(year), monthIndex, parseInt(day));
};

const rawAchievementsData: Achievement[] = [
  {
    id: 1,
    type: "certificate",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    issuedOn: "22 Juni 2024",
    image: "images/achievements/sertifikat_dicoding_belajar_dasar_pemrograman_javascript.jpg",
    credentialId: "GRX535E1KZ0M",
    credentialUrl: "https://www.dicoding.com/certificates/GRX535E1KZ0M",
  },
  {
    id: 2,
    type: "certificate",
    title: "Belajar Dasar Pemrograman AI",
    issuer: "Dicoding",
    issuedOn: "07 April 2024",
    image: "images/achievements/sertifikat_dicoding_belajar_dasar_pemrograman_ai.jpg",
    credentialId: "2VX3KEW0JXYQ",
    credentialUrl: "https://www.dicoding.com/certificates/2VX3KEW0JXYQ",
  },
  {
    id: 3,
    type: "certificate",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    issuedOn: "04 Desember 2023",
    image: "images/achievements/sertifikat_dicoding_belajar_dasar_pemrograman_web.jpg",
    credentialId: "1RXY2R4WMXVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXY2R4WMXVM",
  },
  {
    id: 4,
    type: "certificate",
    title: "Ujian Kompetensi",
    issuer: "SMK Pasim Plus Kota Sukabumi",
    issuedOn: "21 April 2020",
    image: "images/achievements/sertifikat_ujikom_smk.jpg",
    credentialId: "",
    credentialUrl: "https://drive.google.com/file/d/1izQmC7OOKnwyksn5znbnGUFSF8cOofAC/view?usp=sharing",
  },
  {
    id: 5,
    type: "badge",
    title: "Automate Data Capture at Scale with Document AI",
    issuer: "Google Cloud",
    issuedOn: "02 April 2025",
    image: "images/achievements/badge_automate_data_capture_at_scale_with_document_ai_ski.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/0d7307d2-40a4-4f96-bac1-76429566d3ad/public_url",
  },
  {
    id: 6,
    type: "badge",
    title: "Explore Generative AI with the Vertex AI Gemini API",
    issuer: "Google Cloud",
    issuedOn: "05 Februari 2025",
    image: "images/achievements/badge_generative_ai_with_the_vertex_ai_gemini_api.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/5a7f6922-af00-4581-ba36-3d60e6d019f0/public_url",
  },
  {
    id: 7,
    type: "badge",
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud",
    issuedOn: "02 Maret 2025",
    image: "images/achievements/badge_real_world_ai_applications_with_gemini_and_im.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/54c2ce9d-d327-4dca-80a6-f16fa5170a45/public_url",
  },
  {
    id: 8,
    type: "badge",
    title: "Cloud Speech API: 3 Ways",
    issuer: "Google Cloud",
    issuedOn: "02 Maret 2025",
    image: "images/achievements/badge_cloud_speech_api_3_ways_skill_badge.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/9c499f22-e3dc-4780-a240-c0132f3a3a4f/public_url",
  },
  {
    id: 9,
    type: "badge",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    issuedOn: "02 Maret 2025",
    image: "images/achievements/badge_prompt_design_in_vertex_ai_skill_badge.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/9642c9fd-5678-4727-ad66-5cc3dd304f8d/public_url",
  },
  {
    id: 10,
    type: "badge",
    title: "Protect Sensitive Data with Data Loss Prevention",
    issuer: "Google Cloud",
    issuedOn: "02 April 2025",
    image: "images/achievements/badge_protect_sensitive_data_with_data_loss_prevention_sk.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/e771eeb1-d973-4315-8d76-fdd22bce1181/public_url",
  },
  {
    id: 11,
    type: "badge",
    title: "Secure BigLake Data",
    issuer: "Google Cloud",
    issuedOn: "02 Mei 2025",
    image: "images/achievements/badge_secure_biglake_data_skill_badge.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/ea971e73-4a34-409f-86fc-466a8e0efd5b/public_url",
  },
  {
    id: 12,
    type: "badge",
    title: "The Basics of Google Cloud Compute",
    issuer: "Google Cloud",
    issuedOn: "02 Mei 2025",
    image: "images/achievements/badge_the_basics_of_google_cloud_compute_skill_badge.png",
    credentialId: "",
    credentialUrl: "https://www.credly.com/badges/f3573dc9-b0ab-41c9-aac4-23addb8837aa/public_url",
  },
];

export const sortAchievementsByDate = (achievements: Achievement[]): Achievement[] => {
  return [...achievements].sort((a, b) => {
    const dateA = parseIndonesianDate(a.issuedOn);
    const dateB = parseIndonesianDate(b.issuedOn);

    if (dateA.getTime() === 0) return 1; // Move invalid dates to end
    if (dateB.getTime() === 0) return -1;

    return dateB.getTime() - dateA.getTime(); // Newest first
  });
};

export const achievementsData: Achievement[] = sortAchievementsByDate(rawAchievementsData);

export { parseIndonesianDate };

export const isValidAchievementDate = (dateString: string): boolean => {
  const parsed = parseIndonesianDate(dateString);
  return parsed.getTime() !== 0 && parsed <= new Date(); // Should not be future date
};

export const getAchievements = (sortBy: "date" | "title" | "issuer" = "date", order: "asc" | "desc" = "desc"): Achievement[] => {
  const sorted = [...rawAchievementsData].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        const dateA = parseIndonesianDate(a.issuedOn);
        const dateB = parseIndonesianDate(b.issuedOn);
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "issuer":
        comparison = a.issuer.localeCompare(b.issuer);
        break;
    }

    return order === "desc" ? -comparison : comparison;
  });

  return sorted;
};
