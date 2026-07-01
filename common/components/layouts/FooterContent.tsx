"use client";
import React from "react";
import { profileData } from "@/common/data/profileData";
import { useTranslations } from "next-intl";

export const FooterContent = () => {
  const t = useTranslations("Footer");

  return (
    <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
      <div className="text-center">
        <p className="text-zinc-500 text-xs leading-relaxed">{t("madeWith")} {profileData.name}</p>
        <p className="text-zinc-600 text-xs mt-1">©{new Date().getFullYear()} {t("rights")}</p>
      </div>
    </div>
  );
};
