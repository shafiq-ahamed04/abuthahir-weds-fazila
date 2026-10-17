"use client";

import { useEffect, useRef, memo } from "react";
import { weddingData } from "@/data/wedding";
import CinematicPhotoPortal from "@/components/wedding/CinematicPhotoPortal";
import CinematicSplitHeading from "@/components/wedding/CinematicSplitHeading";

function StoryIntroSection() {
  const { story } = weddingData;
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(textColRef.current, {
            opacity: 1,
            y: 0,
            clearProps: "all",
          });
          return;
        }

        // Left text column reveal with staggered typography
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden py-16 sm:py-24 md:py-28 bg-emerald-deep content-auto-optimize"
      aria-label="Our Story"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(7,59,45,0.7) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div
            ref={textColRef}
            className="lg:col-span-6 flex flex-col items-start text-left z-10"
          >
            {/* Cinematic Split Heading (A2) */}
            <CinematicSplitHeading
              eyebrow={story.badge}
              title={story.tagline}
              align="left"
              className="mb-5"
            />

            {/* Gold ornament line */}
            <div className="flex items-center gap-3 mb-6 w-full max-w-[220px]">
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to right, rgba(198,161,91,0.9), rgba(198,161,91,0.2))",
                }}
              />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M6 0 L7 4.3 L11.2 4.3 L7.8 6.9 L9 11.1 L6 8.5 L3 11.1 L4.2 6.9 L0.8 4.3 L5 4.3 Z"
                  fill="#C6A15B"
                  fillOpacity="0.85"
                />
              </svg>
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to left, rgba(198,161,91,0.9), rgba(198,161,91,0.2))",
                }}
              />
            </div>

            {/* Quranic Quote Box */}
            <div className="border-l-2 border-gold-antique/60 pl-5 mb-6">
              <p className="font-serif text-base sm:text-lg text-ivory-warm/95 italic tracking-wide mb-1.5">
                {story.quote}
              </p>
              <p className="font-sans text-[9.5px] uppercase tracking-[0.35em] text-gold-antique/80 font-semibold">
                {story.quoteRef}
              </p>
            </div>

            {/* Body Paragraph */}
            <p className="font-serif text-sm sm:text-base text-ivory-warm/80 leading-relaxed tracking-wide max-w-lg mb-6">
              {story.intro}
            </p>

            {/* Date note */}
            <div className="flex items-center gap-3 text-gold-antique/70 font-sans text-xs uppercase tracking-[0.28em] mb-2">
              <span>21 March 2027</span>
              <span className="text-gold-antique/40">·</span>
              <span>23 March 2027</span>
            </div>
          </div>

          {/* Right Column: Illuminated Sacred Union Crest */}
          <div
            ref={imageColRef}
            className="lg:col-span-6 relative flex justify-center lg:justify-end w-full"
          >
            <CinematicPhotoPortal
              aspectRatio="4/5"
              role="couple"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(StoryIntroSection);
