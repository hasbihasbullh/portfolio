"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, Home, User, Award, Folder, Activity, Mail, FileText, Github, Copy, Check, X } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { projects } from "@/common/data/projectData";
import { profileData } from "@/common/data/profileData";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Quick Actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const t = useTranslations("CommandPalette");
  const tProjects = useTranslations("Projects");
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette with Keyboard Shortcut (disabled on mobile < 1024px)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  // Commands List
  const items: CommandItem[] = [
    // Navigation
    { id: "nav-home", title: t("actions.home"), subtitle: t("actions.homeSub"), category: "Navigation", icon: Home, action: () => handleNavigate("/") },
    { id: "nav-about", title: t("actions.about"), subtitle: t("actions.aboutSub"), category: "Navigation", icon: User, action: () => handleNavigate("/about") },
    { id: "nav-achievements", title: t("actions.achievements"), subtitle: t("actions.achievementsSub"), category: "Navigation", icon: Award, action: () => handleNavigate("/achievements") },
    { id: "nav-projects", title: t("actions.projects"), subtitle: t("actions.projectsSub"), category: "Navigation", icon: Folder, action: () => handleNavigate("/projects") },
    { id: "nav-activity", title: t("actions.activity"), subtitle: t("actions.activitySub"), category: "Navigation", icon: Activity, action: () => handleNavigate("/activity") },
    { id: "nav-contact", title: t("actions.contact"), subtitle: t("actions.contactSub"), category: "Navigation", icon: Mail, action: () => handleNavigate("/contact") },

    // Quick Actions
    { id: "action-resume", title: t("actions.resume"), subtitle: t("actions.resumeSub"), category: "Quick Actions", icon: FileText, action: () => handleOpenLink("/document/resume.pdf") },
    { id: "action-github", title: t("actions.github"), subtitle: t("actions.githubSub"), category: "Quick Actions", icon: Github, action: () => handleOpenLink(profileData.social?.github || "") },
    { id: "action-copy-email", title: copied ? t("actions.emailCopied") : t("actions.copyEmail"), subtitle: profileData.email, category: "Quick Actions", icon: copied ? Check : Copy, action: handleCopyEmail },

    // Project quick links
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: tProjects(`${p.id}.description`),
      category: "Projects" as const,
      icon: Folder,
      action: () => handleNavigate(`/projects/${p.id}`),
    })),
  ];

  // Filter items based on search input
  const filteredItems = items.filter(
    (item) => item.title.toLowerCase().includes(search.toLowerCase()) || (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase())) || item.category.toLowerCase().includes(search.toLowerCase()),
  );

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  // Flattened categories to map index correctly
  const flatGroupedList: CommandItem[] = [];
  const categoryHeaders: string[] = [];

  Object.entries(groupedItems).forEach(([category, catItems]) => {
    categoryHeaders.push(category);
    catItems.forEach((item) => {
      flatGroupedList.push(item);
    });
  });

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle Keyboard Navigation within Dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || flatGroupedList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatGroupedList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatGroupedList.length) % flatGroupedList.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatGroupedList[selectedIndex]) {
        flatGroupedList[selectedIndex].action();
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-command-item="${selectedIndex}"]`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, flatGroupedList.length]);

  return (
    <>
      {/* Visual Keyboard Shortcut Badge in Sidebar/Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-800/80 rounded-lg text-zinc-400 hover:text-zinc-200 text-xs transition-all duration-200 group"
        title="Open Command Palette (Ctrl+K)"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 group-hover:text-zinc-300 transition-colors" />
          <span>{t("trigger")}</span>
        </span>
        <kbd className="pointer-events-none select-none bg-zinc-900 border border-zinc-700/60 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 font-mono hidden lg:flex items-center gap-0.5">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>
      </button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300" />
          <Dialog.Content
            onOpenAutoFocus={(e) => {
              if (window.innerWidth < 1024) {
                e.preventDefault();
              }
            }}
            onKeyDown={handleKeyDown}
            className="fixed top-[20%] left-0 right-0 mx-auto z-50 w-[92%] sm:w-full max-w-xl bg-zinc-950/95 border border-zinc-800 rounded-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col p-0 outline-none animate-in fade-in zoom-in-95 duration-200"
          >
            <Dialog.Title className="sr-only">Search Command Palette</Dialog.Title>
            <Dialog.Description className="sr-only">Quick search and navigation shortcut</Dialog.Description>
            {/* Search Input bar */}
            <div className="flex items-center gap-3 px-4 border-b border-zinc-800/80">
              <Search className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <input
                placeholder={t("placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-zinc-100 placeholder-zinc-500 py-4 text-sm"
              />
              <Dialog.Close className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded text-xs transition-colors flex items-center justify-center">
                <span className="hidden lg:inline">Esc</span>
                <X className="w-3.5 h-3.5 lg:hidden" />
              </Dialog.Close>
            </div>

            {/* List Results */}
            <div className="max-h-[350px] overflow-y-auto custom-scroll p-2">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-500">
                  {t("noResults")} &quot;<span className="text-zinc-400 font-medium">{search}</span>&quot;
                </div>
              ) : (
                <div ref={listRef} className="space-y-4">
                  {Object.entries(groupedItems).map(([category, catItems]) => (
                    <div key={category} className="space-y-1">
                      <h3 className="px-3 pt-2 pb-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{t(`categories.${category as any}`)}</h3>
                      {catItems.map((item) => {
                        const globalIndex = flatGroupedList.findIndex((i) => i.id === item.id);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.id}
                            onClick={() => item.action()}
                            data-command-item={globalIndex}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                              isSelected ? "bg-zinc-800/80 text-white shadow-sm shadow-black/20" : "text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`p-1.5 rounded-md ${isSelected ? "bg-zinc-700 text-zinc-100" : "bg-zinc-900/60 text-zinc-400"}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-xs font-medium ${isSelected ? "text-zinc-100" : "text-zinc-300"}`}>{item.title}</p>
                                {item.subtitle && <p className="text-[10px] text-zinc-500 truncate max-w-sm sm:max-w-md">{item.subtitle}</p>}
                              </div>
                            </div>
                            {isSelected && <span className="hidden lg:inline-block text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-700/50 px-1.5 py-0.5 rounded font-mono">Enter</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="hidden lg:flex items-center justify-between px-4 py-2.5 bg-zinc-900/40 border-t border-zinc-800/60 text-[10px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-700/60 text-[9px] font-mono">↑↓</kbd>
                  <span>{t("hints.navigate")}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-700/60 text-[9px] font-mono">Enter</kbd>
                  <span>{t("hints.select")}</span>
                </span>
              </div>
              <div>
                <span>
                  {t("hints.press")} <kbd className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-700/60 text-[9px] font-mono">Esc</kbd> {t("hints.close")}
                </span>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
