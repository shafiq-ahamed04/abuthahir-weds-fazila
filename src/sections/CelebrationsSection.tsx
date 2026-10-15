"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { IslamicStar, ArabesqueCorner } from "@/components/elements/IslamicElements";
import CinematicSplitHeading from "@/components/wedding/CinematicSplitHeading";
import { GOLD_VENUE_BLUR_DATA_URL } from "@/lib/image-placeholders";

export default function CelebrationsSection() {
  const { events } = weddingData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const latticeRef = useRef<HTMLDivElement>(null);
  const decorLeftRef = useRef<HTMLDivElement>(null);
  const decorRightRef = useRef<HTMLDivElement>(null);

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

        // Layer 1: Background geometric lattice parallax drift
        if (latticeRef.current) {
          gsap.to(latticeRef.current, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Layer 2: Ambient lanterns & stars parallax float
        if (decorLeftRef.current && decorRightRef.current) {
          gsap.to([decorLeftRef.current, decorRightRef.current], {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        }

        // Layer 3: Cards entrance reveal
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  const eventList = [events.nikah, events.walima];

  return (
    <section
      ref={sectionRef}
      id="celebrations"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-emerald-deep content-auto-optimize"
      aria-label="Wedding Celebrations — Nikah & Walima"
    >
      {/* ── Parallax Layer 1: Background Arabesque Lattice ── */}
      <div
        ref={latticeRef}
        className="absolute -inset-y-24 inset-x-0 pointer-events-none opacity-20 will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(198,161,91,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Parallax Layer 2: Ambient Hanging Lantern Silhouettes ── */}
      <div
        ref={decorLeftRef}
        className="absolute top-8 left-4 sm:left-12 opacity-30 pointer-events-none hidden md:block will-change-transform"
      >
        <svg width="40" height="90" viewBox="0 0 40 90" fill="none" className="text-gold-antique">
          <line x1="20" y1="0" x2="20" y2="35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M20 35 L12 45 L15 65 L20 72 L25 65 L28 45 Z" fill="rgba(198,161,91,0.15)" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="52" r="3" fill="currentColor" className="drop-shadow-[0_0_6px_#C6A15B]" />
        </svg>
      </div>
      <div
        ref={decorRightRef}
        className="absolute top-14 right-4 sm:right-12 opacity-30 pointer-events-none hidden md:block will-change-transform"
      >
        <svg width="40" height="110" viewBox="0 0 40 110" fill="none" className="text-gold-antique">
          <line x1="20" y1="0" x2="20" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M20 45 L10 58 L14 82 L20 90 L26 82 L30 58 Z" fill="rgba(198,161,91,0.15)" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="68" r="3.5" fill="currentColor" className="drop-shadow-[0_0_6px_#C6A15B]" />
        </svg>
      </div>

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(7,59,45,0.9) 0%, transparent 75%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 z-10">
        {/* Header with SplitText Reveal */}
        <div className="mb-10 sm:mb-14">
          <CinematicSplitHeading
            eyebrow="THE CELEBRATIONS"
            title="Nikah & Walima"
            subtitle="Two sacred gatherings uniting our families in eternal love and barakah"
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

        {/* 2 Event Cards Grid with Gold Foil Edge Shimmer (B2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {eventList.map((event, idx) => (
            <div
              key={event.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-gold-antique/30 bg-[#02211a]/90 backdrop-blur-sm transition-all duration-300 hover:border-gold-antique/70 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] gold-foil-shimmer"
            >
              {/* Event Image with Next.js blur placeholder (C1) */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={event.image}
                  alt={`${event.title} Venue — ${event.venue}`}
                  fill
                  placeholder="blur"
                  blurDataURL={GOLD_VENUE_BLUR_DATA_URL}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 550px"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,33,26,0.95) 0%, rgba(2,33,26,0.2) 60%, transparent 100%)",
                  }}
                />

                {/* Corner Ornaments on image */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <ArabesqueCorner position="top-left" className="text-gold-antique/60 w-5 h-5" />
                </div>
                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <ArabesqueCorner position="top-right" className="text-gold-antique/60 w-5 h-5" />
                </div>
              </div>

              {/* Event Details Content */}
              <div className="relative p-5 sm:p-7 flex flex-col flex-1">
                {/* Event Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-gold-antique font-light tracking-wider mb-5 text-center">
                  {event.title}
                </h3>

                {/* Info List */}
                <div className="space-y-3.5 mb-6">
                  {/* Date */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-1.5 rounded-full border border-gold-antique/30 bg-gold-antique/10 text-gold-antique mt-0.5 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-gold-antique/70 font-semibold">Date</p>
                      <p className="font-serif text-base text-ivory-warm font-normal">
                        {event.displayDate}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-1.5 rounded-full border border-gold-antique/30 bg-gold-antique/10 text-gold-antique mt-0.5 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-gold-antique/70 font-semibold">Time</p>
                      <p className="font-serif text-base text-ivory-warm font-normal">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-1.5 rounded-full border border-gold-antique/30 bg-gold-antique/10 text-gold-antique mt-0.5 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-gold-antique/70 font-semibold">Venue</p>
                      <p className="font-serif text-base text-ivory-warm font-medium">
                        {event.venue}
                      </p>
                      <p className="font-sans text-xs text-ivory-warm/75 mt-0.5 leading-relaxed">
                        {event.city}, Tamil Nadu
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Button */}
                <div className="mt-auto pt-4 border-t border-gold-antique/20 flex justify-center">
                  <a
                    href={event.googleMapsUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-gold-antique/40 text-gold-antique hover:bg-gold-antique hover:text-emerald-deep font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 group/btn"
                  >
                    <span>View Location on Map</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover/btn:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
