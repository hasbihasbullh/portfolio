"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// Hook untuk page transition
const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback?: () => void) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Create transition elements
    const createTransitionBanners = () => {
      const container = document.createElement("div");
      container.className = "fixed inset-0 z-[60] pointer-events-none";
      container.id = "page-transition-container";

      for (let i = 0; i < 4; i++) {
        const banner = document.createElement("div");
        banner.className = `fixed top-0 h-screen bg-neutral-50`;
        banner.id = `transition-banner-${i + 1}`;

        const positions = ["left-0 w-1/4", "left-1/4 w-1/4", "left-2/4 w-1/4", "left-3/4 w-1/4"];
        banner.className += ` ${positions[i]}`;
        banner.style.willChange = "transform";
        banner.style.backfaceVisibility = "hidden";

        container.appendChild(banner);
      }

      document.body.appendChild(container);
      return container;
    };

    const container = createTransitionBanners();
    const banners = Array.from(container.children) as HTMLElement[];

    const tl = gsap.timeline({
      onComplete: () => {
        container.remove();
        setIsTransitioning(false);
      },
    });

    // Set initial position (below viewport)
    tl.set(banners, {
      yPercent: 100,
      force3D: true,
    })
      // Slide up to cover page
      .to(banners, {
        yPercent: 0,
        duration: 0.6,
        stagger: {
          amount: 0.15,
          from: "start",
        },
        ease: "power2.out",
        force3D: true,
      })
      // Execute callback at the peak
      .call(() => {
        if (callback) callback();
      })
      // Slide up to reveal new page
      .to(
        banners,
        {
          yPercent: -100,
          duration: 0.6,
          stagger: {
            amount: 0.15,
            from: "start",
          },
          ease: "power2.in",
          force3D: true,
        },
        "+=0.1"
      );
  };

  return { isTransitioning, startTransition };
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isTransitioning, startTransition } = usePageTransition();

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

  const handleNavigation = (sectionId: string) => {
    if (isTransitioning) return;

    // Close mobile menu first
    setIsMenuOpen(false);

    // Start page transition
    startTransition(() => {
      // Scroll to section after transition starts
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    });
  };

  return (
    <>
      <nav className="fixed top-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-8">
          <div className="flex items-center gap-2">
            <button onClick={() => handleNavigation("hero")} className="text-xl font-bold hover:text-zinc-300 transition-colors disabled:opacity-50" disabled={isTransitioning}>
              HasbiHasbullh
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-sm">
            <button onClick={() => handleNavigation("about")} className="hover:text-zinc-300 transition-colors disabled:opacity-50" disabled={isTransitioning}>
              About
            </button>
            <button onClick={() => handleNavigation("project")} className="hover:text-zinc-300 transition-colors disabled:opacity-50" disabled={isTransitioning}>
              Project
            </button>
            <button onClick={() => handleNavigation("contact")} className="hover:text-zinc-300 transition-colors disabled:opacity-50" disabled={isTransitioning}>
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="relative z-50 lg:hidden disabled:opacity-50" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" disabled={isTransitioning}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div ref={menuRef} className="fixed inset-0 z-40 transform translate-x-full bg-zinc-950 lg:hidden">
          <div className="flex h-full flex-col items-center justify-center space-y-8 text-xl text-zinc-200">
            <button onClick={() => handleNavigation("about")} className="hover:text-zinc-300 transition-colors">
              About
            </button>
            <button onClick={() => handleNavigation("project")} className="hover:text-zinc-300 transition-colors">
              Project
            </button>
            <button onClick={() => handleNavigation("contact")} className="hover:text-zinc-300 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
