
import React from "react";
import { useTranslations } from "next-intl";

export function AboutHeader() {
  const t = useTranslations("About.header");
  
  return (
    <div className="mb-8 lg:mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-200 leading-tight mb-4">{t("title")}</h1>
      <p className="text-lg lg:text-xl text-zinc-300 leading-relaxed mb-4 max-w-1xl">
        {t("p1")}
      </p>
      <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-1xl">
        {t("p2")}
      </p>
    </div>
  );
}