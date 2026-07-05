"use client";
import React from "react";
import { useTranslations } from "next-intl";

export const FooterContent = ({ sanityProfile }: { sanityProfile?: any }) => {
  const t = useTranslations("Footer");
  const name = sanityProfile?.name || "M Hasbi Hasbullah";

  return (
    <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
      <div className="text-center">
        <p className="text-zinc-500 text-xs leading-relaxed">{t("madeWith")} {name}</p>
        <p className="text-zinc-600 text-xs mt-1">©{new Date().getFullYear()} {t("rights")}</p>
      </div>
    </div>
  );
};
