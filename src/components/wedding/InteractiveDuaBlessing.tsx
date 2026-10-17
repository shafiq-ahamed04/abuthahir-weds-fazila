"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { IslamicStar } from "@/components/elements/IslamicElements";

interface FloatingDua {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
}

const DUA_PHRASES = [
  "بَارَكَ اللَّهُ لَكُمَا",
  "آمِيْن يَا رَبّ",
  "مَا شَاءَ اللَّهُ",
  "بَرَكَة وَ نُور",
  "اللَّهُمَّ بَارِكْ لَهُمَا",
  "سَعَادَة دَائِمَة",
];

export default function InteractiveDuaBlessing({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const [count, setCount] = useState<number>(786);
  const [floatingDuas, setFloatingDuas] = useState<FloatingDua[]>([]);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const nextIdRef = useRef(0);
  const lastTriggerTimeRef = useRef(0);

  // Load persisted blessing count
  useEffect(() => {
    try {
      const saved = localStorage.getItem("af_dua_count");
      if (saved) {
        setCount(parseInt(saved, 10));
      }
    } catch {
      // Ignore localStorage restrictions
    }
  }, []);

  const triggerBlessing = useCallback((rawX: number, rawY: number) => {
    const now = Date.now();
    // Throttle fast taps to 120ms to prevent spamming
    if (now - lastTriggerTimeRef.current < 120) return;
    lastTriggerTimeRef.current = now;

    // Viewport-safe clamping for mobile & desktop
    const vw = typeof window !== "undefined" ? window.innerWidth : 375;
    const vh = typeof window !== "undefined" ? window.innerHeight : 667;

    // Keep badge at least 90px from screen edges so it never crops on mobile
    const clampedX = Math.max(90, Math.min(vw - 90, rawX));
    const clampedY = Math.max(90, Math.min(vh - 90, rawY));

    setCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("af_dua_count", next.toString());
      } catch {}
      return next;
    });

    const phrase = DUA_PHRASES[Math.floor(Math.random() * DUA_PHRASES.length)];
    const id = ++nextIdRef.current;
    const rotation = (Math.random() - 0.5) * 12;

    setFloatingDuas((prev) => [
      ...prev.slice(-8), // Keep max 8 active on screen for performance
      { id, text: phrase, x: clampedX, y: clampedY, rotation },
    ]);

    setRipple({ x: clampedX, y: clampedY, id });

    setTimeout(() => {
      setFloatingDuas((prev) => prev.filter((d) => d.id !== id));
    }, 2200);

    setTimeout(() => {
      setRipple((r) => (r?.id === id ? null : r));
    }, 600);
  }, []);

  // Attach tap anywhere listener to parent container
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      // Do not trigger if clicking on buttons, links, or inputs
      if (target.closest("button, a, input, [role='button']")) return;

      let clientX = 0;
      let clientY = 0;

      if ("clientX" in e && typeof e.clientX === "number") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = window.innerWidth / 2;
        clientY = window.innerHeight / 2;
      }

      triggerBlessing(clientX, clientY);
    };

    el.addEventListener("click", handlePointerDown as EventListener);
    return () => {
      el.removeEventListener("click", handlePointerDown as EventListener);
    };
  }, [containerRef, triggerBlessing]);

  return (
    <>
      {/* ── Interactive Dua Counter Pill ── */}
      <div className="flex flex-col items-center sm:items-start my-3 sm:my-4 z-20 w-full max-w-md">
        <button
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            triggerBlessing(rect.left + rect.width / 2, rect.top - 20);
          }}
          className="group relative inline-flex items-center justify-between gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gold-antique/40 bg-[#02271F]/95 hover:bg-emerald-primary/80 transition-all duration-300 hover:border-gold-antique hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.35)] active:scale-95 cursor-pointer text-left max-w-full"
          aria-label="Tap to send a Dua for the couple"
        >
          <div className="flex items-center gap-2 min-w-0">
            <IslamicStar size={15} className="text-gold-antique animate-pulse shrink-0" />
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] uppercase text-ivory-warm font-light truncate">
              Tap anywhere to send a Dua &middot;{" "}
              <span className="text-gold-antique font-medium font-mono text-[11px] sm:text-[13px]">
                {count.toLocaleString()}
              </span>{" "}
              Duas offered
            </span>
          </div>
          <span className="text-gold-antique/70 group-hover:text-gold-antique text-xs shrink-0 transition-colors">
            ✦
          </span>
        </button>
      </div>

      {/* ── Floating Animated Arabic Duas & Sparkles (Fixed Viewport-Safe Overlay) ── */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        {ripple && (
          <div
            className="absolute rounded-full border border-gold-antique/60 animate-ping pointer-events-none"
            style={{
              left: ripple.x - 24,
              top: ripple.y - 24,
              width: 48,
              height: 48,
              animationDuration: "0.55s",
            }}
          />
        )}

        {floatingDuas.map((dua) => (
          <div
            key={dua.id}
            className="absolute flex flex-col items-center pointer-events-none select-none will-change-transform"
            style={{
              left: `${dua.x}px`,
              top: `${dua.y}px`,
              transform: `translate(-50%, -50%) rotate(${dua.rotation}deg)`,
              animation: "floatingDuaRise 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
            }}
          >
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#02271F]/98 border border-gold-antique/70 shadow-[0_4px_25px_rgba(198,161,91,0.45)] whitespace-nowrap">
              <span className="text-gold-antique text-[10px] sm:text-xs">✨</span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-sm sm:text-base text-gold-antique font-medium tracking-wide"
              >
                {dua.text}
              </span>
              <span className="text-gold-antique text-[10px] sm:text-xs">✨</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes floatingDuaRise {
          0% {
            opacity: 0;
            transform: translate(-50%, 0px) scale(0.65) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -30px) scale(1.05) rotate(2deg);
          }
          65% {
            opacity: 0.95;
            transform: translate(-50%, -85px) scale(1) rotate(-2deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -135px) scale(0.9) rotate(3deg);
          }
        }
      `}</style>
    </>
  );
}
