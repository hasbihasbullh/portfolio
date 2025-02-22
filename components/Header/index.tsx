"use client";

import { Menu } from "lucide-react";
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
    <nav className="flex justify-between items-center px-4 sm:px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">HasbiHasbullh</span>
      </div>

      <button className="lg:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        <Menu className="h-6 w-6" />
      </button>

      <div ref={menuRef} className="fixed inset-0 bg-zinc-950 z-40 lg:hidden transform translate-x-full">
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl text-zinc-200">
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
    </nav>
  );
}