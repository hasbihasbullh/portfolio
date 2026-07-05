"use client";
import React from "react";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export function WelcomeCard({ sanityProfile }: { sanityProfile?: any }) {
  const t = useTranslations("Home.Welcome");
  const tProfile = useTranslations("Profile");
  const locale = useLocale();

  const name = sanityProfile?.name || "Anonymous";
  const description = sanityProfile?.description?.[locale] || t("description");
  const role = sanityProfile?.role || tProfile("position");

  return (
    <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden !p-0 md:col-span-2 h-full w-full" spotlightColor="rgba(255, 255, 255, 0.12)">
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-3xl font-bold text-white">
              <span className="text-xl md:text-xl">{t("greeting")}</span>
              <span className="bg-gradient-to-r from-zinc-400 to-zinc-400 bg-clip-text text-transparent block">{name}</span>

            </h1>
            <p className="text-zinc-200 text-sm">{role}</p>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">{description}</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-500/10 border border-zinc-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">{t("available")}</span>
          </div>
        </div>
        <div className="border-t border-zinc-800/50"></div>
        <div className="grid md:grid-cols-1 gap-6">
          <div className="space-y-3">
            <div className="space-y-2">
              <Link
                href={sanityProfile?.resumeUrl || "/document/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>{t("resume")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
