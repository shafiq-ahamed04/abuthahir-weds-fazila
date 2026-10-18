"use client";

import { useEffect, useRef, memo } from "react";
import { weddingData } from "@/data/wedding";
import CinematicPhotoPortal from "@/components/wedding/CinematicPhotoPortal";
import CinematicSplitHeading from "@/components/wedding/CinematicSplitHeading";

interface PersonSectionProps {
  role: "groom" | "bride";
}

function PersonSection({ role }: PersonSectionProps) {
  const isGroom = role === "groom";
  const person = isGroom ? weddingData.couple.groom : weddingData.couple.bride;

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

        // Staggered Text reveal
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
  }, [isGroom]);

  return (
    <section
      ref={sectionRef}
      id={role}
      className={`relative overflow-hidden py-16 sm:py-20 md:py-24 content-auto-optimize ${
        isGroom ? "bg-emerald-deep" : "bg-[#032820]"
      }`}
      aria-label={`${person.role} — ${person.name}`}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isGroom
            ? "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(7,59,45,0.7) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(198,161,91,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Column */}
          <div
            ref={textColRef}
            className={`flex flex-col items-start text-left z-10 ${
              isGroom
                ? "order-1 lg:order-1 lg:col-span-6"
                : "order-1 lg:order-2 lg:col-span-6"
            }`}
          >
            {/* Cinematic Split Heading (A2) */}
            <CinematicSplitHeading
              eyebrow={person.role.toUpperCase()}
              title={person.name}
              align="left"
              className="mb-4"
            />

            {/* Ornamental Divider */}
            <div className="flex items-center gap-3 mb-5 w-full max-w-[180px]">
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to right, rgba(198,161,91,0.9), transparent)",
                }}
              />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="5" cy="5" r="3" fill="#C6A15B" />
              </svg>
              <div
                className="h-[1px] flex-1"
                style={{
                  background:
                    "linear-gradient(to left, rgba(198,161,91,0.9), transparent)",
                }}
              />
            </div>

            {/* Bio Paragraph */}
            <p className="font-serif text-base sm:text-lg text-ivory-warm/85 leading-relaxed max-w-lg mb-6">
              {person.bio}
            </p>

            {/* Hometown and heritage tag */}
            <div className="border-t border-gold-antique/20 pt-4 w-full max-w-md">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] uppercase tracking-wider text-gold-antique/70 font-semibold">
                  Hometown:
                </span>
                <span className="font-serif text-sm text-ivory-warm">
                  {isGroom ? "Trichy, Tamil Nadu" : "Kumbakonam, Tamil Nadu"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Illuminated Islamic Name & Calligraphy Crest */}
          <div
            ref={imageColRef}
            className={`z-10 w-full flex justify-center ${
              isGroom
                ? "order-2 lg:order-2 lg:col-span-6"
                : "order-2 lg:order-1 lg:col-span-6"
            }`}
          >
            <CinematicPhotoPortal
              aspectRatio="4/5"
              role={role}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(PersonSection);
