import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { MainContent } from "@/components/sections/MainContent";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content with left margin for fixed sidebar */}
      <div className="flex-1 lg:ml-80">
        <MainContent />
      </div>
    </div>
  );
}
