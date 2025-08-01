"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Enforce dark mode
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 z-30 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">HasbiHasbullh</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-sm">
          <a href="#about" className="hover:text-zinc-300">
            About
          </a>
          <a href="#project" className="hover:text-zinc-300">
            Project
          </a>
          <a href="#contact" className="hover:text-zinc-300">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="relative z-50 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className="fixed inset-0 z-40 transform translate-x-full bg-zinc-950 lg:hidden">
        <div className="flex h-full flex-col items-center justify-center space-y-8 text-xl text-zinc-200">
          <a href="#about" className="hover:text-zinc-300" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#project" className="hover:text-zinc-300" onClick={() => setIsMenuOpen(false)}>
            Project
          </a>
          <a href="#contact" className="hover:text-zinc-300" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
