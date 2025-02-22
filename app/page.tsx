"use client";

import Nav from "@/components/Header";
import HeroSection from "@/components/Hero";
import About from "@/components/About";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { VelocityScroll } from "@/components/ui/magicui/scroll-based-velocity";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      <Nav />
      <HeroSection />
      <About />
      <Project />
      <Contact />
      <VelocityScroll>HSB</VelocityScroll>
      <Footer />
    </main>
  );
}
