"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import CinematicArchitecture from "./CinematicArchitecture";
import EnterInvitationButton from "./EnterInvitationButton";
import GoldenButterflies from "./GoldenButterflies";
import { ArabesqueCorner, IslamicStar } from "@/components/elements/IslamicElements";

interface InvitationCoverProps {
  onEnter: () => void;
}

export default function InvitationCover({ onEnter }: InvitationCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const archPortalRef = useRef<HTMLDivElement>(null);
  const logoHaloRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const dateBlockRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── GSAP Coordinated Cinematic Entrance ──
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initAnimation() {
      const { gsap } = await import("@/animations");

      ctx = gsap.context(() => {
        const allElements = [
          architectureRef.current,
          archPortalRef.current,
          logoHaloRef.current,
          logoWrapRef.current,
          subtitleRef.current,
          titleRef.current,
          dividerRef.current,
          dateBlockRef.current,
          buttonWrapRef.current,
          scrollIndicatorRef.current,
        ];

        if (prefersReducedMotion) {
          gsap.set(allElements, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
          setIsReady(true);
          return;
        }

        // Initial states: keep arch portal and monogram visible for instant LCP paint
        gsap.set(architectureRef.current, { opacity: 0 });
        gsap.set(archPortalRef.current, { opacity: 1, scale: 0.98, y: 8 });
        gsap.set(logoHaloRef.current, { opacity: 0.4, scale: 0.85 });
        gsap.set(logoWrapRef.current, { opacity: 1, scale: 0.94, y: 6 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
        gsap.set(titleRef.current, { opacity: 0, y: 14 });
        gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
        gsap.set(dateBlockRef.current, { opacity: 0, y: 10 });
        gsap.set(buttonWrapRef.current, { opacity: 0, y: 12 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 8 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setIsReady(true),
        });

        // Architectural background scenery emerges
        tl.to(
          architectureRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          0.05
        );

        // Grand Islamic Arch Portal settles
        tl.to(
          archPortalRef.current,
          {
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          0.05
        );

        // Golden halo & AF Monogram centerpiece settles
        tl.to(
          logoHaloRef.current,
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          0.1
        );
        tl.to(
          logoWrapRef.current,
          {
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          0.1
        );

        // 0.6s — Family Subtitle & Grand Names
        tl.to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.6
        );
        tl.to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          0.68
        );

        // 0.8s — Divider & Dates
        tl.to(
          dividerRef.current,
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
          0.8
        );
        tl.to(
          dateBlockRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.88
        );

        // 0.95s — Enter Invitation Button & Scroll Indicator
        tl.to(
          buttonWrapRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.96
        );
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          1.08
        );
      }, containerRef);
    }

    initAnimation();
    return () => ctx?.revert();
  }, [prefersReducedMotion]);

  // ── Coordinated Exit Transition into Bismillah Scene ──
  const handleEnter = useCallback(async () => {
    if (isExiting) return;
    setIsExiting(true);

    const { gsap } = await import("@/animations");

    if (prefersReducedMotion) {
      onEnter();
      return;
    }

    const exitTl = gsap.timeline({ onComplete: onEnter });

    // Centerpiece glows subtly before folding into the sanctuary
    exitTl.to(logoWrapRef.current, {
      scale: 1.04,
      duration: 0.25,
      ease: "power2.inOut",
    });

    exitTl.to(
      [
        scrollIndicatorRef.current,
        buttonWrapRef.current,
        dateBlockRef.current,
        dividerRef.current,
      ],
      { opacity: 0, y: -10, duration: 0.35, stagger: 0.04, ease: "power2.in" },
      0.1
    );

    exitTl.to(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" },
      0.18
    );

    exitTl.to(
      logoWrapRef.current,
      { scale: 0.94, opacity: 0, duration: 0.4, ease: "power2.in" },
      0.26
    );

    exitTl.to(
      [archPortalRef.current, architectureRef.current, containerRef.current],
      { opacity: 0, duration: 0.45, ease: "power2.in" },
      0.35
    );
  }, [isExiting, onEnter, prefersReducedMotion]);

  // Keyboard shortcut — press Enter anywhere to enter
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        !isExiting &&
        isReady &&
        document.activeElement?.tagName !== "BUTTON"
      ) {
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter, isExiting, isReady]);

  // Scroll down to enter smoothly (matching reference behaviour)
  useEffect(() => {
    if (!isReady || isExiting) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 25) handleEnter();
    };

    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (startY - e.changedTouches[0].clientY > 35) {
        handleEnter();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleEnter, isExiting, isReady]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-emerald-deep"
      role="main"
      aria-label="Wedding Invitation Cover — Abuthahir and Fazila"
    >
      {/* ── 1. Animated Golden Butterflies (Celestial Atmosphere) ── */}
      <GoldenButterflies />

      {/* ── 2. Cinematic Mosque Silhouette Architecture ── */}
      <CinematicArchitecture ref={architectureRef} />

      {/* ── 3. Atmospheric Radial Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(7,59,45,0.65) 0%, rgba(2,39,31,0.92) 80%)",
        }}
      />

      {/* ── 4. Grand Islamic Arch Sanctuary Portal Frame ── */}
      <div
        ref={archPortalRef}
        className="relative z-10 w-full max-w-[440px] sm:max-w-[540px] md:max-w-[620px] mx-4 px-5 sm:px-10 py-6 sm:py-8 rounded-t-[100px] sm:rounded-t-[140px] md:rounded-t-[170px] rounded-b-sm border border-gold-antique/35 bg-[#02271F]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center text-center"
      >
        {/* Inner dashed gold arch contour */}
        <div className="absolute inset-2 sm:inset-3 rounded-t-[92px] sm:rounded-t-[128px] md:rounded-t-[158px] rounded-b-sm border border-gold-antique/20 border-dashed pointer-events-none" />

        {/* Arabesque corner filigree */}
        <div className="absolute top-4 left-4 z-20 hidden sm:block">
          <ArabesqueCorner position="top-left" className="text-gold-antique/60 w-6 h-6" />
        </div>
        <div className="absolute top-4 right-4 z-20 hidden sm:block">
          <ArabesqueCorner position="top-right" className="text-gold-antique/60 w-6 h-6" />
        </div>
        <div className="absolute bottom-3 left-3 z-20">
          <ArabesqueCorner position="bottom-left" className="text-gold-antique/50 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="absolute bottom-3 right-3 z-20">
          <ArabesqueCorner position="bottom-right" className="text-gold-antique/50 w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Top Islamic Star Finial */}
        <div className="mb-2 sm:mb-2.5 flex justify-center">
          <IslamicStar size={18} className="text-gold-antique drop-shadow-[0_0_8px_#C6A15B]" />
        </div>

        {/* ── 5. Centerpiece: User Supplied 3D Gold AF Monogram ── */}
        <div className="relative mb-2 sm:mb-3 flex justify-center items-center">
          {/* Radiant gold halo behind monogram */}
          <div
            ref={logoHaloRef}
            className="absolute -inset-4 sm:-inset-6 pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(198,161,91,0.28) 0%, rgba(7,59,45,0.15) 50%, transparent 70%)",
            }}
          />

          <div
            ref={logoWrapRef}
            className="relative z-10 transition-transform duration-700 ease-out hover:scale-105"
          >
            <Image
              src="/af-gold-monogram.png"
              alt="Abuthahir & Fazila Gold Monogram"
              width={512}
              height={341}
              className="w-36 sm:w-48 md:w-56 lg:w-60 h-auto object-contain drop-shadow-[0_12px_28px_rgba(198,161,91,0.4)]"
              priority
              fetchPriority="high"
              unoptimized
            />
          </div>
        </div>

        {/* ── 6. Header Badge ── */}
        <p
          ref={subtitleRef}
          className="font-sans text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.42em] text-gold-antique font-semibold mb-1.5 sm:mb-2"
        >
          Together With Their Families
        </p>

        {/* ── 7. Prominent Couple Names: “ABUTHAHIR & FAZILA” ── */}
        <h1
          ref={titleRef}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-light text-ivory-warm tracking-[0.12em] uppercase leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        >
          Abuthahir{" "}
          <span className="text-gold-antique font-normal italic font-serif lowercase text-xl sm:text-2xl md:text-3xl mx-0.5 sm:mx-1">
            &amp;
          </span>{" "}
          Fazila
        </h1>

        {/* ── 8. Ornamental Divider Line with Star Motif ── */}
        <div
          ref={dividerRef}
          className="flex items-center gap-2.5 my-2 sm:my-3 w-full max-w-[200px]"
        >
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(198,161,91,0.8))",
            }}
          />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M5 0 L6 3.5 L9.5 3.5 L6.8 5.6 L7.8 9 L5 6.9 L2.2 9 L3.2 5.6 L0.5 3.5 L4 3.5 Z"
              fill="#C6A15B"
            />
          </svg>
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(198,161,91,0.8))",
            }}
          />
        </div>

        {/* ── 9. Dates and Venues: “21 — 23 MARCH 2027” & “KUMBAKONAM · TRICHY” ── */}
        <div ref={dateBlockRef} className="flex flex-col items-center gap-1 mb-3.5 sm:mb-4">
          <p className="font-sans text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.42em] text-gold-antique font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            21 — 23 March 2027
          </p>
          <p className="font-sans text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.3em] text-ivory-warm/75 font-light">
            Kumbakonam &nbsp;&middot;&nbsp; Trichy
          </p>
        </div>

        {/* ── 10. Elegant “ENTER INVITATION” Button ── */}
        <div ref={buttonWrapRef} className="w-full flex justify-center">
          <EnterInvitationButton
            onClick={handleEnter}
            disabled={isExiting}
          />
        </div>

        {/* ── 11. Subtle Scroll Indicator (Matching Reference Experience) ── */}
        <div
          ref={scrollIndicatorRef}
          onClick={handleEnter}
          className="flex flex-col items-center gap-1 mt-2 sm:mt-2.5 cursor-pointer group opacity-65 hover:opacity-100 transition-opacity"
          aria-label="Scroll to unfold our celebration"
        >
          <span className="font-sans text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.3em] text-gold-antique/80">
            Scroll to unfold
          </span>
          <svg
            width="9"
            height="5"
            viewBox="0 0 10 6"
            fill="none"
            className="text-gold-antique animate-bounce"
            aria-hidden="true"
          >
            <path
              d="M1 1 L5 5 L9 1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
