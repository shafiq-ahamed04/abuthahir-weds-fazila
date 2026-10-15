"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArabesqueCorner, IslamicStar } from "@/components/elements/IslamicElements";
import { EMERALD_BLUR_DATA_URL } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";

interface CinematicPhotoPortalProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string; // e.g. "3/4" or "4/5"
  objectPosition?: string; // e.g. "center 18%"
  role?: "groom" | "bride" | "couple";
}

export default function CinematicPhotoPortal({
  src,
  alt,
  priority = false,
  className,
  aspectRatio = "3/4",
  objectPosition = "center 20%",
  role = "couple",
}: CinematicPhotoPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initAnimation() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([portalRef.current, imageWrapRef.current], {
            opacity: 1,
            scale: 1,
            clearProps: "all",
          });
          if (curtainRef.current) gsap.set(curtainRef.current, { display: "none" });
          if (shimmerRef.current) gsap.set(shimmerRef.current, { display: "none" });
          return;
        }

        // Initial hidden states
        gsap.set(portalRef.current, {
          opacity: 0,
          scale: 0.94,
          y: 35,
        });
        gsap.set(imageWrapRef.current, {
          scale: 1.18,
        });
        gsap.set(curtainRef.current, {
          scaleY: 1,
          transformOrigin: "top",
        });
        gsap.set(shimmerRef.current, {
          x: "-120%",
          opacity: 0.8,
        });

        // Master Entrance Timeline triggered on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        // 1. Arch frame emerges and normalizes scale
        tl.to(portalRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        });

        // 2. Silk emerald curtain rolls open from top to bottom
        tl.to(
          curtainRef.current,
          {
            scaleY: 0,
            duration: 1.05,
            ease: "power2.inOut",
          },
          0.15
        );

        // 3. Photo smoothly zooms into resting scale (Ken Burns cinematic push)
        tl.to(
          imageWrapRef.current,
          {
            scale: 1.0,
            duration: 1.3,
            ease: "power2.out",
          },
          0.15
        );

        // 4. Warm gold light shimmer sweeps across the photo
        tl.to(
          shimmerRef.current,
          {
            x: "150%",
            opacity: 0,
            duration: 1.1,
            ease: "power1.inOut",
          },
          0.35
        );

        // Continuous scrubbed optical parallax on the inner photo
        gsap.to(imageWrapRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }, containerRef);
    }

    initAnimation();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto", className)}
    >
      {/* ── Outer Golden Ambient Glow ── */}
      <div
        className="absolute -inset-4 sm:-inset-6 pointer-events-none rounded-t-[110px] sm:rounded-t-[150px] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(198,161,91,0.3) 0%, rgba(7,59,45,0.2) 60%, transparent 80%)",
        }}
      />

      {/* ── Imperial Pointed Arch Sanctuary Portal with Gold Foil Shimmer ── */}
      <div
        ref={portalRef}
        className="relative overflow-hidden rounded-t-[90px] sm:rounded-t-[130px] md:rounded-t-[150px] rounded-b-sm border border-gold-antique/40 backdrop-blur-md bg-emerald-deep shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group gold-foil-shimmer"
        style={{ aspectRatio }}
      >
        {/* Inner dashed gold arch contour */}
        <div className="absolute inset-2 sm:inset-3 rounded-t-[82px] sm:rounded-t-[120px] md:rounded-t-[140px] rounded-b-sm border border-gold-antique/25 border-dashed pointer-events-none z-20" />

        {/* Top Islamic Star Finial */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <IslamicStar size={18} className="text-gold-antique drop-shadow-[0_0_10px_#C6A15B]" />
        </div>

        {/* Arabesque corner filigree */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <ArabesqueCorner position="bottom-left" className="text-gold-antique/60 w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
          <ArabesqueCorner position="bottom-right" className="text-gold-antique/60 w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* ── Inner Parallax Photo Wrapper ── */}
        <div ref={imageWrapRef} className="absolute inset-0 w-full h-full will-change-transform">
          <Image
            src={src}
            alt={alt}
            fill
            placeholder="blur"
            blurDataURL={EMERALD_BLUR_DATA_URL}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition }}
            sizes="(max-width: 768px) 100vw, 540px"
            priority={priority}
          />
        </div>

        {/* ── Subtle Emerald Theme Integration Vignette (Faces preserved & untouched) ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 30%, transparent 45%, rgba(2,39,31,0.45) 75%, rgba(2,39,31,0.85) 100%)",
          }}
        />

        {/* Bottom subtle dark shade so attire and bottom text blend gracefully */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(2,39,31,0.8) 0%, transparent 100%)",
          }}
        />

        {/* ── Cinematic Golden Shimmer Light Beam ── */}
        <div
          ref={shimmerRef}
          className="absolute inset-y-0 w-1/2 pointer-events-none z-30 transform -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(245,235,213,0.3) 50%, rgba(198,161,91,0.4) 60%, transparent 100%)",
          }}
        />

        {/* ── Emerald Silk Curtain Overlay (Rolls open on scroll reveal) ── */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-emerald-deep z-40 pointer-events-none flex flex-col justify-end"
        >
          {/* Glowing antique gold leading edge */}
          <div
            className="w-full h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(198,161,91,0.9) 50%, transparent)",
              boxShadow: "0 0 15px rgba(198,161,91,0.8)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
