"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

export function registerGSAP() {
  if (typeof window !== "undefined" && !isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    isScrollTriggerRegistered = true;
  }
}

if (typeof window !== "undefined" && !isScrollTriggerRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  isScrollTriggerRegistered = true;
}

/**
 * Hook to automatically register GSAP and ScrollTrigger safely
 */
export function useGSAP() {
  useEffect(() => {
    registerGSAP();
  }, []);
}

/**
 * Motion animation presets for Framer Motion with reduced-motion support
 */
export const transitions = {
  cinematic: {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1], // easeOutQuart
  },
  gentle: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  },
  snappy: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export { gsap, ScrollTrigger };
