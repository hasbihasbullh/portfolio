"use client";
import React, { useState, useMemo } from "react";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { profileData } from "@/common/data/profileData";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { AlertCircle } from "lucide-react";
import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { SocialCard } from "./SocialCard";
import { FooterContent } from "@/common/components/layouts/FooterContent";
import { useTranslations } from "next-intl";

const Contact = () => {
  const [socialError, setSocialError] = useState<string | null>(null);
  const t = useTranslations("Contact.social");

  const socialCard = useMemo(
    () => [
      {
        title: t("instagram.title"),
        description: t("instagram.description"),
        action: t("instagram.action"),
        gradient: "from-purple-700 via-pink-700 to-orange-700",
        icon: SiInstagram,
        iconBg: "bg-pink-700/20",
        onClick: () => handleSocialClick(profileData.social?.instagram, "Instagram"),
        accent: "",
        link: profileData.social?.instagram,
      },
      {
        title: t("linkedin.title"),
        description: t("linkedin.description"),
        action: t("linkedin.action"),
        gradient: "from-blue-700 via-blue-800 to-cyan-800",
        icon: SiLinkedin,
        iconBg: "bg-blue-700/20",
        onClick: () => handleSocialClick(profileData.social?.linkedin, "LinkedIn"),
        accent: "",
        link: profileData.social?.linkedin,
      },
      {
        title: t("github.title"),
        description: t("github.description"),
        action: t("github.action"),
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
        setSocialError(`${platform} ${t("errorUnavailable")}`);
        setTimeout(() => setSocialError(null), 3000);
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
      setSocialError(null);
    } catch (err) {
      console.error(`Failed to open ${platform} link:`, err);
      setSocialError(`${t("errorFailed")} ${platform}. ${t("errorTryAgain")}`);
      setTimeout(() => setSocialError(null), 3000);
    }
  };

  return (
    <div className="w-full">
      {socialError && (
        <div role="alert" className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-zinc-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{socialError}</span>
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <ContactHeader />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-0">
            <ContactForm />
            <SocialCard socialCard={socialCard} />
          </div>
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
};

export default Contact;
