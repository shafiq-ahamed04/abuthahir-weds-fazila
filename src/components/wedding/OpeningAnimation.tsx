"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ArabesqueCorner, IslamicStar } from "@/components/elements/IslamicElements";

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasTriggeredRef = useRef(false);

  const handleEnter = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsExiting(true);

    // After fade out completes, call onComplete to unmount
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Lock body scroll while opening screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Smooth progress timer (2.8 seconds total duration)
  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          handleEnter();
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
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
      aria-label="Wedding Invitation Opening"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 cursor-pointer select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #053b2f 0%, #02271f 50%, #011712 100%)",
      }}
    >
      {/* Background Islamic star geometry subtle overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(198, 161, 91, 0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative Gold Arabesque Corners */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none">
        <ArabesqueCorner position="top-left" className="w-12 h-12 text-gold-antique/70" />
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none">
        <ArabesqueCorner position="top-right" className="w-12 h-12 text-gold-antique/70" />
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none">
        <ArabesqueCorner position="bottom-left" className="w-12 h-12 text-gold-antique/70" />
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none">
        <ArabesqueCorner position="bottom-right" className="w-12 h-12 text-gold-antique/70" />
      </div>

      {/* Outer border trim */}
      <div className="absolute inset-3 sm:inset-5 border border-gold-antique/25 pointer-events-none rounded-sm" />
      <div className="absolute inset-4 sm:inset-6 border border-gold-antique/15 pointer-events-none rounded-sm" />

      {/* Top Header */}
      <div className="relative z-10 pt-4 sm:pt-6 flex flex-col items-center text-center">
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.35em] text-gold-antique/80 uppercase font-medium">
          IN THE NAME OF ALLAH, THE MOST BENEFICENT, THE MOST MERCIFUL
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-antique/50" />
          <IslamicStar size={12} className="text-gold-antique/80" />
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-antique/50" />
        </div>
      </div>

      {/* Center Stage: Royal Monogram Logo + Sacred Bismillah + Couple Names */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4">
        {/* Sacred Bismillah Calligraphy */}
        <p className="font-serif text-lg sm:text-2xl text-gold-antique/90 tracking-widest mb-4 sm:mb-6 drop-shadow-[0_2px_12px_rgba(198,161,91,0.3)]">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        {/* Logo Container with Golden Radiant Halo */}
        <div className="relative flex items-center justify-center my-2">
          {/* Pulsing ambient gold aura */}
          <div className="absolute -inset-8 rounded-full bg-gold-antique/20 blur-2xl animate-pulse pointer-events-none" />

          {/* Rotating decorative geometric ring */}
          <div
            className="absolute -inset-5 rounded-full border border-gold-antique/30 pointer-events-none"
            style={{
              animation: "spin 24s linear infinite",
              borderStyle: "dashed",
            }}
          />

          {/* Inner gold glowing ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-gold-antique/60 shadow-[0_0_25px_rgba(198,161,91,0.5)] pointer-events-none" />

          {/* Royal Logo Image */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 transition-transform duration-700 hover:scale-105">
            <Image
              src="/af-gold-monogram.png"
              alt="Abuthahir & Fazila Wedding Logo"
              fill
              priority
              className="object-contain drop-shadow-[0_4px_30px_rgba(198,161,91,0.7)]"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
            />
          </div>
        </div>

        {/* Title & Couple Names */}
        <div className="mt-5 sm:mt-6 space-y-1 sm:space-y-2">
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gold-antique font-semibold">
            THE WEDDING INVITATION
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory-warm font-light tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
            Abuthahir &amp; Fazila
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-ivory-warm/75 tracking-wider">
            Sunday, 21 March 2027 · Insha&apos;Allah
          </p>
        </div>
      </div>

      {/* Bottom Section: Progress Bar & Open Button */}
      <div className="relative z-10 pb-4 sm:pb-6 flex flex-col items-center text-center space-y-3">
        {/* Elegant Open Invitation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gold-antique/60 bg-emerald-deep/80 hover:bg-gold-antique hover:text-emerald-deep text-gold-antique font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(198,161,91,0.25)] hover:shadow-[0_0_30px_rgba(198,161,91,0.6)] cursor-pointer"
        >
          <IslamicStar size={12} className="transition-transform duration-300 group-hover:rotate-45" />
          <span>OPEN INVITATION</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Animated Progress Indicator */}
        <div className="w-40 sm:w-52 h-[2px] bg-gold-antique/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-antique/40 via-gold-antique to-gold-antique/90 rounded-full transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="font-sans text-[9px] sm:text-[10px] tracking-widest text-ivory-warm/50 uppercase">
          Tap anywhere to open
        </p>
      </div>
    </div>
  );
}
