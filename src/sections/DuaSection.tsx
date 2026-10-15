"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { IslamicStar, ArabesqueCorner } from "@/components/elements/IslamicElements";
import GoldenStarlightPetals from "@/components/wedding/GoldenStarlightPetals";
import { GOLD_VENUE_BLUR_DATA_URL } from "@/lib/image-placeholders";

export default function DuaSection() {
  const { verses, couple } = weddingData;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(contentRef.current, { opacity: 1, y: 0, clearProps: "all" });
          return;
        }

        // Elegant entrance reveal
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        // Subtle architectural parallax
        gsap.to(contentRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dua"
      className="relative overflow-hidden py-16 sm:py-24 md:py-28 bg-emerald-deep content-auto-optimize"
      aria-label="A Dua For The Couple"
    >
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Grand Arch Sanctuary Frame with Gold Foil Shimmer (B2) */}
        <div
          ref={contentRef}
          className="relative overflow-hidden rounded-t-[100px] sm:rounded-t-[140px] md:rounded-t-[180px] rounded-b-sm border border-gold-antique/40 p-6 sm:p-12 md:p-16 text-center gold-foil-shimmer shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Background Arch Sanctuary Image with Blur Placeholder (C1) */}
          <Image
            src={verses.dua.image}
            alt="Islamic Wedding Dua Arch Sanctuary"
            fill
            placeholder="blur"
            blurDataURL={GOLD_VENUE_BLUR_DATA_URL}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 980px"
          />

          {/* Heavy dark emerald & black vignette overlays for crisp contrast & sacred mood */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(2,39,31,0.88) 0%, rgba(2,39,31,0.96) 100%)",
            }}
          />

          {/* Inner decorative arch border */}
          <div className="absolute inset-2.5 sm:inset-4 rounded-t-[90px] sm:rounded-t-[125px] md:rounded-t-[165px] rounded-b-sm border border-gold-antique/25 pointer-events-none" />

          {/* Corner ornaments */}
          <div className="absolute top-5 left-5 z-10 hidden sm:block">
            <ArabesqueCorner position="top-left" className="text-gold-antique/60 w-7 h-7" />
          </div>
          <div className="absolute top-5 right-5 z-10 hidden sm:block">
            <ArabesqueCorner position="top-right" className="text-gold-antique/60 w-7 h-7" />
          </div>
          <div className="absolute bottom-5 left-5 z-10 hidden sm:block">
            <ArabesqueCorner position="bottom-left" className="text-gold-antique/60 w-7 h-7" />
          </div>
          <div className="absolute bottom-5 right-5 z-10 hidden sm:block">
            <ArabesqueCorner position="bottom-right" className="text-gold-antique/60 w-7 h-7" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Top Star */}
            <div className="mb-4 flex justify-center">
              <IslamicStar size={22} className="text-gold-antique drop-shadow-[0_0_10px_#C6A15B]" />
            </div>

            {/* Subtitle */}
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold-antique mb-4 font-semibold">
              {verses.dua.title}
            </p>

            {/* Arabic Calligraphy */}
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-2xl sm:text-3xl md:text-4xl text-gold-antique leading-[2] sm:leading-[2.2] mb-6"
              style={{
                textShadow:
                  "0 0 35px rgba(198,161,91,0.35), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {verses.dua.arabic}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 w-40 mb-6">
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(198,161,91,0.8))",
                }}
              />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="3" fill="#C6A15B" />
              </svg>
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(198,161,91,0.8))",
                }}
              />
            </div>

            {/* English Translation */}
            <p className="font-serif text-base sm:text-lg md:text-xl text-ivory-warm/95 italic leading-relaxed tracking-wide mb-6 max-w-xl">
              {verses.dua.english}
            </p>

            {/* Couple names & hashtag signature */}
            <div className="pt-5 border-t border-gold-antique/25 flex flex-col items-center gap-1.5">
              <p className="font-serif text-xl sm:text-2xl text-ivory-warm font-light tracking-widest">
                {couple.groom.name} <span className="text-gold-antique font-light">&amp;</span> {couple.bride.name}
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-antique/75">
                {couple.hashtag}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Closing Effect */}
        <GoldenStarlightPetals containerRef={sectionRef} />
      </div>
    </section>
  );
}
