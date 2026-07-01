"use client";

import { useTransition, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Switch } from "@/common/components/ui/switch";
import { Globe } from "lucide-react";
import { setIsLanguageSwitching } from "@/common/utils/preloaderState";

interface LanguageToggleProps {
  variant?: "switch" | "icon";
}

export function LanguageToggle({ variant = "switch" }: LanguageToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "id" : "en";
    setIsLanguageSwitching(true);
    startTransition(() => {
      // @ts-expect-error - params is loosely typed
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  useEffect(() => {
    // Clear the flag after a short delay to allow framer-motion to evaluate initial state
    const timer = setTimeout(() => {
      setIsLanguageSwitching(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  if (variant === "icon") {
    return (
      <button 
        onClick={toggleLocale}
        disabled={isPending}
        className="flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 w-8 h-8 rounded-lg transition-colors border border-zinc-700/50"
        aria-label="Toggle language"
        title={locale === "id" ? "Ganti ke English" : "Switch to Indonesian"}
      >
        <div className="relative flex items-center justify-center">
          <Globe className="w-4 h-4" />
          <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-zinc-900 text-zinc-100 rounded-sm px-0.5 border border-zinc-700">
            {locale.toUpperCase()}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-zinc-800/50 hover:bg-zinc-800/80 rounded-full border border-zinc-700/50 transition-colors w-fit">
      <span className={`text-[8px] sm:text-[10px] font-bold tracking-wider transition-colors ${locale === "id" ? "text-white" : "text-zinc-500"}`}>ID</span>
      
      <Switch 
        checked={locale === "en"}
        onCheckedChange={toggleLocale}
        disabled={isPending}
        className="data-[state=checked]:bg-zinc-700 data-[state=unchecked]:bg-zinc-800 scale-75 sm:scale-100"
        aria-label="Toggle language"
      />

      <span className={`text-[8px] sm:text-[10px] font-bold tracking-wider transition-colors ${locale === "en" ? "text-white" : "text-zinc-500"}`}>EN</span>
    </div>
  );
}
