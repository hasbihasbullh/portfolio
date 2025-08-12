"use client";
import { navigationItems } from "@/lib/constants/navigation";
import { profileData } from "@/lib/data/profileData";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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

  return (
    <div className="lg:hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-400">
                {profileData.image ? (
                  <Image src={profileData.image} alt={profileData.name || "Profile"} width={40} height={40} className="w-full h-full object-cover" />
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

        {isDropdownOpen && (
          <div className="bg-zinc-900 border-t border-zinc-800">
            <div className="px-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}>
                      <item.icon className={`mr-2 h-4 w-4 ${active ? "text-white" : "text-zinc-400 group-hover:text-white"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
