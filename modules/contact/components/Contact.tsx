"use client";
import React, { useState, useMemo } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { profileData } from "@/common/data/profileData";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { SocialCard } from "./SocialCard";
import { FooterContent } from "@/common/components/layouts/FooterContent";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socialCard = useMemo(
    () => [
      {
        title: "Follow My Journey",
        description: "Follow my creative journey and daily insights",
        action: "Go to Instagram",
        gradient: "from-purple-700 via-pink-700 to-orange-700",
        icon: SiInstagram,
        iconBg: "bg-pink-700/20",
        onClick: () => handleSocialClick(profileData.social?.instagram, "Instagram"),
        accent: "",
        link: profileData.social?.instagram,
      },
      {
        title: "Let's Connect",
        description: "Connect with me professionally on LinkedIn",
        action: "Go to LinkedIn",
        gradient: "from-blue-700 via-blue-800 to-cyan-800",
        icon: SiLinkedin,
        iconBg: "bg-blue-700/20",
        onClick: () => handleSocialClick(profileData.social?.linkedin, "LinkedIn"),
        accent: "",
        link: profileData.social?.linkedin,
      },
      {
        title: "Explore the Code",
        description: "Dive into my open-source projects & contributions.",
        action: "Go to GitHub",
        gradient: "from-gray-800 via-gray-900 to-zinc-950",
        icon: SiGithub,
        iconBg: "bg-gray-700/20",
        onClick: () => handleSocialClick(profileData.social?.github, "GitHub"),
        accent: "",
        link: profileData.social?.github,
      },
    ],
    []
  );

  const handleSocialClick = (url: string | undefined, platform: string) => {
    try {
      if (!url) {
        setError(`${platform} link is not available`);
        setTimeout(() => setError(null), 3000);
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
      setError(null);
    } catch (err) {
      console.error(`Failed to open ${platform} link:`, err);
      setError(`Failed to open ${platform}. Please try again.`);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="flex-1 lg:ml-80 overflow-y-auto">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <ContactHeader />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-0">
            <ContactForm
              error={error}
              setError={setError}
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
            <SocialCard socialCard={socialCard} />
          </div>
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
};

export default Contact;
