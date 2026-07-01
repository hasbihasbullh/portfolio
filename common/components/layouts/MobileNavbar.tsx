"use client";
import { navigationItems } from "@/common/constants/navigation";
import { profileData } from "@/common/data/profileData";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { CommandPalette } from "../elements/CommandPalette";
import { usePreloader } from "@/common/context/PreloaderContext";

export function MobileNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const safePosition = profileData?.position ? profileData.position.split(" & ")[0] : "";
  const { isPreloaderDone } = usePreloader();

  return (
    <div className="lg:hidden">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={isPreloaderDone ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800"
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-400">
                {profileData.image ? (
                  <Image src={profileData.image} alt={`${profileData.name} profile`} width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs bg-gray-500">?</div>
                )}
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">{profileData?.name || "Anonymous"}</h2>
                <p className="text-zinc-400 text-xs">{safePosition}</p>
              </div>
            </div>

            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-white bg-zinc-800 px-3 py-2 rounded-lg">
              <span className="text-sm">Menu</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 border-t border-zinc-800 overflow-hidden"
            >
              <div className="px-4 py-2">
                <div className="mb-2">
                  <CommandPalette />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {navigationItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link key={item.name} href={item.href} onClick={() => setIsDropdownOpen(false)} className={`relative group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors overflow-hidden ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                        {active && (
                          <motion.div
                            layoutId="mobile-active-pill"
                            className="absolute inset-0 bg-zinc-800 rounded-lg z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {!active && (
                          <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/20 rounded-lg z-0 transition-colors duration-200" />
                        )}
                        <item.icon className={`relative z-10 mr-2 h-4 w-4 ${active ? "text-white" : "text-zinc-400 group-hover:text-white"}`} />
                        <span className="relative z-10">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
