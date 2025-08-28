interface ProfileData {
  name: string;
  position: string;
  location: string;
  status: string;
  image: string;
  username: string;
  email: string;
  social?: SocialLinks;
}

interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export const profileData: ProfileData = {
  name: "M Hasbi Hasbullah",
  position: "Software Developer",
  location: "Sukabumi, Jawa Barat, Indonesia",
  status: "Available for Projects",
  image: "/images/Me.png",
  username: "@hasbihasbullh",
  email: "mhasbihasbullah@gmail.com",
  social: {
    instagram: "https://instagram.com/hasbihasbullh-",
    linkedin: "https://linkedin.com/in/m-hasbi-hasbullah-1a152b340",
    github: "https://github.com/hasbihasbullh",
  },
};

export const profileImages = [
  { id: 1, img: "images/3.jpg" },
  { id: 2, img: "images/2.jpg" },
  { id: 3, img: "images/1.jpg" },
];
