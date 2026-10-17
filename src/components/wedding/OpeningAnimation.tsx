"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [isExiting, setIsExiting] = useState(false);
  const hasTriggeredRef = useRef(false);

  const handleEnter = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsExiting(true);

    // After opening transition completes, unmount opening screen
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [onComplete]);

  // Lock body scroll while opening screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Auto transition to 1st page after opening and shining sequence (~2.4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleEnter();
    }, 2400);

    return () => clearTimeout(timer);
  }, [handleEnter]);

  // Keyboard navigation (Enter / Space / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);

  return (
    <div
      onClick={handleEnter}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — Abuthahir & Fazila"
      className={`fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-750 ease-out ${
        isExiting
          ? "opacity-0 scale-110 pointer-events-none filter blur-md"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "#02271F",
        background:
          "radial-gradient(circle at 50% 50%, #064537 0%, #02271F 55%, #01140F 100%)",
      }}
    >
      {/* Dynamic inline styles for opening bloom and metallic shine sweep */}
      <style jsx>{`
        @keyframes openingBloom {
          0% {
            opacity: 0;
            transform: scale(0.65);
            filter: blur(8px) drop-shadow(0 0 10px rgba(198, 161, 91, 0.1));
          }
          60% {
            opacity: 1;
            transform: scale(1.02);
            filter: blur(0px) drop-shadow(0 0 35px rgba(198, 161, 91, 0.7));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px) drop-shadow(0 0 45px rgba(198, 161, 91, 0.8));
          }
        }

        @keyframes shineSweep {
          0% {
            transform: translateX(-160%) rotate(25deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          60% {
            opacity: 1;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(180%) rotate(25deg);
            opacity: 0;
          }
        }

        @keyframes radiantAura {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes glintSparkle {
          0%, 30% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) rotate(90deg);
          }
          75% {
            opacity: 0.8;
            transform: scale(0.9) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(270deg);
          }
        }

        .animate-opening-bloom {
          animation: openingBloom 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-shine-sweep {
          animation: shineSweep 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.55s forwards;
        }

        .animate-radiant-aura {
          animation: radiantAura 2.2s ease-in-out infinite;
        }

        .animate-glint-sparkle {
          animation: glintSparkle 1.1s ease-in-out 0.8s forwards;
        }
      `}</style>

      {/* Atmospheric Radial Golden Glow Center */}
      <div className="absolute w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gold-antique/25 blur-3xl pointer-events-none animate-radiant-aura" />

      {/* Expanding opening halo rings */}
      <div
        className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-gold-antique/30 pointer-events-none"
        style={{
          animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        }}
      />
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-gold-antique/20 pointer-events-none" />

      {/* Pure Logo Presentation Container */}
      <div className="relative animate-opening-bloom z-10 flex items-center justify-center">
        {/* Logo Image Box with shining mask */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 overflow-hidden rounded-full p-2 flex items-center justify-center">
          <Image
            src="/af-gold-monogram.png"
            alt="Abuthahir & Fazila Logo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
          />

          {/* Brilliant Golden Metallic Shine Sweep Overlay */}
          <div
            className="absolute inset-0 pointer-events-none animate-shine-sweep z-20"
            style={{
              width: "140%",
              height: "220%",
              top: "-60%",
              left: "-20%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,245,200,0.85) 50%, rgba(255,215,0,0.6) 65%, transparent 100%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Shimmering Glint Star Sparkle on Logo Crest */}
        <div className="absolute -top-1 right-6 sm:top-2 sm:right-8 pointer-events-none z-30 animate-glint-sparkle">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-ivory-warm filter drop-shadow-[0_0_8px_#FFF5C8]"
          >
            <path
              d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
