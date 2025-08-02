import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true); // State untuk logo

  useEffect(() => {
    const banners = [document.getElementById("banner-1"), document.getElementById("banner-2"), document.getElementById("banner-3"), document.getElementById("banner-4")];

    if (banners.every((banner) => banner !== null)) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Sembunyikan loader setelah delay
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 200); // Delay sebelum menyembunyikan loader
        },
      });

      // Set initial state
      tl.set(banners, {
        yPercent: 0,
        scaleY: 1,
        transformOrigin: "bottom",
        force3D: true,
      })
        // Wait for content to load
        .to({}, { duration: 1.5 }) // Loading time
        .to(".loading-logo", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setIsLogoVisible(false), // Sembunyikan logo setelah animasi
        })
        // Animate banners out
        .to(banners, {
          yPercent: -100,
          duration: 1.2,
          stagger: {
            amount: 0.4,
            from: "start",
          },
          ease: "power2.inOut",
          force3D: true,
        })
        // Scale effect for smoothness
        .to(
          banners,
          {
            scaleY: 0,
            duration: 0.3,
            stagger: {
              amount: 0.15,
              from: "start",
            },
            ease: "power1.out",
            transformOrigin: "bottom",
          },
          "-=0.2"
        );
    }
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Banner elements */}
      <div id="banner-1" className="min-h-screen bg-neutral-50 fixed top-0 left-0 w-1/4" />
      <div id="banner-2" className="min-h-screen bg-neutral-50 fixed top-0 left-1/4 w-1/4" />
      <div id="banner-3" className="min-h-screen bg-neutral-50 fixed top-0 left-2/4 w-1/4" />
      <div id="banner-4" className="min-h-screen bg-neutral-50 fixed top-0 left-3/4 w-1/4" />

      {/* Loading logo */}
      {isLogoVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-10 loading-logo">
          <Image src="/HSB.svg" alt="HSB Logo" width={160} height={160} className="w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 max-w-[40vw] h-auto animate-pulse" priority />
        </div>
      )}
    </div>
  );
};

export default Loader;
