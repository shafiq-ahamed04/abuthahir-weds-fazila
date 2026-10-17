"use client";

import { useEffect, useState, useRef, memo } from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { IslamicStar } from "@/components/elements/IslamicElements";
import { GOLD_VENUE_BLUR_DATA_URL } from "@/lib/image-placeholders";
import CountdownBoxes from "@/components/wedding/CountdownBoxes";

function CalendarCountdownSection() {
  const { events } = weddingData;
  const sectionRef = useRef<HTMLElement>(null);
  const countdownColRef = useRef<HTMLDivElement>(null);
  const calendarColRef = useRef<HTMLDivElement>(null);
  const [activeDatePin, setActiveDatePin] = useState<"nikah" | "walima" | null>(null);

  // Target date: 21 March 2027 11:00 AM IST
  const targetDate = new Date("2027-03-21T11:00:00+05:30").getTime();

  // GSAP scroll animation
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([countdownColRef.current, calendarColRef.current], {
            opacity: 1,
            y: 0,
            clearProps: "all",
          });
          return;
        }

        gsap.fromTo(
          [countdownColRef.current, calendarColRef.current],
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  // Calendar generation for March 2027
  // March 1, 2027 starts on a Monday
  const daysInMonth = 31;
  const startingDay = 1; // Monday = 1
  const calendarCells = [];

  // Empty leading cells for Sunday
  for (let i = 0; i < startingDay; i++) {
    calendarCells.push(null);
  }
  // Days 1..31
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Add to Calendar helper (Google Calendar link)
  const handleAddToCalendar = (eventId: "nikah" | "walima") => {
    const isNikah = eventId === "nikah";
    const title = isNikah
      ? "Abuthahir & Fazila — Nikah Ceremony"
      : "Abuthahir & Fazila — Walima Reception";
    const details = isNikah
      ? "Nikah Ceremony of Abuthahir and Fazila at A.P Mahal, Kumbakonam. Insha'Allah."
      : "Walima Reception of Abuthahir and Fazila at LKS Mahal, Trichy. Insha'Allah.";
    const location = isNikah
      ? "A.P Mahal, Kumbakonam, Tamil Nadu, India"
      : "LKS Mahal, Trichy, Tamil Nadu, India";
    const start = isNikah ? "20270321T053000Z" : "20270323T063000Z";
    const end = isNikah ? "20270321T083000Z" : "20270323T103000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;

    window.open(gcalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="calendar"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-emerald-deep content-auto-optimize"
      aria-label="Our Special Days — Countdown and Calendar"
    >
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          {/* Left Column: Countdown with Mosque backdrop + Gold Foil Shimmer */}
          <div
            ref={countdownColRef}
            className="lg:col-span-5 relative flex flex-col justify-between overflow-hidden rounded-sm border border-gold-antique/30 min-h-[420px] p-6 sm:p-8 gold-foil-shimmer shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Background Image with blur placeholder (C1) */}
            <Image
              src="/countdown-mosque.jpg"
              alt="Illuminated Mosque at dusk"
              fill
              placeholder="blur"
              blurDataURL={GOLD_VENUE_BLUR_DATA_URL}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 500px"
            />

            {/* Dark emerald overlay for readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(2,39,31,0.85) 0%, rgba(2,39,31,0.65) 50%, rgba(2,39,31,0.92) 100%)",
              }}
            />

            {/* Top Header */}
            <div className="relative z-10">
              <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold-antique mb-2 font-semibold">
                COUNTDOWN
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory-warm font-light tracking-wide">
                Our Special Days
              </h2>
              <p className="font-sans text-xs text-ivory-warm/75 mt-1 tracking-wider">
                Counting every precious second until our union
              </p>
            </div>

            {/* Bottom Countdown Ticker */}
            <div className="relative z-10 pt-12">
              <CountdownBoxes targetDate={targetDate} />
            </div>
          </div>

          {/* Right Column: March 2027 Calendar & Add to Calendar Buttons + Gold Foil Shimmer */}
          <div
            ref={calendarColRef}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-sm border border-gold-antique/30 bg-[#02211a]/95 gold-foil-shimmer shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Calendar Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-5 border-b border-gold-antique/20">
              <div className="flex items-center gap-2">
                <IslamicStar size={16} className="text-gold-antique shrink-0" />
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory-warm tracking-wider font-light">
                  MARCH 2027
                </h3>
              </div>
              <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-antique/70 break-all">
                Ramadan / Shawwal 1448 AH
              </p>
            </div>

            {/* Calendar Table Grid with Interactive Glow & Pinpoint (A4) */}
            <div className="mb-6 relative">
              {/* Day Name Header */}
              <div className="grid grid-cols-7 gap-1 text-center font-sans text-xs uppercase tracking-wider text-gold-antique/75 mb-3 font-semibold">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Day Numbers */}
              <div className="grid grid-cols-7 gap-1.5 text-center font-serif text-sm sm:text-base">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
                  }

                  const isNikah = day === 21;
                  const isWalima = day === 23;
                  const isSpecial = isNikah || isWalima;
                  const eventType = isNikah ? "nikah" : isWalima ? "walima" : null;

                  return (
                    <div
                      key={`day-${day}`}
                      onMouseEnter={() => {
                        if (eventType) setActiveDatePin(eventType);
                      }}
                      onMouseLeave={() => {
                        if (eventType) setActiveDatePin(null);
                      }}
                      onClick={() => {
                        if (eventType) {
                          setActiveDatePin(activeDatePin === eventType ? null : eventType);
                        }
                      }}
                      className={`relative flex items-center justify-center h-9 sm:h-10 rounded transition-all duration-300 select-none ${
                        isSpecial
                          ? "bg-gold-antique text-emerald-deep font-bold shadow-[0_0_20px_rgba(198,161,91,0.8)] scale-110 cursor-pointer z-20 ring-2 ring-gold-antique/60"
                          : "text-ivory-warm/80 hover:bg-gold-antique/10 hover:text-gold-antique"
                      }`}
                      title={
                        isNikah
                          ? "Nikah Ceremony — Sunday, 21 March 2027"
                          : isWalima
                          ? "Walima Reception — Tuesday, 23 March 2027"
                          : undefined
                      }
                    >
                      <span className="relative z-10">{day}</span>

                      {/* Radiating Halo for Auspicious Dates (A4) */}
                      {isSpecial && (
                        <>
                          <span className="absolute -inset-1 rounded-full bg-gold-antique/40 animate-ping opacity-60 pointer-events-none" />
                          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-deep border border-gold-antique" />
                          </span>
                        </>
                      )}

                      {/* Interactive Floating Pinpoint Tooltip */}
                      {isSpecial && activeDatePin === eventType && (
                        <div
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap bg-emerald-deep/95 border border-gold-antique px-2.5 py-1 rounded shadow-xl text-left"
                          style={{ animation: "tooltipFadeIn 0.18s ease-out forwards" }}
                        >
                          <p className="font-serif text-xs text-gold-antique font-semibold">
                            {isNikah ? "★ Nikah Ceremony" : "★ Walima Reception"}
                          </p>
                          <p className="font-sans text-[9px] text-ivory-warm/80">
                            {isNikah ? "21 March · 11:00 AM" : "23 March · 12:00 PM"}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Links with Add to Calendar Buttons */}
            <div className="space-y-3 pt-4 border-t border-gold-antique/20">
              {/* Nikah */}
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded border transition-all duration-300 ${
                  activeDatePin === "nikah"
                    ? "border-gold-antique bg-[#032a21]/90 shadow-[0_0_15px_rgba(198,161,91,0.3)]"
                    : "border-gold-antique/25 bg-[#032a21]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-antique shadow-[0_0_8px_#C6A15B] shrink-0" />
                  <div>
                    <p className="font-serif text-base text-ivory-warm">
                      21 Mar 2027 &nbsp;·&nbsp; <span className="text-gold-antique font-medium">Nikah</span>
                    </p>
                    <p className="font-sans text-xs text-ivory-warm/75">
                      A.P Mahal, Kumbakonam &nbsp;·&nbsp; 11:00 AM
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCalendar("nikah")}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-antique/50 text-gold-antique font-sans text-[11px] uppercase tracking-wider hover:bg-gold-antique hover:text-emerald-deep transition-all duration-300 cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                  <span>Add to Calendar</span>
                </button>
              </div>

              {/* Walima */}
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded border transition-all duration-300 ${
                  activeDatePin === "walima"
                    ? "border-gold-antique bg-[#032a21]/90 shadow-[0_0_15px_rgba(198,161,91,0.3)]"
                    : "border-gold-antique/25 bg-[#032a21]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-antique shadow-[0_0_8px_#C6A15B] shrink-0" />
                  <div>
                    <p className="font-serif text-base text-ivory-warm">
                      23 Mar 2027 &nbsp;·&nbsp; <span className="text-gold-antique font-medium">Walima</span>
                    </p>
                    <p className="font-sans text-xs text-ivory-warm/75">
                      LKS Mahal, Trichy &nbsp;·&nbsp; 12:00 PM
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCalendar("walima")}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-antique/50 text-gold-antique font-sans text-[11px] uppercase tracking-wider hover:bg-gold-antique hover:text-emerald-deep transition-all duration-300 cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CalendarCountdownSection);
