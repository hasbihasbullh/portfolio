"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/common/constants/navigation";
import { profileData } from "@/common/data/profileData";

export function DesktopSidebar() {
  const pathname = usePathname();

  const safeUsername = (() => {
    const u = profileData.username ?? "";
    return u.includes(" & ") ? u.split(" & ")[0] : u;
  })();

  const isActive = (href: string) => {
    // simple match; adapt if you use nested routes or dynamic segments
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-80 lg:flex-col lg:z-50">
      <aside className="flex flex-col h-full bg-zinc-900/50 border-zinc-800 overflow-y-auto border-r">
        {/* Profile Section */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-zinc-400">
            <Image src={profileData.image} alt={`${profileData.name} profile`} width={96} height={96} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-1">{profileData.name}</h2>
          <p className="text-zinc-400 text-sm">{safeUsername}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto" aria-label="Primary">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${active ? "text-white" : "text-zinc-400 group-hover:text-white"}`} aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Copyright */}
        <div className="p-6 border-t border-zinc-800">
          <p className="text-zinc-400 text-xs text-center leading-relaxed">
            Copyright ©{new Date().getFullYear()} <br /> {profileData.name}. All rights reserved.
          </p>
        </div>
      </aside>
    </div>
  );
}
