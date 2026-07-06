import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { PortableText } from '@portabletext/react';

export function AboutHeader({ sanityProfile }: { sanityProfile?: any }) {
  const t = useTranslations("About.header");
  const locale = useLocale();
  const aboutDesc = sanityProfile?.aboutDescription?.[locale] || sanityProfile?.aboutDescription?.en || sanityProfile?.aboutDescription;
  const shortDesc = sanityProfile?.description?.[locale] || sanityProfile?.description?.en || sanityProfile?.description;
  
  const hasPortableText = Array.isArray(aboutDesc);
  const descString = !hasPortableText ? (aboutDesc || shortDesc || "") : "";
  const paragraphs = typeof descString === 'string' ? descString.split("\n").filter((p: string) => p.trim() !== "") : [];

  return (
    <div className="mb-8 lg:mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-200 leading-tight mb-6">{t("title")}</h1>
      <div className="space-y-6">
        {hasPortableText ? (
          <div className="prose prose-invert prose-zinc max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
            <PortableText value={aboutDesc} />
          </div>
        ) : (
          paragraphs.map((p: string, i: number) => (
            <p key={i} className={`text-zinc-300 leading-relaxed ${i === 0 ? "text-lg lg:text-xl font-medium text-zinc-200" : "text-base lg:text-lg text-zinc-400"}`}>
              {p}
            </p>
          ))
        )}
      </div>
    </div>
  );
}