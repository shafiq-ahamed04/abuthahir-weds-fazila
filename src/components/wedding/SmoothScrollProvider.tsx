"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // 2. Touch device check — NEVER hijack touch scrolling on mobile
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      // Let touch devices use 100% native smooth momentum scrolling
      return;
    }

    let lenisInstance: Lenis | null = null;
    let animId: number | null = null;

    async function initLenis() {
      const { ScrollTrigger } = await import("@/animations");

      lenisInstance = new Lenis({
        lerp: 0.1, // Smooth standard lerp ~0.1 as specified
        smoothWheel: true,
        touchMultiplier: 0, // Never hijack touch
        syncTouch: false,
      });

      lenisRef.current = lenisInstance;

      // Sync Lenis scroll with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Standard single RAF loop (No GSAP ticker double-driving)
      function raf(time: number) {
        lenisInstance?.raf(time);
        animId = requestAnimationFrame(raf);
      }
      animId = requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      lenisInstance?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
