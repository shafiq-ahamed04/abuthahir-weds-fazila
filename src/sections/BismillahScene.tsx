"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { IslamicStar } from "@/components/elements/IslamicElements";
import IslamicFloralCorner from "@/components/elements/IslamicFloralCorner";
import { GOLD_VENUE_BLUR_DATA_URL } from "@/lib/image-placeholders";

interface BismillahSceneProps {
  isVisible: boolean;
  onScrollToMain?: () => void;
}

export default function BismillahScene({ isVisible, onScrollToMain }: BismillahSceneProps) {
  const { verses } = weddingData;

  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const floralCornersRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bismillahRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const translationRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    let ctx: { revert: () => void } | null = null;

    async function animateIn() {
      const { gsap } = await import("@/animations");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              containerRef.current,
              bgImageRef.current,
              floralCornersRef.current,
              starRef.current,
              eyebrowRef.current,
              bismillahRef.current,
              dividerRef.current,
              translationRef.current,
              scrollIndicatorRef.current,
            ],
            { opacity: 1, y: 0, clearProps: "all" }
          );
          return;
        }

        // Initial hidden states
        gsap.set(containerRef.current, { opacity: 0 });
        gsap.set(bgImageRef.current, { scale: 1.08, opacity: 0 });
        gsap.set(floralCornersRef.current, { opacity: 0, scale: 0.92 });
        gsap.set(starRef.current, { opacity: 0, scale: 0.6, rotate: -45 });
        gsap.set(eyebrowRef.current, { opacity: 0, y: 15, letterSpacing: "0.25em" });
        gsap.set(bismillahRef.current, { opacity: 0, y: 25, scale: 0.95 });
        gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
        gsap.set(translationRef.current, { opacity: 0, y: 18 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Container & Sanctuary Background Image
        tl.to(containerRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0);
        tl.to(
          bgImageRef.current,
          { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
          0.1
        );

        // 2. Floral Corners bloom gently into place
        tl.to(
          floralCornersRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0.3
        );

        // 3. Top Star Finial
        tl.to(
          starRef.current,
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.4)" },
          0.45
        );

        // 4. Eyebrow subtitle
        tl.to(
          eyebrowRef.current,
          { opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.8 },
          0.55
        );

        // 5. Authentic Arabic Bismillah calligraphy
        tl.to(
          bismillahRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
          0.65
        );

        // 6. Ornamental Gold Divider
        tl.to(
          dividerRef.current,
          { opacity: 1, scaleX: 1, duration: 0.7, ease: "power2.out" },
          0.9
        );

        // 7. English Translation in serif italics
        tl.to(
          translationRef.current,
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          1.0
        );

        // 8. Elegant Scroll Indicator
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          1.2
        );
      }, containerRef);
    }

    animateIn();
    return () => ctx?.revert();
  }, [isVisible]);

  // Wheel, touch, and keyboard navigation to smoothly transition into the main celebration
  useEffect(() => {
    if (!isVisible) return;

    let hasScrolled = false;
    let touchStartY = 0;

    const triggerTransition = () => {
      if (hasScrolled) return;
      hasScrolled = true;
      onScrollToMain?.();
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        triggerTransition();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (touchStartY - touchY > 35) {
        triggerTransition();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space", "Enter"].includes(e.code)) {
        triggerTransition();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onScrollToMain]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 w-full h-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-emerald-deep text-ivory-warm select-none"
      role="region"
      aria-label="Bismillah — Opening Blessing"
    >
      {/* ── 1. Fullscreen Sanctuary Interior Image (Matching DuaSection) ── */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full pointer-events-none will-change-transform">
        <Image
          src="/dua-arch.jpg"
          alt="Islamic Wedding Sanctuary"
          fill
          priority
          placeholder="blur"
          blurDataURL={GOLD_VENUE_BLUR_DATA_URL}
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Deep sacred emerald & black vignette overlays for crisp contrast & royal depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(2,39,31,0.85) 0%, rgba(2,39,31,0.96) 80%, #02271F 100%)",
          }}
        />

        {/* Atmospheric ambient gold backlighting halo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(198,161,91,0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── 2. Four Ornate Islamic Floral Arabesque Corners ── */}
      <div ref={floralCornersRef} className="absolute inset-0 pointer-events-none z-20">
        {/* Top Left Corner Flowers */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
          <IslamicFloralCorner
            position="top-left"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_12px_rgba(198,161,91,0.4)]"
          />
        </div>

        {/* Top Right Corner Flowers */}
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
          <IslamicFloralCorner
            position="top-right"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_12px_rgba(198,161,91,0.4)]"
          />
        </div>

        {/* Bottom Left Corner Flowers */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8">
          <IslamicFloralCorner
            position="bottom-left"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_12px_rgba(198,161,91,0.4)]"
          />
        </div>

        {/* Bottom Right Corner Flowers */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8">
          <IslamicFloralCorner
            position="bottom-right"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_12px_rgba(198,161,91,0.4)]"
          />
        </div>
      </div>

      {/* ── 3. Gentle Floating Gold Light Motes (Atmospheric life) ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { x: "20%", y: "38%", size: 2.5, dur: "8s", delay: "0s" },
          { x: "32%", y: "24%", size: 1.5, dur: "10s", delay: "1.5s" },
          { x: "48%", y: "18%", size: 2.0, dur: "7s", delay: "0.5s" },
          { x: "65%", y: "28%", size: 1.5, dur: "11s", delay: "2s" },
          { x: "78%", y: "42%", size: 2.5, dur: "9s", delay: "3s" },
          { x: "50%", y: "75%", size: 2.0, dur: "8s", delay: "1s" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold-antique opacity-0"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
              boxShadow: "0 0 8px #C6A15B",
            }}
          />
        ))}
      </div>

      {/* ── 4. Central Sacred Bismillah Content (Modeled after DuaSection) ── */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 sm:px-12 max-w-4xl mx-auto py-8">
        {/* Top Islamic Star with Radiant Halo */}
        <div ref={starRef} className="mb-4 sm:mb-6 flex justify-center">
          <IslamicStar size={26} className="text-gold-antique drop-shadow-[0_0_14px_#C6A15B]" />
        </div>

        {/* Subtitle Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold-antique mb-4 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          IN THE NAME OF ALLAH, THE MOST BENEFICENT, THE MOST MERCIFUL
        </p>

        {/* Authentic Arabic Bismillah Calligraphy */}
        <h2
          ref={bismillahRef}
          lang="ar"
          dir="rtl"
          className="font-arabic text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-gold-antique font-normal leading-[1.8] sm:leading-[2.1] tracking-normal mb-3 select-none"
          style={{
            textShadow:
              "0 0 50px rgba(198,161,91,0.55), 0 4px 20px rgba(0,0,0,0.95)",
          }}
        >
          {verses.bismillah.arabic}
        </h2>

        {/* Refined Antique Gold Divider Line with 45-degree Diamond Center */}
        <div
          ref={dividerRef}
          className="flex items-center justify-center gap-3 w-48 sm:w-72 my-4 sm:my-6"
        >
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(198,161,91,0.9))",
            }}
          />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-antique bg-gold-antique/60 shadow-[0_0_8px_#C6A15B]" />
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(198,161,91,0.9))",
            }}
          />
        </div>

        {/* English Translation */}
        <p
          ref={translationRef}
          className="font-serif text-lg sm:text-2xl md:text-[1.65rem] text-ivory-warm/95 italic tracking-wide max-w-xl sm:max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          &ldquo;{verses.bismillah.english}&rdquo;
        </p>
      </div>

      {/* ── 5. Minimal, Elegant Scroll Indicator ── */}
      <button
        ref={scrollIndicatorRef}
        onClick={onScrollToMain}
        className="absolute bottom-8 sm:bottom-10 z-30 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-antique rounded-sm transition-opacity duration-300 opacity-75 hover:opacity-100"
        aria-label="Scroll to enter the wedding journey"
      >
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-gold-antique/85 font-medium">
          Scroll to explore
        </span>

        <div className="flex flex-col items-center gap-1">
          <div
            className="w-[1px] h-7 sm:h-9"
            style={{
              background:
                "linear-gradient(to bottom, rgba(198,161,91,0.9) 0%, rgba(198,161,91,0) 100%)",
              animation: "scrollPulse 2.2s ease-in-out infinite",
            }}
          />
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className="text-gold-antique group-hover:translate-y-0.5 transition-transform"
            aria-hidden="true"
          >
            <path
              d="M1 1 L5 5 L9 1"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
