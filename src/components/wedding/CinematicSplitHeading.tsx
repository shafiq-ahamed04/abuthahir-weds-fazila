"use client";

import { useEffect, useRef, memo } from "react";

interface CinematicSplitHeadingProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

function CinematicSplitHeading({
  title,
  eyebrow,
  subtitle,
  align = "center",
  className = "",
}: CinematicSplitHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const words = title.split(" ");

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initSplitAnim() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([wordsRef.current, eyebrowRef.current, subtitleRef.current], {
            opacity: 1,
            y: 0,
            clearProps: "all",
          });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (eyebrowRef.current) {
          tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 12, letterSpacing: "0.2em" },
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.45em",
              duration: 0.8,
              ease: "power2.out",
            },
            0
          );
        }

        tl.fromTo(
          wordsRef.current,
          {
            opacity: 0,
            y: 35,
            rotateX: 20,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          eyebrow ? 0.2 : 0
        );

        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      }, containerRef);
    }

    initSplitAnim();
    return () => ctx?.revert();
  }, [title, eyebrow, subtitle]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <p
          ref={eyebrowRef}
          className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-gold-antique mb-2.5 font-semibold"
        >
          {eyebrow}
        </p>
      )}

      <h2
        className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory-warm font-light tracking-wide flex flex-wrap justify-center gap-x-3 gap-y-1 perspective-[600px]"
        aria-label={title}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden py-1">
            <span
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="inline-block transform-gpu"
            >
              {word}
            </span>
          </span>
        ))}
      </h2>

      {subtitle && (
        <p
          ref={subtitleRef}
          className="font-serif text-base sm:text-lg text-ivory-warm/75 max-w-xl font-light mt-3 leading-relaxed"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default memo(CinematicSplitHeading);
