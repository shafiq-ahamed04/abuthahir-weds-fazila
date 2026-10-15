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
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let lenisInstance: Lenis | null = null;
    let tickerCb: ((time: number) => void) | null = null;

    async function initLenis() {
      const { gsap, ScrollTrigger } = await import("@/animations");
      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.25,
      });

      lenisRef.current = lenisInstance;

      // Sync Lenis scroll with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Drive Lenis RAF loop via GSAP's synchronized ticker
      tickerCb = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    initLenis();

    return () => {
      if (tickerCb) {
        import("@/animations").then(({ gsap }) => {
          if (tickerCb) gsap.ticker.remove(tickerCb);
        });
      }
      lenisInstance?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
