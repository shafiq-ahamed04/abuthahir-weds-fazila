"use client";

import { useEffect, useRef } from "react";
import { weddingData } from "@/data/wedding";
import { IslamicStar, ArabesqueCorner } from "@/components/elements/IslamicElements";
import CinematicSplitHeading from "@/components/wedding/CinematicSplitHeading";

export default function QuranicReflectionsSection() {
  const { verses } = weddingData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(cardsRef.current, { opacity: 1, y: 0, clearProps: "all" });
          return;
        }

        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, [verses.reflections]);

  return (
    <section
      ref={sectionRef}
      id="quranic-verses"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-emerald-deep content-auto-optimize"
      aria-label="Verses From The Quran"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(7,59,45,0.8) 0%, transparent 80%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header with SplitText reveal (A2) */}
        <div className="mb-10 sm:mb-14">
          <CinematicSplitHeading
            eyebrow="GUIDANCE FOR OUR JOURNEY"
            title="Verses From The Quran"
            subtitle="Divine wisdom illuminating the sacred bond of Nikah"
          />

          {/* Ornamental Divider */}
          <div className="flex items-center gap-3 w-full max-w-xs mx-auto mt-5">
            <div
              className="h-[1px] flex-1"
              style={{
                background: "linear-gradient(to right, transparent, rgba(198,161,91,0.8))",
              }}
            />
            <IslamicStar size={16} className="text-gold-antique" />
            <div
              className="h-[1px] flex-1"
              style={{
                background: "linear-gradient(to left, transparent, rgba(198,161,91,0.8))",
              }}
            />
          </div>
        </div>

        {/* Responsive Cards Grid with Gold Foil Shimmer (B2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {verses.reflections.map((verse, idx) => (
            <div
              key={verse.reference + idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="relative flex flex-col justify-between p-6 sm:p-8 rounded-t-[70px] rounded-b-sm border border-gold-antique/30 bg-[#02211a]/85 backdrop-blur-sm transition-all duration-300 hover:border-gold-antique/60 hover:-translate-y-1.5 gold-foil-shimmer"
              style={{
                boxShadow: "0 15px 35px -10px rgba(0,0,0,0.5)",
              }}
            >
              {/* Inner Arch Frame Border */}
              <div className="absolute inset-2 rounded-t-[62px] rounded-b-sm border border-gold-antique/20 pointer-events-none" />

              {/* Top Star Accent */}
              <div className="flex justify-center mb-4 pt-1">
                <IslamicStar size={16} className="text-gold-antique/70" />
              </div>

              {/* Arabic Verse */}
              <p
                lang="ar"
                dir="rtl"
                className="font-arabic text-lg sm:text-xl lg:text-2xl text-gold-antique text-center leading-[2] sm:leading-[2.2] my-4"
                style={{ textShadow: "0 0 25px rgba(198,161,91,0.2)" }}
              >
                {verse.arabic}
              </p>

              {/* English Translation */}
              <div className="flex-1 flex items-center justify-center mb-6">
                <p className="font-serif text-xs sm:text-sm text-ivory-warm/85 italic text-center leading-relaxed">
                  &ldquo;{verse.english}&rdquo;
                </p>
              </div>

              {/* Bottom Reference */}
              <div className="flex flex-col items-center pt-3.5 border-t border-gold-antique/20">
                <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold-antique font-semibold text-center">
                  {verse.surahName} ({verse.reference})
                </p>
              </div>

              {/* Bottom Corner Ornaments */}
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <ArabesqueCorner position="bottom-left" className="text-gold-antique/40 w-4 h-4" />
              </div>
              <div className="absolute bottom-2 right-2 pointer-events-none">
                <ArabesqueCorner position="bottom-right" className="text-gold-antique/40 w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
