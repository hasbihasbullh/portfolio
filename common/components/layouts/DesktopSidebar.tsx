"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { navigationItems } from "@/common/constants/navigation";
import { CommandPalette } from "../elements/CommandPalette";
import { usePreloader } from "@/common/context/PreloaderContext";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "../elements/LanguageToggle";
import { hasShownPreloader, isLanguageSwitching } from "@/common/utils/preloaderState";

export function DesktopSidebar({ sanityProfile, sanityProjects = [] }: { sanityProfile?: any, sanityProjects?: any[] }) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const name = sanityProfile?.name || "M Hasbi Hasbullah";
  const imageUrl = sanityProfile?.imageUrl || "/placeholder.svg";
  const safeUsername = "@hasbihasbullh";

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const { isPreloaderDone } = usePreloader();

  return (
    <motion.div
      initial={isLanguageSwitching ? false : { x: -50, opacity: 0 }}
      animate={(hasShownPreloader || isPreloaderDone) ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-80 lg:flex-col lg:z-50"
    >
      <aside className="flex flex-col h-full bg-zinc-900/50 backdrop-blur-md border-zinc-800 border-r">
        {/* Profile Section */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-zinc-400 ring-2 ring-transparent hover:ring-zinc-600 transition-all duration-300">
            {imageUrl && (
              <Image src={imageUrl} alt={`${name} profile`} width={96} height={96} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-white mb-1">{name}</h2>
          <p className="text-zinc-400 text-sm mb-4">{safeUsername}</p>
          <div className="flex justify-center">
            <LanguageToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto sidebar-scroll space-y-4" aria-label="Primary">
          <div className="px-1">
            <CommandPalette sanityProfile={sanityProfile} sanityProjects={sanityProjects} />
          </div>
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-zinc-800 rounded-lg z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover indicator overlay */}
                    {!active && (
                      <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/20 rounded-lg z-0 transition-colors duration-200" />
                    )}
                    <item.icon className={`relative z-10 mr-3 flex-shrink-0 h-5 w-5 ${active ? "text-white" : "text-zinc-400 group-hover:text-white"}`} aria-hidden="true" />
                    <span className="relative z-10">{t(item.name as any)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Copyright */}
        <div className="p-6 border-t border-zinc-800">
          <p className="text-zinc-400 text-xs text-center leading-relaxed">
            Copyright ©{new Date().getFullYear()} <br /> 
            <Link href="/" className="hover:text-white transition-colors duration-300 font-semibold">{name}</Link>. {tFooter("rights")}.
          </p>
        </div>
      </aside>
    </motion.div>
  );
}
