"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Header";
import HeroSection from "@/components/Hero";
import About from "@/components/About";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { VelocityScroll } from "@/components/ui/magicui/scroll-based-velocity";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a delay before showing the main content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Show loader initially */}
      <Loader onComplete={() => setIsLoaderComplete(true)} />

      {/* Main content - show after delay */}
      {showContent && (
        <>
          <Nav />
          <HeroSection />
          <About />
          <Project />
          <Contact />
          <VelocityScroll>HSB</VelocityScroll>
          <Footer />
        </>
      )}
    </main>
  );
}
