"use client";
import { useState, useRef } from "react";
import gsap from "gsap";

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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

        const widthClasses = ["w-1/4", "w-1/4", "w-1/4", "w-1/4"];
        const leftClasses = ["left-0", "left-1/4", "left-2/4", "left-3/4"];

        banner.className += ` ${widthClasses[i]} ${leftClasses[i]}`;
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

    timelineRef.current = tl;
  };

  return { isTransitioning, startTransition };
};
