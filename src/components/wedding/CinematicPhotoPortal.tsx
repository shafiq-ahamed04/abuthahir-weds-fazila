"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArabesqueCorner, IslamicStar } from "@/components/elements/IslamicElements";
import { cn } from "@/lib/utils";

interface CinematicPhotoPortalProps {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string; // e.g. "3/4" or "4/5"
  objectPosition?: string;
  role?: "groom" | "bride" | "couple";
}

export default function CinematicPhotoPortal({
  className,
  aspectRatio = "4/5",
  role = "couple",
}: CinematicPhotoPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const isGroom = role === "groom";
  const isBride = role === "bride";
  const isCouple = role === "couple";

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initAnimation() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([portalRef.current, contentWrapRef.current], {
            opacity: 1,
            scale: 1,
            clearProps: "all",
          });
          if (curtainRef.current) gsap.set(curtainRef.current, { display: "none" });
          if (shimmerRef.current) gsap.set(shimmerRef.current, { display: "none" });
          return;
        }

        // Initial hidden states
        gsap.set(portalRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 28,
        });
        gsap.set(curtainRef.current, {
          scaleY: 1,
          transformOrigin: "top",
        });
        gsap.set(shimmerRef.current, {
          x: "-120%",
          opacity: 0.8,
        });

        // Entrance Timeline triggered on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        // 1. Arch frame emerges
        tl.to(portalRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        });

        // 2. Silk emerald curtain reveals illuminated crest
        tl.to(
          curtainRef.current,
          {
            scaleY: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          0.15
        );

        // 3. Warm gold light shimmer sweeps across
        tl.to(
          shimmerRef.current,
          {
            x: "150%",
            opacity: 0,
            duration: 1.1,
            ease: "power1.inOut",
          },
          0.3
        );
      }, containerRef);
    }

    initAnimation();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto", className)}
    >
      {/* ── Outer Golden Ambient Glow ── */}
      <div
        className="absolute -inset-4 sm:-inset-6 pointer-events-none rounded-t-[110px] sm:rounded-t-[150px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(198,161,91,0.25) 0%, rgba(7,59,45,0.15) 50%, transparent 75%)",
        }}
      />

      {/* ── Imperial Pointed Arch Sanctuary Portal with Gold Foil Shimmer ── */}
      <div
        ref={portalRef}
        className="relative overflow-hidden rounded-t-[90px] sm:rounded-t-[130px] md:rounded-t-[150px] rounded-b-sm border border-gold-antique/40 bg-[#02211a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] group gold-foil-shimmer flex flex-col justify-between"
        style={{ aspectRatio }}
      >
        {/* Background subtle Islamic geometric motif */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(198,161,91,0.06) 0px, rgba(198,161,91,0.06) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(198,161,91,0.06) 0px, rgba(198,161,91,0.06) 1px, transparent 1px, transparent 16px)",
          }}
        />

        {/* Ambient radial lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 50% 40%, rgba(7,59,45,0.85) 0%, rgba(2,39,31,0.95) 70%, #02211a 100%)",
          }}
        />

        {/* Inner dashed gold arch contour */}
        <div className="absolute inset-2 sm:inset-3 rounded-t-[82px] sm:rounded-t-[120px] md:rounded-t-[140px] rounded-b-sm border border-gold-antique/25 border-dashed pointer-events-none z-20" />

        {/* Top Islamic Star Finial */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <IslamicStar size={18} className="text-gold-antique drop-shadow-[0_0_10px_#C6A15B]" />
        </div>

        {/* Arabesque corner filigree */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <ArabesqueCorner position="bottom-left" className="text-gold-antique/60 w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
          <ArabesqueCorner position="bottom-right" className="text-gold-antique/60 w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* ── Sacred Illuminated Crest Content ── */}
        <div
          ref={contentWrapRef}
          className="relative z-10 w-full h-full flex flex-col items-center justify-between px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 text-center select-none"
        >
          {/* Top Emblem */}
          <div className="flex flex-col items-center">
            {isCouple && (
              <div className="relative mb-2 flex justify-center items-center">
                <div
                  className="absolute -inset-4 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(198,161,91,0.25) 0%, transparent 70%)",
                  }}
                />
                <Image
                  src="/af-gold-monogram.png"
                  alt="Abuthahir & Fazila Monogram"
                  width={240}
                  height={160}
                  className="w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-[0_8px_20px_rgba(198,161,91,0.4)]"
                  unoptimized
                />
              </div>
            )}

            {isGroom && (
              <div className="relative mb-2 flex justify-center items-center">
                <div
                  className="absolute -inset-4 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(198,161,91,0.25) 0%, transparent 70%)",
                  }}
                />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold-antique/40 bg-emerald-deep/90 flex items-center justify-center shadow-[0_0_20px_rgba(198,161,91,0.3)]">
                  <IslamicStar size={26} className="text-gold-antique" />
                </div>
              </div>
            )}

            {isBride && (
              <div className="relative mb-2 flex justify-center items-center">
                <div
                  className="absolute -inset-4 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(198,161,91,0.25) 0%, transparent 70%)",
                  }}
                />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold-antique/40 bg-emerald-deep/90 flex items-center justify-center shadow-[0_0_20px_rgba(198,161,91,0.3)]">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gold-antique drop-shadow-[0_0_8px_#C6A15B]"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                      fillOpacity="0.85"
                    />
                  </svg>
                </div>
              </div>
            )}

            <p className="font-sans text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.4em] text-gold-antique/80 font-semibold mt-1">
              {isGroom && "The Groom · Al-Arees"}
              {isBride && "The Bride · Al-Aroos"}
              {isCouple && "Sacred Union · Nikah"}
            </p>
          </div>

          {/* Central Calligraphy & Meaning */}
          <div className="flex flex-col items-center my-auto">
            {isGroom && (
              <>
                <h3
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-4xl sm:text-5xl text-gold-antique font-normal leading-tight my-1 drop-shadow-[0_0_24px_rgba(198,161,91,0.55)]"
                >
                  أَبُو طَاهِر
                </h3>
                <p className="font-serif text-lg sm:text-xl text-ivory-warm tracking-wider mt-0.5">
                  Abuthahir
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 rounded-full border border-gold-antique/30 bg-[#02271F]/80">
                  <span className="font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.22em] text-gold-antique font-medium">
                    “The Pure, Noble &amp; Honorable”
                  </span>
                </div>
              </>
            )}

            {isBride && (
              <>
                <h3
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-4xl sm:text-5xl text-gold-antique font-normal leading-tight my-1 drop-shadow-[0_0_24px_rgba(198,161,91,0.55)]"
                >
                  فَاضِلَة
                </h3>
                <p className="font-serif text-lg sm:text-xl text-ivory-warm tracking-wider mt-0.5">
                  Fazila
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 rounded-full border border-gold-antique/30 bg-[#02271F]/80">
                  <span className="font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.22em] text-gold-antique font-medium">
                    “Virtuous, Gracious &amp; Blessed”
                  </span>
                </div>
              </>
            )}

            {isCouple && (
              <>
                <h3
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-3xl sm:text-4xl text-gold-antique font-normal leading-snug my-1 drop-shadow-[0_0_20px_rgba(198,161,91,0.5)]"
                >
                  وَخَلَقْنَاكُمْ أَزْوَاجًا
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-ivory-warm/95 mt-1">
                  “And We created you in pairs”
                </p>
                <span className="font-sans text-[8px] sm:text-[8.5px] uppercase tracking-[0.3em] text-gold-antique/80 font-semibold mt-1">
                  Surah An-Naba (78:8)
                </span>
              </>
            )}
          </div>

          {/* Bottom Virtues & Blessing */}
          <div className="flex flex-col items-center w-full pt-3 border-t border-gold-antique/20">
            {isGroom && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 text-[8px] sm:text-[8.5px] uppercase tracking-[0.25em] text-ivory-warm/75 font-sans">
                  <span>Devotion</span>
                  <span className="text-gold-antique">·</span>
                  <span>Integrity</span>
                  <span className="text-gold-antique">·</span>
                  <span>Kindness</span>
                </div>
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-sm sm:text-base text-gold-antique/90 mt-0.5"
                >
                  رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا قُرَّةَ أَعْيُنٍ
                </p>
                <p className="font-sans text-[7.5px] sm:text-[8px] uppercase tracking-[0.28em] text-gold-antique/60">
                  Trichy, Tamil Nadu
                </p>
              </div>
            )}

            {isBride && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 text-[8px] sm:text-[8.5px] uppercase tracking-[0.25em] text-ivory-warm/75 font-sans">
                  <span>Grace</span>
                  <span className="text-gold-antique">·</span>
                  <span>Modesty</span>
                  <span className="text-gold-antique">·</span>
                  <span>Serenity</span>
                </div>
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-sm sm:text-base text-gold-antique/90 mt-0.5"
                >
                  وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                </p>
                <p className="font-sans text-[7.5px] sm:text-[8px] uppercase tracking-[0.28em] text-gold-antique/60">
                  Kumbakonam, Tamil Nadu
                </p>
              </div>
            )}

            {isCouple && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-[8px] sm:text-[8.5px] uppercase tracking-[0.25em] text-ivory-warm/75 font-sans">
                  <span>Love</span>
                  <span className="text-gold-antique">·</span>
                  <span>Tranquility</span>
                  <span className="text-gold-antique">·</span>
                  <span>Mercy</span>
                </div>
                <p className="font-sans text-[7.5px] sm:text-[8px] uppercase tracking-[0.3em] text-gold-antique/60 mt-0.5">
                  Two Families United In Deen
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Cinematic Golden Shimmer Light Beam ── */}
        <div
          ref={shimmerRef}
          className="absolute inset-y-0 w-1/2 pointer-events-none z-30 transform -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(245,235,213,0.25) 50%, rgba(198,161,91,0.35) 60%, transparent 100%)",
          }}
        />

        {/* ── Emerald Silk Curtain Overlay (Rolls open on scroll reveal) ── */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-[#02211a] z-40 pointer-events-none flex flex-col justify-end"
        >
          {/* Glowing antique gold leading edge */}
          <div
            className="w-full h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(198,161,91,0.9) 50%, transparent)",
              boxShadow: "0 0 15px rgba(198,161,91,0.8)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
