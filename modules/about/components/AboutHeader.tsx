
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export function AboutHeader({ sanityProfile }: { sanityProfile?: any }) {
  const t = useTranslations("About.header");
  const locale = useLocale();
  const aboutDesc = sanityProfile?.aboutDescription?.[locale] || sanityProfile?.aboutDescription?.en || sanityProfile?.aboutDescription;
  const shortDesc = sanityProfile?.description?.[locale] || sanityProfile?.description?.en || sanityProfile?.description;
  const desc = aboutDesc || shortDesc || "";
  const paragraphs = desc.split("\n").filter((p: string) => p.trim() !== "");

  return (
    <div className="mb-8 lg:mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-200 leading-tight mb-6">{t("title")}</h1>
      <div className="space-y-6">
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className={`text-zinc-300 leading-relaxed ${i === 0 ? "text-lg lg:text-xl font-medium text-zinc-200" : "text-base lg:text-lg text-zinc-400"}`}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}