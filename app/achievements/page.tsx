import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data/profileData";

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 text-center"> Achievements</h1>
            <p className="text-gray-400 text-xl lg:text-2xl text-center">Coming Soon! Were working on something awesome.</p>
            {/* Mobile Copyright Footer (optional, bisa dihapus jika tidak diperlukan di halaman ini) */}
            <div className="lg:hidden mt-16 pt-8 border-t border-gray-700 w-full text-center">
              <p className="text-gray-400 text-xs text-center leading-relaxed">Copyright ©2025 {profileData.name}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
