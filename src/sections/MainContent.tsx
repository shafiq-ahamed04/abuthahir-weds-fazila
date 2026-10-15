"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/wedding/Navbar";
import SmoothScrollProvider from "@/components/wedding/SmoothScrollProvider";
import IslamicSkylineDivider from "@/components/wedding/IslamicSkylineDivider";
import MobileBottomDock from "@/components/wedding/MobileBottomDock";

import StoryIntroSection from "./StoryIntroSection";
import PersonSection from "./PersonSection";
import QuranicReflectionsSection from "./QuranicReflectionsSection";
import CelebrationsSection from "./CelebrationsSection";
import CalendarCountdownSection from "./CalendarCountdownSection";
import DuaSection from "./DuaSection";

export default function MainContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the main content in as it becomes visible
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      }, containerRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-x-hidden bg-emerald-deep text-ivory-warm"
      >
        {/* Top Fixed Navigation */}
        <Navbar />

        {/* Mobile Quick Navigation Dock (C3) */}
        <MobileBottomDock />

        {/* Background subtle geometric texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(198,161,91,0.02) 0px, rgba(198,161,91,0.02) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(198,161,91,0.02) 0px, rgba(198,161,91,0.02) 1px, transparent 1px, transparent 20px)",
          }}
        />

        <main className="relative z-10 pt-16 sm:pt-20">
          {/* Section 1: Our Story (Two Hearts One Deen + Couple Photo Portal) */}
          <StoryIntroSection />

          <IslamicSkylineDivider variant="dome" />

          {/* Section 2: The Groom (Abuthahir) */}
          <PersonSection role="groom" />

          <IslamicSkylineDivider variant="arch" />

          {/* Section 3: The Bride (Fazila) */}
          <PersonSection role="bride" />

          <IslamicSkylineDivider variant="dome" />

          {/* Section 4: Guidance For Our Journey (Verses From The Quran) */}
          <QuranicReflectionsSection />

          <IslamicSkylineDivider variant="arch" />

          {/* Section 5: The Celebrations (Nikah & Walima) */}
          <CelebrationsSection />

          <IslamicSkylineDivider variant="dome" />

          {/* Section 6: Countdown & Calendar (Our Special Days) */}
          <CalendarCountdownSection />

          <IslamicSkylineDivider variant="arch" />

          {/* Section 7: Grand Finale Arch (A Dua For The Couple) */}
          <DuaSection />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
